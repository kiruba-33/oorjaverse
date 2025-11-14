import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import serviceImg from "../../assets/service.png";
import {
  HiOutlineDevicePhoneMobile,
  HiOutlineCodeBracketSquare,
  HiOutlineBeaker,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const services4 = [
  {
    icon: <HiOutlineDevicePhoneMobile className="text-2xl" />,
    title: "IT Services",
    desc: "Smart & scalable IT solutions.",
    slug: "it-services",
  },
  {
    icon: <HiOutlineCodeBracketSquare className="text-2xl" />,
    title: "App Development",
    desc: "iOS & Android mobile app builds.",
    slug: "app-development",
  },
  {
    icon: <HiOutlineBeaker className="text-2xl" />,
    title: "Quality Testing",
    desc: "Ensuring product stability & performance.",
    slug: "quality-testing",
  },
  {
    icon: <HiOutlineGlobeAlt className="text-2xl" />,
    title: "Website Development",
    desc: "Modern responsive website solutions.",
    slug: "website-development",
  },
];

const Reveal = ({ delay = 0, children, className = "" }) => {
  const motionPref = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={motionPref ? false : { opacity: 0, y: 16 }}
      whileInView={motionPref ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </motion.div>
  );
};

const hoverScale = { scale: 1.04 };

const ServicesPreview = () => {
  const navigate = useNavigate();
  const motionPref = useReducedMotion();

  

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto grid items-stretch gap-14 px-6 lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col">
          <div className="mb-10 flex items-start justify-between gap-6">
            <Reveal className="max-w-[680px]">
              <p className="mb-2 text-red-500 font-semibold uppercase tracking-widest">
                Popular Service
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05]">
                First Class Consulting <span className="block">Service Provider</span>
              </h2>
            </Reveal>

            <motion.button
              whileHover={motionPref ? {} : hoverScale}
              whileTap={{ scale: 0.98 }}
            onClick={() => {
  navigate("/services");
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 200);
}}

              className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-gray-300/70 px-5 py-3 text-[15px] font-semibold hover:border-red-500 hover:text-red-600 transition"
            >
              <span className="-translate-y-[1px]">→</span> All Services
            </motion.button>
          </div>

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services4.map((s, i) => (
              <motion.div
                key={s.slug}
                className="rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition"
                initial={motionPref ? false : { opacity: 0, y: 14 }}
                whileInView={motionPref ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
              >
                <div className="mb-5">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-yellow-400/90 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
                <button
                  onClick={() => navigate(`/services/${s.slug}`)}
                  className="inline-flex items-center gap-2 font-semibold text-gray-800 hover:text-red-600 transition"
                >
                  → Read More
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <Reveal className="relative w-full self-stretch rounded-3xl overflow-hidden">
          <img
            src={serviceImg}
            alt="Consulting"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Reveal>

      </div>
    </section>
  );
};

export default ServicesPreview;
