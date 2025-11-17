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

/*
  Website Development — IT Services Visual Refresh
  - Keeps all original content/text/structure intact
  - Applies IT Services color tokens, soft glows, rounded containers, and stronger contrast
  - This file replaces the original WebsiteDevelopment.jsx (per your request)
*/

/* ================= THEME TOKENS ================= */
const THEME = {
  red: "#ef4444",
  redDark: "#cc0000",
  yellow: "#fbbf24",
  neutralBorder: "rgba(0,0,0,0.12)",
};

/* ================= Reusable UI ================= */

// Simple card wrapper (uses style for border color)
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
      : { className: `inline-flex items-center gap-2 rounded-lg px-5 py-3 font-bold text-white ${className}`, style: { backgroundColor: THEME.red } };
  // merge props carefully
  return <button {...base} {...props}>{children}</button>;
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${className}`}
      style={{ backgroundColor: THEME.yellow, color: "#000" }}
    >
      {children}
    </span>
  );
}

/* Magnetic and 3D Hover helpers (kept from original) */

function MagneticButton({ children, className = "", icon: Icon, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect?.();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
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
      style={{ x: springX, y: springY }}
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
          <ArrowRight className="size-4 -mr-1 translate-x-0 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </motion.div>
  );
}

function HoverCard3D({ children, className = "" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 12 });
  const sy = useSpring(ry, { stiffness: 120, damping: 12 });
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
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
      className={`[transform:perspective(1000px)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Marquee({ children, speed = 30 }) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-10 whitespace-nowrap [animation:marquee_linear_infinite]" style={{ animationDuration: `${speed}s` }}>
        {children}
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .[animation\\:marquee_linear_infinite] { animation: marquee linear infinite; }
      `}</style>
    </div>
  );
}

/* Soft glow backgrounds (positioned via className) */
function SoftGlow({ className = "", color = "red" }) {
  const background = color === "red" ? "#fca5a5" : "#fde68a"; // light red / light yellow
  return <div aria-hidden style={{ background: background, filter: "blur(110px)", opacity: 0.28 }} className={`pointer-events-none absolute ${className}`} />;
}

/* ================== Page Components ================== */

export default function WebsiteDevelopment() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.03, 0.18]);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-black selection:bg-black/10 relative overflow-hidden">
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

      <SiteFooter />
    </div>
  );
}

/* ===== Site Nav ===== */
function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-6 inset-x-6 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-2xl border bg-white/80 px-4 py-3 shadow-sm" style={{ borderColor: THEME.neutralBorder }}>
          <a href="#home" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full" style={{ backgroundColor: THEME.red }} />
            <span className="text-lg font-semibold tracking-tight">Oorjaverse</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-black/70">
            {[
              ["Work", "#showcase"],
              ["Features", "#features"],
              ["Process", "#process"],
              ["Pricing", "#packages"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="hover:text-black transition">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:block">
              <MagneticButton icon={Zap}>Start a Project</MagneticButton>
            </a>
            <button className="md:hidden h-9 w-9 grid place-items-center rounded-xl border bg-white/80" onClick={() => setOpen((v) => !v)}>
              <ChevronRight className={`size-5 transition ${open ? "rotate-90" : "rotate-0"}`} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="mx-auto max-w-7xl px-4 md:px-6 mt-3">
          <div className="rounded-2xl border bg-white p-4 shadow-sm" style={{ borderColor: THEME.neutralBorder }}>
            <div className="grid gap-3 text-black/80">
              <a href="#showcase" className="hover:text-black">
                Work
              </a>
              <a href="#features" className="hover:text-black">
                Features
              </a>
              <a href="#process" className="hover:text-black">
                Process
              </a>
              <a href="#packages" className="hover:text-black">
                Pricing
              </a>
              <a href="#contact" className="hover:text-black">
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ===== Hero ===== */
function HeroSection({ bgOpacity }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <section id="home" ref={ref} className="relative isolate pt-28 md:pt-36 pb-16">
      <motion.div style={{ opacity: bgOpacity }} className="pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "#fff2f2", color: THEME.red }}>
                Website Development
              </span>
            </div>

            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight">
              Minimal. Electric. <span className="underline decoration-red-600/30">High-Performance</span> Websites.
            </h1>

            <p className="text-black/70 max-w-xl">
              We craft lightning-fast, conversion-focused websites with clean lines, bold type and zero clutter.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton icon={Rocket}>Get a Live Demo</MagneticButton>
              <button className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold">View Work</button>
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

          <div className="relative">
            <HoverCard3D>
              <motion.div style={{ y, scale, borderColor: THEME.neutralBorder }} className="relative rounded-[28px] overflow-hidden border bg-white shadow-md">
                <img src="/WebDevelopment/wd4.jpg" alt="Hero visual – futuristic desk" className="h-[420px] w-full object-cover" />
              </motion.div>
            </HoverCard3D>

            <div className="absolute -bottom-6 left-6 right-6 mx-auto grid grid-cols-3 gap-3">
              {["React", "Next.js", "Tailwind"].map((t) => (
                <div key={t} className="rounded-2xl border bg-white px-4 py-3 text-center text-sm text-black/70" style={{ borderColor: THEME.neutralBorder }}>
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

/* ===== Trust Bar ===== */
function TrustBar() {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${THEME.neutralBorder}`, background: "#fff" }}>
          <Marquee>
            {["Google", "Meta", "Figma", "AWS", "Vercel", "Stripe", "Shopify"].map((b) => (
              <span key={b} className="mx-8 inline-flex items-center gap-2 text-black/60">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: THEME.red }} /> {b}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* ===== Showcase (Panels) ===== */
function Showcase() {
  const panels = [
    { title: "E-commerce that accelerates", copy: "Optimized cart flows, blazing image CDN, real-time inventory.", img: "/WebDevelopment/wd1.jpg", tag: "Shopify / Next.js" },
    { title: "SaaS dashboards that feel native", copy: "Micro-interactions, optimistic UI, accessible components.", img: "/WebDevelopment/wd2.jpg", tag: "React / Tailwind" },
    { title: "Marketing sites that convert", copy: "SEO-perfect, CLS-stable, story-driven sections.", img: "/WebDevelopment/wd3.jpg", tag: "Next 15 / Edge" },
  ];
  return (
    <section id="showcase" className="space-y-6 pb-8 md:pb-10">
      {panels.map((p, i) => (
        <Panel key={i} {...p} flipped={i % 2 === 1} />
      ))}
    </section>
  );
}
function Panel({ title, copy, img, tag, flipped }) {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className={`grid items-center gap-8 md:grid-cols-2 ${flipped ? "md:[&>*:first-child]:order-2" : ""}`}>
          <motion.div>
            <div className="relative overflow-hidden rounded-3xl border bg-white shadow-sm" style={{ borderColor: THEME.neutralBorder }}>
              <img src={img} alt={title} className="h-[420px] w-full object-cover" />
            </div>
          </motion.div>

          <motion.div className="space-y-5">
            <Badge>{tag}</Badge>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h3>
            <p className="text-black/70 max-w-prose">{copy}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["SSR", "A/B", "i18n", "Analytics"].map((chip) => (
                <span key={chip} className="rounded-full border px-3 py-1 text-xs text-black/70" style={{ borderColor: THEME.neutralBorder }}>
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ===== Features Grid ===== */
function FeaturesGrid() {
  const features = [
    { icon: Zap, title: "Ultra-fast", copy: "Edge rendering, image optimization, code-split routes." },
    { icon: ShieldCheck, title: "Secure", copy: "Best-practice headers, OAuth, managed secrets." },
    { icon: MonitorSmartphone, title: "Responsive", copy: "Fluid typography, adaptive media, touch targets." },
    { icon: Paintbrush, title: "Brand-first", copy: "Type scales, color systems, grid precision." },
    { icon: Database, title: "Data-ready", copy: "Postgres, Prisma, Drizzle, cache layers." },
    { icon: Cloud, title: "Cloud native", copy: "Serverless, queues, background jobs, logs." },
  ];
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 md:mb-14 grid gap-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold">Everything you need. Nothing you don't.</h2>
          <p className="text-black/70 max-w-2xl mx-auto">A modern stack and battle-tested patterns so your site stays fast, secure, and stunning under any traffic.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <HoverCard3D key={f.title}>
              <Card>
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ backgroundColor: "#fff5f5", color: THEME.red }}>
                    <f.icon className="size-5" />
                  </div>
                  <div className="text-lg font-semibold">{f.title}</div>
                </div>
                <div>
                  <p className="text-black/70 leading-relaxed">{f.copy}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-black/60">
                    <CheckCircle2 className="size-4" /> Production ready
                  </div>
                </div>
              </Card>
            </HoverCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Process (sticky left) ===== */
function StickyProcess() {
  const steps = [
    { title: "Discover", copy: "We align on goals, audience, KPIs, and brand tone.", icon: MousePointerClick },
    { title: "Design", copy: "Wireframes → high-fidelity mockups with motion in mind.", icon: Paintbrush },
    { title: "Develop", copy: "Accessible, performant React with best-in-class DX.", icon: Code },
    { title: "Deploy", copy: "CI/CD, observability, and post-launch iteration.", icon: Cloud },
  ];
  return (
    <section id="process" className="relative py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="sticky top-24 self-start">
            <h2 className="text-3xl md:text-5xl font-extrabold">A seamless process.</h2>
            <p className="mt-4 text-black/70 max-w-md">Transparent steps with real artifacts at every stage. You're always in the loop.</p>

            <div className="mt-6 grid gap-3">
              {steps.map((s) => (
                <div key={s.title} className="flex items-center gap-3 text-black/70">
                  <s.icon className="size-5" /> <span className="text-red-600">{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div key={s.title} className="rounded-3xl p-6 shadow-sm" style={{ border: `1px solid ${THEME.neutralBorder}`, background: "#fff" }}>
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ backgroundColor: "#fff5f5", color: THEME.red }}>
                    <s.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {i + 1}. {s.title}
                    </h3>
                    <p className="mt-1 text-black/70">{s.copy}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[1, 2, 3].map((k) => (
                    <div key={k} className="overflow-hidden rounded-2xl">
                      <img
                        src={`https://images.unsplash.com/photo-150${i}${k}799570-000000000000?q=80&w=1200&auto=format&fit=crop`}
                        alt={`${s.title} sample ${k}`}
                        className="h-28 w-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Packages / Pricing ===== */
function Packages() {
  const plans = [
    { name: "Launch", price: "₹79k", tagline: "Perfect for startups", features: ["5 pages", "Responsive design", "Basic SEO", "Contact form", "1 round revisions"] },
    { name: "Scale", price: "₹1.49L", tagline: "Best for growing brands", featured: true, features: ["10 pages", "A/B tested sections", "CMS with blog", "Analytics & heatmaps", "2 rounds revisions"] },
    { name: "Enterprise", price: "Custom", tagline: "Performance at scale", features: ["Multi-region edge", "SLA & monitoring", "Design system", "Security review", "Priority support"] },
  ];
  return (
    <section id="packages" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold">Transparent pricing.</h2>
          <p className="mt-3 text-black/70">Choose a pace that fits your roadmap. No surprises.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <HoverCard3D key={p.name}>
              <Card style={{ background: p.featured ? "#0b0b0b" : "#fff", color: p.featured ? "#fff" : "#000" }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xl font-semibold">{p.name}</div>
                  {p.featured && (
                    <span className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: THEME.red, color: "#fff" }}>
                      Popular
                    </span>
                  )}
                </div>

                <div className={`mt-2 text-4xl font-semibold`} style={{ color: p.featured ? "#fff" : "#000" }}>
                  {p.price}
                </div>
                <p className={`text-sm`} style={{ color: p.featured ? "rgba(255,255,255,0.8)" : "#4b5563" }}>
                  {p.tagline}
                </p>

                <ul className="mt-4 grid gap-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <button
                    className="w-full rounded-lg px-4 py-3 font-bold"
                    style={{
                      backgroundColor: p.featured ? "#fff" : THEME.red,
                      color: p.featured ? "#000" : "#fff",
                    }}
                  >
                    Choose {p.name}
                  </button>
                </div>
              </Card>
            </HoverCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Tech Stack ===== */
function TechStack() {
  const items = [
    { icon: Globe2, label: "Next.js 15" },
    { icon: Frame, label: "React 19" },
    { icon: Zap, label: "Framer Motion" },
    { icon: Database, label: "Postgres" },
    { icon: Cloud, label: "Vercel" },
    { icon: ShieldCheck, label: "Auth" },
    { icon: Cpu, label: "Edge" },
    { icon: Github, label: "CI/CD" },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold">Modern, reliable tech.</h2>
          <p className="mt-3 text-black/70">Built to last. Built to scale.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.label} className="rounded-2xl p-6" style={{ border: `1px solid ${THEME.neutralBorder}`, background: "#fff" }}>
              <div className="flex items-center gap-3">
                <it.icon className="size-6" />
                <div className="text-lg font-medium">{it.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Testimonials ===== */
function Testimonials() {
  const quotes = [
    {
      name: "Anaya R.",
      role: "Founder, D2C brand",
      quote: "The site loads unbelievably fast and our conversion rate jumped 27% within 3 weeks.",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Harsh V.",
      role: "Head of Product, SaaS",
      quote: "Micro-interactions feel native. Our team loves how maintainable the codebase is.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Mira K.",
      role: "CMO, Fintech",
      quote: "We shipped in half the time and the SEO gains were immediate.",
      img: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=800&auto=format&fit=crop",
    },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold">Loved by fast-moving teams.</h2>
          <p className="mt-3 text-black/70">Real results. Real stories.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <Card key={q.name} className="p-1">
              <div className="overflow-hidden rounded-[22px] bg-white">
                <img src={q.img} alt={q.name} className="h-52 w-full object-cover" />
              </div>

              <div className="pt-5">
                <p className="text-black/80 leading-relaxed">“{q.quote}”</p>

                <div className="mt-4 flex items-center gap-3 text-sm text-black/60">
                  <div className="h-9 w-9 rounded-full grid place-items-center" style={{ background: "#fff5f5", color: THEME.red }}>
                    {q.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <div className="font-medium text-black">{q.name}</div>
                    <div>{q.role}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== FAQ ===== */
function FAQ() {
  const faqs = [
    { q: "How long does a website take?", a: "Most Launch sites ship in 2–3 weeks. Scale projects typically ship in 4–6 weeks depending on scope." },
    { q: "Do you offer maintenance?", a: "Yes. We provide monthly retainers that cover small features, updates, and performance checks." },
    { q: "Which CMS do you use?", a: "We work with headless CMS like Sanity, Contentful, or a lightweight MDX setup—based on your needs." },
  ];
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Questions, answered.</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl" style={{ border: `1px solid ${THEME.neutralBorder}`, background: "#fff" }}>
              <button className="w-full px-5 py-4 text-left flex items-center justify-between" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="font-medium">{f.q}</span>
                <span className="text-black/60">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div className="px-5 pb-5 text-black/70 text-sm leading-relaxed">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Contact CTA ===== */
function ContactCTA() {
  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <div className="rounded-3xl border bg-white p-8 md:p-12 shadow-sm" style={{ borderColor: THEME.neutralBorder }}>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">Let's build your next launch.</h2>
              <p className="mt-3 text-black/70">Tell us about your goals and we'll propose the cleanest path to ship.</p>

              <div className="mt-6 flex items-center gap-4 text-black/70">
                <Mail className="size-5" /> hello@oorjaverse.dev
              </div>

              <div className="mt-3 flex items-center gap-4 text-black/70">
                <Linkedin className="size-5" /> @oorjaverse
              </div>

              <div className="mt-3 flex items-center gap-4 text-black/70">
                <Instagram className="size-5" /> @oorjaverse
              </div>
            </div>

            <form className="grid gap-4">
              <input placeholder="Your name" className="rounded-2xl border px-4 py-3" />
              <input placeholder="Email" className="rounded-2xl border px-4 py-3" />
              <input placeholder="Company" className="rounded-2xl border px-4 py-3" />
              <textarea placeholder="What are you building?" className="rounded-2xl border px-4 py-3 min-h-[120px]" />
              <div className="flex items-center justify-between">
                <div className="text-xs text-black/60">By submitting, you agree to our privacy policy.</div>
                <MagneticButton icon={SparklesIcon}>Request Proposal</MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function SiteFooter() {
  return (
    <footer className="border-t py-10 md:py-14" style={{ borderColor: THEME.neutralBorder }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="text-sm text-black/60">© {new Date().getFullYear()} Oorjaverse. Built with care.</div>

          <div className="flex items-center justify-start md:justify-end gap-4 text-sm text-black/70">
            <a href="#" className="hover:text-black flex items-center gap-1">
              <Github className="size-4" /> GitHub
            </a>

            <a href="#" className="hover:text-black flex items-center gap-1">
              <Linkedin className="size-4" /> LinkedIn
            </a>

            <a href="#" className="hover:text-black flex items-center gap-1">
              <Globe2 className="size-4" /> Policies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
