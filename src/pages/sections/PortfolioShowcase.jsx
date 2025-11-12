import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChartBar, FaBullseye, FaUserTie, FaHandshake } from "react-icons/fa";

const Reveal = ({ delay = 0, children, className = "" }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
};

// ✅ Only image paths updated (now using your local public/portfolioimages folder)
const portfolioItems = [
  {
    title: "Product Market Analysis",
    icon: <FaChartBar className="text-4xl text-red-500" />,
    img: "/portfolioimages/portimg1.jpg",
  },
  {
    title: "Business Strategy Planning",
    icon: <FaBullseye className="text-4xl text-red-500" />,
    img: "/portfolioimages/portimg2.jpg",
  },
  {
    title: "Team Leadership Project",
    icon: <FaUserTie className="text-4xl text-red-500" />,
    img: "/portfolioimages/portimg3.jpg",
  },
  {
    title: "Client Relationship Growth",
    icon: <FaHandshake className="text-4xl text-red-500" />,
    img: "/portfolioimages/portimg4.jpg",
  },
];

const PortfolioShowcase = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#fff8f8] via-white to-[#fff8f8]">
      {/* Section Title */}
      <Reveal className="text-center mb-14">
        <p className="text-red-600 uppercase tracking-widest font-semibold">
          — Latest Portfolio —
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
          Case Studies Showcase
        </h2>
      </Reveal>

      {/* Portfolio Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {portfolioItems.map((item, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <div className="relative group rounded-2xl overflow-hidden cursor-pointer bg-white shadow-lg hover:shadow-2xl transition">
              <img
                src={item.img}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                alt={item.title}
              />

              {/* Hover Card */}
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="bg-white shadow-2xl px-7 py-6 rounded-xl text-left w-64">
                  <div className="mb-3 flex justify-start">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h3>

                  {/* Arrow Button → Goes to Portfolio Page */}
                  <Link to="/portfolio">
                    <div className="mt-6 w-11 h-11 bg-yellow-400 hover:bg-red-600 text-white rounded-full flex justify-center items-center text-xl shadow-md transition">
                      →
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default PortfolioShowcase;
