// ServicesPage.jsx — 𝙒𝙝𝙞𝙩𝙚 background • Black text • Red (#CC0000) & Yellow (#FFC300) accents
// Includes: Hero, Quick Cards, Animated Accordion (6 items), Feature Strips,
// Sticky Overview, Stats, Logo Marquee, CTA, FAQ — with smooth animations & mobile-friendly layout.
// Built with React, TailwindCSS classes, Framer Motion, Lucide icons. No external UI kits.

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Zap,
  ShieldCheck,
  Paintbrush,
  Code,
  Cpu,
  Database,
  Globe2,
  Cloud,
  Server,
  Smartphone,
  MousePointerClick,
  Bug,
  Layout,
  GaugeCircle,
  LineChart,
  Network,
  CheckCircle2,
  Search,
} from "lucide-react";

// ============================
// THEME
// ============================
const COLORS = {
  primary: "#CC0000", // red
  primaryHover: "#b30000",
  accent: "#FFC300", // yellow
  ink60: "#00000099",
};

// ============================
// TINY UI PRIMITIVES (Tailwind + a little inline CSS)
// ============================
function Button({ children, className = "", variant = "solid", size = "md", icon: Icon, ...props }) {
  const base =
    variant === "outline"
      ? "border border-black/15 bg-transparent text-black hover:bg-black/5"
      : `text-white`;
  const sizes = { sm: "px-3 py-2 text-xs", md: "px-5 py-3 text-sm", lg: "px-6 py-4 text-base" };
  const bg = variant === "solid" ? { background: COLORS.primary } : {};
  const hover = variant === "solid" ? { background: COLORS.primaryHover } : {};
  return (
    <button
      {...props}
      className={`group relative inline-flex items-center gap-2 rounded-2xl font-medium tracking-tight transition ${base} ${sizes[size]} ${className}`}
      style={bg}
      onMouseOver={(e) => variant === "solid" && Object.assign(e.currentTarget.style, hover)}
      onMouseOut={(e) => variant === "solid" && Object.assign(e.currentTarget.style, bg)}
    >
      {Icon && <Icon className="size-5" />}
      <span>{children}</span>
      <ArrowRight className="size-5 -mr-1 translate-x-0 transition group-hover:translate-x-1" />
    </button>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-3 py-1 text-xs text-black/70">
      <span className="size-1.5 rounded-full" style={{ background: COLORS.primary }} /> {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-black/10 bg-black/5 backdrop-blur p-6 ${className}`}>{children}</div>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-black ${className}`} style={{ background: COLORS.accent }}>
      {children}
    </span>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={`rounded-2xl border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/40 ${props.className || ""}`}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`rounded-2xl border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/40 ${props.className || ""}`}
    />
  );
}

// ============================
// MOTION HELPERS
// ============================
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Subtle 3D hover tilt
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

// Magnetic button micro‑interaction
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
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }} className="inline-flex">
      <Button {...props} className={`group relative overflow-hidden ${className}`}>
        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-white/0 via-white/30 to-white/0" />
        <span className="relative flex items-center gap-2">
          {Icon && <Icon className="size-5" />} {children}
          <ArrowRight className="size-5 -mr-1 translate-x-0 group-hover:translate-x-1 transition" />
        </span>
      </Button>
    </motion.div>
  );
}

// ============================
// PAGE
// ============================
export default function ServicesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroBg = useTransform(scrollYProgress, [0, 1], [0.06, 0.18]);

  const SERVICES = useMemo(
    () => [
      {
        key: "it",
        title: "IT Services",
        short: "Infra, support & security — without the chaos.",
        icon: Server,
        bullets: ["Network setup & monitoring", "End‑user IT support", "Identity & access mgmt", "Backup & disaster recovery"],
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
      },
      {
        key: "app",
        title: "App Development",
        short: "Native‑feel apps with clean UI and scale.",
        icon: Smartphone,
        bullets: ["iOS / Android / Desktop", "Design systems", "Offline‑first & sync", "Store deployment"],
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop",
      },
      {
        key: "qa",
        title: "Quality Testing",
        short: "Ship confidently with automated checks.",
        icon: Bug,
        bullets: ["E2E & unit automation", "Performance & load", "Security & accessibility", "Release gating"],
        img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
      },
      {
        key: "web",
        title: "Website Development",
        short: "Fast, responsive, conversion‑focused sites.",
        icon: Layout,
        bullets: ["Next.js / React", "SEO & analytics", "Headless CMS", "A/B testing"],
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
      },
      {
        key: "host",
        title: "Hosting",
        short: "Reliable, secure, and cost‑smart hosting.",
        icon: Globe2,
        bullets: ["Uptime SLAs", "CDN & caching", "Monitoring & alerts", "Migrations"],
        img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1600&auto=format&fit=crop",
      },
      {
        key: "cloud",
        title: "Cloud‑Based Server",
        short: "Scale on demand across regions.",
        icon: Cloud,
        bullets: ["Kubernetes / containers", "CI/CD pipelines", "Cost optimization", "Zero‑trust security"],
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
      },
    ],
    []
  );

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-black selection:bg-black/10">
      {/* HERO */}
      <section id="hero" className="relative isolate pt-28 md:pt-36">
        <motion.div style={{ opacity: heroBg }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.08),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <Badge>Our Services</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
                Built for speed. <span className="bg-gradient-to-r from-black to-black/40 bg-clip-text text-transparent">Scaled for growth.</span>
              </h1>
              <p className="text-black/70 max-w-xl">Six expert offerings — short and sharp. Expand only what you need.</p>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton icon={Zap}>Start a Project</MagneticButton>
                <Button variant="outline">Get a Quote</Button>
              </div>
              <div className="flex items-center gap-6 pt-3 text-sm text-black/60">
                <Chip>1‑week kickoff</Chip>
                <Chip>Transparent pricing</Chip>
                <Chip>Maintenance available</Chip>
              </div>
            </motion.div>
            <HoverCard3D>
              <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] border border-black/10 bg-black/5">
                <img src="ItServicesimages/it1.jpg" alt="Services hero" className="h-[420px] w-full object-cover" />
              </motion.div>
            </HoverCard3D>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black/10" />
      </section>

      {/* QUICK GRID */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-semibold mb-6">Short & sweet overview</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <HoverCard3D key={s.key}>
                <Card className="group transition hover:shadow-lg hover:shadow-black/10">
                  <div className="flex items-start gap-3">
                    <s.icon className="size-6" />
                    <div>
                      <div className="text-lg font-semibold tracking-tight">{s.title}</div>
                      <p className="mt-1 text-sm text-black/70">{s.short}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.bullets.slice(0, 3).map((b) => (
                      <Chip key={b}>{b}</Chip>
                    ))}
                  </div>
                </Card>
              </HoverCard3D>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE STRIPS */}
      <FeatureStrips />

      {/* ACCORDION DETAILS */}
      <AccordionDetails items={SERVICES} />

      {/* STATS */}
      <Stats />

      {/* LOGO MARQUEE */}
      <LogoMarquee />

      {/* CONTACT CTA */}
      <ContactCTA />

      {/* MINI FOOTER */}
      <footer className="border-t border-black/10 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-sm text-black/60">© {new Date().getFullYear()} Oorjaverse — Services.</div>
      </footer>
    </div>
  );
}

// ============================
// FEATURE STRIPS — alternating highlight rows
// ============================
function FeatureStrips() {
  const rows = [
    { title: "Performance out of the box", copy: "Edge rendering, image optimization, strict budgets.", icon: GaugeCircle },
    { title: "Security by default", copy: "Hardened headers, auth best‑practices, secret management.", icon: ShieldCheck },
    { title: "Design that converts", copy: "Clean type, deliberate rhythm, tested interactions.", icon: Paintbrush },
  ];
  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-3">
        {rows.map((r, i) => (
          <motion.div
            key={r.title}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className={`flex items-center gap-4 rounded-2xl border border-black/10 p-4 ${i % 2 ? "bg-black/5" : "bg-white"}`}
          >
            <r.icon className="size-6" style={{ color: COLORS.primary }} />
            <div className="font-semibold">{r.title}</div>
            <div className="text-sm text-black/70">{r.copy}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================
// ACCORDION WITH SMOOTH HEIGHT & IMAGE PREVIEW
// ============================
function AccordionDetails({ items }) {
  const [open, setOpen] = useState(items?.[0]?.key ?? null);
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold">Dive deeper (optional)</h2>
          <p className="mt-2 text-black/70">Tap a row to reveal concise details for each service.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:sticky lg:top-24 h-fit">
            <Card>
              <div className="text-lg font-semibold tracking-tight mb-2">Why choose us?</div>
              <ul className="space-y-2 text-black/70 text-sm">
                <li className="flex items-center gap-2"><Zap className="size-4" style={{ color: COLORS.primary }} /> Performance‑first builds</li>
                <li className="flex items-center gap-2"><ShieldCheck className="size-4" style={{ color: COLORS.primary }} /> Enterprise‑grade security</li>
                <li className="flex items-center gap-2"><Code className="size-4" style={{ color: COLORS.primary }} /> Clean, maintainable code</li>
                <li className="flex items-center gap-2"><Database className="size-4" style={{ color: COLORS.primary }} /> Data & analytics ready</li>
              </ul>
              <div className="mt-6"><MagneticButton>Get proposal</MagneticButton></div>
            </Card>
          </div>
          <div className="lg:col-span-2 grid gap-3">
            {items.map((it) => (
              <AccordionRow key={it.key} item={it} open={open === it.key} onToggle={() => setOpen(open === it.key ? null : it.key)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionRow({ item, open, onToggle }) {
  const contentRef = useRef(null);
  const [h, setH] = useState(0);
  const rotate = useSpring(open ? 180 : 0, { stiffness: 200, damping: 20 });
  useEffect(() => {
    if (open && contentRef.current) setH(contentRef.current.scrollHeight);
  }, [open]);

  function handleToggle() {
    if (!open) {
      const el = contentRef.current;
      if (el) setH(el.scrollHeight);
    } else {
      setH(0);
    }
    onToggle?.();
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/5">
      <button className="w-full px-5 py-4 text-left flex items-center gap-3" onClick={handleToggle}>
        <item.icon className="size-5" />
        <span className="flex-1 text-lg font-medium tracking-tight">{item.title}</span>
        <motion.span style={{ rotate }} className="grid size-7 place-items-center rounded-full border border-black/10">
          <ChevronDown className="size-4" />
        </motion.span>
      </button>
      <motion.div animate={{ height: open ? h || "auto" : 0 }} transition={{ type: "spring", stiffness: 150, damping: 20 }}>
        <div ref={contentRef} className="px-5 pb-5">
          <p className="text-black/70 text-sm leading-relaxed">{item.short}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              {item.bullets.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-black/70">
                  <span className="size-2 rounded-full" style={{ background: COLORS.accent }} /> {b}
                </div>
              ))}
            </div>
            <HoverCard3D>
              <div className="overflow-hidden rounded-xl border border-black/10 bg-black/5">
                <img src={item.img} alt={item.title} className="h-40 w-full object-cover hover:scale-105 transition" />
              </div>
            </HoverCard3D>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Button>Talk to us</Button>
            <Button variant="outline">View case study</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================
// STATS
// ============================
function Stats() {
  const stats = [
    { k: "99.9%", label: "Uptime across hosted projects" },
    { k: "27%", label: "Avg. conversion lift after redesign" },
    { k: "0.3s", label: "Typical TTI on landing pages" },
    { k: "6", label: "Core services with focus" },
  ];
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <motion.div key={s.k} variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-3xl border border-black/10 bg-black/5 p-6 text-center">
              <div className="text-4xl font-semibold tracking-tight" style={{ color: COLORS.primary }}>{s.k}</div>
              <div className="mt-2 text-sm text-black/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================
// LOGO MARQUEE — simple brands row
// ============================
function LogoMarquee() {
  const brands = ["Google", "Meta", "Figma", "AWS", "Vercel", "Stripe", "Shopify"];
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-2xl border border-black/10 bg-black/5 p-6 backdrop-blur">
          <div className="flex gap-8 flex-wrap items-center justify-center text-black/70">
            {brands.map((b) => (
              <span key={b} className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: COLORS.primary }} /> {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================
// CONTACT CTA
// ============================
function ContactCTA() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-3xl border border-black/10 bg-black/5 p-8 md:p-12 backdrop-blur">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Badge>Ready to go?</Badge>
              <h3 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">Let's build something fast.</h3>
              <p className="mt-3 text-black/70">Tell us your goals. We'll reply with a crisp plan and estimate.</p>
              <div className="mt-6 flex items-center gap-3 text-sm text-black/70">
                <Chip>Avg. kickoff in 5–7 days</Chip>
                <Chip>Weekly demos</Chip>
              </div>
            </div>
            <form className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="Your name" />
                <Input placeholder="Email" />
              </div>
              <Input placeholder="Company" />
              <Textarea placeholder="What are you building?" className="min-h-[120px]" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/60">By submitting, you agree to our terms.</span>
                <MagneticButton>Request proposal</MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
