import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const Reveal = ({ delay = 0, children, className = "" }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

const hoverScale = { scale: 1.04 };

const CoreFeatures = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="core-features-section py-24">
      <Reveal className="text-center mb-16">
        <p className="text-red-500 uppercase tracking-widest font-semibold">
          — Our Core Feature —
        </p>
        <h2 className="text-5xl font-extrabold text-gray-900">
          Empowering <span className="text-red-600">Your Potential</span>
        </h2>
      </Reveal>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        {[
          { icon: "💡", title: "Creative Planning" },
          { icon: "📈", title: "Financial Advice" },
          { icon: "🤝", title: "Friendly Working" },
          { icon: "📊", title: "Market Research" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="feature-card smooth-card"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
            whileHover={prefersReducedMotion ? {} : hoverScale}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="text-6xl mb-6">{item.icon}</div>
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600">
              Innovative solutions tailored to your business goals.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CoreFeatures;
