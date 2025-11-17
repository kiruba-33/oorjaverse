// src/pages/services/QualityTesting.jsx
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaBug,
  FaShieldAlt,
  FaMobileAlt,
  FaTachometerAlt,
  FaCheckCircle,
  FaCodeBranch,
  FaLock,
  FaRocket,
  FaCogs,
  FaClipboardCheck,
  FaCloud,
  FaDatabase,
  FaSyncAlt,
  FaLaptopCode,
  FaRegClock,
  FaUserShield,
  FaTools,
  FaChrome,
  FaSafari,
  FaFirefoxBrowser,
  FaEdge,
  FaApple,
  FaAndroid,
  FaWindows,
  FaLinux,
  FaGithub,
  FaGitlab,
  FaLongArrowAltRight,
  FaQuestionCircle,
  FaQuoteLeft,
  FaQuoteRight,
  FaEnvelopeOpenText,
  FaPhoneAlt,
} from "react-icons/fa";

/**
 * OORJAVERSE PRIVATE LIMITED — Quality Testing
 * Premium, performance-friendly page with smooth animations and mobile-first design.
 * Only navigation link is /contact.
 * Uses a neutral white canvas with rich black/gray text and red accents.
 *
 * Notes:
 * - Animations are GPU-friendly (opacity/transform only), short durations, and "viewport once" to avoid jank.
 * - All external links kept to images only; all CTAs route to /contact as requested.
 * - “Release Cadence: Weekly” stat appears in the hero stats row and is preserved.
 * - Images use Unsplash tech/testing shots (relevant to QA).
 */

/* ---------------------------------- */
/* Animation + UI Helpers             */
/* ---------------------------------- */

const fade = (delay = 0, y = 18, d = 0.55) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: d, ease: "easeOut", delay },
});

const hoverFloat = {
  whileHover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const SoftGlow = ({
  className = "",
  color = "#ef4444",
  size = 480,
  opacity = 0.22,
}) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute -z-10 ${className}`}
    style={{
      filter: "blur(100px)",
      opacity,
      background: `radial-gradient(${size}px ${size}px at 50% 50%, ${color}, transparent 60%)`,
      width: size,
      height: size,
      borderRadius: size,
    }}
  />
);

const Pill = ({ children, tone = "red" }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border ${
      tone === "red"
        ? "bg-rose-50 text-rose-700 border-rose-200"
        : tone === "black"
        ? "bg-black text-white border-black"
        : "bg-neutral-100 text-neutral-700 border-neutral-200"
    }`}
  >
    {children}
  </span>
);

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="relative py-16 md:py-20">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <motion.div {...fade(0.02)} className="mb-8 md:mb-12">
        {eyebrow && (
          <div className="mb-3">
            <Pill>{eyebrow}</Pill>
          </div>
        )}
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

const Stat = ({ label, value, delay = 0.06 }) => (
  <motion.div
    {...fade(delay)}
    className="flex flex-col items-center justify-center text-center rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur p-6 shadow-sm w-full h-40"
  >
    <div className="text-3xl md:text-4xl font-extrabold text-rose-600 whitespace-nowrap">
      {value}
    </div>
    <div className="mt-2 text-neutral-800/80 font-medium text-sm md:text-base leading-tight">
      {label}
    </div>
  </motion.div>
);



const IconBadge = ({ Icon, label }) => (
  <div className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700 shadow-sm">
    <Icon className="text-rose-600" />
    <span>{label}</span>
  </div>
);

const Check = ({ children }) => (
  <li className="flex items-start gap-2">
    <FaCheckCircle className="mt-1 shrink-0 text-rose-600" />
    <span className="text-neutral-800/90">{children}</span>
  </li>
);

const Card = ({ children, delay = 0, hover = true, className = "" }) => (
  <motion.div
    {...fade(delay)}
    {...(hover ? hoverFloat : {})}
    className={`rounded-2xl border border-neutral-200 bg-white/85 backdrop-blur p-6 shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

const Step = ({ n, title, desc }) => (
  <motion.div {...fade(n * 0.04)} className="relative pl-12">
    <div className="absolute left-0 top-0 h-9 w-9 grid place-items-center rounded-full bg-rose-600 text-white font-bold">
      {n}
    </div>
    <h4 className="text-lg md:text-xl font-extrabold text-neutral-900">
      {title}
    </h4>
    <p className="mt-2 text-neutral-700 leading-relaxed">{desc}</p>
  </motion.div>
);

/* ---------------------------------- */
/* Page Component                      */
/* ---------------------------------- */

export default function QualityTesting() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const o = useTransform(scrollYProgress, [0, 1], [1, 0.82]);

  const toolBadges = useMemo(
    () => [
      { Icon: FaGithub, label: "GitHub Actions" },
      { Icon: FaGitlab, label: "GitLab CI" },
      { Icon: FaChrome, label: "Chrome" },
      { Icon: FaSafari, label: "Safari" },
      { Icon: FaFirefoxBrowser, label: "Firefox" },
      { Icon: FaEdge, label: "Edge" },
      { Icon: FaApple, label: "iOS" },
      { Icon: FaAndroid, label: "Android" },
      { Icon: FaWindows, label: "Windows" },
      { Icon: FaLinux, label: "Linux" },
    ],
    []
  );

  return (
    <main className="relative bg-white text-neutral-900 overflow-hidden">
      {/* Decorative glows */}
      <SoftGlow
        className="-top-24 -left-24"
        color="#fecaca"
        size={460}
        opacity={0.32}
      />
      <SoftGlow
        className="top-40 -right-32"
        color="#fca5a5"
        size={420}
        opacity={0.26}
      />

      {/* ---------------------------------- */}
      {/* HERO                               */}
      {/* ---------------------------------- */}
      <section ref={heroRef} className="relative pt-28 md:pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div style={{ y, opacity: o }}>
            <Pill tone="red">OORJAVERSE PRIVATE LIMITED</Pill>
            <h1 className="mt-4 text-3xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Premium <span className="text-rose-600">Quality Testing</span>{" "}
              for Reliable, High-Performing Software
            </h1>
            <p className="mt-4 md:mt-6 text-neutral-700 text-lg max-w-2xl leading-relaxed">
              We deliver end-to-end QA across web, mobile, and backend systems—
              combining manual craftsmanship with automation at scale. Expect
              faster releases, fewer regressions, and exceptional user
              experience.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#process"
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-3 font-bold text-white shadow hover:bg-rose-700"
              >
                Our Process <FaLongArrowAltRight />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 font-bold text-neutral-800 hover:bg-rose-50"
              >
                Talk to QA Lead
              </a>
            </div>

            {/* Tech badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {toolBadges.map(({ Icon, label }, i) => (
                <IconBadge key={label + i} Icon={Icon} label={label} />
              ))}
            </div>

            {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-2 gap-4 max-w-4xl w-full">

              <Stat label="Reduction in Bugs Post-Release" value="-72%" />
              <Stat label="Avg. Time to Automate" value="2–4 wks" />
              <Stat label="Crash-free Sessions" value="> 99.9%" />
            <Stat label="Release Cadence" value="Weekly" delay={0.24} />

            </div>
          </motion.div>

          {/* Imagery (relevant to QA) */}
          <motion.div {...fade(0.08)} className="relative flex justify-center lg:justify-end">
  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 w-full max-w-xl">
    <img
      src="/QualityTestingimages/QT4.jpg"
      alt="QA dashboards and monitors"
      className="w-full h-[320px] md:h-[420px] object-cover"
      loading="eager"
      decoding="async"
    />

    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
      <div className="flex flex-wrap items-center gap-2 text-white">
        <Pill tone="black"><FaBug /> Real Devices Lab</Pill>
        <Pill tone="black"><FaTachometerAlt /> Performance Benchmarks</Pill>
      </div>
    </div>
  </div>

  {/* Floating image - FIXED POSITION, NO OVERLAP */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
    className="absolute bottom-4 right-4 w-40 md:w-52 rounded-2xl shadow-xl border border-neutral-200 overflow-hidden bg-white"
  >
    <img
      src="/ItServicesimages/it6.jpg"
      alt="App Testing on Devices"
      className="w-full h-full object-cover"
    />
  </motion.div>
</motion.div>

        </div>
      </section>

      {/* ---------------------------------- */}
      {/* ACCREDITATION / TRUST BAR          */}
      {/* ---------------------------------- */}
      <section className="py-8 border-y border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap items-center gap-3">
          <Pill>
            <FaShieldAlt /> OWASP-aligned
          </Pill>
          <Pill>
            <FaCodeBranch /> CI/CD Integrated
          </Pill>
          <Pill>
            <FaRegClock /> Fast Feedback
          </Pill>
          <Pill>
            <FaUserShield /> Privacy by Design
          </Pill>
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* CAPABILITIES                       */}
      {/* ---------------------------------- */}
      <Section
        id="capabilities"
        eyebrow={
          <>
            <FaClipboardCheck />
            &nbsp;What We Test
          </>
        }
        title="Comprehensive QA Capabilities"
        subtitle="We combine manual craftsmanship with robust automation to validate functionality, performance, security, and accessibility across platforms."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            {
              icon: <FaBug />,
              title: "Functional & Regression",
              points: [
                "User flows, edge cases & integrations",
                "Smoke/Regression suites kept evergreen",
                "Data validation & contract testing",
              ],
            },
            {
              icon: <FaMobileAlt />,
              title: "Mobile QA (iOS/Android)",
              points: [
                "Real device & emulator matrix",
                "Gesture, offline, battery & network",
                "Store-ready build validations",
              ],
            },
            {
              icon: <FaTachometerAlt />,
              title: "Performance & Reliability",
              points: [
                "Cold/Warm start, TTI, ANR & crashes",
                "Throughput, latency & load tests",
                "Synthetic + RUM observability",
              ],
            },
            {
              icon: <FaShieldAlt />,
              title: "Security & Compliance",
              points: [
                "OWASP Top 10 & MASVS checks",
                "AuthZ/AuthN, storage & transport",
                "PII handling & consent flows",
              ],
            },
            {
              icon: <FaCloud />,
              title: "API & Microservices",
              points: [
                "Contract, schema & chaos testing",
                "Rate limiting & resiliency patterns",
                "Blue/green, canary verification",
              ],
            },
            {
              icon: <FaDatabase />,
              title: "Data & Analytics",
              points: [
                "ETL pipelines & data quality",
                "Event taxonomy & analytics QA",
                "Experimentation frameworks",
              ],
            },
          ].map((f, i) => (
            <Card key={i} delay={i * 0.05}>
              <div className="text-rose-600 text-3xl">{f.icon}</div>
              <h3 className="mt-3 text-lg font-extrabold">{f.title}</h3>
              <ul className="mt-3 space-y-2">
                {f.points.map((p, j) => (
                  <Check key={j}>{p}</Check>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* PROCESS (anchored for “Our Process”)*/}
      {/* ---------------------------------- */}
      <Section
        id="process"
        eyebrow={
          <>
            <FaCogs />
            &nbsp;How We Work
          </>
        }
        title="A Proven, Transparent QA Approach"
        subtitle="From discovery to growth, we align quality goals to business outcomes and keep every stakeholder in the loop."
      >
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-10">
            <Step
              n={1}
              title="Discovery & Test Strategy"
              desc="Understand product goals, risks, tech stack, and releases. Define quality bars, coverage targets, environments, and device/browser matrices."
            />
            <Step
              n={2}
              title="Design & Test Plan"
              desc="Map user journeys, acceptance criteria, entry/exit gates, and reporting rhythm. Prioritize by impact and operational risk."
            />
            <Step
              n={3}
              title="Automation Foundation"
              desc="Select frameworks, establish page-object patterns, stubs/mocks, and data strategies. Integrate with CI/CD for fast feedback."
            />
            <Step
              n={4}
              title="Continuous Validation"
              desc="Parallelize suites, nightly builds, flaky test triage, and trend analytics to keep quality predictable as velocity grows."
            />
            <Step
              n={5}
              title="Release & Observability"
              desc="Stage rollouts, guardrails with feature flags, crash/ANR monitoring, and rollback criteria validated pre- and post-release."
            />
          </div>

          <div>
            <Card delay={0.05}>
              <h4 className="text-lg font-extrabold">Delivery Toolkit</h4>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Check>Playwright / Cypress / WebdriverIO</Check>
                <Check>JUnit / TestNG / Jest / Vitest</Check>
                <Check>Appium / Detox for mobile</Check>
                <Check>k6 / JMeter for performance</Check>
                <Check>OWASP ZAP / Burp guided checks</Check>
                <Check>Postman / Newman / Pact</Check>
                <Check>BrowserStack / Firebase Lab</Check>
                <Check>Sentry / Crashlytics dashboards</Check>
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-4">
                  <div className="font-semibold text-rose-800">CI/CD</div>
                  <div className="mt-2 flex items-center gap-3 text-rose-700">
                    <FaGithub /> <FaGitlab />
                  </div>
                </div>
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-4">
                  <div className="font-semibold text-rose-800">Platforms</div>
                  <div className="mt-2 flex items-center gap-3 text-rose-700">
                    <FaApple /> <FaAndroid />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* HIGHLIGHTS                         */}
      {/* ---------------------------------- */}
      <Section
        id="highlights"
        eyebrow={
          <>
            <FaRocket />
            &nbsp;Built for Scale
          </>
        }
        title="Engineered for Speed, Stability & Confidence"
        subtitle="We obsess over the details that make releases smooth and user experiences delightful."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              Icon: FaSyncAlt,
              title: "Shift-Left & Shift-Right",
              bullets: [
                "Tests run early in PRs and late in canary",
                "Contract testing to decouple teams",
                "Release hygiene docs & runbooks",
              ],
            },
            {
              Icon: FaUserShield,
              title: "Quality Gates & Risk Controls",
              bullets: [
                "Coverage + flaky thresholds enforced",
                "Performance SLAs & accessibility checks",
                "Data privacy & consent as first-class",
              ],
            },
            {
              Icon: FaTools,
              title: "Maintainable Test Architecture",
              bullets: [
                "Page objects & test IDs standards",
                "Hermetic tests with mocked backends",
                "Fail-fast logs, videos, and traces",
              ],
            },
          ].map((f, i) => (
            <Card key={i} delay={i * 0.05}>
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                  <f.Icon className="text-xl" />
                </div>
                <h3 className="text-lg font-extrabold">{f.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {f.bullets.map((b, j) => (
                  <Check key={j}>{b}</Check>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* DEVICE / BROWSER MATRIX            */}
      {/* ---------------------------------- */}
      <Section
        id="matrix"
        eyebrow={
          <>
            <FaMobileAlt />
            &nbsp;Coverage
          </>
        }
        title="Real Device & Browser Matrix"
        subtitle="We validate on the platforms that matter most to your users."
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {toolBadges.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              {...fade(i * 0.02)}
              className="rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm hover:shadow-md"
            >
              <Icon className="mx-auto text-2xl text-rose-600" />
              <div className="mt-2 text-sm font-semibold text-neutral-800">
                {label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card delay={0.05}>
            <h4 className="text-lg font-extrabold">Visual Snapshots & Diffs</h4>
            <p className="mt-2 text-neutral-700">
              Automated visual testing with baseline approvals keeps UI changes
              intentional and catches regressions early.
            </p>
            <img
              src="/QualityTestingimages/QT1.jpeg"
              alt="Visual snapshot diffs"
              className="mt-4 rounded-xl border border-neutral-200 shadow-md object-cover w-full h-56"
              loading="lazy"
              decoding="async"
            />
          </Card>
          <Card delay={0.08}>
            <h4 className="text-lg font-extrabold">Performance Tracing</h4>
            <p className="mt-2 text-neutral-700">
              Trace waterfalls and CPU profiles help ensure animations remain
              smooth and interactions stay within budget.
            </p>
            <img
              src="/QualityTestingimages/QT1.jpg"
              alt="Performance dashboards"
              className="mt-4 rounded-xl border border-neutral-200 shadow-md object-cover w-full h-56"
              loading="lazy"
              decoding="async"
            />
          </Card>
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* ACCESSIBILITY & I18N               */}
      {/* ---------------------------------- */}
      <Section
        id="a11y"
        eyebrow={
          <>
            <FaShieldAlt />
            &nbsp;Inclusive QA
          </>
        }
        title="Accessibility & Internationalization"
        subtitle="We ensure your product is usable by everyone, everywhere."
      >
        <div className="grid lg:grid-cols-2 gap-6">
          <Card delay={0.05}>
            <h4 className="text-lg font-extrabold">Accessibility</h4>
            <ul className="mt-3 space-y-2">
              <Check>WCAG 2.2 AA conformance checks</Check>
              <Check>Keyboard navigation & focus order</Check>
              <Check>Screen reader roles, names, labels</Check>
              <Check>Color contrast & motion sensitivity</Check>
            </ul>
          </Card>
          <Card delay={0.08}>
            <h4 className="text-lg font-extrabold">i18n & l10n</h4>
            <ul className="mt-3 space-y-2">
              <Check>RTL layouts, pluralization rules</Check>
              <Check>Date/number/currency formats</Check>
              <Check>Language fallbacks & fonts</Check>
              <Check>Translation QA workflows</Check>
            </ul>
          </Card>
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* SECURITY & DATA QUALITY            */}
      {/* ---------------------------------- */}
      <Section
        id="security"
        eyebrow={
          <>
            <FaLock />
            &nbsp;Trust
          </>
        }
        title="Security & Data Quality"
        subtitle="Bake confidence into every release with proactive controls."
      >
        <div className="grid lg:grid-cols-3 gap-6">
          <Card delay={0.05}>
            <h4 className="text-lg font-extrabold">Security Testing</h4>
            <ul className="mt-3 space-y-2">
              <Check>AuthN/AuthZ flows, session hygiene</Check>
              <Check>Encrypted storage & network</Check>
              <Check>Vulnerability scans & advisories</Check>
              <Check>Security regression checklist</Check>
            </ul>
          </Card>
          <Card delay={0.07}>
            <h4 className="text-lg font-extrabold">Data Quality</h4>
            <ul className="mt-3 space-y-2">
              <Check>Schema/contracts validation</Check>
              <Check>Event taxonomy verification</Check>
              <Check>Idempotency & deduplication</Check>
              <Check>Backfills & reconciliation</Check>
            </ul>
          </Card>
          <Card delay={0.09}>
            <h4 className="text-lg font-extrabold">Observability</h4>
            <ul className="mt-3 space-y-2">
              <Check>Crash/ANR monitoring & alerts</Check>
              <Check>Distributed tracing baselines</Check>
              <Check>Release health & guardrails</Check>
              <Check>MTTR dashboards & runbooks</Check>
            </ul>
          </Card>
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* CASE STUDIES                       */}
      {/* ---------------------------------- */}
      <Section
        id="work"
        eyebrow={
          <>
            <FaRocket />
            &nbsp;Recent Outcomes
          </>
        }
        title="We Measure What Matters"
        subtitle="A few anonymized snapshots from recent engagements."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            {
              title: "Fintech UPI App",
              body: "Stabilized nightly automation, reduced crash rate below 0.1%, and raised rating to 4.8★ in two releases.",
              metrics: [
                { label: "Crash-free", value: "99.95%" },
                { label: "TTI", value: "↓ 47%" },
                { label: "Rating", value: "4.8★" },
                { label: "DAU", value: "+210%" },
              ],
            },
            {
              title: "Health Tracker",
              body: "Visual diffing across 30 screens prevented regressions during rapid redesign without slowing delivery.",
              metrics: [
                { label: "Visual Bugs", value: "-83%" },
                { label: "Release Time", value: "-25%" },
                { label: "Retention D30", value: "+9pts" },
                { label: "Crashes", value: "<0.1%" },
              ],
            },
            {
              title: "B2B Field Suite",
              body: "API contract testing unblocked parallel teams and cut integration failures to near zero across services.",
              metrics: [
                { label: "Integration Failures", value: "-90%" },
                { label: "Tickets/Day", value: "+56%" },
                { label: "NPS", value: "72" },
                { label: "Releases", value: "Weekly" },
              ],
            },
          ].map((c, i) => (
            <Card key={i} delay={i * 0.05}>
              <div className="relative overflow-hidden rounded-xl h-40 bg-gradient-to-tr from-rose-200 via-rose-100 to-rose-50 border border-rose-100">
                <SoftGlow
                  className="-top-10 -left-10"
                  color="#fecaca"
                  size={260}
                  opacity={0.4}
                />
                <SoftGlow
                  className="-bottom-10 -right-10"
                  color="#fda4af"
                  size={220}
                  opacity={0.25}
                />
                <div className="absolute inset-0 grid place-items-center text-rose-700/80 font-semibold">
                  Test Environments • CI • Canary
                </div>
              </div>
              <h3 className="mt-5 text-xl font-extrabold">{c.title}</h3>
              <p className="mt-2 text-neutral-700 leading-relaxed">{c.body}</p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 gap-3">
                {c.metrics.map((m, j) => (
                  <div
                    key={j}
                    className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-center"
                  >
                    <div className="text-lg font-bold text-rose-800">
                      {m.value}
                    </div>
                    <div className="text-xs text-rose-900/70">{m.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* ENGAGEMENT MODELS                  */}
      {/* ---------------------------------- */}
      <Section
        id="pricing"
        eyebrow={
          <>
            <FaClipboardCheck />
            &nbsp;Flexible Models
          </>
        }
        title="The Right Engagement for Every Stage"
        subtitle="Start lean, scale smart. We’ll recommend the model that best aligns to your goals."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "MVP Quality Sprint",
              note: "Best for early validation",
              bullets: [
                "Fixed scope & timelines",
                "Critical path test design",
                "Light automation scaffolding",
                "Release support & sign-off",
              ],
            },
            {
              name: "Embedded QA Squad",
              note: "Sustained velocity",
              bullets: [
                "Weekly sprints & demos",
                "Automation ownership",
                "Observability & dashboards",
                "Release hygiene & gates",
              ],
            },
            {
              name: "Support & Growth",
              note: "Post-launch excellence",
              bullets: [
                "SLAs & incident response",
                "A/B testing workflows",
                "Performance tuning",
                "Security patch reviews",
              ],
            },
          ].map((p, i) => (
            <Card key={i} delay={i * 0.05}>
              <h3 className="text-xl font-extrabold">{p.name}</h3>
              <div className="mt-1 text-rose-700 font-medium">{p.note}</div>
              <ul className="mt-4 space-y-2">
                {p.bullets.map((b, j) => (
                  <Check key={j}>{b}</Check>
                ))}
              </ul>
              <a
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 font-bold text-white hover:bg-rose-700"
              >
                Request Estimate <FaLongArrowAltRight />
              </a>
            </Card>
          ))}
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* FAQ                                */}
      {/* ---------------------------------- */}
      <Section
        id="faqs"
        eyebrow={
          <>
            <FaQuestionCircle />
            &nbsp;FAQ
          </>
        }
        title="Questions, Answered"
        subtitle="If you don’t see your question here, reach out—happy to help."
      >
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Do you support both manual and automated testing?",
              a: "Yes. We typically start with critical manual paths for fast coverage, then build automation where ROI is clear—unit, API, UI, and performance.",
            },
            {
              q: "Which tools do you use?",
              a: "Playwright, Cypress, WebdriverIO, Appium, Detox, Jest/Vitest, JUnit/TestNG, Postman/Pact, and k6/JMeter—chosen to fit your stack and team.",
            },
            {
              q: "How fast can you start?",
              a: "We can align on a test plan within a week. Initial coverage and CI wiring typically ship in 2–4 weeks depending on scope.",
            },
            {
              q: "Can you help with publishing and compliance?",
              a: "Absolutely—store listing checks, privacy and consent flows, accessibility, and performance budgets are part of our release checklist.",
            },
          ].map((f, i) => (
            <motion.details
              key={i}
              {...fade(i * 0.03)}
              className="group rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-start gap-3 text-neutral-900">
                <FaQuestionCircle className="mt-1 shrink-0 text-rose-600" />
                <span className="text-base md:text-lg font-bold">{f.q}</span>
              </summary>
              <p className="mt-3 text-neutral-700 leading-relaxed">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* TESTIMONIALS                       */}
      {/* ---------------------------------- */}
      <Section
        id="testimonials"
        eyebrow={
          <>
            <FaQuoteLeft />
            &nbsp;Praise
          </>
        }
        title="What Our Partners Say"
        subtitle="Transparent collaboration and measurable outcomes—every sprint."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "OORJAVERSE raised our quality bar without slowing delivery. Weekly demos and crisp reports kept everyone aligned.",
              by: "Priya Sharma",
              role: "Product Lead, Fintech",
            },
            {
              quote:
                "Visual diffs and automation made our redesign glitch-free across browsers and devices. Exactly what we needed.",
              by: "Rahul Mehta",
              role: "CTO, Enterprise SaaS",
            },
            {
              quote:
                "They transformed QA into a strategic advantage—measurable, predictable, and developer-friendly.",
              by: "Ananya Rao",
              role: "Founder, HealthTech",
            },
          ].map((t, i) => (
            <Card key={i} delay={i * 0.05}>
              <div className="text-rose-600">
                <FaQuoteLeft />
              </div>
              <p className="mt-3 text-neutral-800/90 leading-relaxed">
                {t.quote}
              </p>
              <div className="mt-4 flex items-center gap-3 text-neutral-800">
                <div className="rounded-full bg-rose-200/70 h-10 w-10 grid place-items-center font-bold">
                  {t.by
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold">{t.by}</div>
                  <div className="text-sm text-neutral-700">{t.role}</div>
                </div>
              </div>
              <div className="mt-3 text-rose-600">
                <FaQuoteRight />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ---------------------------------- */}
      {/* CONTACT CTA                         */}
      {/* ---------------------------------- */}
      <section className="relative py-16 md:py-20">
        <SoftGlow
          className="-top-10 right-0"
          color="#fda4af"
          size={420}
          opacity={0.35}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            {...fade(0.05)}
            className="rounded-3xl bg-gradient-to-r from-rose-600 to-rose-500 p-8 md:p-12 text-white shadow-xl"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-4xl font-extrabold">
                  Ship with confidence—every time.
                </h3>
                <p className="mt-3 text-white/90">
                  Share your goals and constraints—we’ll respond with an
                  actionable plan, timeline, and a fair estimate.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-rose-700 shadow hover:bg-rose-50"
                >
                  <FaEnvelopeOpenText /> Contact Us
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10"
                >
                  <FaPhoneAlt /> Talk to QA Lead
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
