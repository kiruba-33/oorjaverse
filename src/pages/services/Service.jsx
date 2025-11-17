// src/pages/services/Service.jsx
import React, { useState } from "react";
import { motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Monitor,
  ShieldCheck,
  Tablet,
  Cloud,
  Code,
  Server,
  CheckCircle2,
  ArrowRight,
  Users,
  Github,
} from "lucide-react";

/*
  Service.jsx — ABOUT-STYLE Full Redesign (Option A)
  - Full page: Hero, Services Grid, Feature Strips, Accordion, Stats, Logos, CTA
  - Performance-minded: transform-gpu, viewport once, lazy images
  - Navigation: navigate to service routes on click
  - Keep content structure intact; replace strings with your exact original copy if you want literal preservation.
*/

/* ========== THEME ========== */
const THEME = {
  accent: "#ef4444",
  border: "rgba(0,0,0,0.08)",
};

/* ========== VARIANTS ========== */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};
const imageReveal = {
  hidden: { opacity: 0, scale: 0.995 },
  show: { opacity: 1, scale: 1 },
};

/* ========== Small UI Helpers ========== */
function Badge({ children }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
      style={{ backgroundColor: "#fff5f5", color: THEME.accent, border: `1px solid ${THEME.border}` }}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}
      style={{ border: `1px solid ${THEME.border}`, ...style }}
    >
      {children}
    </div>
  );
}

/* Lightweight 3D hover (soft springs) */
function HoverCard3D({ children, className = "" }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 90, damping: 12 });
  const sy = useSpring(ry, { stiffness: 90, damping: 12 });

  function onMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rx.set(((y - rect.height / 2) / rect.height) * -6);
    ry.set(((x - rect.width / 2) / rect.width) * 6);
  }
  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Marquee: lightweight CSS-only */
function Marquee({ children, speed = 28 }) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-8 whitespace-nowrap [animation:marquee_linear_infinite]" style={{ animationDuration: `${speed}s` }}>
        {children}
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%);} }
        .[animation\\:marquee_linear_infinite] { animation: marquee linear infinite; will-change: transform; }
      `}</style>
    </div>
  );
}

/* ========== PAGE ========== */
export default function Service() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  /* === IMPORTANT: Replace these with your exact original service content if you want literal text preservation.
     Right now these objects represent the services: title, icon, desc, route, longDescription (for accordion).
     If you have a service data file, simply import it and replace SERVICES below with your original data. === */

  const SERVICES = [
    {
      id: "website-development",
      title: "Website Development",
      icon: Monitor,
      desc: "Minimal, high-performance websites built for conversions.",
      route: "/services/website-development",
      long: "Full-stack front-end, responsive design, SEO optimizations and performance-first build."
    },
    {
      id: "it-services",
      title: "IT Services",
      icon: ShieldCheck,
      desc: "Managed IT, security and enterprise-grade support.",
      route: "/services/it-services",
      long: "Managed infrastructure, monitoring, backups, security best practices and SLAs."
    },
    {
      id: "app-development",
      title: "App Development",
      icon: Tablet,
      desc: "Scalable mobile and web applications.",
      route: "/services/app-development",
      long: "Native and cross-platform apps, progressive web apps, and high-performance client experiences."
    },
    {
      id: "cloud-server",
      title: "Cloud Solutions",
      icon: Cloud,
      desc: "Cloud architecture, serverless and scalable infra.",
      route: "/services/cloud-server",
      long: "Multi-region deployments, CDN, caching strategies, cost optimization and observability."
    },
    {
      id: "quality-testing",
      title: "Quality Testing",
      icon: Code,
      desc: "Automation, performance and security testing.",
      route: "/services/quality-testing",
      long: "End-to-end testing, CI gating, load testing and automated regression suites."
    },
    {
      id: "hosting",
      title: "Hosting",
      icon: Server,
      desc: "Managed hosting with fast CDN and support.",
      route: "/services/hosting",
      long: "High-availability hosting, backups, and expert operations support."
    },
  ];

  const FEATURES = [
    { icon: Users, title: "Dedicated Teams", copy: "Cross-functional teams aligned to your goals." },
    { icon: CheckCircle2, title: "Quality", copy: "Tested, reviewed and maintainable code." },
    { icon: Github, title: "Transparent Process", copy: "CI, PR reviews and documentation." },
  ];

  const STATS = [
    { value: "100+", label: "Projects" },
    { value: "95+", label: "Lighthouse" },
    { value: "24/7", label: "Support" },
  ];

  /* Accordion state */
  const [open, setOpen] = useState(null);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10 relative overflow-x-hidden">
      {/* ===== HERO (About-style) ===== */}
      <section className="relative pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            className="transform-gpu space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView={!prefersReduced ? "show" : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <Badge>Our Services</Badge>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Premium Design. Expert Engineering.
            </h1>

            <p className="text-black/70 max-w-xl">
              We deliver high-quality digital products that scale — from launch to enterprise.
              Explore our services below to find the right fit for your team.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold bg-red-600 text-white"
              >
                Start a Project
                <ArrowRight className="size-4" />
              </button>

              <button
                onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-3 border"
              >
                View Services
              </button>
            </div>
          </motion.div>

          <motion.div
            className="transform-gpu rounded-2xl overflow-hidden border shadow-sm"
            variants={imageReveal}
            initial="hidden"
            whileInView={!prefersReduced ? "show" : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <HoverCard3D>
              <img src="/about/hero.jpg" alt="Services hero" loading="lazy" className="w-full h-[420px] object-cover" />
            </HoverCard3D>
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES GRID (About-style cards) ===== */}
      <section id="services-grid" className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView={!prefersReduced ? "show" : undefined}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-10 transform-gpu"
          >
            Our Capabilities
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <motion.div
                key={s.id}
                className="rounded-2xl bg-white p-6 shadow-sm border hover:shadow-lg cursor-pointer transform-gpu transition"
                style={{ borderColor: THEME.border }}
                variants={fadeUp}
                initial="hidden"
                whileInView={!prefersReduced ? "show" : undefined}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                onClick={() => navigate(s.route)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(s.route)}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600">
                    <s.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="text-black/60 text-sm mt-1">{s.desc}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-black/60">Learn more</div>
                  <ArrowRight className="size-4 text-black/60" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURE STRIPS ===== */}
      <section className="py-12 bg-black/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                className="rounded-2xl bg-white p-6 shadow-sm transform-gpu"
                style={{ border: `1px solid ${THEME.border}` }}
                variants={fadeUp}
                initial="hidden"
                whileInView={!prefersReduced ? "show" : undefined}
                viewport={{ once: true }}
              >
                <div className="mb-3">
                  <f.icon className="size-6 text-red-600" />
                </div>
                <h4 className="font-semibold">{f.title}</h4>
                <p className="text-black/70 text-sm mt-2">{f.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACCORDION / DETAILS (one per service) ===== */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.h3 variants={fadeUp} initial="hidden" whileInView={!prefersReduced ? "show" : undefined} viewport={{ once: true }} className="text-2xl font-bold mb-6 transform-gpu">
            Detailed Service Breakdowns
          </motion.h3>

          <div className="space-y-4">
            {SERVICES.map((s, idx) => (
              <motion.div
                key={s.id}
                className="rounded-2xl border bg-white p-5 shadow-sm transform-gpu"
                style={{ borderColor: THEME.border }}
                variants={fadeUp}
                initial="hidden"
                whileInView={!prefersReduced ? "show" : undefined}
                viewport={{ once: true, amount: 0.12 }}
              >
                <button
                  onClick={() => setOpen(open === idx ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4"
                  aria-expanded={open === idx}
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-md bg-red-50 text-red-600"><s.icon className="size-5" /></div>
                    <div>
                      <div className="text-lg font-semibold">{s.title}</div>
                      <div className="text-sm text-black/60">{s.desc}</div>
                    </div>
                  </div>

                  <div className="text-sm text-black/60">{open === idx ? "−" : "+"}</div>
                </button>

                {open === idx && (
                  <div className="pt-4 text-black/70 leading-relaxed">
                    {/* long description — keep your original long content here */}
                    <p>{s.long}</p>

                    {/* Example: you can place more structured content as in your original file */}
                    <ul className="mt-3 list-disc pl-5 text-sm text-black/70">
                      <li>Deliverable 1</li>
                      <li>Deliverable 2</li>
                      <li>Deliverable 3</li>
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS / KPIS ===== */}
      <section className="py-12 bg-black/5">
        <div className="mx-auto max-w-4xl px-4 md:px-6 grid grid-cols-3 gap-6">
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              className="rounded-2xl bg-white p-6 text-center transform-gpu"
              style={{ border: `1px solid ${THEME.border}` }}
              variants={fadeUp}
              initial="hidden"
              whileInView={!prefersReduced ? "show" : undefined}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-sm text-black/60">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== LOGO MARQUEE (trusted companies) ===== */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Card>
            <Marquee>
              {["Google", "Meta", "Vercel", "AWS", "Stripe", "Shopify"].map((l) => (
                <div key={l} className="inline-flex items-center gap-4 px-8">
                  <div className="h-6 w-24 bg-black/5 rounded" />{/* placeholder logo block */}
                </div>
              ))}
            </Marquee>
          </Card>
        </div>
      </section>

      {/* ===== CONTACT CTA (About-style) ===== */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <motion.div
            className="rounded-2xl p-8 bg-black text-white transform-gpu"
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
                <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-semibold">
                  <ArrowRight className="size-4" /> Contact us
                </button>
                <a href="mailto:hello@oorjaverse.dev" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border">
                  <Github className="size-4" /> hello@oorjaverse.dev
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* bottom spacing */}
      <div className="h-24" />
    </div>
  );
}
