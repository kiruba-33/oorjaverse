// src/pages/Portfolio.jsx
// OORJAVERSE — Portfolio Page (Tesla-inspired minimal aesthetic)

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { scrollReveal } from "../animations/scrollReveal";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Image as ImageIcon,
  Sparkles,
  Zap,
  Brush,
  Code,
  Server,
  Gauge,
  Tag,
  BadgeCheck,
  Layout,
  Globe2,
  MousePointerClick,
  ExternalLink,
  Share2,
  LayoutGrid, // ✅ use instead of Squares4
  X,
} from "lucide-react";

// =============================
// THEME
// =============================
const COLORS = { primary: "#CC0000", primaryHover: "#b30000", accent: "#FFC300" };

// =============================
// PRIMITIVES
// =============================
function Button({ children, className = "", variant = "solid", size = "md", icon: Icon, ...props }) {
  const sizes = { sm: "px-3 py-2 text-xs", md: "px-5 py-3 text-sm", lg: "px-6 py-4 text-base" };
  const base = variant === "outline" ? "border border-black/15 text-black hover:bg-black/5" : "text-white";
  const bg = variant === "outline" ? {} : { background: COLORS.primary };
  const hover = variant === "outline" ? {} : { background: COLORS.primaryHover };
  return (
    <button
      {...props}
      className={`group inline-flex items-center gap-2 rounded-2xl font-medium tracking-tight transition ${sizes[size]} ${base} ${className}`}
      style={bg}
      onMouseOver={(e) => variant === "solid" && Object.assign(e.currentTarget.style, hover)}
      onMouseOut={(e) => variant === "solid" && Object.assign(e.currentTarget.style, bg)}
    >
      {Icon && <Icon className="size-5" />}
      <span>{children}</span>
      {variant !== "ghost" && (
        <ArrowRight className="size-5 -mr-1 translate-x-0 transition group-hover:translate-x-1" />
      )}
    </button>
  );
}
function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-black ${className}`}
      style={{ background: COLORS.accent }}
    >
      {children}
    </span>
  );
}
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] ${className}`}>{children}</div>
  );
}
function Chip({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-xs transition ${
        active ? "bg-black/10" : "bg-black/5 hover:bg-black/10"
      }`}
    >
      {children}
    </button>
  );
}

// =============================
// MICRO INTERACTIONS
// =============================
const fadeIn = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

function HoverTilt({ children, className = "" }) {
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

// =============================
// DATA
// =============================
const WORK = [
  {
    id: "saas-analytics",
    title: "SaaS Analytics Dashboard",
    type: "Web App",
    tags: ["React", "Tailwind", "Charts"],
    metrics: [
      { k: "TTI", v: "0.28s" },
      { k: "Lighthouse", v: "99" },
      { k: "Users", v: "120k/mo" },
    ],
    cover:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    shots: [
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    ],
    summary:
      "Real-time KPIs, anomaly detection, and segment explorer. Heavy on micro-interactions, zero layout shift.",
    link: "#",
  },
  {
    id: "ecommerce",
    title: "Headless E-commerce",
    type: "Storefront",
    tags: ["Next.js", "Shopify", "A/B"],
    metrics: [
      { k: "CVR", v: "+27%" },
      { k: "LCP", v: "1.1s" },
      { k: "Pages", v: "40+" },
    ],
    cover:
      "/ItServicesimages/it4.jpg",
    shots: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
    ],
    summary:
      "Optimized PDP, instant search, and streamlined checkout. Personalization on the edge without a flicker.",
    link: "#",
  },
  {
    id: "marketing",
    title: "Marketing Site System",
    type: "Website",
    tags: ["Design", "Animations", "SEO"],
    metrics: [
      { k: "Ship", v: "14d" },
      { k: "CLS", v: "0.00" },
      { k: "Rank", v: "↑" },
    ],
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop",
    shots: [
      "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520697222864-85c1df2df3a1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
    ],
    summary:
      "Composable sections, CMS, and motion system. Content teams iterate fast with guardrails for brand.",
    link: "#",
  },
  {
    id: "mobile-app",
    title: "Fintech Mobile App",
    type: "Mobile",
    tags: ["React Native", "Auth", "Charts"],
    metrics: [
      { k: "Rating", v: "4.9★" },
      { k: "Installs", v: "1M+" },
      { k: "Crashes", v: "0.01%" },
    ],
    cover:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    shots: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
    ],
    summary:
      "Card controls, budgeting, and reward feed with buttery 120fps gestures. Offline-first and secure.",
    link: "#",
  },
  {
    id: "cloud-platform",
    title: "Cloud Platform Console",
    type: "DevTools",
    tags: ["Platform", "DX", "Graph"],
    metrics: [
      { k: "Latency", v: "~30ms" },
      { k: "Regions", v: "8" },
      { k: "Tenants", v: "2k+" },
    ],
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    shots: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1600&auto=format&fit=crop",
    ],
    summary:
      "Observability, deploys, and queues in one panel. Keyboard-first UX with optimistic updates everywhere.",
    link: "#",
  },
];

const FILTERS = ["All", "Website", "Web App", "Storefront", "Mobile", "DevTools"];

// =============================
// LIGHTBOX
// =============================
function Lightbox({ open, onClose, images = [], startIndex = 0, title = "" }) {
  const [index, setIndex] = useState(startIndex);
  useEffect(() => setIndex(startIndex), [startIndex]);
  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-[92vw] max-w-5xl"
            initial={{ scale: 0.96, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index]}
              alt={`${title} shot ${index + 1}`}
              className="max-h-[72vh] w-full rounded-2xl object-cover"
            />
            <div className="mt-3 flex items-center justify-between text-white/80">
              <div className="text-sm">
                {title} — {index + 1}/{images.length}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <button
                  onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                  className="rounded-xl border border-white/20 px-3 py-2 hover:bg-white/10"
                >
                  Prev
                </button>
                <button
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                  className="rounded-xl border border-white/20 px-3 py-2 hover:bg-white/10"
                >
                  Next
                </button>
                <button onClick={onClose} className="rounded-xl border border-white/20 px-3 py-2 hover:bg-white/10">
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============================
// CASE CARD
// =============================
function CaseCard({ item, onOpen }) {
  return (
    <HoverTilt>
      <Card className="overflow-hidden p-0 group">
        <div className="relative">
          <img
            src={item.cover}
            alt={item.title}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs shadow">
            <LayoutGrid className="size-4" /> {item.type}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3
              className="text-xl font-semibold tracking-tight group-hover:text-[color:var(--c)]"
              style={{ "--c": COLORS.primary }}
            >
              {item.title}
            </h3>
            <Button as="a" href={item.link} size="sm" className="!rounded-xl">
              View
            </Button>
          </div>
          <p className="mt-2 text-sm text-black/70">{item.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-black/60">
            {item.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1">
                <Tag className="size-3" /> {t}
              </span>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {item.metrics.map((m) => (
              <div key={m.k} className="rounded-2xl border border-black/10 bg-black/5 p-3 text-center">
                <div className="text-xs text-black/60">{m.k}</div>
                <div className="text-sm font-semibold">{m.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={() => onOpen(item)}
              className="inline-flex items-center gap-2 text-sm text-black hover:text-[color:var(--c)]"
              style={{ "--c": COLORS.primary }}
            >
              <ImageIcon className="size-4" /> View gallery
            </button>
            <a href={item.link} className="inline-flex items-center gap-2 text-sm text-black/70 hover:text-black">
              <ExternalLink className="size-4" /> Case study
            </a>
          </div>
        </div>
      </Card>
    </HoverTilt>
  );
}

// =============================
// MARQUEE
// =============================
function Marquee({ children, speed = 32 }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-10 whitespace-nowrap [animation:marquee_linear_infinite]"
        style={{ "--marquee-speed": `${speed}s` }}
      >
        {children}
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .[animation\\:marquee_linear_infinite] { animation: marquee var(--marquee-speed) linear infinite; }
      `}</style>
    </div>
  );
}

// =============================
// MAIN PAGE
// =============================
export default function PortfolioPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "All") return WORK;
    return WORK.filter((w) => w.type === filter);
  }, [filter]);

  function openLightbox(item, idx = 0) {
    setActive({ ...item, start: idx });
    setOpen(true);
  }

  return (
    <div className="bg-white text-black">
      {/* HERO */}
      <section ref={heroRef} className="relative isolate pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div variants={fadeIn} initial="hidden" animate="show" className="space-y-6">
              <Badge className="inline-flex items-center gap-2">
                <Sparkles className="size-4" /> Selected Work
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
                Minimal. Electric.{" "}
                <span className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-transparent">
                  High-Impact
                </span>{" "}
                Experiences.
              </h1>
              <p className="text-black/70 max-w-xl">
                We design and build websites, apps, and platforms that feel effortless. Clean lines, precise
                motion, no clutter—Tesla vibes for the web.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" icon={ExternalLink}>
                  See Pricing
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm text-black/60">
                <div className="flex items-center gap-2">
                  <Gauge className="size-4" /> 95+ Lighthouse
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4" /> Enterprise Security
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4" /> Ship in weeks
                </div>
              </div>
            </motion.div>
            <HoverTilt>
              <motion.div style={{ y, scale }} className="overflow-hidden rounded-[28px] border border-black/10">
                <img
                  src="/ItServicesimages/it1.jpg"
                  alt="hero"
                  className="h-[380px] w-full object-cover"
                />
              </motion.div>
            </HoverTilt>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black/10" />
      </section>

      {/* METRICS MARQUEE */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Card className="bg-white/90">
            <Marquee>
              {[
                ["Projects shipped", "240+"],
                ["Avg. TTI", "0.3s"],
                ["Global regions", "8"],
                ["Bug SLA", "24h"],
                ["Design tokens", "400+"],
                ["Happy clients", "100%"],
              ].map(([k, v], i) => (
                <div key={i} className="mx-8 inline-flex items-center gap-2 text-black/70">
                  <span className="size-1.5 rounded-full" style={{ background: COLORS.primary }} />
                  <span className="text-sm">{k}:</span>
                  <span className="font-medium text-black">{v}</span>
                </div>
              ))}
            </Marquee>
          </Card>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-16 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 py-4">
            <div className="flex flex-wrap items-center gap-2">
              {FILTERS.map((f) => (
                <Chip key={f} onClick={() => setFilter(f)} active={filter === f}>
                  {f}
                </Chip>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-black/60">
              <Layout className="size-4" /> grid
              <span className="mx-2">•</span>
              <Globe2 className="size-4" /> worldwide
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-black/10 bg-black/5 p-8 text-center">
              <div className="text-black/70">No items match filter.</div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((w) => (
                <CaseCard key={w.id} item={w} onOpen={openLightbox} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div 
           variants={scrollReveal}     // 👈 added
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="mb-10 text-center"
          >  
            <h2 className="text-3xl md:text-5xl font-semibold">A seamless process.</h2>
            <p className="mt-3 text-black/70 max-w-2xl mx-auto">
              Transparent steps with real artifacts at every stage. You're always in the loop.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Brush, title: "Design", copy: "Wireframes → high-fidelity UI with tokenized styles and motion in mind." },
              { icon: Code, title: "Develop", copy: "Accessible, performant React with CI, preview links, and visual tests." },
              { icon: Server, title: "Deploy", copy: "Edge rendering, observability, and zero-downtime releases." },
            ].map((s) => (
              <HoverTilt key={s.title}>
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-2xl bg-black/5">
                      <s.icon className="size-5" />
                    </div>
                    <div className="text-lg font-medium">{s.title}</div>
                  </div>
                  <p className="mt-3 text-black/70">{s.copy}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-black/70">
                    <MousePointerClick className="size-4" /> See a live demo
                  </div>
                </Card>
              </HoverTilt>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-semibold">Loved by fast-moving teams.</h2>
            <p className="mt-3 text-black/70">Real results. Real stories.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "The site loads unbelievably fast and our conversion rate jumped 27% within 3 weeks.",
                name: "Anaya R.",
                role: "Founder, D2C brand",
                img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
              },
              {
                quote: "Micro-interactions feel native. Our team loves how maintainable the codebase is.",
                name: "Harsh V.",
                role: "Head of Product, SaaS",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
              },
              {
                quote: "We shipped in half the time and the SEO gains were immediate.",
                name: "Mira K.",
                role: "CMO, Fintech",
                img: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=800&auto=format&fit=crop",
              },
            ].map((t) => (
              <HoverTilt key={t.name}>
                <Card className="p-0">
                  <div className="overflow-hidden rounded-t-[22px]">
                    <img src={t.img} alt={t.name} className="h-48 w-full object-cover" />
                  </div>
                  <div className="p-6">
                    <p className="text-black/80 leading-relaxed">“{t.quote}”</p>
                    <div className="mt-4 text-sm text-black/60">
                      <div className="font-medium text-black">{t.name}</div>
                      <div>{t.role}</div>
                    </div>
                  </div>
                </Card>
              </HoverTilt>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 md:px-6">
          <Card className="p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold">Let's build your next launch.</h2>
                <p className="mt-3 text-black/70">
                  Tell us about your goals and we'll propose the cleanest path to ship.
                </p>
                <div className="mt-6 flex items-center gap-4 text-black/70 text-sm">
                  <Share2 className="size-5" /> hello@oorjaverse.dev
                </div>
              </div>
              <form className="grid gap-3">
                <input className="rounded-2xl border border-black/10 bg-white px-4 py-3" placeholder="Your name" />
                <input className="rounded-2xl border border-black/10 bg-white px-4 py-3" placeholder="Email" />
                <input className="rounded-2xl border border-black/10 bg-white px-4 py-3" placeholder="Company" />
                <textarea
                  className="min-h-[120px] rounded-2xl border border-black/10 bg-white px-4 py-3"
                  placeholder="What are you building?"
                />
                <div className="flex items-center justify-between">
                  <div className="text-xs text-black/60">By submitting, you agree to our privacy policy.</div>
                  <Button icon={ArrowUpRight}>Request Proposal</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        images={active?.shots ?? []}
        startIndex={active?.start ?? 0}
        title={active?.title ?? ""}
      />
    </div>
  );
}
