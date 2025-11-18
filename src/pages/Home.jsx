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
import { Helmet } from "react-helmet-async";


/* ---------------- HERO slider data ---------------- */
const heroImages = [home1, home2, home3];

/* ---------- Framer Motion Variants (FAST GPU) ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastTime = performance.now();

    function loop(now) {
      if (now - lastTime >= 3000) {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        lastTime = now;
      }
      timerRef.current = requestAnimationFrame(loop);
    }

    timerRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(timerRef.current);
  }, [prefersReducedMotion]);

  return (
    <>
    <Helmet>
  <title>OorjaVerse – Empowering Your Potential</title>
  <meta name="description" content="We provide digital innovation, website development and scalable IT solutions for modern businesses." />
  <meta name="keywords" content="IT services, website development, app development, digital agency, Oorjaverse" />
  <meta property="og:title" content="OorjaVerse – Premium IT Services" />
  <meta property="og:description" content="Empowering businesses with high-quality digital solutions and expert engineering." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://your-domain.com" />
  <meta property="og:image" content="https://your-domain.com/logo.png" />
</Helmet>

      {/* ========== HERO SECTION ========== */}
      <section className="relative w-full h-[100vh] pt-[140px] overflow-hidden select-none">
        <motion.img
          key={current}
          src={heroImages[current]}
          alt="Hero Banner"
          loading="lazy"
          initial={prefersReducedMotion ? false : { scale: 1.13 }}
          animate={prefersReducedMotion ? {} : { scale: 1 }}
          transition={{ duration: 2.0, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover z-0 transform-gpu will-change-transform"
        />
{/* DARK SHADE OVER HERO IMAGES */}
<div
  className="absolute inset-0 z-[1] pointer-events-none"
  style={{
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.55), rgba(0,0,0,0.85))"
  }}
></div>


        <div
          className="absolute top-0 right-0 z-0 pointer-events-none"
          style={{
            width: "65%",
            height: "65%",
            background: "rgba(255,107,107,0.35)",
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            willChange: "transform",
          }}
        />

        {/* ---- HERO CONTENT ---- */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6 }}
            className="text-white font-extrabold leading-tight text-4xl sm:text-5xl lg:text-6xl transform-gpu"
          >
            DEDICATED TEAM
            <br />
            EXCEPTIONAL UNIQUE BUSINESS IDEA
          </motion.h1>

          <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[18px] border-l-transparent border-r-transparent border-t-red-500 mt-6" />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white text-lg sm:text-xl mt-6 opacity-90 transform-gpu"
          >
            Professional | Creative | Dedicated
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/contact")}
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all transform-gpu"
          >
            Let’s Work Together
          </motion.button>
        </div>
      </section>

      {/* ========== All Sections ========== */}
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
