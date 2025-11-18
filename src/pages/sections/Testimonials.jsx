import React, { useMemo, useRef, useState, useEffect, useCallback} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import client1 from "../../assets/testimonials/client1.png";
import client2 from "../../assets/testimonials/client2.png";
import client3 from "../../assets/testimonials/client3.png";
import client4 from "../../assets/testimonials/client4.png";
import client5 from "../../assets/testimonials/client5.png";
import client6 from "../../assets/testimonials/client6.png";

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

const testimonialsAll = [
  { img: client1, name: "Edward Monroe", role: "Senior Designer" },
  { img: client2, name: "Michael Agenla", role: "Project Manager" },
  { img: client3, name: "Brenda Gregory", role: "CEO of Apple" },
  { img: client4, name: "Daniel Carter", role: "Business Consultant" },
  { img: client5, name: "Sandra Lee", role: "Marketing Lead" },
  { img: client6, name: "Jonathan Smith", role: "UI/UX Researcher" },
];

const Testimonials = () => {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const tLen = testimonialsAll.length;
  const maxStart = Math.max(0, tLen - 3);
  const prevSlide = () => setIndex((p) => (p === 0 ? maxStart : p - 1));
 const nextSlide = useCallback(() => {
  setIndex((p) => (p === maxStart ? 0 : p + 1));
}, [maxStart]); // 👉 only depends on maxStart


  const tAuto = useRef(null);
  
useEffect(() => {
  if (prefersReducedMotion) return;
  tAuto.current = setInterval(nextSlide, 3500);
  return () => clearInterval(tAuto.current);
}, [prefersReducedMotion, maxStart, nextSlide]); // ✅ FIXED


  const visibleTestimonials = useMemo(() => {
    const a = testimonialsAll[(index + 0) % tLen];
    const b = testimonialsAll[(index + 1) % tLen];
    const c = testimonialsAll[(index + 2) % tLen];
    return [a, b, c];
  }, [index, tLen]);

  return (
    <section className="py-24 bg-[#faf8f6]">
      <Reveal className="text-center mb-16">
        <p className="text-red-500 uppercase tracking-widest font-semibold">
          — Our Testimonials —
        </p>
        <h2 className="text-5xl font-extrabold text-gray-900">
          Client Positive Feedback
        </h2>
      </Reveal>

      <div className="max-w-7xl mx-auto flex items-center gap-4 sm:gap-6 px-4 sm:px-6">
        <button onClick={prevSlide} className="text-3xl text-gray-600 hover:text-red-500 transition" aria-label="Previous testimonials">
          <FaChevronLeft />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 flex-1">
          {visibleTestimonials.map((client, i) => (
            <motion.div
              key={`${client.name}-${i}-${index}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white px-8 sm:px-10 py-12 sm:py-14 shadow-lg rounded-2xl text-center border border-gray-200 hover:shadow-xl transition"
            >
              <div className="mx-auto relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-[#f5e6c8] rounded-full scale-[1.8] -z-10" />
                <img src={client.img} alt={client.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
              </div>
              <div className="text-red-500 text-xl mb-3">★★★★★</div>
              <h3 className="text-xl font-bold text-gray-900">{client.name}</h3>
              <p className="text-gray-500 mb-4">{client.role}</p>
              <p className="text-gray-600 leading-relaxed">
                Divide carefully fruitsome sixth form beginning replenis together
                midst lesser to airs brought forth him seas void can be aware image
                female best project.
              </p>
            </motion.div>
          ))}
        </div>

        <button onClick={nextSlide} className="text-3xl text-gray-600 hover:text-red-500 transition" aria-label="Next testimonials">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
