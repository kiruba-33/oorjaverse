// src/pages/services/AppDevelopment.jsx
import React, { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  FaReact,
  FaNode,
  FaAws,
  FaAndroid,
  FaApple,
  FaDatabase,
  FaFigma,
  FaGithub,
  FaShieldAlt,
  FaCogs,
  FaRocket,
  FaCheckCircle,
  FaLongArrowAltRight,
  FaQuestionCircle,
  FaQuoteLeft,
  FaQuoteRight,
  FaEnvelopeOpenText,
  FaPhoneAlt,
  FaGooglePlay,
  FaAppStoreIos,
  FaCloudUploadAlt,
  FaChartLine,
} from "react-icons/fa";

/**
 * OORJAVERSE PRIVATE LIMITED — App Development
 * Path: /services/app-development
 *
 * Design palette:
 *  - White: bg-white
 *  - Black: #0b0b0b (text-neutral-900 or custom)
 *  - Red:   #ef4444 / #dc2626
 *  - Yellow:#f59e0b / #fbbf24
 *
 * Tailwind + Framer Motion only. No external images.
 * Animations are transform/opacity only with will-change hints for buttery performance.
 * Honors prefers-reduced-motion to keep things accessible & lag-free.
 */

/* ------------------------------ Color Tokens ------------------------------ */
// Tailwind handles utility classes, but we keep tokens here for inline SVGs.
const COLORS = {
  red: "#ef4444", // red-500
  redDark: "#dc2626", // red-600
  redSoft: "#fee2e2", // red-100
  yellow: "#f59e0b", // amber-500
  yellowSoft: "#fef3c7", // amber-100
  black: "#0b0b0b",
  white: "#ffffff",
  slate700: "#334155",
  slate900: "#0f172a",
};

/* --------------------------- Animation Presets ---------------------------- */
const duration = 0.6;
const springy = { type: "spring", stiffness: 260, damping: 28 };
const hoverSpring = { type: "spring", stiffness: 360, damping: 24 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.25 },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.3 },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.25 },
});

const staggerParent = (delay = 0) => ({
  initial: {},
  whileInView: { transition: { staggerChildren: 0.06, delayChildren: delay } },
  viewport: { once: true, amount: 0.2 },
});

const itemFade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardHover = {
  whileHover: { y: -6, scale: 1.01, transition: hoverSpring },
  whileTap: { scale: 0.995 },
};

/* ------------------------------ UI Fragments ------------------------------ */

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-16 md:py-20 ${className}`}>
    <div className="max-w-7xl mx-auto px-6 md:px-10">{children}</div>
  </section>
);

const Pill = ({ children, tone = "red" }) => {
  const tones = {
    red: "bg-red-50 text-red-700 border-red-200",
    yellow: "bg-amber-50 text-amber-700 border-amber-200",
    dark: "bg-black text-white border-neutral-800",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

const Stat = ({ value, label }) => (
  <motion.div
    {...scaleIn(0.05)}
    className="flex flex-col items-start rounded-2xl bg-white/90 backdrop-blur border border-neutral-200 p-6 shadow-sm"
    style={{ willChange: "transform, opacity" }}
  >
    <div className="text-3xl md:text-4xl font-extrabold text-neutral-900">{value}</div>
    <div className="mt-2 text-neutral-600">{label}</div>
  </motion.div>
);

const Badge = ({ children }) => (
  <span className="rounded-lg border border-neutral-200 bg-white px-3 py-1 text-sm font-medium text-neutral-800 shadow-sm">
    {children}
  </span>
);

const SoftRing = ({ className = "", color = COLORS.red }) => (
  <svg
    className={`absolute ${className}`}
    width="700"
    height="700"
    viewBox="0 0 700 700"
    aria-hidden
  >
    <defs>
      <radialGradient id="ring" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.18" />
        <stop offset="70%" stopColor={color} stopOpacity="0.06" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="350" cy="350" r="320" fill="url(#ring)" />
  </svg>
);

const GradientBlob = ({ className = "", variant = "red" }) => {
  const defs =
    variant === "yellow" ? (
      <radialGradient id="blob" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={COLORS.yellow} stopOpacity="0.25" />
        <stop offset="60%" stopColor={COLORS.yellow} stopOpacity="0.12" />
        <stop offset="100%" stopColor={COLORS.yellow} stopOpacity="0" />
      </radialGradient>
    ) : (
      <radialGradient id="blob" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={COLORS.red} stopOpacity="0.25" />
        <stop offset="60%" stopColor={COLORS.red} stopOpacity="0.12" />
        <stop offset="100%" stopColor={COLORS.red} stopOpacity="0" />
      </radialGradient>
    );

  return (
    <svg
      className={`pointer-events-none absolute -z-10 ${className}`}
      width="900"
      height="900"
      viewBox="0 0 900 900"
      aria-hidden
    >
      <defs>{defs}</defs>
      <circle cx="450" cy="450" r="420" fill="url(#blob)" />
    </svg>
  );
};

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent my-10" />
);

/* ---------------------------- Decorative Frames --------------------------- */

const PhoneFrame = ({ children, accent = "red" }) => {
  const border =
    accent === "yellow"
      ? "border-amber-300/70 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.35)]"
      : "border-red-300/70 shadow-[0_10px_30px_-10px_rgba(239,68,68,0.35)]";
  return (
    <div
      className={`relative mx-auto aspect-[9/19] w-full max-w-[320px] rounded-[32px] border ${border} bg-white overflow-hidden`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-neutral-200/60 rounded-b-2xl" />
      {children}
    </div>
  );
};

const AppCard = ({ title, subtitle, color = "red" }) => {
  const bg =
    color === "yellow"
      ? "from-amber-100 via-white to-white"
      : "from-red-100 via-white to-white";
  const dot = color === "yellow" ? "bg-amber-400" : "bg-red-500";

  return (
    <div className={`rounded-xl border border-neutral-200 bg-gradient-to-b ${bg} p-4`}>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <div className="font-semibold text-neutral-800">{title}</div>
      </div>
      <p className="mt-2 text-sm text-neutral-600">{subtitle}</p>
      <div className="mt-3 h-24 rounded-lg bg-white border border-neutral-100 grid place-items-center text-neutral-400 text-xs">
        Preview
      </div>
    </div>
  );
};

/* --------------------------------- Hero ----------------------------------- */

const Hero = () => {
  const heroRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 0.72]);

  return (
    <div ref={heroRef} className="relative pt-28 md:pt-36 pb-16 overflow-hidden">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-amber-50/40" />
      <GradientBlob className="-top-32 -left-40 w-[46rem] h-[46rem]" variant="red" />
      <GradientBlob className="top-24 -right-44 w-[40rem] h-[40rem]" variant="yellow" />
      <SoftRing className="-bottom-20 -left-24 w-[38rem] h-[38rem]" color={COLORS.red} />
      <SoftRing className="-top-28 right-0 w-[44rem] h-[44rem]" color={COLORS.yellow} />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div style={{ y, opacity }} className="will-change-transform will-change-opacity">
          <Pill tone="red">
            <FaRocket /> OORJAVERSE PRIVATE LIMITED
          </Pill>

          <h1 className="mt-4 text-3xl md:text-6xl font-extrabold tracking-tight text-neutral-900">
            App Development—From Idea to Impact
          </h1>

          <p className="mt-4 md:mt-6 max-w-3xl text-neutral-700 text-lg leading-relaxed">
            We design and build high-performance mobile applications that are secure,
            scalable, and delightful to use—crafted for rapid launch and long-term growth.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-bold text-white shadow hover:bg-red-700"
            >
              Our Process <FaLongArrowAltRight />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 font-bold text-neutral-900 hover:bg-amber-50"
            >
              Get a Quote
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat label="Avg. Time to MVP" value="8–12 Weeks" />
            <Stat label="Store Ratings" value="4.7★" />
            <Stat label="Crash-free Sessions" value="99.9%" />
            <Stat label="Release Cadence" value="Weekly" />
          </div>

          {/* Tech badges */}
          <motion.div
            {...staggerParent(0.14)}
            className="mt-10 flex flex-wrap items-center gap-3 text-neutral-800"
          >
            {[
              [<FaReact key="r" />, "React Native"],
              [<FaApple key="a" />, "iOS"],
              [<FaAndroid key="an" />, "Android"],
              [<FaNode key="n" />, "Node APIs"],
              [<FaAws key="aw" />, "AWS"],
              [<FaDatabase key="db" />, "PostgreSQL"],
              [<FaFigma key="f" />, "Figma"],
              [<FaGithub key="g" />, "CI/CD"],
            ].map(([icon, label], i) => (
              <motion.div key={i} variants={itemFade} className="will-change-transform">
                <Badge>
                  <span className="-mt-1 inline-block">{icon}</span> {label}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Phone mockups */}
      <div className="mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div {...fadeUp(0.05)} {...cardHover}>
              <PhoneFrame accent="red">
                <div className="h-full w-full p-4 bg-gradient-to-b from-white via-amber-50/30 to-white">
                  <AppCard title="Onboarding" subtitle="Fast, delightful, friction-less" />
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <AppCard title="Sign In" subtitle="Biometric + OTP" />
                    <AppCard title="Profile" subtitle="Preferences & Themes" color="yellow" />
                  </div>
                </div>
              </PhoneFrame>
            </motion.div>
            <motion.div {...fadeUp(0.1)} {...cardHover}>
              <PhoneFrame accent="yellow">
                <div className="h-full w-full p-4 bg-gradient-to-b from-amber-50/50 via-white to-white">
                  <AppCard title="Dashboard" subtitle="KPIs & quick actions" color="yellow" />
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <AppCard title="Insights" subtitle="Charts & trends" />
                    <AppCard title="Messages" subtitle="Real-time updates" color="yellow" />
                  </div>
                </div>
              </PhoneFrame>
            </motion.div>
            <motion.div {...fadeUp(0.15)} {...cardHover}>
              <PhoneFrame accent="red">
                <div className="h-full w-full p-4 bg-gradient-to-b from-white via-red-50/30 to-white">
                  <AppCard title="Payments" subtitle="UPI / Cards / Wallets" />
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <AppCard title="Rewards" subtitle="Gamified growth" color="yellow" />
                    <AppCard title="Settings" subtitle="Secure & simple" />
                  </div>
                </div>
              </PhoneFrame>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Deliverables ------------------------------ */

const FeatureCard = ({ icon: Icon, title, points, accent = "red", delay = 0 }) => {
  const chip =
    accent === "yellow"
      ? "bg-amber-100 text-amber-700"
      : "bg-red-100 text-red-700";

  return (
    <motion.div
      {...fadeUp(delay)}
      {...cardHover}
      className="h-full rounded-2xl bg-white/90 backdrop-blur border border-neutral-200 p-6 shadow-sm will-change-transform"
    >
      <div className="flex items-center gap-3">
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${chip}`}>
          <Icon className="text-xl" />
        </span>
        <h3 className="text-lg font-extrabold text-neutral-900">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-neutral-700">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <FaCheckCircle className="mt-1 shrink-0 text-red-500" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

/* --------------------------------- Process -------------------------------- */

const Step = ({ n, title, desc }) => (
  <motion.div {...fadeUp(n * 0.04)} className="relative pl-10 pb-10 last:pb-0">
    <div className="absolute left-0 top-0 h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
      {n}
    </div>
    <div className="absolute left-5 top-10 bottom-0 w-px bg-neutral-200" />
    <h4 className="text-xl font-extrabold text-neutral-900">{title}</h4>
    <p className="mt-2 text-neutral-700 leading-relaxed">{desc}</p>
  </motion.div>
);

/* --------------------------------- Cases ---------------------------------- */

const CaseCard = ({ title, body, metrics, cta }) => (
  <motion.article
    {...fadeUp(0.05)}
    {...cardHover}
    className="group rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur p-6 shadow-sm"
  >
    <div className="relative overflow-hidden rounded-xl h-40 bg-gradient-to-tr from-amber-100 via-white to-red-50">
      <GradientBlob className="w-64 h-64 -top-10 -right-10" variant="red" />
      <GradientBlob className="w-64 h-64 -bottom-10 -left-10" variant="yellow" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex items-center gap-4 text-neutral-800 opacity-70">
          <FaReact className="text-2xl" />
          <FaNode className="text-2xl" />
          <FaAws className="text-2xl" />
        </div>
      </div>
    </div>

    <h3 className="mt-5 text-xl font-extrabold text-neutral-900">{title}</h3>
    <p className="mt-2 text-neutral-700 leading-relaxed">{body}</p>

    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="rounded-lg border border-neutral-200 bg-amber-50 p-3 text-center"
        >
          <div className="text-lg font-bold text-neutral-900">{m.value}</div>
          <div className="text-xs text-neutral-600">{m.label}</div>
        </div>
      ))}
    </div>

    <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-red-700">
      {cta} <FaLongArrowAltRight />
    </button>
  </motion.article>
);

/* ---------------------------------- FAQ ----------------------------------- */

const FAQItem = ({ q, a, i }) => (
  <motion.details
    {...fadeUp(0.02 * i)}
    className="group rounded-xl border border-neutral-200 bg-white/90 p-5"
  >
    <summary className="flex cursor-pointer list-none items-start gap-3 text-neutral-900">
      <FaQuestionCircle className="mt-1 shrink-0 text-yellow-500" />
      <span className="text-base md:text-lg font-bold">{q}</span>
    </summary>
    <p className="mt-3 text-neutral-700 leading-relaxed">{a}</p>
  </motion.details>
);

/* ------------------------------- Testimonial ------------------------------ */

const Testimonial = ({ quote, by, role }) => (
  <motion.blockquote
    {...fadeUp(0.05)}
    {...cardHover}
    className="rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-sm"
  >
    <div className="text-red-600">
      <FaQuoteLeft />
    </div>
    <p className="mt-3 text-neutral-800 leading-relaxed">{quote}</p>
    <div className="mt-4 flex items-center gap-3 text-neutral-800">
      <div className="rounded-full bg-amber-200/70 h-10 w-10 grid place-items-center font-bold text-neutral-900">
        {by
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)}
      </div>
      <div>
        <div className="font-semibold">{by}</div>
        <div className="text-sm text-neutral-600">{role}</div>
      </div>
    </div>
    <div className="mt-3 text-yellow-500">
      <FaQuoteRight />
    </div>
  </motion.blockquote>
);

/* ------------------------------- Floating CTA ----------------------------- */

const FloatingCTA = () => (
  <div className="fixed bottom-4 right-4 z-[60]">
    <a
      href="/contact"
      className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white font-bold shadow-xl hover:bg-neutral-900"
    >
      <FaEnvelopeOpenText /> Get Proposal
    </a>
  </div>
);

/* --------------------------------- Page ----------------------------------- */

export default function AppDevelopment() {
  const features = useMemo(
    () => [
      {
        icon: FaCogs,
        title: "Engineering Excellence",
        accent: "red",
        points: [
          "React Native / Native iOS & Android",
          "Modular architecture, feature flags",
          "Automated tests: unit, UI & snapshot",
        ],
      },
      {
        icon: FaShieldAlt,
        title: "Security & Compliance",
        accent: "yellow",
        points: [
          "OWASP MASVS practices & code reviews",
          "Encrypted storage & secure auth flows",
          "GDPR-ready analytics & consent",
        ],
      },
      {
        icon: FaChartLine,
        title: "Performance First",
        accent: "red",
        points: [
          "60 FPS animations & smooth gestures",
          "App size optimization & on-demand modules",
          "Offline-first strategies & caching",
        ],
      },
      {
        icon: FaRocket,
        title: "Launch & Growth",
        accent: "yellow",
        points: [
          "ASO for App Store & Play Store",
          "Observability: logs, metrics, crashlytics",
          "Data-driven roadmaps & A/B testing",
        ],
      },
    ],
    []
  );

  return (
    <main className="relative overflow-hidden">
      {/* HERO */}
      <Hero />

      {/* DELIVERABLES */}
      <Section id="capabilities">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            What We Deliver
          </h2>
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-3xl leading-relaxed">
            End-to-end ownership—from product strategy, UI/UX and engineering to launch,
            analytics and continuous iteration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FeatureCard
              key={i}
              icon={f.icon}
              title={f.title}
              points={f.points}
              accent={f.accent}
              delay={i * 0.05}
            />
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="bg-gradient-to-b from-white via-amber-50/30 to-white">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            A Proven, Transparent Process
          </h2>
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-3xl leading-relaxed">
            Our approach reduces risk, shortens time-to-market, and keeps you in the loop at
            every milestone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Step
              n={1}
              title="Discovery & Scope"
              desc="Stakeholder interviews, market research, success metrics, scope definition,
              and a delivery roadmap tailored to your budget and timeline."
            />
            <Step
              n={2}
              title="UX Prototyping"
              desc="High-fidelity designs and an interactive prototype you can test early with
              real users to validate flows and core assumptions."
            />
            <Step
              n={3}
              title="Agile Development"
              desc="Short sprints with demos each week. We build a scalable foundation:
              modular code, clean architecture, and automated testing."
            />
            <Step
              n={4}
              title="Security & Quality"
              desc="OWASP-aligned reviews, performance audits, accessibility checks, and device
              lab testing to ensure reliability across environments."
            />
            <Step
              n={5}
              title="Launch & Growth"
              desc="App Store/Play Store publishing, analytics, growth experiments, and a
              roadmap for features based on real usage data."
            />
          </div>

          <motion.div
            {...scaleIn(0.08)}
            className="rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-sm"
          >
            <h4 className="text-lg font-extrabold text-neutral-900">Delivery Toolkit</h4>
            <ul className="mt-4 space-y-3 text-neutral-700">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-red-500" /> Jira/ClickUp for sprint
                tracking with burn-down charts
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-red-500" /> TestFlight & internal
                tracks for staged rollouts
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-red-500" /> Crashlytics & performance
                monitoring dashboards
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-red-500" /> Automated CI/CD with
                linting & unit/UI tests
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="mt-1 text-red-500" /> Security reviews &
                compliance checklists
              </li>
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <div className="font-semibold text-neutral-900">Store Support</div>
                <div className="mt-2 flex items-center gap-3 text-neutral-800">
                  <FaAppStoreIos /> <FaGooglePlay />
                </div>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                <div className="font-semibold text-neutral-900">Deploy & Scale</div>
                <div className="mt-2 flex items-center gap-3 text-neutral-800">
                  <FaAws /> <FaCloudUploadAlt />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* HIGHLIGHTS */}
      <Section id="highlights">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            Engineered for Performance & Scale
          </h2>
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-3xl leading-relaxed">
            From architecture to analytics, we build with growth in mind.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: FaChartLine,
              title: "Performance First",
              bullets: [
                "GPU-friendly 60 FPS animations",
                "Bundle & image optimization",
                "Offline-first with cache strategies",
              ],
            },
            {
              icon: FaShieldAlt,
              title: "Security Built-In",
              bullets: [
                "Keychain/Keystore secure storage",
                "Biometrics, 2FA, OAuth2/OIDC",
                "Pen-testing guidance & remediation",
              ],
            },
            {
              icon: FaCogs,
              title: "Maintainable Codebase",
              bullets: [
                "Clean architecture & SOLID principles",
                "Feature flags & remote config",
                "Observability baked in",
              ],
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.05 * i)}
              {...cardHover}
              className="rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-sm will-change-transform"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <f.icon className="text-xl" />
                </span>
                <h3 className="text-lg font-extrabold text-neutral-900">{f.title}</h3>
              </div>
              <ul className="mt-4 space-y-2 text-neutral-700">
                {f.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <FaCheckCircle className="mt-1 text-red-500" /> {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CASE STUDIES */}
      <Section id="case-studies" className="bg-gradient-to-b from-white via-red-50/30 to-white">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            Recent Work & Outcomes
          </h2>
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-3xl leading-relaxed">
            A snapshot of how we turn concepts into high-impact products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <CaseCard
            title="Fintech Wallet & UPI Layer"
            body="A sleek mobile wallet with real-time risk checks, biometric auth, and a rewards engine."
            cta="See breakdown"
            metrics={[
              { label: "DAU Growth", value: "+220%" },
              { label: "Crash-free", value: "99.95%" },
              { label: "MVP Time", value: "10 wks" },
              { label: "Ratings", value: "4.8★" },
            ]}
          />
          <CaseCard
            title="Health & Wellness Tracker"
            body="Cross-platform app with device sync, offline logs, and a personalized insights engine."
            cta="See breakdown"
            metrics={[
              { label: "Retention (D30)", value: "42%" },
              { label: "Load Time", value: "1.1s" },
              { label: "Crashes", value: "<0.1%" },
              { label: "Reviews", value: "9k+" },
            ]}
          />
          <CaseCard
            title="B2B Field Service Suite"
            body="Secure enterprise app with role-based access, route optimization, and real-time dashboards."
            cta="See breakdown"
            metrics={[
              { label: "Ops Cost", value: "-31%" },
              { label: "Tickets/Day", value: "+58%" },
              { label: "NPS", value: "72" },
              { label: "Releases", value: "Weekly" },
            ]}
          />
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            Flexible Engagement Models
          </h2>
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-3xl leading-relaxed">
            Start lean, scale confidently. We’ll recommend the right model for your stage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "MVP Sprint",
              label: "Best for validation",
              bullets: ["Fixed scope", "8–12 week delivery", "Design + Build + QA", "Launch support"],
              tone: "red",
            },
            {
              name: "Dedicated Squad",
              label: "Scale with velocity",
              bullets: ["Embedded team", "Weekly sprints", "Roadmap ownership", "CI/CD & monitoring"],
              tone: "yellow",
            },
            {
              name: "Support & Growth",
              label: "Post-launch success",
              bullets: ["SLA-backed support", "A/B testing", "Performance tuning", "Feature iterations"],
              tone: "red",
            },
          ].map((p, i) => {
            const bg =
              p.tone === "yellow"
                ? "bg-amber-50 border-amber-200"
                : "bg-red-50 border-red-200";
            const btn =
              p.tone === "yellow"
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-red-600 hover:bg-red-700";
            return (
              <motion.div
                key={i}
                {...fadeUp(0.05 * i)}
                {...cardHover}
                className={`rounded-2xl border ${bg} p-6 shadow-sm will-change-transform`}
              >
                <h3 className="text-xl font-extrabold text-neutral-900">{p.name}</h3>
                <div className="mt-2 text-neutral-800">{p.label}</div>
                <ul className="mt-4 space-y-2 text-neutral-700">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <FaCheckCircle className="mt-1 text-red-500" /> {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className={`mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-bold text-white ${btn}`}
                >
                  Request Estimate <FaLongArrowAltRight />
                </a>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faqs" className="bg-gradient-to-b from-white via-amber-50/30 to-white">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            FAQs
          </h2>
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-3xl leading-relaxed">
            Straight answers to common questions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Do you build native or cross-platform apps?",
              a: "Both. We recommend React Native for speed and shared code, and native iOS/Android where platform-specific performance or capabilities demand it.",
            },
            {
              q: "How much does an app cost?",
              a: "Costs vary by scope and complexity. We offer fixed-price MVPs and squad-based monthly retainers to match your stage.",
            },
            {
              q: "Can you help with publishing and ASO?",
              a: "Yes. We handle signing, provisioning, store listings, screenshots, and metadata optimization to maximize discoverability.",
            },
            {
              q: "What about maintenance after launch?",
              a: "We offer SLAs with monthly updates, monitoring, crash resolution, OS migration support, and security patches.",
            },
          ].map((f, i) => (
            <FAQItem key={i} i={i} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            What Clients Say
          </h2>
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-3xl leading-relaxed">
            Proof that we deliver—on time, on budget, and above expectations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial
            quote="OORJAVERSE turned our sketch into a polished app in under 10 weeks. The weekly demos were a game-changer."
            by="Priya Sharma"
            role="Product Lead, Fintech Startup"
          />
          <Testimonial
            quote="Performance, security, and design—nailed. Our ratings jumped from 3.2 to 4.7★ within two releases."
            by="Rahul Mehta"
            role="CTO, Enterprise SaaS"
          />
          <Testimonial
            quote="They proactively improved our roadmap with data-backed suggestions. Exceptional transparency and craft."
            by="Aarav Iyer"
            role="Founder, HealthTech"
          />
        </div>
      </Section>

      {/* CONTACT CTA */}
      <section className="relative py-16 md:py-20">
        <GradientBlob className="w-[34rem] h-[34rem] -top-10 right-0" variant="yellow" />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            {...scaleIn(0.05)}
            className="rounded-3xl bg-gradient-to-r from-black via-neutral-900 to-black p-8 md:p-12 text-white shadow-xl"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Pill tone="yellow">
                  <FaRocket /> Ready to launch
                </Pill>
                <h3 className="mt-3 text-2xl md:text-4xl font-extrabold">
                  Let’s build your next standout app.
                </h3>
                <p className="mt-3 text-white/85">
                  Share your goals and constraints—we’ll respond with an actionable plan,
                  timeline, and a fair estimate.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white shadow hover:bg-red-700"
                >
                  <FaEnvelopeOpenText /> Contact Us
                </a>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-bold text-white hover:bg-white/10"
                >
                  <FaPhoneAlt /> +91-XXXX-XXX-XXX
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FloatingCTA />
    </main>
  );
}
