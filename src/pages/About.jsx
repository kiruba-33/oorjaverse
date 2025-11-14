// AboutPage.jsx — OORJAVERSE PRIVATE LIMITED
// White background • Black text • Red (#CC0000) & Yellow (#FFC300) accents
// Smooth 3D-ish animations, hover shine, scroll reveals, fully responsive.
// Drop this into your routes as `/about`.

import { useMemo, useRef, useState, useEffect } from "react";
import { Smartphone } from "lucide-react";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Building2,
  MapPin,
  Phone,
  BadgeCheck,
  ShieldCheck,
  Rocket,
  Cpu,
  Cloud,
  Database,
  Users2,
  Code,
  HeartHandshake,
  GaugeCircle,
  Trophy,
  Star,
  LineChart,
  Compass,
  Lightbulb,
  Globe2,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

// ============================
// THEME CONSTANTS
// ============================
const COLORS = {
  primary: "#CC0000", // brand red
  primaryHover: "#b30000",
  accent: "#FFC300", // accent yellow
};

// ============================
// TINY UI PRIMITIVES (No external UI library)
// ============================
function Button({ children, className = "", variant = "solid", size = "md", icon: Icon, ...props }) {
  const base = variant === "outline"
    ? "border border-black/15 bg-transparent text-black hover:bg-black/5"
    : "text-white";
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

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-3 py-1 text-xs text-black/70">
      <span className="size-1.5 rounded-full" style={{ background: COLORS.primary }} /> {children}
    </span>
  );
}

function Input(props) {
  return (
    <input {...props} className={`rounded-2xl border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/40 ${props.className || ""}`} />
  );
}

function Textarea(props) {
  return (
    <textarea {...props} className={`rounded-2xl border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/40 ${props.className || ""}`} />
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
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
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
  function handleMouseLeave() { x.set(0); y.set(0); }
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
// MAIN ABOUT PAGE
// ============================
export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.06, 0.2]);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-black selection:bg-black/10">
      <Hero bgOpacity={bgOpacity} />
      <AtAGlance />
      <Story />
      <Values />
      <Capabilities />
      <Milestones />
      <TeamShowcase />
      <LocationBlock />
      <AwardsStats />
      <ContactCTA />
      <MiniFooter />
    </div>
  );
}

// ============================
// HERO
// ============================
function Hero({ bgOpacity }) {
  return (
    <section className="relative isolate pt-28 md:pt-36">
      <motion.div style={{ opacity: bgOpacity }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.08),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
            <Badge>About Oorjaverse</Badge>
            <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
              OORJAVERSE PRIVATE LIMITED
            </h1>
            <p className="text-black/70 max-w-xl">
              We build fast, resilient digital experiences that help ambitious teams scale with confidence.
            </p>
        <div className="flex flex-wrap items-center gap-3">
  <Button variant="outline">Download Company Profile</Button>
</div>

            <div className="flex items-center gap-6 pt-3 text-sm text-black/60 flex-wrap">
              <Chip><GaugeCircle className="size-3" /> High Performance</Chip>
              <Chip><ShieldCheck className="size-3" /> Enterprise Security</Chip>
              <Chip><LineChart className="size-3" /> Conversion‑first</Chip>
            </div>
          </motion.div>

          <HoverCard3D>
            <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] border border-black/10 bg-black/5">
              <img src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop" alt="About hero" className="h-[420px] w-full object-cover" />
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(204,0,0,0.25), rgba(255,195,0,0.18))" }} />
            </motion.div>
          </HoverCard3D>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black/10" />
    </section>
  );
}

// ============================
// AT A GLANCE
// ============================
function AtAGlance() {
  const items = [
    { icon: Building2, label: "Registered", value: "Private Limited" },
    { icon: BadgeCheck, label: "Focus", value: "Web, Apps, Cloud" },
  ];
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <motion.div
              key={it.label}
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-3xl border border-black/10 bg-black/5 p-6"
            >
              <div className="flex items-center gap-3">
                <it.icon className="size-6" />
                <div>
                  <div className="text-sm text-black/60">{it.label}</div>
                  <div className="font-medium">{it.value}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================
// STORY (short timeline)
// ============================
function Story() {
  const rows = [
    { y: "2019", t: "Foundations", c: "Started as a small studio focused on performance‑first web experiences." },
    { y: "2021", t: "Cloud Native", c: "Expanded into cloud deployments, containerized workloads and CI/CD." },
    { y: "2023", t: "Scale", c: "Grew our team and shipped larger multi‑region platforms for clients." },
    { y: "2025", t: "Now", c: "Design systems, analytics, and product velocity for fast‑moving brands." },
  ];
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold">Our story</h2>
          <p className="mt-2 text-black/70">A path shaped by craft, reliability and speed.</p>
        </div>
        <div className="relative grid gap-4">
          {rows.map((r, i) => (
            <motion.div key={r.y} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} className="grid gap-3 rounded-2xl border border-black/10 bg-black/5 p-5 md:grid-cols-[120px_1fr]">
              <div className="font-semibold" style={{ color: COLORS.primary }}>{r.y}</div>
              <div>
                <div className="font-medium">{r.t}</div>
                <div className="text-sm text-black/70">{r.c}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================
// VALUES
// ============================
function Values() {
  const items = [
    { icon: HeartHandshake, title: "Partnership", copy: "We work as an embedded partner, not a vendor." },
    { icon: GaugeCircle, title: "Performance", copy: "Speed and stability are non‑negotiable." },
    { icon: ShieldCheck, title: "Security", copy: "Guardrails at every layer, from auth to infra." },
    { icon: Lightbulb, title: "Clarity", copy: "Crisp, honest communication and simple roadmaps." },
  ];
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold">What we value</h2>
          <p className="mt-2 text-black/70">Principles that shape every decision.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <HoverCard3D key={it.title}>
              <Card className="group transition hover:shadow-lg hover:shadow-black/10">
                <div className="flex items-start gap-3">
                  <it.icon className="size-6" />
                  <div>
                    <div className="text-lg font-semibold tracking-tight">{it.title}</div>
                    <p className="mt-1 text-sm text-black/70">{it.copy}</p>
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

// ============================
// CAPABILITIES (grid)
// ============================
function Capabilities() {
  const items = [
    { icon: Code, title: "Website Development", copy: "Next.js, React, accessibility, SEO, analytics, A/B." },
    { icon: Smartphone, title: "App Development", copy: "Native‑feel apps, offline‑first, sync, store ops." },
    { icon: Cloud, title: "Cloud & DevOps", copy: "Kubernetes, CI/CD, cost observability, zero‑trust." },
    { icon: Database, title: "Data & Platform", copy: "Postgres, caching, warehousing, insights." },
  ];
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold">What we do</h2>
          <p className="mt-2 text-black/70">Focused services, senior execution.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <HoverCard3D key={it.title}>
              <Card className="group">
                <div className="flex items-start gap-3">
                  <it.icon className="size-6" />
                  <div>
                    <div className="text-lg font-semibold tracking-tight">{it.title}</div>
                    <p className="mt-1 text-sm text-black/70">{it.copy}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip>Design systems</Chip>
                  <Chip>Edge rendering</Chip>
                  <Chip>QA automation</Chip>
                </div>
              </Card>
            </HoverCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================
// MILESTONES / HIGHLIGHTS
// ============================
function Milestones() {
  const stats = [
    { k: "120+", label: "Projects delivered" },
    { k: "6", label: "Core services" },
    { k: "99.9%", label: "Typical uptime on managed hosting" },
    { k: "0.3s", label: "Median TTI on LPs" },
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
// TEAM (simple photo grid placeholders)
// ============================
function TeamShowcase() {
  const team = [
    { n: "Anaya R.", r: "Design Lead", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop" },
    { n: "Harsh V.", r: "Head of Product", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" },
    { n: "Mira K.", r: "CMO", img: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=800&auto=format&fit=crop" },
    { n: "Dev Ops", r: "SRE", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop" },
  ];
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold">Team snapshot</h2>
          <p className="mt-2 text-black/70">A nimble group, senior where it matters.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <HoverCard3D key={m.n}>
              <Card className="p-1">
                <div className="overflow-hidden rounded-[22px] bg-black/5">
                  <img src={m.img} alt={m.n} className="h-52 w-full object-cover hover:scale-105 transition" />
                </div>
                <div className="pt-4">
                  <div className="font-medium">{m.n}</div>
                  <div className="text-sm text-black/60">{m.r}</div>
                </div>
              </Card>
            </HoverCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================
// LOCATION
// ============================
function LocationBlock() {
  const address = "Innov8 Orchid Centre, 3rd Floor, Golf Course Road, Sector 53, Gurgaon";
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Badge>Our location</Badge>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Visit us in Gurgaon</h3>
            <p className="text-black/70">{address}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-black/80">
              <Chip><Phone className="size-3" /> 8178106141</Chip>
              <Chip><MapPin className="size-3" /> NCR, India</Chip>
            </div>
            <div className="pt-2 flex gap-3">
              <Button>Get directions</Button>
              <Button variant="outline">Book a meeting</Button>
            </div>
          </div>
          <HoverCard3D>
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-black/5">
              <img
                src="https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1600&auto=format&fit=crop"
                alt="Office area"
                className="h-[320px] w-full object-cover hover:scale-105 transition"
              />
            </div>
          </HoverCard3D>
        </div>
      </div>
    </section>
  );
}

// ============================
// AWARDS / SOCIAL / STATS (mixed)
// ============================
function AwardsStats() {
  const items = [
    { icon: Trophy, title: "Recognition", copy: "Notable mentions for speed and reliability." },
    { icon: Star, title: "Ratings", copy: "Consistent 5‑star client feedback." },
    { icon: Compass, title: "Direction", copy: "Clear roadmaps and predictable delivery." },
  ];
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <HoverCard3D key={it.title}>
              <Card>
                <div className="flex items-start gap-3">
                  <it.icon className="size-6" />
                  <div>
                    <div className="text-lg font-semibold tracking-tight">{it.title}</div>
                    <p className="mt-1 text-sm text-black/70">{it.copy}</p>
                  </div>
                </div>
              </Card>
            </HoverCard3D>
          ))}
          <Card>
            <div className="text-lg font-semibold tracking-tight mb-2">Find us online</div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:opacity-80 inline-flex items-center gap-2"><Github className="size-4" /> GitHub</a>
              <a href="#" className="hover:opacity-80 inline-flex items-center gap-2"><Linkedin className="size-4" /> LinkedIn</a>
              <a href="#" className="hover:opacity-80 inline-flex items-center gap-2"><Instagram className="size-4" /> Instagram</a>
            </div>
          </Card>
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
              <Badge>Ready to talk?</Badge>
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

// ============================
// MINI FOOTER
// ============================
function MiniFooter() {
  return (
    <footer className="border-t border-black/10 py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="text-sm text-black/60">
            © {new Date().getFullYear()} OORJAVERSE PRIVATE LIMITED.
          </div>
          <div className="flex items-center justify-start md:justify-end gap-4 text-sm text-black/70">
            <a href="#" className="hover:text-black inline-flex items-center gap-1">
              <Globe2 className="size-4" /> Policies
            </a>
            <a href="#" className="hover:text-black inline-flex items-center gap-1">
              <Github className="size-4" /> GitHub
            </a>
            <a href="#" className="hover:text-black inline-flex items-center gap-1">
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
