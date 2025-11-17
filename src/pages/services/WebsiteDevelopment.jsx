// src/pages/services/WebsiteDevelopment.jsx
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import {
  Rocket,
  Sparkles as SparklesIcon,
  Zap,
  ShieldCheck,
  MousePointerClick,
  MonitorSmartphone,
  Code,
  Paintbrush,
  GaugeCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Globe2,
  Cpu,
  Database,
  Cloud,
  Frame,
} from "lucide-react";

/* ================= THEME ================= */
const THEME = {
  red: "#ef4444",
  redDark: "#cc0000",
  yellow: "#fbbf24",
  neutralBorder: "rgba(0,0,0,0.12)",
};

/* ================= FIXED BADGE COMPONENT (IMPORTANT) ================= */
function Badge({ children }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
      style={{
        backgroundColor: "#fff5f5",
        color: "#ef4444",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </span>
  );
}

/* ================= REUSABLE UI ================= */

function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`rounded-2xl bg-white p-5 shadow-sm ${className}`}
      style={{ border: `1px solid ${THEME.neutralBorder}`, ...style }}
    >
      {children}
    </div>
  );
}

function ITButton({ children, variant = "solid", className = "", ...props }) {
  const base =
    variant === "outline"
      ? { className: `inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold ${className}` }
      : {
          className: `inline-flex items-center gap-2 rounded-lg px-5 py-3 font-bold text-white ${className}`,
          style: { backgroundColor: THEME.red },
        };
  return <button {...base} {...props}>{children}</button>;
}

function MagneticButton({ children, className = "", icon: Icon, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 18 });
  const springY = useSpring(y, { stiffness: 160, damping: 18 });

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect?.();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.22);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, willChange: "transform" }}
      className="inline-flex"
    >
      <button
        {...props}
        className={`group relative overflow-hidden inline-flex items-center gap-2 rounded-lg px-5 py-3 font-bold text-white ${className}`}
        style={{ backgroundColor: THEME.red }}
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
        <span className="relative flex items-center gap-2">
          {Icon && <Icon className="size-4" />} {children}
          <ArrowRight className="size-4 -mr-1 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </motion.div>
  );
}

function HoverCard3D({ children, className = "" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 90, damping: 12 });
  const sy = useSpring(ry, { stiffness: 90, damping: 12 });

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect?.();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    rx.set(((y - r.height / 2) / r.height) * -8);
    ry.set(((x - r.width / 2) / r.width) * 8);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{
        rotateX: sx,
        rotateY: sy,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`[transform:perspective(1000px)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SoftGlow({ className = "", color = "red" }) {
  const background = color === "red" ? "#fca5a5" : "#fde68a";
  return (
    <div
      aria-hidden
      style={{ background: background, filter: "blur(110px)", opacity: 0.28 }}
      className={`pointer-events-none absolute ${className}`}
    />
  );
}
/* ================= MARQUEE (lightweight, CSS-only, re-usable) ================= */
function Marquee({ children, speed = 30 }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-10 whitespace-nowrap [animation:marquee_linear_infinite]"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
        {children}
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .[animation\\:marquee_linear_infinite] { animation: marquee linear infinite; will-change: transform; }
      `}</style>
    </div>
  );
}


/* ================= MOTION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.995 },
  show: { opacity: 1, scale: 1 },
};

/* ================= MAIN PAGE ================= */
export default function WebsiteDevelopment() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.03, 0.18]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-white text-black selection:bg-black/10 relative overflow-hidden"
    >
      <SoftGlow className="-top-28 -left-28 w-[520px] h-[520px]" color="yellow" />
      <SoftGlow className="top-[420px] -right-28 w-[620px] h-[620px]" color="red" />

      <SiteNav />

      <main className="relative">
        <HeroSection bgOpacity={bgOpacity} />
        <TrustBar />
        <Showcase />
        <FeaturesGrid />
        <StickyProcess />
        <Packages />
        <TechStack />
        <Testimonials />
        <FAQ />
        <ContactCTA />
      </main>

      {/* <SiteFooter /> */}
    </div>
  );
}


/* ===== Site Nav ===== */
function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-6 inset-x-6 z-50">
      <div className="mx-auto max-w-7xl">
        <div
          className="flex items-center justify-between rounded-2xl border bg-white/80 px-4 py-3 shadow-sm"
          style={{ borderColor: THEME.neutralBorder }}
        >
          <a href="#home" className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-full"
              style={{ backgroundColor: THEME.red }}
            />
            <span className="text-lg font-semibold tracking-tight">
              Oorjaverse
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-black/70">
            {[
              ["Work", "#showcase"],
              ["Features", "#features"],
              ["Process", "#process"],
              ["Pricing", "#packages"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="hover:text-black transition"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:block">
              <MagneticButton icon={Zap}>Start a Project</MagneticButton>
            </a>

            <button
              className="md:hidden h-9 w-9 grid place-items-center rounded-xl border bg-white/80"
              onClick={() => setOpen((v) => !v)}
            >
              <ChevronRight
                className={`size-5 transition ${open ? "rotate-90" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="mx-auto max-w-7xl px-4 md:px-6 mt-3">
          <div
            className="rounded-2xl border bg-white p-4 shadow-sm"
            style={{ borderColor: THEME.neutralBorder }}
          >
            <div className="grid gap-3 text-black/80">
              {[
                ["Work", "#showcase"],
                ["Features", "#features"],
                ["Process", "#process"],
                ["Pricing", "#packages"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-black transition"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ================= HERO SECTION ================= */
function HeroSection({ bgOpacity }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <section id="home" ref={ref} className="relative isolate pt-28 md:pt-36 pb-16">
      <motion.div style={{ opacity: bgOpacity }} className="pointer-events-none absolute inset-0" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* LEFT TEXT */}
          <motion.div
            className="space-y-6 transform-gpu"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.45 }}
          >
            <div className="inline-flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "#fff2f2", color: THEME.red }}
              >
                Website Development
              </span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight">
              Minimal. Electric.{" "}
              <span className="underline decoration-red-600/30">High-Performance</span>{" "}
              Websites.
            </h1>

            <p className="text-black/70 max-w-xl">
              We craft lightning-fast, conversion-focused websites with clean
              lines, bold type and zero clutter.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton icon={Rocket}>Get a Live Demo</MagneticButton>
              <button className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold">
                View Work
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-black/60">
              <div className="flex items-center gap-2">
                <GaugeCircle className="size-4" /> 95+ Lighthouse
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4" /> Enterprise Security
              </div>
              <div className="flex items-center gap-2">
                <Zap className="size-4" /> <span>0.3s TTI</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <HoverCard3D>
              <motion.div
                style={{
                  y,
                  scale,
                  borderColor: THEME.neutralBorder,
                  willChange: "transform,opacity",
                }}
                className="relative rounded-[28px] overflow-hidden border bg-white shadow-md transform-gpu"
                variants={imageReveal}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/WebDevelopment/wd4.jpg"
                  loading="lazy"
                  alt="Hero"
                  className="h-[420px] w-full object-cover"
                />
              </motion.div>
            </HoverCard3D>

            <div className="absolute -bottom-6 left-6 right-6 mx-auto grid grid-cols-3 gap-3">
              {["React", "Next.js", "Tailwind"].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border bg-white px-4 py-3 text-center text-sm text-black/70"
                  style={{ borderColor: THEME.neutralBorder }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/6" />
    </section>
  );
}

/* ================= TRUST BAR ================= */
function TrustBar() {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className="rounded-2xl p-6 shadow-sm"
          style={{ border: `1px solid ${THEME.neutralBorder}`, background: "#fff" }}
        >
          <Marquee>
            {["Google", "Meta", "Figma", "AWS", "Vercel", "Stripe", "Shopify"].map((b) => (
              <span
                key={b}
                className="mx-8 inline-flex items-center gap-2 text-black/60"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: THEME.red }}
                />{" "}
                {b}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}


/* ================= PANEL COMPONENT ================= */
function Panel({ title, text, src, reverse = false }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`grid items-center gap-12 md:grid-cols-2 ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* IMAGE */}
          <HoverCard3D>
            <motion.div
              className="rounded-[28px] overflow-hidden border transform-gpu"
              style={{ borderColor: THEME.neutralBorder }}
              variants={imageReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
            >
              <img
                src={src}
                alt={title}
                loading="lazy"
                className="h-[420px] w-full object-cover"
              />
            </motion.div>
          </HoverCard3D>

          {/* TEXT */}
          <motion.div
            className="space-y-4 transform-gpu"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <Badge>{title}</Badge>
            <p className="text-black/70 leading-relaxed">{text}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= SHOWCASE ================= */
function Showcase() {
  return (
    <div id="showcase" className="py-24">
      <Panel
        title="Corporate Websites"
        text="Super-clean business websites with optimal conversion funnels and ultra-fast loading."
        src="/WebDevelopment/wd1.jpg"
      />
      <Panel
        title="E-Commerce Websites"
        text="Optimized product pages, high-speed checkout and extremely fluid navigation."
        src="/WebDevelopment/wd2.jpg"
        reverse
      />
      <Panel
        title="Portfolio Websites"
        text="Visually bold layouts that highlight your work with cinematic spacing and modern UX."
        src="/WebDevelopment/wd3.jpg"
      />
    </div>
  );
}

/* ================= FEATURES GRID ================= */
function FeaturesGrid() {
  const FEATURES = [
    {
      icon: Code,
      title: "Clean Code",
      desc: "We deliver scalable, maintainable, production-grade codebases.",
    },
    {
      icon: Paintbrush,
      title: "Custom Design",
      desc: "Every section is crafted with unique spacing, contrast and brand personality.",
    },
    {
      icon: MousePointerClick,
      title: "High Conversions",
      desc: "Optimized UX that boosts signups, sales, retention and engagement.",
    },
    {
      icon: MonitorSmartphone,
      title: "Mobile-Perfect",
      desc: "Pixel-perfect on every screen with fluid tap interactions.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Architecture",
      desc: "Enterprise-grade security, SSL, firewall protection, backups and more.",
    },
    {
      icon: Zap,
      title: "Ultra Fast",
      desc: "Loads in under 0.5 seconds with optimized network and caching rules.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-black/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="text-center mb-14 transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Features You'll Love</h2>
          <p className="text-black/60 max-w-xl mx-auto mt-3">
            Everything you need for a premium web experience.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              className="rounded-2xl border bg-white p-6 shadow-sm transform-gpu"
              style={{ borderColor: THEME.neutralBorder }}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <f.icon className="size-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= STICKY PROCESS ================= */
function StickyProcess() {
  const STEPS = [
    {
      icon: Frame,
      title: "UI/UX Research",
      desc: "We analyze your brand, goals and competitors to craft a premium visual language.",
    },
    {
      icon: Paintbrush,
      title: "Design Phase",
      desc: "Modern layouts, modular components and future-proof visual structure.",
    },
    {
      icon: Code,
      title: "Development",
      desc: "We convert your design into high-performance front-end & backend code.",
    },
    {
      icon: Globe2,
      title: "Launch & Support",
      desc: "24/7 support, bug fixes, performance tuning and continuous improvements.",
    },
  ];

  return (
    <section id="process" className="py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="text-center mb-14 transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Our Workflow</h2>
          <p className="text-black/60 max-w-xl mx-auto mt-3">
            A seamless journey from concept to launch.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2">
          {STEPS.map((s) => (
            <motion.div
              key={s.title}
              className="rounded-3xl border bg-white p-8 shadow-sm flex gap-6 transform-gpu"
              style={{ borderColor: THEME.neutralBorder }}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45 }}
            >
              <s.icon className="size-10 text-red-600" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PACKAGES (PRICING) ================= */
function Packages() {
  const plans = [
    {
      name: "Starter",
      price: "₹14,999",
      features: [
        "3-Page Website",
        "Mobile Responsive",
        "Basic SEO",
        "1 Revision",
        "Hosting Support",
      ],
    },
    {
      name: "Professional",
      price: "₹34,999",
      features: [
        "5-7 Pages",
        "Custom UI/UX",
        "Advanced SEO",
        "Admin Panel",
        "Free Hosting (1 Year)",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "₹74,999",
      features: [
        "Full Website System",
        "Backend + API",
        "Security Layer",
        "Payment Gateway",
        "Unlimited Revisions",
      ],
    },
  ];

  return (
    <section id="packages" className="py-28 bg-black/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="text-center mb-14 transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Pricing Plans</h2>
          <p className="text-black/60 max-w-xl mx-auto mt-3">
            Transparent, flexible and built for long-term success.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((p) => (
            <motion.div
              key={p.name}
              className={`rounded-3xl border p-8 shadow-sm transform-gpu ${
                p.highlight ? "bg-white scale-[1.02] shadow-md" : "bg-white"
              }`}
              style={{ borderColor: THEME.neutralBorder }}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <p className="text-3xl font-extrabold text-red-600 mb-6">
                {p.price}
              </p>

              <div className="space-y-3 mb-6">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-black/70">
                    <CheckCircle2 className="size-4 text-red-600" /> {f}
                  </div>
                ))}
              </div>

              <ITButton className="w-full justify-center" variant="solid">
                Choose Plan
              </ITButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= TECH STACK ================= */
function TechStack() {
  const STACK = [
    { icon: Code, label: "React" },
    { icon: Code, label: "Next.js" },
    { icon: Database, label: "MongoDB" },
    { icon: Cloud, label: "AWS" },
    { icon: Frame, label: "Figma" },
    { icon: MonitorSmartphone, label: "TailwindCSS" },
  ];

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="text-center mb-14 transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Technology We Use</h2>
          <p className="text-black/60 max-w-xl mx-auto mt-3">
            Modern tools for modern brands.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {STACK.map((s) => (
            <motion.div
              key={s.label}
              className="rounded-3xl border bg-white p-6 shadow-sm flex items-center gap-4 transform-gpu"
              style={{ borderColor: THEME.neutralBorder }}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <s.icon className="size-10 text-red-600" />
              <span className="text-lg font-semibold">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= TESTIMONIALS ================= */
function Testimonials() {
  const QUOTES = [
    {
      name: "Anil Kumar",
      role: "CEO, BrightTech",
      text: "They built our entire website ecosystem 10× faster than traditional agencies.",
      img: "/WebDevelopment/wd1.jpg",
    },
    {
      name: "Priya Sharma",
      role: "Founder, StyleZone",
      text: "Stunning UI and blazing speed. We saw conversions jump by 35% in the first week.",
      img: "/WebDevelopment/wd2.jpg",
    },
    {
      name: "Rohit Verma",
      role: "CTO, NexaSoft",
      text: "Clean code, perfect execution and premium communication. Highly recommended!",
      img: "/WebDevelopment/wd3.jpg",
    },
  ];

  return (
    <section className="py-28 bg-black/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="text-center mb-14 transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Testimonials</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {QUOTES.map((q) => (
            <motion.div
              key={q.name}
              className="rounded-3xl border bg-white p-6 shadow-sm transform-gpu"
              style={{ borderColor: THEME.neutralBorder }}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <img
                src={q.img}
                loading="lazy"
                className="h-32 w-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center">{q.name}</h3>
              <p className="text-black/60 text-sm text-center">{q.role}</p>
              <p className="text-black/70 text-sm mt-4 text-center leading-relaxed">
                “{q.text}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= FAQ ================= */
function FAQ() {
  const questions = [
    {
      q: "How long does a website take?",
      a: "Most websites take 10–15 days depending on complexity.",
    },
    {
      q: "Is hosting included?",
      a: "Yes, we offer hosting support for all plans.",
    },
    {
      q: "Do you provide redesign services?",
      a: "Absolutely. We modernize outdated websites with fresh UI and faster performance.",
    },
    {
      q: "Will my website be secure?",
      a: "Yes — SSL, firewall and data encryption included.",
    },
  ];

  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          className="text-center mb-14 transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-6">
          {questions.map((item, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl border bg-white p-6 shadow-sm transform-gpu"
              style={{ borderColor: THEME.neutralBorder }}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h3 className="font-semibold text-lg">{item.q}</h3>
              <p className="text-black/60 mt-2">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT CTA ================= */
function ContactCTA() {
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6 text-center">
        <motion.div
          className="space-y-6 transform-gpu"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Start Your Project</h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Ready to build something powerful, fast and beautifully designed?
          </p>
          <MagneticButton icon={Mail}>Contact Us</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
// function SiteFooter() {
//   return (
//     <footer className="py-16 bg-black text-white">
//       <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-8 md:grid-cols-3">
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Oorjaverse</h3>
//           <p className="text-white/70 text-sm">
//             High-performance websites with cutting-edge UI.
//           </p>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
//           <ul className="space-y-2 text-white/70 text-sm">
//             <li><a href="#home">Home</a></li>
//             <li><a href="#features">Features</a></li>
//             <li><a href="#process">Process</a></li>
//             <li><a href="#packages">Pricing</a></li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3">Connect</h3>
//           <div className="flex gap-4 text-white/70">
//             <Github className="size-5" />
//             <Linkedin className="size-5" />
//             <Instagram className="size-5" />
//           </div>
//         </div>
//       </div>

//       <p className="text-center text-white/50 text-sm mt-10">
//         © {new Date().getFullYear()} Oorjaverse. All rights reserved.
//       </p>
//     </footer>
//   );
// }

