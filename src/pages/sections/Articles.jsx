import React from "react";
import { useNavigate } from "react-router-dom";
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
    >
      {children}
    </motion.div>
  );
};

const Articles = () => {
  const navigate = useNavigate();

  const posts = [
    { img: "/src/assets/articles/article1.png", title: "Blessed created place beast give fill market beast day." },
    { img: "/src/assets/articles/article2.png", title: "Divided open created green fight open together seen." },
    { img: "/src/assets/articles/article3.png", title: "Gathered grass bearing brought land main pure waters." },
  ];

  return (
    <section className="py-24 bg-white">
      <Reveal className="text-center mb-14">
        <p className="text-red-500 uppercase tracking-widest font-semibold">Latest Articles</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Latest Company Articles</h2>
      </Reveal>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post, i) => (
          <Reveal key={i}>
            <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white border shadow-lg hover:shadow-[0_20px_60px_rgba(255,0,80,0.18)] hover:-translate-y-2 transition">
              <div className="relative h-[340px] overflow-hidden">
                <img src={post.img} alt="blog" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <button
                  onClick={() => navigate("/blog-details")}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="bg-white text-gray-900 px-7 py-3 rounded-full text-sm font-semibold shadow-lg transition group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-orange-500 group-hover:text-white group-hover:shadow-[0_10px_35px_rgba(255,0,80,0.35)] group-hover:scale-105">
                    Post Details
                  </span>
                </button>
              </div>

              <div className="px-5 py-4 border-b">
                <div className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-md text-center leading-tight text-sm w-fit">
                  22 <br /> OCT
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">Marketing, Business</p>
                <h3 className="text-lg font-bold text-gray-900 leading-snug transition-colors duration-300 group-hover:text-red-600">
                  {post.title}
                </h3>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Articles;
