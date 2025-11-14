// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";

import "../css/Home.css";

/* ===== IMPORT SEPARATED SECTIONS ===== */
import CoreFeatures from "./sections/CoreFeatures";
import HowItWorks from "./sections/HowItWorks";
import ServicesPreview from "./sections/ServicesPreview";
import FutureBusiness from "./sections/FutureBusiness";
import Team from "./sections/Team";
import PortfolioShowcase from "./sections/PortfolioShowcase";
import SuccessStrategy from "./sections/SuccessStrategy";
import BusinessSolution from "./sections/BusinessSolution";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import Articles from "./sections/Articles";

/* ---------------- HERO slider data ---------------- */
const heroImages = [home1, home2, home3];

const Home = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    timerRef.current = setInterval(
      () => setCurrent((prev) => (prev + 1) % heroImages.length),
      3000
    );
    return () => clearInterval(timerRef.current);
  }, [prefersReducedMotion]);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-[100vh] pt-[140px] overflow-hidden">
        <motion.img
          key={current}
          src={heroImages[current]}
          alt="Hero Banner"
          initial={prefersReducedMotion ? false : { scale: 1.13 }}
          animate={prefersReducedMotion ? {} : { scale: 1 }}
          transition={{ duration: 2.3, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-black/65 z-0" />

        <div
          className="absolute top-0 right-0 z-0"
          style={{
            width: "65%",
            height: "65%",
            background: "rgba(255,107,107,0.35)",
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white font-extrabold leading-tight text-4xl sm:text-5xl lg:text-6xl"
          >
            DEDICATED TEAM
            <br />
            EXCEPTIONAL UNIQUE BUSINESS IDEA
          </motion.h1>

          <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[18px] border-l-transparent border-r-transparent border-t-red-500 mt-6" />

          <p className="text-white text-lg sm:text-xl mt-6 opacity-90">
            Professional | Creative | Dedicated
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/contact")}
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all"
          >
            Let’s Work Together
          </motion.button>
        </div>
      </section>

      {/* ===== ATTACHED ALL SECTIONS BELOW ===== */}
      <CoreFeatures />
      <HowItWorks />
      <ServicesPreview />
      <FutureBusiness />
      <Team />
      <PortfolioShowcase />
      <SuccessStrategy />
      <BusinessSolution />
      <Testimonials />
      <FAQ />
      <Articles />
    </>
  );
};

export default Home;
