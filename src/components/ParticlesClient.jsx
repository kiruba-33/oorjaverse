// src/components/ParticlesClient.jsx
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

// Check device is desktop
const isDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 768px)").matches;

// Check low-end device (skip particles)
const isLowEndDevice = () => {
  try {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
      return true;
  } catch (e) {}
  return false;
};

export default function ParticlesClient({ options = {}, className = "" }) {
  const [Particles, setParticles] = useState(null);
  const containerRef = useRef(null);

  const defaultOptions = {
    fpsLimit: 30,
    detectRetina: false,
    particles: {
      number: { value: 20, density: { enable: false } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.4 },
      opacity: { value: 0.7 },
    },
    interactivity: {},
  };

  // run in idle time
  const runWhenIdle = useCallback((fn) => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(fn, { timeout: 1000 });
    } else {
      setTimeout(fn, 200);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isDesktop()) return;          // DESKTOP ONLY
    if (isLowEndDevice()) return;      // skip slow devices
    if (!containerRef.current) return;

    let observer;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect();
            runWhenIdle(loadParticles);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(containerRef.current);
    } else {
      runWhenIdle(loadParticles);
    }

    async function loadParticles() {
      try {
        const [{ default: ParticlesImpl }, { loadSlim }] = await Promise.all([
          import("react-tsparticles"),
          import("tsparticles-slim"),
        ]);

        const WrappedParticles = (props) => {
          const init = async (engine) => {
            await loadSlim(engine);
          };
          return (
            <ParticlesImpl init={init} options={{ ...defaultOptions, ...options }} {...props} />
          );
        };

        setParticles(() => WrappedParticles);
      } catch (err) {
        console.warn("Particles load error:", err);
      }
    }

    return () => observer && observer.disconnect();
  }, [options, runWhenIdle]);

  return (
    <div
      ref={containerRef}
      className={className || "absolute inset-0 pointer-events-none"}
    >
      {Particles && <Particles className="absolute inset-0" />}
    </div>
  );
}
