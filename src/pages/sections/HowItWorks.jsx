import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaClipboardList,
  FaMoneyBillWave,
  FaPaintBrush,
  FaPhoneAlt,
} from "react-icons/fa";

// Smooth Reveal Wrapper
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

const HowItWorks = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="howitworks-bg py-28 text-white bg-[#0f1624]">
      <Reveal className="text-center mb-20">
        <p className="text-red-500 uppercase font-semibold tracking-widest">
          — How It Works —
        </p>
        <h2 className="text-5xl font-extrabold">
          We Follow <span className="text-yellow-400">This Process</span>
        </h2>
      </Reveal>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-6">
        {[FaClipboardList, FaMoneyBillWave, FaPaintBrush, FaPhoneAlt].map(
          (Icon, i) => (
            <motion.div
              key={i}
              className="relative bg-[#1f2937] p-10 rounded-2xl text-center shadow-lg border border-gray-700"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              whileHover={prefersReducedMotion ? {} : hoverScale}
            >
              <div className="relative w-fit mx-auto -mt-20">
                <div className="bg-yellow-400 p-6 rounded-lg shadow-xl mx-auto flex justify-center items-center">
                  <Icon className="text-4xl text-gray-900" />
                </div>
                <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[22px] border-l-transparent border-r-transparent border-t-yellow-400 mx-auto" />
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">
                {["Request Quote", "Decide Budget", "Work Planning", "Ready to Start"][i]}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Belis commodo be libero velos pedelsen better sapiens same quam on
                integer sodale pretium cura incididunt erat.
              </p>

              <div className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full w-fit mx-auto shadow-md">
                {`STEP 0${i + 1}`}
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
