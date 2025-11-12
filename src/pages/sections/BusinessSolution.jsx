import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const BusinessSolution = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/src/assets/bg-pattern.svg')" }} />
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 items-stretch">
        <Reveal className="flex flex-col justify-center">
          <p className="text-red-500 uppercase font-semibold tracking-widest">Core Feature</p>
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mt-3">
            DEDICATE <br /> SOLUTION FOR <br /> BUSINESS
          </h2>
          <p className="text-gray-600 mt-6 text-lg leading-relaxed">
            Dominion fowle there light so does lights beginning subdue without reted saying moving winged lacus elit fermentum bibendum cras placerat pellentesque.
          </p>
          <button
            onClick={() => navigate("/services")}
            className="mt-8 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-8 py-4 font-semibold rounded-lg shadow-md transition text-lg"
          >
            <span>→</span> Get Service
          </button>
          <div className="mt-12 bg-[#111827] text-white py-6 px-8 rounded-2xl flex items-center gap-6 shadow-2xl">
            <div className="text-yellow-400 text-5xl">📞</div>
            <div>
              <p className="text-sm opacity-70">Emergency Call</p>
              <p className="text-3xl font-bold">8178106141</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="flex justify-center items-center h-full">
          <img
            src="/src/assets/core.png"
            alt="Business Expert"
            className="h-full w-auto max-h-[600px] object-cover drop-shadow-[0_20px_45px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out hover:scale-105"
            style={{ willChange: "transform" }}
          />
        </Reveal>

        <div className="flex flex-col justify-center space-y-10">
          {[
            { title: "Quality Content", desc: "Dominion fowe there light she does lights beginning subdue.", icon: "📝" },
            { title: "Expert Member", desc: "Dominion fowe there light she does lights beginning subdue.", icon: "👥" },
            { title: "Digital Business", desc: "Dominion fowe there light she does lights beginning subdue.", icon: "📊" },
          ].map((item, i) => (
            <Reveal key={i}>
              <div className="p-8 border border-gray-200 bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-yellow-400 flex justify-center items-center text-4xl shadow-md">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-3 text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSolution;
