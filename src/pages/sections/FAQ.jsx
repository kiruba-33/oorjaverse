import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import gqImg from "../../assets/gq.png";

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

const faqDataStatic = [
  { q: "What my product from the competition?", a: "Lights morning man years sea saying unto great setting place you bide cattle thing had cattle there form heston our." },
  { q: "How much powering do my suppliers have?", a: "Dominion fowle there light so does lights beginning subdue without run saying moving winger." },
  { q: "Does my business have a moat around it?", a: "Better strategy ensures your market position is protected and stable." },
  { q: "Are incentives aligned with business goals?", a: "Incentives ensure improved productivity, performance, and result focus." },
];

const FAQ = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const faqData = useMemo(() => faqDataStatic, []);
  const toggleFAQ = (i) => setActiveFAQ(activeFAQ === i ? null : i);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 items-center">
        <Reveal className="flex justify-center">
          <img
            src={gqImg}
            alt="General Questions"
            className="w-[90%] max-w-[520px] rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-red-500 uppercase tracking-[2px] font-semibold mb-3">
              GENERAL QUESTIONS
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 leading-tight">
              Frequently General <br /> Asked Question
            </h2>
          </Reveal>

          <div className="space-y-4">
            {faqData.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-[18px] tracking-wide text-gray-900 hover:text-red-600 transition"
                >
                  {item.q}
                  {activeFAQ === i ? <FaMinus className="text-red-500 text-lg" /> : <FaPlus className="text-gray-600 text-lg" />}
                </button>

                {activeFAQ === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="px-6 pb-5 text-gray-600 leading-relaxed text-[16px]"
                  >
                    {item.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
