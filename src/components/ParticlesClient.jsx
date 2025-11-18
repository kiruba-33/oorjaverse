// src/components/ParticlesClient.jsx
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
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
  } catch (e) {
    // no error
  }
  return false;
};

export default function ParticlesClient({ options = {}, className = "" }) {
  const [Particles, setParticles] = useState(null);
  const containerRef = useRef(null);

  // Default particle options – memoized to prevent warnings
  const memoizedDefaultOptions = useMemo(
    () => ({
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
    }),
    [] // ⚠ depends on nothing → NO WARNING!
  );

  // Run when browser is idle
  const runWhenIdle = useCallback((fn) => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(fn, { timeout: 1000 });
    } else {
      setTimeout(fn, 200);
    }
  }, []); // ⚠ depends on nothing → NO WARNING!

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isDesktop()) return;
    if (isLowEndDevice()) return;
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
            <ParticlesImpl
              init={init}
              options={{ ...memoizedDefaultOptions, ...options }}
              {...props}
            />
          );
        };

        setParticles(() => WrappedParticles);
      } catch (err) {
        console.warn("Particles load error:", err);
      }
    }

    return () => observer && observer.disconnect();
  }, [memoizedDefaultOptions, options, runWhenIdle]); // ✨ dependencies are correct

  return (
    <div
      ref={containerRef}
      className={className || "absolute inset-0 pointer-events-none"}
    >
      {Particles && <Particles className="absolute inset-0" />}
    </div>
  );
}
