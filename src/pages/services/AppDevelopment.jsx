// src/pages/services/AppDevelopment.jsx
import React, { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
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

/* -------------------------------- Colors -------------------------------- */
const COLORS = {
  red: "#ef4444",
  yellow: "#f59e0b",
};

/* ------------------------------ Animations ------------------------------ */
const duration = 0.6;

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

const cardHover = {
  whileHover: { y: -6, scale: 1.01 },
  transition: { type: "spring", stiffness: 260, damping: 20 },
};

/* ------------------------------ UI Small Components ------------------------------ */

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-16 md:py-20 ${className}`}>
    <div className="max-w-7xl mx-auto px-6 md:px-10">{children}</div>
  </section>
);

const Pill = ({ children, tone = "red" }) => {
  const styles =
    tone === "yellow"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {children}
    </span>
  );
};

const Stat = ({ value, label }) => (
  <motion.div
    {...scaleIn(0.05)}
    className="rounded-2xl bg-white/90 border border-neutral-200 p-6 shadow-sm"
  >
    <div className="text-3xl md:text-4xl font-extrabold text-neutral-900">
      {value}
    </div>
    <div className="mt-2 text-neutral-600">{label}</div>
  </motion.div>
);

const PhoneFrame = ({ children, accent = "red" }) => {
  const border =
    accent === "yellow"
      ? "border-amber-300 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.35)]"
      : "border-red-300 shadow-[0_10px_30px_-10px_rgba(239,68,68,0.35)]";

  return (
    <div
      className={`relative mx-auto aspect-[9/19] w-full max-w-[300px] rounded-[32px] border bg-white overflow-hidden ${border}`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-neutral-200 rounded-b-2xl" />
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
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
        <div className="font-semibold text-neutral-800">{title}</div>
      </div>
      <p className="text-sm mt-1 text-neutral-600">{subtitle}</p>
      <div className="mt-3 h-24 rounded-lg bg-white border border-neutral-100 text-xs grid place-items-center text-neutral-400">
        Preview
      </div>
    </div>
  );
};

/* ------------------------------ Hero Section ------------------------------ */

const Hero = () => {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.75]);

  return (
    <div ref={heroRef} className="relative pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div style={{ y, opacity }}>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* LEFT TEXT */}
            <div>
              <Pill tone="red">
                <FaRocket /> OORJAVERSE PRIVATE LIMITED
              </Pill>

              <h1 className="mt-4 text-3xl md:text-6xl font-extrabold text-neutral-900">
                App Development — From Idea to Impact
              </h1>

              <p className="mt-4 text-neutral-700 text-lg max-w-2xl leading-relaxed">
                High-performance mobile apps built with security, speed, and scalability in mind.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#process"
                  className="bg-red-600 hover:bg-red-700 px-5 py-3 text-white font-bold rounded-lg flex items-center gap-2"
                >
                  Our Process <FaLongArrowAltRight />
                </a>

                <a
                  href="/contact"
                  className="border border-neutral-300 px-5 py-3 font-bold rounded-lg"
                >
                  Get a Quote
                </a>
              </div>

              {/* KPIs */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 gap-4">
                <Stat value="8–12 Weeks" label="MVP Delivery" />
                <Stat value="4.7★" label="Store Ratings" />
                <Stat value="99.9%" label="Crash-free" />
                <Stat value="Weekly" label="Releases" />
              </div>
            </div>

            {/* RIGHT SIDE — BIG BOX + 3 SMALL BOXES */}
            <div>
              <motion.div
                {...scaleIn(0.05)}
                className="rounded-3xl border border-neutral-200 bg-white shadow-xl p-6"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <PhoneFrame accent="red">
                    <div className="p-4">
                      <AppCard title="Onboarding" subtitle="Smooth & fast" />
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <AppCard title="Login" subtitle="OTP / Biometric" />
                        <AppCard title="Profile" subtitle="Themes" color="yellow" />
                      </div>
                    </div>
                  </PhoneFrame>

                  <PhoneFrame accent="yellow">
                    <div className="p-4">
                      <AppCard title="Dashboard" subtitle="Quick KPIs" color="yellow" />
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <AppCard title="Insights" subtitle="Charts" />
                        <AppCard title="Messages" subtitle="Realtime" color="yellow" />
                      </div>
                    </div>
                  </PhoneFrame>

                  <PhoneFrame accent="red">
                    <div className="p-4">
                      <AppCard title="Payments" subtitle="UPI / Cards" />
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <AppCard title="Rewards" subtitle="Gamify" color="yellow" />
                        <AppCard title="Settings" subtitle="Secure" />
                      </div>
                    </div>
                  </PhoneFrame>
                </div>
              </motion.div>

              {/* SMALL PREVIEW IMAGES */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <img src="/Cloud/c1.jpg" className="rounded-xl border object-cover h-24" />
                <img src="/Cloud/c2.jpg" className="rounded-xl border object-cover h-24" />
                <img src="/Cloud/c3.png" className="rounded-xl border object-cover h-24" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ------------------------------ Step Component (FIXED) ------------------------------ */

const Step = ({ n, title, desc }) => (
  <motion.div {...fadeUp(n * 0.05)} className="relative pl-10 pb-10">
    <div className="absolute top-0 left-0 h-10 w-10 bg-red-600 text-white flex items-center justify-center rounded-full font-bold">
      {n}
    </div>

    <div className="absolute left-5 top-10 bottom-0 w-px bg-neutral-300" />

    <h4 className="text-xl font-extrabold text-neutral-900">{title}</h4>
    <p className="mt-2 text-neutral-700 leading-relaxed">{desc}</p>
  </motion.div>
);

/* ------------------------------ Deliverables Cards ------------------------------ */

const FeatureCard = ({ icon: Icon, title, points, accent = "red", delay = 0 }) => {
  const chip =
    accent === "yellow"
      ? "bg-amber-100 text-amber-700"
      : "bg-red-100 text-red-700";

  return (
    <motion.div
      {...fadeUp(delay)}
      {...cardHover}
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className={`h-12 w-12 grid place-items-center rounded-xl ${chip}`}>
          <Icon className="text-xl" />
        </span>
        <h3 className="font-extrabold text-lg">{title}</h3>
      </div>

      <ul className="mt-3 space-y-2 text-neutral-700">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <FaCheckCircle className="text-red-500 mt-1" />
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

/* ------------------------------ Case Studies ------------------------------ */

const CaseCard = ({ title, body, metrics, cta }) => (
  <motion.article
    {...fadeUp(0.05)}
    {...cardHover}
    className="rounded-2xl bg-white p-6 border shadow-sm"
  >
    <div className="rounded-xl h-40 bg-gradient-to-tr from-amber-100 via-white to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 grid place-items-center opacity-70 text-neutral-800">
        <div className="flex items-center gap-4 text-2xl">
          <FaReact />
          <FaNode />
          <FaAws />
        </div>
      </div>
    </div>

    <h3 className="mt-5 text-xl font-extrabold">{title}</h3>
    <p className="text-neutral-700 mt-2">{body}</p>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="rounded-lg bg-amber-50 border border-neutral-200 p-3 text-center"
        >
          <div className="text-lg font-bold">{m.value}</div>
          <div className="text-xs text-neutral-600">{m.label}</div>
        </div>
      ))}
    </div>

    <button className="mt-5 bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded-lg flex items-center gap-2">
      {cta} <FaLongArrowAltRight />
    </button>
  </motion.article>
);

/* ------------------------------ FAQ ------------------------------ */

const FAQItem = ({ q, a, i }) => (
  <motion.details
    {...fadeUp(i * 0.05)}
    className="border rounded-xl p-5 bg-white shadow-sm"
  >
    <summary className="flex items-center gap-2 cursor-pointer text-lg font-bold">
      <FaQuestionCircle className="text-yellow-500" />
      {q}
    </summary>
    <p className="mt-2 text-neutral-700">{a}</p>
  </motion.details>
);

/* ------------------------------ Testimonials ------------------------------ */

const Testimonial = ({ quote, by, role }) => (
  <motion.blockquote
    {...fadeUp(0.05)}
    {...cardHover}
    className="rounded-2xl bg-white p-6 border shadow-sm"
  >
    <FaQuoteLeft className="text-red-600" />
    <p className="mt-3 text-neutral-800">{quote}</p>

    <div className="flex items-center gap-3 mt-4">
      <div className="h-10 w-10 bg-amber-200/70 rounded-full grid place-items-center font-bold">
        {by
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)}
      </div>
      <div>
        <div className="font-bold">{by}</div>
        <div className="text-sm text-neutral-600">{role}</div>
      </div>
    </div>

    <FaQuoteRight className="text-yellow-500 mt-3" />
  </motion.blockquote>
);

/* ------------------------------ Floating CTA ------------------------------ */

const FloatingCTA = () => (
  <div className="fixed bottom-4 right-4 z-[60]">
    <a
      href="/contact"
      className="bg-black text-white px-5 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-neutral-900"
    >
      <FaEnvelopeOpenText /> Get Proposal
    </a>
  </div>
);

/* ------------------------------ MAIN PAGE ------------------------------ */

export default function AppDevelopment() {
  const features = useMemo(
    () => [
      {
        icon: FaCogs,
        title: "Engineering Excellence",
        accent: "red",
        points: [
          "React Native / Native",
          "Clean architecture",
          "Automated tests",
        ],
      },
      {
        icon: FaShieldAlt,
        title: "Security & Compliance",
        accent: "yellow",
        points: [
          "Secure storage",
          "Encrypted flows",
          "OWASP alignment",
        ],
      },
      {
        icon: FaChartLine,
        title: "Performance First",
        accent: "red",
        points: [
          "Optimized bundles",
          "Offline-first",
          "60 FPS UI",
        ],
      },
      {
        icon: FaRocket,
        title: "Launch & Growth",
        accent: "yellow",
        points: [
          "ASO optimization",
          "Crash & performance monitoring",
          "A/B testing",
        ],
      },
    ],
    []
  );

  return (
    <main className="relative overflow-hidden">
      <Hero />

      {/* DELIVERABLES */}
      <Section id="capabilities">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            What We Deliver
          </h2>
          <p className="mt-3 text-neutral-700 max-w-3xl">
            From design to development to launch—complete ownership.
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
      <Section id="process" className="bg-amber-50/30">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            A Proven, Transparent Process
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Step
              n={1}
              title="Discovery"
              desc="Understanding goals, constraints, and success metrics."
            />
            <Step
              n={2}
              title="UX Prototyping"
              desc="High-fidelity UI and user testing flows."
            />
            <Step
              n={3}
              title="Agile Development"
              desc="Rapid sprints with demos."
            />
            <Step
              n={4}
              title="Security & QA"
              desc="OWASP checks, device tests, performance audits."
            />
            <Step
              n={5}
              title="Launch & Growth"
              desc="App Store, Play Store publishing & analytics."
            />
          </div>

          <motion.div
            {...scaleIn(0.08)}
            className="rounded-2xl bg-white border p-6 shadow-sm"
          >
            <h4 className="text-lg font-extrabold">Delivery Toolkit</h4>
            <ul className="mt-4 space-y-3 text-neutral-700">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-red-500 mt-1" /> Jira / ClickUp
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-red-500 mt-1" /> TestFlight, Internal builds
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-red-500 mt-1" /> Crashlytics & analytics
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-red-500 mt-1" /> CI/CD pipelines
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* CASE STUDIES */}
      <Section id="case-studies">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">Recent Work</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <CaseCard
            title="Fintech Wallet"
            body="Biometric auth, rewards engine, real-time risk checks."
            cta="See breakdown"
            metrics={[
              { label: "DAU", value: "+220%" },
              { label: "Crash-free", value: "99.95%" },
              { label: "MVP", value: "10 weeks" },
              { label: "Ratings", value: "4.8★" },
            ]}
          />

          <CaseCard
            title="Wellness Tracker"
            body="Device sync, insights engine, offline mode."
            cta="See breakdown"
            metrics={[
              { label: "Retention", value: "42%" },
              { label: "Load", value: "1.1s" },
              { label: "Crashes", value: "<0.1%" },
              { label: "Reviews", value: "9k+" },
            ]}
          />

          <CaseCard
            title="Enterprise Field Suite"
            body="RBAC, dashboards, route optimization."
            cta="See breakdown"
            metrics={[
              { label: "Ops Cost", value: "-31%" },
              { label: "Tickets", value: "+58%" },
              { label: "NPS", value: "72" },
              { label: "Releases", value: "Weekly" },
            ]}
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faqs" className="bg-amber-50/30">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">FAQs</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <FAQItem
            i={1}
            q="Do you build native or cross-platform apps?"
            a="Both. React Native for speed, Native for device-level performance."
          />
          <FAQItem
            i={2}
            q="How much does an app cost?"
            a="Depends on scope. MVP, Squad or Retainer models available."
          />
          <FAQItem
            i={3}
            q="Do you publish on Play Store & App Store?"
            a="Yes. We handle provisioning, ASO, screenshots & submission."
          />
          <FAQItem
            i={4}
            q="Do you provide post-launch support?"
            a="Yes. Monthly updates, monitoring, bug fixes and new features."
          />
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials">
        <motion.div {...fadeIn(0.02)} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">What Clients Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial
            quote="OORJAVERSE turned our concept into a polished app in 10 weeks."
            by="Priya Sharma"
            role="Product Lead"
          />
          <Testimonial
            quote="Our ratings jumped from 3.2 → 4.7★ in two releases!"
            by="Rahul Mehta"
            role="CTO"
          />
          <Testimonial
            quote="They improved our roadmap with data insights. Amazing team."
            by="Aarav Iyer"
            role="Founder"
          />
        </div>
      </Section>

      {/* CONTACT CTA */}
      <section className="py-16 md:py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            {...scaleIn(0.05)}
            className="rounded-3xl bg-neutral-900 p-10 md:p-14"
          >
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-2">
                <Pill tone="yellow">
                  <FaRocket /> Ready to launch
                </Pill>
                <h3 className="mt-3 text-2xl md:text-4xl font-extrabold">
                  Let’s build your next standout app.
                </h3>
                <p className="mt-3 text-white/80">
                  Share your goals—we’ll respond with timeline & pricing.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="/contact"
                  className="bg-red-600 hover:bg-red-700 px-5 py-3 text-white rounded-xl font-bold text-center"
                >
                  <FaEnvelopeOpenText /> Contact Us
                </a>

                <a
                  href="tel:+91XXXXXXXXXX"
                  className="border border-white/40 hover:bg-white/10 px-5 py-3 rounded-xl flex items-center justify-center gap-2"
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
