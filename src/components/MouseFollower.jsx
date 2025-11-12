import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ✅ Hide completely on mobile view
  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        x: mousePosition.x - 15,
        y: mousePosition.y - 15,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Outer glow */}
      <div className="w-8 h-8 rounded-full bg-red-500/40 blur-xl"></div>

      {/* Inner bright dot */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#ff0000]"></div>
    </motion.div>
  );
}
