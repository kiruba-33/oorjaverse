// src/components/ParticlesClient.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * Lightweight, client-only Particles loader.
 *
 * Behavior:
 * - Uses requestIdleCallback (with fallback) to defer loading
 * - Dynamically imports react-tsparticles + tsparticles-slim to reduce bundle
 * - Skips loading on low-end devices or if user prefers reduced motion
 * - Provides a static fallback until particles load
 * - Pauses particles when tab hidden (saves CPU)
 */

const isLowEndDevice = () => {
  try {
    // heuristic: fewer than 4 logical CPU cores -> low-end
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return true;
  } catch (e) {}
  return false;
};

export default function ParticlesClient({
  className,
  options: userOptions = {},
  idleDelay = 200, // ms fallback for requestIdleCallback
  threshold = 0.25, // for IntersectionObserver
}) {
  const [ParticlesComp, setParticlesComp] = useState(null);
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  // Default lightweight options (merge with user options)
  const defaultOptions = {
    fpsLimit: 30,
    detectRetina: false,
    particles: {
      number: { value: 24, density: { enable: false } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.4, outModes: "bounce" },
      opacity: { value: 0.8 },
    },
    interactivity: { detectsOn: "canvas", events: { onHover: { enable: false } } },
  };

  const options = { ...defaultOptions, ...userOptions };

  // Respect reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined"
    && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Use requestIdleCallback when available
  const runWhenIdle = useCallback((fn) => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(fn, { timeout: 1000 });
    } else {
      // fallback: run after small timeout
      setTimeout(fn, idleDelay);
    }
  }, [idleDelay]);

  // Pause / resume on visibility change
  const handleVisibility = useCallback(() => {
    if (!instanceRef.current) return;
    if (document.hidden) {
      instanceRef.current.pause();
    } else {
      instanceRef.current.play();
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR guard
    if (prefersReducedMotion) return; // don't load for reduced motion

    // Skip heavy effect on clearly low-end devices
    if (isLowEndDevice()) return;

    let unmounted = false;
    let observer = null;

    // Only load when the container is visible on screen
    if ("IntersectionObserver" in window && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e) return;
          if (e.isIntersecting && e.intersectionRatio >= threshold) {
            observer.disconnect();
            runWhenIdle(loadParticles);
          }
        },
        { threshold: [threshold] }
      );
      observer.observe(containerRef.current);
    } else {
      // If no IO support, just load after idle
      runWhenIdle(loadParticles);
    }

    async function loadParticles() {
      try {
        // dynamic import of react-tsparticles and slim engine
        const [{ default: Particles }, { loadSlim }] = await Promise.all([
          import("react-tsparticles"),
          import("tsparticles-slim"),
        ]);

        if (unmounted) return;

        // initialize slim engine (faster + smaller)
        // loadSlim returns a promise but inside react-tsparticles we'll call it in init
        const ParticlesWrapped = (props) => {
          const init = async (engine) => {
            await loadSlim(engine);
          };

          // record instance to pause/resume later
          const ref = (c) => {
            instanceRef.current = c;
            if (props.instanceRef) props.instanceRef.current = c;
          };

          return <Particles init={init} options={options} ref={ref} {...props} />;
        };

        setParticlesComp(() => ParticlesWrapped);

        // add visibility listener
        document.addEventListener("visibilitychange", handleVisibility);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Particles failed to load:", err);
      }
    }

    return () => {
      unmounted = true;
      if (observer) observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [handleVisibility, prefersReducedMotion, runWhenIdle, threshold, options]);

  // Static fallback (CSS gradient or placeholder) until Particles are loaded or if disabled
  return (
    <div ref={containerRef} className={className || "absolute inset-0 pointer-events-none"}>
      {ParticlesComp ? (
        <ParticlesComp className="absolute inset-0" />
      ) : (
        // fallback background — keeps visual but cheap
        <div aria-hidden style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))",
        }} />
      )}
    </div>
  );
}
