// src/pages/About.jsx
import React, { useRef, useState, memo } from "react";
import { motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { scrollReveal } from "../animations/scrollReveal";
import { Helmet } from "react-helmet-async";

import {
  Users,
  CheckCircle2,
  Globe2,
  Heart,
  Cpu,
  Award,
  Linkedin,
  Github,
  Mail,
  Code,      // ← ADD THIS
  Cloud      // ← ALSO ADD THIS (Approach uses Cloud)
} from "lucide-react";


/*
  Optimized About.jsx
  - Same visual structure & copy expected in your project
  - Performance-focused Framer Motion usage:
    * transform-gpu
    * variants + viewport once
    * lazy images
    * reduced spring stiffness for hover
    * respects prefers-reduced-motion
  - Minimal local helper components included (Badge, Card, HoverCard3D)
*/

/* ----- THEME TOKENS ----- */
const THEME = {
  accent: "#ef4444",
  neutralBorder: "rgba(0,0,0,0.08)"
};

/* ----- Small helpers ----- */
function Badge({ children }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
      style={{ backgroundColor: "#fff5f5", color: THEME.accent, border: `1px solid ${THEME.neutralBorder}` }}
    >
      {children}
    </span>
  );
}

const Card = memo(function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}
      style={{ border: `1px solid ${THEME.neutralBorder}`, ...style }}
    >
      {children}
    </div>
  );
});

/* Lightweight 3D hover — softer springs to reduce CPU */
function HoverCard3D({ children, className = "" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 90, damping: 12 });
  const springRy = useSpring(ry, { stiffness: 90, damping: 12 });

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect?.();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    rx.set(((y - r.height / 2) / r.height) * -6);
    ry.set(((x - r.width / 2) / r.width) * 6);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: springRx, rotateY: springRy, transformStyle: "preserve-3d", willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ----- Motion variants (re-used everywhere) ----- */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.995 },
  show: { opacity: 1, scale: 1 }
};

/* Respect reduced motion user preference */
function useMotionPrefs() {
  const prefersReduced = useReducedMotion();
  return { prefersReduced };
}

/* ========== About Page ========== */
export default function About() {
  const { prefersReduced } = useMotionPrefs();

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10">
      <Helmet>
  <title>OorjaVerse – About Us | Our Story & Mission</title>
  <meta 
    name="description" 
    content="Learn about OorjaVerse — our mission, our vision, and our dedication to delivering high-quality IT solutions and digital innovation."
  />
  <meta 
    name="keywords" 
    content="About OorjaVerse, IT company vision, digital agency, technology team, OorjaVerse mission"
  />

  {/* Social & Sharing Info */}
  <meta property="og:title" content="OorjaVerse – Who We Are" />
  <meta 
    property="og:description" 
    content="We are a passionate team building innovative digital solutions to empower businesses globally."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://your-domain.com/about" />
  <meta property="og:image" content="https://your-domain.com/logo.png" />

  {/* SEO Indexing */}
  <meta name="robots" content="index, follow" />
</Helmet>

      <AboutHero prefersReduced={prefersReduced} />
      <CoreValues prefersReduced={prefersReduced} />
      <TeamSection prefersReduced={prefersReduced} />
      <StatsBar prefersReduced={prefersReduced} />
      <Approach prefersReduced={prefersReduced} />
      <CTAContact prefersReduced={prefersReduced} />
    </div>
  );
}

/* ====== HERO ====== */
function AboutHero({ prefersReduced }) {
  return (
    <section className="relative pt-28 pb-16 mt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          className="transform-gpu space-y-6"
          variants={fadeUp}
          initial="hidden"
          whileInView={!prefersReduced ? "show" : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <Badge>About</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold">We design and build modern digital products</h1>
          <p className="text-black/70 max-w-xl">
            We’re a compact team of designers, engineers and strategists who ship product-quality websites and applications with a focus on speed, accessibility and measurable outcomes.
          </p>

          <div className="flex items-center gap-3">
            <a className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold bg-black text-white" href="#contact">
              <Mail className="size-4" /> Contact us
            </a>
            <a className="inline-flex items-center gap-2 rounded-lg px-4 py-2 border" href="#work">
              View work
            </a>
          </div>
        </motion.div>

        <motion.div
          className="transform-gpu"
          variants={imageReveal}
          initial="hidden"
          whileInView={!prefersReduced ? "show" : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <HoverCard3D className="rounded-[20px] overflow-hidden border" style={{ borderColor: THEME.neutralBorder }}>
            <img src="/about/hero.jpg" alt="Team at work" className="w-full h-[360px] object-cover" loading="lazy" />
          </HoverCard3D>
        </motion.div>
      </div>
    </section>
  );
}

/* ====== CORE VALUES / WHY US ====== */
function CoreValues({ prefersReduced }) {
  const values = [
    { icon: Users, title: "Customer-first", desc: "We prioritize measurable outcomes and user experience." },
    { icon: CheckCircle2, title: "Quality", desc: "Production-grade engineering and design discipline." },
    { icon: Globe2, title: "Global", desc: "Remote-first team with distributed expertise." },
    { icon: Award, title: "Trust", desc: "We deliver on-time with transparent processes." }
  ];

  return (
    <section className="py-16 bg-black/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          className="text-center mb-10 transform-gpu"
         variants={scrollReveal}
          initial="hidden"
          whileInView={!prefersReduced ? "show" : undefined}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">Why teams choose us</h2>
          <p className="text-black/70 max-w-2xl mx-auto mt-3">We combine design thinking with engineering rigor to ship fast and maintainable products.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <motion.div
              key={v.title}
              className="rounded-2xl bg-white p-6 shadow-sm transform-gpu"
              style={{ border: `1px solid ${THEME.neutralBorder}` }}
              variants={fadeUp}
              initial="hidden"
              whileInView={!prefersReduced ? "show" : undefined}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-3">
                <v.icon className="size-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-lg">{v.title}</h3>
              <p className="text-black/70 text-sm mt-2">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== TEAM SECTION (simple cards) ====== */
function TeamSection({ prefersReduced }) {
  const members = [
    { name: "Asha", role: "Founder", img: "/team/asha.jpg" },
    { name: "Karan", role: "Lead Engineer", img: "/team/karan.jpg" },
    { name: "Maya", role: "Product Designer", img: "/team/maya.jpg" },
    { name: "Ravi", role: "DevOps", img: "/team/ravi.jpg" }
  ];

  return (
    <section id="team" className="py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          className="mb-10 text-center transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView={!prefersReduced ? "show" : undefined}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">Core Team</h2>
          <p className="text-black/70 max-w-2xl mx-auto mt-3">Small, focused teams — big outcomes.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {members.map((m) => (
            <motion.div
              key={m.name}
              className="rounded-2xl overflow-hidden transform-gpu"
              variants={fadeUp}
              initial="hidden"
              whileInView={!prefersReduced ? "show" : undefined}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45 }}
            >
              <Card>
                <div className="overflow-hidden rounded-lg">
                  <img src={m.img} alt={m.name} className="w-full h-40 object-cover" loading="lazy" />
                </div>
                <div className="mt-4">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-black/60">{m.role}</div>
                  <div className="mt-3 flex gap-3">
                    <a href="#" aria-label="github" className="text-black/60"><Github className="size-4" /></a>
                    <a href="#" aria-label="linkedin" className="text-black/60"><Linkedin className="size-4" /></a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== STATS BAR ====== */
function StatsBar({ prefersReduced }) {
  const stats = [
    { v: "100+", label: "Projects" },
    { v: "95+", label: "Lighthouse" },
    { v: "24/7", label: "Support" }
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="rounded-2xl p-6 text-center bg-white transform-gpu"
              style={{ border: `1px solid ${THEME.neutralBorder}` }}
              variants={fadeUp}
              initial="hidden"
              whileInView={!prefersReduced ? "show" : undefined}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-extrabold">{s.v}</div>
              <div className="text-sm text-black/60">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== APPROACH / PROCESS ====== */
function Approach({ prefersReduced }) {
  const steps = [
    { icon: Cpu, title: "Plan", copy: "Strategy & architecture" },
    { icon: Code, title: "Build", copy: "Development & testing" },
    { icon: Cloud, title: "Ship", copy: "Deploy & monitor" }
  ];

  return (
    <section className="py-16 bg-black/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          className="mb-10 text-center transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView={!prefersReduced ? "show" : undefined}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">How we work</h2>
          <p className="text-black/70 max-w-2xl mx-auto mt-3">Practical processes that reduce time to market.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <motion.div
              key={s.title}
              className="rounded-2xl bg-white p-6 shadow-sm transform-gpu"
              style={{ border: `1px solid ${THEME.neutralBorder}` }}
              variants={fadeUp}
              initial="hidden"
              whileInView={!prefersReduced ? "show" : undefined}
              viewport={{ once: true, amount: 0.2 }}
            >
              <s.icon className="size-6 text-red-600" />
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="text-black/70 text-sm mt-2">{s.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== CTA CONTACT ====== */
function CTAContact({ prefersReduced }) {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          className="rounded-3xl p-8 bg-black text-white transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView={!prefersReduced ? "show" : undefined}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold">Start a conversation</h3>
              <p className="mt-2 text-white/80">Tell us about your project and timeline.</p>
            </div>
            <div className="flex items-center gap-4 justify-end">
              <a href="mailto:hello@oorjaverse.dev" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black">
                <Mail className="size-4" /> hello@oorjaverse.dev
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border">
                <Github className="size-4" /> GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
