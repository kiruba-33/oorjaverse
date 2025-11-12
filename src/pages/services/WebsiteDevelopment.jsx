import { useRef, useState } from "react";
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

// === THEME ===
const COLORS = {
  primary: "#CC0000", // red
  primaryHover: "#b30000",
  accent: "#FFC300", // yellow
};

// === BASIC UI (no external UI lib) ===
function Button({ children, className = "", variant = "solid", ...props }) {
  const base =
    variant === "outline"
      ? "border border-black/15 bg-transparent text-black hover:bg-black/5"
      : `bg-[${COLORS.primary}] text-white hover:bg-[${COLORS.primaryHover}]`;
  return (
    <button
      {...props}
      className={`rounded-2xl px-5 py-3 text-sm font-medium tracking-tight transition ${base} ${className}`}
    >
      {children}
    </button>
  );
}
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-black/10 bg-black/5 backdrop-blur p-5 ${className}`}>{children}</div>
  );
}
function CardHeader({ children }) { return <div className="mb-4">{children}</div>; }
function CardTitle({ children }) { return <h3 className="text-xl font-semibold tracking-tight">{children}</h3>; }
function CardContent({ children, className="" }) { return <div className={className}>{children}</div>; }
function Badge({ children, className = "" }) {
  return (
    <span className={`inline-block rounded-full bg-[${COLORS.accent}] px-3 py-1 text-xs font-medium text-black ${className}`}>
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

// === ANIMATIONS ===
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

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

// Subtle tilt on hover
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
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }} style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }} className={`[transform:perspective(1000px)] ${className}`}>
      {children}
    </motion.div>
  );
}

// ===== Marquee (logos) =====
function Marquee({ children, speed = 30 }) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-10 whitespace-nowrap [animation:marquee_linear_infinite]" style={{ "--marquee-speed": `${speed}s` }}>
        {children}{children}{children}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .[animation\\:marquee_linear_infinite] { animation: marquee var(--marquee-speed) linear infinite; }
      `}</style>
    </div>
  );
}

// ===== PAGE =====
export default function WebsiteDevelopmentPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.05, 0.2]);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-black selection:bg-black/10">
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

// ===== NAV =====
function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-4 py-3 backdrop-blur-xl">
          <a href="#home" className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-black" />
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
              <a key={label} href={href} className="hover:text-black transition">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:block">
              <MagneticButton icon={Zap}>Start a Project</MagneticButton>
            </a>
            <button className="md:hidden size-9 grid place-items-center rounded-xl border border-black/10 bg-black/5" onClick={() => setOpen(v => !v)}>
              <span className="sr-only">Menu</span>
              <ChevronRight className={`size-5 transition ${open ? "rotate-90" : "rotate-0"}`} />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mt-2 rounded-2xl border border-black/10 bg-white p-4 backdrop-blur-xl md:hidden">
            <div className="grid gap-3 text-black/80">
              <a href="#showcase" className="hover:text-black">Work</a>
              <a href="#features" className="hover:text-black">Features</a>
              <a href="#process" className="hover:text-black">Process</a>
              <a href="#packages" className="hover:text-black">Pricing</a>
              <a href="#contact" className="hover:text-black">Contact</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ===== HERO =====
function HeroSection({ bgOpacity }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  return (
    <section id="home" ref={ref} className="relative isolate pt-28 md:pt-36">
      <motion.div style={{ opacity: bgOpacity }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.08),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
            <Badge>Website Development</Badge>
            <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
              Minimal. Electric. <span className="bg-gradient-to-r from-black to-black/50 bg-clip-text text-transparent">High‑Performance</span> Websites.
            </h1>
            <p className="text-black/70 max-w-xl">
              We craft lightning‑fast, conversion‑focused websites with clean lines, bold type and zero clutter.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton icon={Rocket}>Get a Live Demo</MagneticButton>
              <Button variant="outline" className="rounded-2xl">View Work</Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-black/60">
              <div className="flex items-center gap-2"><GaugeCircle className="size-4" /> 95+ Lighthouse</div>
              <div className="flex items-center gap-2"><ShieldCheck className="size-4" /> Enterprise Security</div>
              <div className="flex items-center gap-2"><Zap className="size-4" /> <span>0.3s TTI</span></div>
            </div>
          </motion.div>
          <div className="relative">
            <HoverCard3D>
              <motion.div style={{ y, scale }} className="relative rounded-[28px] overflow-hidden border border-black/10 bg-black/5">
                <img
                  src="/WebDevelopment/wd4.jpg"
                  alt="Hero visual – futuristic desk"
                  className="h-[420px] w-full object-cover"
                />
              </motion.div>
            </HoverCard3D>
            <div className="absolute -bottom-6 left-6 right-6 mx-auto grid grid-cols-3 gap-3">
              {["React", "Next.js", "Tailwind"].map((t) => (
                <div key={t} className="rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-center text-sm text-black/70 backdrop-blur">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/10" />
    </section>
  );
}

// ===== TRUST BAR =====
function TrustBar() {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-2xl border border-black/10 bg-black/5 p-6 backdrop-blur">
          <Marquee>
            {["Google", "Meta", "Figma", "AWS", "Vercel", "Stripe", "Shopify"].map((brand) => (
              <span key={brand} className="mx-8 inline-flex items-center gap-2 text-black/60">
                <span className="size-2 rounded-full" style={{ background: COLORS.primary }} /> {brand}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

// ===== SHOWCASE =====
function Showcase() {
  const panels = [
    {
      title: "E‑commerce that accelerates",
      copy: "Optimized cart flows, blazing image CDN, real‑time inventory.",
      img: "/WebDevelopment/wd1.jpg",
      tag: "Shopify / Next.js",
    },
    {
      title: "SaaS dashboards that feel native",
      copy: "Micro‑interactions, optimistic UI, accessible components.",
      img: "/WebDevelopment/wd2.jpg",
      tag: "React / Tailwind",
    },
    {
      title: "Marketing sites that convert",
      copy: "SEO‑perfect, CLS‑stable, story‑driven sections.",
      img: "/WebDevelopment/wd3.jpg",
      tag: "Next 15 / Edge",
    },
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
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-black/5">
              <img src={img} alt={title} className="h-[420px] w-full object-cover" />
            </div>
          </motion.div>
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
            <Badge className="w-fit">{tag}</Badge>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h3>
            <p className="text-black/70 max-w-prose">{copy}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["SSR", "A/B", "i18n", "Analytics"].map((chip) => (
                <span key={chip} className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/70">{chip}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ===== FEATURES =====
function FeaturesGrid() {
  const features = [
    { icon: Zap, title: "Ultra‑fast", copy: "Edge rendering, image optimization, code‑split routes." },
    { icon: ShieldCheck, title: "Secure", copy: "Best‑practice headers, OAuth, managed secrets." },
    { icon: MonitorSmartphone, title: "Responsive", copy: "Fluid typography, adaptive media, touch targets." },
    { icon: Paintbrush, title: "Brand‑first", copy: "Type scales, color systems, grid precision." },
    { icon: Database, title: "Data‑ready", copy: "Postgres, Prisma, Drizzle, cache layers." },
    { icon: Cloud, title: "Cloud native", copy: "Serverless, queues, background jobs, logs." },
  ];
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 md:mb-14 grid gap-4 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold">Everything you need. Nothing you don't.</h2>
          <p className="text-black/70 max-w-2xl mx-auto">A modern stack and battle‑tested patterns so your site stays fast, secure, and stunning under any traffic.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <HoverCard3D key={f.title}>
              <Card className="group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-2xl" style={{ background: "#00000010" }}>
                      <f.icon className="size-5" />
                    </div>
                    <CardTitle>{f.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-black/70 leading-relaxed">{f.copy}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-black/60">
                    <CheckCircle2 className="size-4" /> Production ready
                  </div>
                </CardContent>
              </Card>
            </HoverCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PROCESS =====
function StickyProcess() {
  const steps = [
    { title: "Discover", copy: "We align on goals, audience, KPIs, and brand tone.", icon: SearchIcon },
    { title: "Design", copy: "Wireframes → high‑fidelity mockups with motion in mind.", icon: Paintbrush },
    { title: "Develop", copy: "Accessible, performant React with best‑in‑class DX.", icon: Code },
    { title: "Deploy", copy: "CI/CD, observability, and post‑launch iteration.", icon: Cloud },
  ];
  return (
    <section id="process" className="relative py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="sticky top-24 self-start">
            <h2 className="text-3xl md:text-5xl font-semibold">A seamless process.</h2>
            <p className="mt-4 text-black/70 max-w-md">Transparent steps with real artifacts at every stage. You're always in the loop.</p>
            <div className="mt-6 grid gap-3">
              {steps.map((s) => (
                <div key={s.title} className="flex items-center gap-3 text-black/70">
                  <s.icon className="size-5" /> <span>{s.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-20%" }} className="rounded-3xl border border-black/10 bg-black/5 p-6 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="grid size-12 place-items-center rounded-2xl bg-black/10"><s.icon className="size-6" /></div>
                  <div>
                    <h3 className="text-xl font-semibold">{i + 1}. {s.title}</h3>
                    <p className="mt-1 text-black/70">{s.copy}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[1, 2, 3].map((k) => (
                    <div key={k} className="overflow-hidden rounded-2xl">
                      <img src={`https://images.unsplash.com/photo-150${i}${k}799570-000000000000?q=80&w=1200&auto=format&fit=crop`} alt={`${s.title} sample ${k}`} className="h-28 w-full object-cover hover:scale-105 transition" />
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
function SearchIcon(props) { return <MousePointerClick {...props} />; }

// ===== PACKAGES =====
function Packages() {
  const plans = [
    { name: "Launch", price: "₹79k", tagline: "Perfect for startups", features: ["5 pages", "Responsive design", "Basic SEO", "Contact form", "1 round revisions"] },
    { name: "Scale", price: "₹1.49L", tagline: "Best for growing brands", featured: true, features: ["10 pages", "A/B tested sections", "CMS with blog", "Analytics & heatmaps", "2 rounds revisions"] },
    { name: "Enterprise", price: "Custom", tagline: "Performance at scale", features: ["Multi‑region edge", "SLA & monitoring", "Design system", "Security review", "Priority support"] },
  ];
  return (
    <section id="packages" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold">Transparent pricing.</h2>
          <p className="mt-3 text-black/70">Choose a pace that fits your roadmap. No surprises.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <HoverCard3D key={p.name}>
              <Card className={`group ${p.featured ? "bg-black text-white" : "bg-black/5 text-black"}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{p.name}</CardTitle>
                    {p.featured && <span className="rounded-full bg-black px-3 py-1 text-xs text-white">Popular</span>}
                  </div>
                  <div className="mt-2 text-4xl font-semibold">{p.price}</div>
                  <p className={`text-sm ${p.featured ? "text-white/80" : "text-black/70"}`}>{p.tagline}</p>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2"><CheckCircle2 className="size-4" /> {f}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button className={`w-full ${p.featured ? "bg-white text-black hover:bg-white/90" : "bg-[#CC0000] text-white hover:bg-[#b30000]"}`}>Choose {p.name}</Button>
                  </div>
                </CardContent>
              </Card>
            </HoverCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== TECH STACK =====
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
          <h2 className="text-3xl md:text-5xl font-semibold">Modern, reliable tech.</h2>
          <p className="mt-3 text-black/70">Built to last. Built to scale.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.label} className="rounded-3xl border border-black/10 bg-black/5 p-6 backdrop-blur">
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

// ===== TESTIMONIALS =====
function Testimonials() {
  const quotes = [
    { name: "Anaya R.", role: "Founder, D2C brand", quote: "The site loads unbelievably fast and our conversion rate jumped 27% within 3 weeks.", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop" },
    { name: "Harsh V.", role: "Head of Product, SaaS", quote: "Micro‑interactions feel native. Our team loves how maintainable the codebase is.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" },
    { name: "Mira K.", role: "CMO, Fintech", quote: "We shipped in half the time and the SEO gains were immediate.", img: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=800&auto=format&fit=crop" },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold">Loved by fast‑moving teams.</h2>
          <p className="mt-3 text-black/70">Real results. Real stories.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <Card key={q.name} className="p-1">
              <div className="overflow-hidden rounded-[22px] bg-black/5">
                <img src={q.img} alt={q.name} className="h-52 w-full object-cover" />
              </div>
              <CardContent className="pt-5">
                <p className="text-black/80 leading-relaxed">“{q.quote}”</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-black/60">
                  <div className="size-7 rounded-full bg-black/10" />
                  <div>
                    <div className="font-medium text-black">{q.name}</div>
                    <div>{q.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== FAQ =====
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
          <h2 className="text-3xl md:text-4xl font-semibold">Questions, answered.</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-black/10 bg-black/5">
              <button className="w-full px-5 py-4 text-left flex items-center justify-between" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="font-medium">{f.q}</span>
                <span className="text-black/60">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-black/70 text-sm leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== CONTACT =====
function ContactCTA() {
  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <div className="rounded-3xl border border-black/10 bg-black/5 p-8 md:p-12 backdrop-blur">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">Let's build your next launch.</h2>
              <p className="mt-3 text-black/70">Tell us about your goals and we'll propose the cleanest path to ship.</p>
              <div className="mt-6 flex items-center gap-4 text-black/70"><Mail className="size-5" /> hello@oorjaverse.dev</div>
              <div className="mt-3 flex items-center gap-4 text-black/70"><Linkedin className="size-5" /> @oorjaverse</div>
              <div className="mt-3 flex items-center gap-4 text-black/70"><Instagram className="size-5" /> @oorjaverse</div>
            </div>
            <form className="grid gap-4">
              <Input placeholder="Your name" />
              <Input placeholder="Email" />
              <Input placeholder="Company" />
              <Textarea placeholder="What are you building?" className="min-h-[120px]" />
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

// ===== FOOTER =====
function SiteFooter() {
  return (
    <footer className="border-t border-black/10 py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="text-sm text-black/60">© {new Date().getFullYear()} Oorjaverse. Built with love in React.</div>
          <div className="flex items-center justify-start md:justify-end gap-4 text-sm text-black/70">
            <a href="#" className="hover:text-black flex items-center gap-1"><Github className="size-4" /> GitHub</a>
            <a href="#" className="hover:text-black flex items-center gap-1"><Linkedin className="size-4" /> LinkedIn</a>
            <a href="#" className="hover:text-black flex items-center gap-1"><Globe2 className="size-4" /> Policies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
