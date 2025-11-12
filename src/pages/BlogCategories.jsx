// src/pages/BlogCategories.jsx
// OORJAVERSE — Blog dropdown category pages (All Blogs, Tech News, How‑To Guides, Company Updates)
// Smooth animations (Framer Motion), hover effects, 3D tilt cards, and mobile‑first responsive layout.
// Theme: white bg, black text, red (#CC0000), yellow (#FFC300)
// Usage (routes example):
//   import BlogIndex, { TechNewsPage, HowToGuidesPage, CompanyUpdatesPage } from "./pages/BlogCategories";
//   <Route path="/blog" element={<BlogIndex/>} />
//   <Route path="/blog/tech-news" element={<TechNewsPage/>} />
//   <Route path="/blog/how-to-guides" element={<HowToGuidesPage/>} />
//   <Route path="/blog/company-updates" element={<CompanyUpdatesPage/>} />

import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Search,
  Tag,
  Flame,
  Zap,
  Cloud,
  Wrench,
  Layout,
  Newspaper,
  Megaphone,
  BookOpenText,
  Rocket,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

// ========================= THEME & PRIMITIVES =========================
const COLORS = { primary: "#CC0000", primaryHover: "#b30000", accent: "#FFC300" };

function Button({ children, className = "", variant = "solid", size = "md", ...props }) {
  const sizes = { sm: "px-3 py-2 text-xs", md: "px-5 py-3 text-sm", lg: "px-6 py-4 text-base" };
  const base = variant === "outline" ? "border border-black/15 text-black hover:bg-black/5" : "text-white";
  const style = variant === "outline" ? {} : { background: COLORS.primary };
  const hover = variant === "outline" ? {} : { background: COLORS.primaryHover };
  return (
    <button
      {...props}
      className={`group inline-flex items-center gap-2 rounded-2xl font-medium tracking-tight transition ${sizes[size]} ${base} ${className}`}
      style={style}
      onMouseOver={(e) => Object.assign(e.currentTarget.style, hover)}
      onMouseOut={(e) => Object.assign(e.currentTarget.style, style)}
    >
      {children}
      <ArrowRight className="size-5 -mr-1 translate-x-0 transition group-hover:translate-x-1" />
    </button>
  );
}
function Badge({ children, className = "" }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-black ${className}`} style={{ background: COLORS.accent }}>
      {children}
    </span>
  );
}
function Chip({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-3 py-1 text-xs text-black/70 ${className}`}>
      <span className="size-1.5 rounded-full" style={{ background: COLORS.primary }} /> {children}
    </span>
  );
}
function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] ${className}`}>{children}</div>;
}

// ========================= ANIMATION HELPERS =========================
const fadeIn = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

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
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
      className={`[transform:perspective(1000px)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ========================= SHARED BLOG LAYOUT =========================
function BlogLayout({ icon: Icon, label, title, subtitle, cover, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  return (
    <div ref={ref} className="bg-white text-black">
      {/* HERO */}
      <section className="relative isolate pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div variants={fadeIn} initial="hidden" animate="show" className="space-y-6">
              <Badge className="inline-flex items-center gap-2"><Icon className="size-4"/> {label}</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">{title}</h1>
              {subtitle && <p className="text-black/70 max-w-xl">{subtitle}</p>}
              <div className="flex items-center gap-4 text-sm text-black/60">
                <Chip><Clock className="size-3"/> Updated weekly</Chip>
                <Chip><Flame className="size-3"/> Curated by team</Chip>
              </div>
            </motion.div>
            <HoverTilt>
              <motion.div style={{ y, scale }} className="overflow-hidden rounded-[28px] border border-black/10">
                <img src={cover} alt="cover" className="h-[360px] w-full object-cover" />
              </motion.div>
            </HoverTilt>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black/10" />
      </section>

      {/* CONTENT */}
      <main className="mx-auto max-w-6xl px-4 md:px-6 pb-24">{children}</main>
    </div>
  );
}

// ========================= UTIL: ARTICLE CARD =========================
function ArticleCard({ to = "#", img, title, summary, tags = [], pill }) {
  return (
    <HoverTilt>
      <Link to={to} className="block group">
        <Card className="overflow-hidden p-0">
          <div className="relative">
            <img src={img} alt={title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {pill && (
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs shadow">{pill}</div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold tracking-tight group-hover:text-[color:var(--c,\#CC0000)]" style={{ "--c": COLORS.primary }}>{title}</h3>
            <p className="mt-2 text-sm text-black/70">{summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-black/60">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1"><Tag className="size-3" />{t}</span>
              ))}
            </div>
            <div className="mt-5"><Button size="sm">Read</Button></div>
          </div>
        </Card>
      </Link>
    </HoverTilt>
  );
}

// ========================= INDEX (All Blogs) =========================
export default function BlogIndex() {
  const [tag, setTag] = useState("All");
  const posts = useMemo(
    () => [
      { slug: "/blog/design-systems", title: "Design Systems for Speed & Integrity", summary: "Build scalable UI with tokens, components, and guardrails that preserve brand integrity.", cover: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop", tags: ["Design", "System", "Accessibility"], pill: <span className="inline-flex items-center gap-2"><Layout className="size-5"/>Featured</span> },
      { slug: "/blog/performance-edge", title: "The Edge Performance Playbook", summary: "Edge rendering, image pipelines, and tiny interaction budgets for sub‑second pages.", cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop", tags: ["Next.js", "Performance", "CDN"], pill: <span className="inline-flex items-center gap-2"><Zap className="size-5"/>Hot</span> },
      { slug: "/blog/qa-automation", title: "QA Automation that Unblocks Shipping", summary: "From flakey tests to stable pipelines—patterns that keep velocity high without risk.", cover: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop", tags: ["Testing", "Playwright", "CI"], pill: <span className="inline-flex items-center gap-2"><Wrench className="size-5"/>Guide</span> },
      { slug: "/blog/cloud-costs", title: "Cloud Cost Optimization in Practice", summary: "Right‑sizing, autoscaling, caching, and observability checklists you can apply this week.", cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop", tags: ["Cloud", "Kubernetes", "FinOps"], pill: <span className="inline-flex items-center gap-2"><Cloud className="size-5"/>Playbook</span> },
    ],
    []
  );
  const filtered = tag === "All" ? posts : posts.filter((p) => p.tags.includes(tag));
  return (
    <BlogLayout
      icon={Newspaper}
      label="All Blogs"
      title="Insights from the Oorjaverse Team"
      subtitle="Short, practical guides that help you launch faster and scale safely."
      cover="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop"
    >
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <div className="flex h-12 items-center gap-2 rounded-2xl border border-black/10 bg-white px-4">
          <Search className="size-5 text-black/50" />
          <input className="h-full w-60 sm:w-80 outline-none bg-transparent" placeholder="Search topics… (UI only)" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Design", "Performance", "Testing", "Cloud"].map((t) => (
            <button key={t} onClick={() => setTag(t)} className={`rounded-full border border-black/10 px-3 py-1 text-xs ${tag === t ? "bg-black/10" : "bg-black/5 hover:bg-black/10"}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((p) => (
          <ArticleCard key={p.slug} to={p.slug} img={p.cover} title={p.title} summary={p.summary} tags={p.tags} pill={p.pill} />
        ))}
      </div>

      {/* Newsletter CTA */}
      <section className="mt-12">
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold">Get the Friday Brief</h3>
              <p className="mt-2 text-black/70">A compact email with our latest posts, no fluff.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3">
              <input className="flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3" placeholder="you@company.com" />
              <Button className="whitespace-nowrap">Subscribe</Button>
            </form>
          </div>
        </Card>
      </section>
    </BlogLayout>
  );
}

// ========================= CATEGORY: TECH NEWS =========================
export function TechNewsPage() {
  const items = [
    {
      title: "React 19 RC lands with Actions & Server Components improvements",
      summary: "A quick tour of what changes for SSR, forms, and streaming. Migration tips inside.",
      img: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop",
      tags: ["React", "Release", "SSR"],
    },
    {
      title: "Vite 6 performance bump: Faster HMR & smarter pre‑bundling",
      summary: "Dev server latency drops yet again. We benchmark against a production Oorjaverse app.",
      img: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop",
      tags: ["Vite", "DX", "Tooling"],
    },
    {
      title: "Edge runtime update: KV reads cut to ~1ms with regional caches",
      summary: "How modern KV + CDN combos unlock snappy personalization at scale.",
      img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop",
      tags: ["Edge", "CDN", "Caching"],
    },
    {
      title: "TypeScript 6.0: faster incremental builds & smarter narrowing",
      summary: "What we flipped in tsconfig to shave 30% off CI times.",
      img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1600&auto=format&fit=crop",
      tags: ["TypeScript", "CI", "DX"],
    },
  ];

  return (
    <BlogLayout
      icon={Newspaper}
      label="Tech News"
      title="Weekly Tech News, distilled"
      subtitle="Releases, performance wins, and platform shifts that matter to product teams."
      cover="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
    >
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <ArticleCard key={i} to="#" img={a.img} title={a.title} summary={a.summary} tags={a.tags} pill={<span className="inline-flex items-center gap-2"><Newspaper className="size-5"/>News</span>} />
        ))}
      </section>

      <section className="mt-12">
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold">Follow updates</h3>
              <p className="mt-2 text-black/70">We share code and takes on X and LinkedIn.</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <a className="rounded-full border border-black/10 px-3 py-2 hover:bg-black/5 inline-flex items-center gap-2" href="#"><Twitter className="size-4"/>X</a>
              <a className="rounded-full border border-black/10 px-3 py-2 hover:bg-black/5 inline-flex items-center gap-2" href="#"><Linkedin className="size-4"/>LinkedIn</a>
              <a className="rounded-full border border-black/10 px-3 py-2 hover:bg-black/5 inline-flex items-center gap-2" href="#"><Github className="size-4"/>GitHub</a>
            </div>
          </div>
        </Card>
      </section>
    </BlogLayout>
  );
}

// ========================= CATEGORY: HOW‑TO GUIDES =========================
export function HowToGuidesPage() {
  const guides = [
    {
      title: "Implementing Accessibly‑Animated Menus with Framer Motion",
      summary: "Focus traps, prefers‑reduced‑motion, and GPU‑friendly transforms—copy‑paste patterns inside.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
      tags: ["Accessibility", "Motion", "UI"],
    },
    {
      title: "Edge cache keys that actually work",
      summary: "Design cache keys that keep your pages fresh without breaking personalization.",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop",
      tags: ["Edge", "Caching", "SSR"],
    },
    {
      title: "A/B testing in Next.js with zero layout shifts",
      summary: "Pre‑rendered variants, lightweight flags, and instant navigation.",
      img: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?q=80&w=1600&auto=format&fit=crop",
      tags: ["Next.js", "Experimentation"],
    },
    {
      title: "Create a tiny design token pipeline",
      summary: "One source of truth → CSS variables → design tools → docs.",
      img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1600&auto=format&fit=crop",
      tags: ["Design", "Tokens"],
    },
    {
      title: "Playwright + GitHub Actions template",
      summary: "CI that runs fast, screenshots on failures, and useful artifacts.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
      tags: ["Testing", "CI"],
    },
  ];

  return (
    <BlogLayout
      icon={BookOpenText}
      label="How‑To Guides"
      title="Hands‑on guides you can deploy today"
      subtitle="Copy‑paste snippets and patterns for common product problems."
      cover="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
    >
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g, i) => (
          <ArticleCard key={i} to="#" img={g.img} title={g.title} summary={g.summary} tags={g.tags} pill={<span className="inline-flex items-center gap-2"><BookOpenText className="size-5"/>Guide</span>} />
        ))}
      </section>

      {/* Mini CTA row */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold">Starter templates</div>
              <p className="text-sm text-black/70">Grab our minimal motion + accessibility kit.</p>
            </div>
            <Button size="sm">Download</Button>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold">Office hours</div>
              <p className="text-sm text-black/70">Book a 30‑min session to review your UI.</p>
            </div>
            <Button size="sm" variant="outline">Book</Button>
          </div>
        </Card>
      </section>
    </BlogLayout>
  );
}

// ========================= CATEGORY: COMPANY UPDATES =========================
export function CompanyUpdatesPage() {
  const posts = [
    {
      title: "Oorjaverse opens Gurgaon studio at Innov8 Orchid Centre",
      summary: "A new space for design sprints, client workshops, and Friday demos.",
      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
      tags: ["Office", "Culture"],
    },
    {
      title: "Welcoming our new SRE and Product Design leads",
      summary: "Two senior leaders join to accelerate platform reliability and brand craft.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
      tags: ["Team", "Hiring"],
    },
    {
      title: "Launch partner slots for Q1 now open",
      summary: "We have limited availability for early‑stage launches—here’s the process.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
      tags: ["Launch", "Process"],
    },
  ];

  return (
    <BlogLayout
      icon={Megaphone}
      label="Company Updates"
      title="News from the Oorjaverse team"
      subtitle="Milestones, openings, culture notes, and release announcements."
      cover="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop"
    >
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <ArticleCard key={i} to="#" img={p.img} title={p.title} summary={p.summary} tags={p.tags} pill={<span className="inline-flex items-center gap-2"><Megaphone className="size-5"/>Update</span>} />
        ))}
      </section>

      <section className="mt-12">
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold">Work with us</h3>
              <p className="mt-2 text-black/70">We’re always happy to meet builders who care about speed and craft.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button>Open roles</Button>
              <Button variant="outline">Drop a note</Button>
            </div>
          </div>
        </Card>
      </section>
    </BlogLayout>
  );
}
 