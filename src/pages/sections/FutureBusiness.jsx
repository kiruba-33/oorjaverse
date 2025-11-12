import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

const Reveal = ({ delay = 0, children, className = "" }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </motion.div>
  );
};

const hoverScale = { scale: 1.04 };

const FutureBusiness = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full py-20 sm:py-24 bg-[#0b1120] overflow-hidden">
      {/* glowing background circles */}
      <div className="absolute top-[-150px] right-[-200px] w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full bg-red-600 blur-[160px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[-200px] w-[330px] sm:w-[420px] h-[330px] sm:h-[420px] rounded-full bg-yellow-400 blur-[150px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        <Reveal className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 border-b lg:border-b-0 lg:border-r border-gray-600 pb-10 lg:pb-0 lg:pr-10">
          <img src={logo} className="w-20 h-20 drop-shadow-2xl" alt="logo" />
          <h3 className="text-2xl text-white font-semibold leading-snug">
            Satisfied <br /> Consultancy <br /> Services
          </h3>
        </Reveal>

        <Reveal delay={0.05} className="text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            FUTURE BUSINESS <br /> CONSULTING
          </h2>

          <p className="bg-[#F4B000] text-gray-900 font-semibold py-4 px-6 rounded shadow-[0_10px_40px_rgba(244,176,0,0.5)] text-lg inline-block">
            Build strategies, build confidence, build your business dream
          </p>

          <motion.button
            whileHover={prefersReducedMotion ? {} : hoverScale}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/contact")}
            className="mt-8 mx-auto lg:mx-0 flex items-center gap-2 bg-white text-gray-900 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition-all"
          >
            → Direct Contact
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
};

export default FutureBusiness;
