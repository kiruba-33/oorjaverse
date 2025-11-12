import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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

const SuccessStrategy = () => {
  return (
    // ✅ Removed 3D background effect — now clean and smooth
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6">

        <Reveal className="appointment-box">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Make Appointment</h2>
          <form className="space-y-6">
            <input type="text" placeholder="Full Name*" className="form-input" />
            <input type="email" placeholder="Email Address*" className="form-input" />
            <input type="text" placeholder="Subject*" className="form-input" />
            <textarea placeholder="What Your Need..." rows="4" className="form-input" />
            <button className="appointment-btn flex items-center justify-center gap-2">→ Make Appointment</button>
          </form>
        </Reveal>

        <Reveal>
          <p className="text-red-500 uppercase font-semibold">— Success Strategy —</p>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            BUSINESS REAL GROWTH
            <br />
            GOOD INTEGRITY
          </h2>

          <p className="text-gray-600 mb-10">
            Moving every have you land beast faces have behold one things signs fourth evening saying them there be.
          </p>

          <div className="mb-6">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>CONSULTING</span><span>(80%)</span>
            </div>
            <div className="progress-bg">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="progress-bar red"
              />
            </div>
          </div>

          <div className="mb-10">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>MARKETING</span><span>(90%)</span>
            </div>
            <div className="progress-bg">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "90%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="progress-bar yellow"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 py-12 text-center">
            <div className="flex flex-col items-center gap-5">
              <div className="glow-ring">
                <CircularProgressbar
                  value={85}
                  text={`${85}%`}
                  styles={buildStyles({
                    textColor: "#222",
                    pathColor: "#ff3b3b",
                    trailColor: "#ffd6d6",
                    textSize: "24px",
                    pathTransitionDuration: 1.2,
                  })}
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-wide">Client Satisfaction</h3>
            </div>

            <div className="flex flex-col items-center gap-5">
              <div className="glow-ring">
                <CircularProgressbar
                  value={80}
                  text={`${80}%`}
                  styles={buildStyles({
                    textColor: "#222",
                    pathColor: "#f4b400",
                    trailColor: "#ffeebc",
                    textSize: "24px",
                    pathTransitionDuration: 1.2,
                  })}
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-wide">Business Consultancy</h3>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default SuccessStrategy;
