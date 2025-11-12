// src/pages/services/CloudServer.jsx
import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaCloud,
  FaServer,
  FaLock,
  FaShieldAlt,
  FaNetworkWired,
  FaDatabase,
  FaGlobe,
  FaCogs,
  FaCodeBranch,
  FaSyncAlt,
  FaBolt,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelopeOpenText,
  FaPhoneAlt,
  FaLongArrowAltRight,
  FaTools,
  FaGithub,
  FaDocker,
  FaAws,
  FaGoogle,
  FaApple,
  FaWindows,
  FaLinux,
} from "react-icons/fa";

/**
 * OORJAVERSE PRIVATE LIMITED — Cloud-Based Server
 * Route target for your Navbar: /services/cloud-server
 * Tailwind + Framer Motion only. External images use Unsplash/Cloud/Datacenter shots.
 * Links only to /contact
 */

/* ----------------------------- Animation Helpers ---------------------------- */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const hoverCard = {
  whileHover: { y: -6, scale: 1.01 },
  transition: { duration: 0.35, ease: "easeOut" },
};

/* ------------------------------- Small Pieces ------------------------------- */

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
    {children}
  </span>
);

const Badge = ({ children }) => (
  <span className="rounded-lg border border-neutral-200 bg-white px-3 py-1 text-sm font-medium text-neutral-800 shadow-sm">
    {children}
  </span>
);

const SoftBlob = ({ className = "" }) => (
  <div
    className={`pointer-events-none absolute -z-10 blur-[100px] opacity-30 ${className}`}
    aria-hidden
  />
);

const Divider = () => (
  <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
);

/* --------------------------------- Sections -------------------------------- */

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="relative py-16 md:py-20">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      {(title || subtitle) && (
        <motion.div {...fadeUp(0.05)} className="mb-10 md:mb-14">
          {title && (
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-black">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 md:mt-4 text-neutral-700 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}
      {children}
    </div>
  </section>
);

const Stat = ({ value, label, delay = 0 }) => (
  <motion.div
    {...fadeUp(delay)}
    className="flex flex-col items-start rounded-2xl bg-white/80 backdrop-blur border border-neutral-200 p-6 shadow-sm"
  >
    <div className="text-3xl md:text-4xl font-extrabold text-red-600">{value}</div>
    <div className="mt-2 text-neutral-800">{label}</div>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, desc, points = [], delay = 0 }) => (
  <motion.div
    {...fadeUp(delay)}
    {...hoverCard}
    className="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all"
  >
    <div className="flex items-center gap-3">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
        <Icon className="text-xl" />
      </span>
      <h3 className="text-lg font-bold text-black">{title}</h3>
    </div>
    <p className="mt-3 text-neutral-700 leading-relaxed">{desc}</p>
    {points.length > 0 && (
      <ul className="mt-4 space-y-2 text-neutral-800">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <FaCheckCircle className="text-red-600 mt-1 shrink-0" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);

const Benefit = ({ icon: Icon, title, text, delay = 0 }) => (
  <motion.div
    {...fadeUp(delay)}
    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all"
  >
    <div className="flex items-center gap-3">
      <Icon className="text-red-600 text-2xl" />
      <h4 className="font-extrabold text-black">{title}</h4>
    </div>
    <p className="mt-3 text-neutral-700 leading-relaxed">{text}</p>
  </motion.div>
);

const PricingCard = ({ name, price, caption, bullets, highlight = false, delay = 0 }) => (
  <motion.div
    {...fadeUp(delay)}
    {...hoverCard}
    className={`rounded-2xl border p-8 shadow-sm hover:shadow-xl transition-all ${
      highlight
        ? "bg-red-50 border-red-200"
        : "bg-white border-neutral-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-extrabold text-black">{name}</h3>
      {highlight && (
        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
          Popular
        </span>
      )}
    </div>
    <div className="mt-2 text-red-600 text-3xl font-extrabold">{price}</div>
    <div className="text-neutral-600">{caption}</div>
    <ul className="mt-5 space-y-2 text-neutral-800">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2">
          <FaCheckCircle className="text-red-600 mt-1" /> {b}
        </li>
      ))}
    </ul>
    <a
      href="/contact"
      className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-black transition-all"
    >
      Request Quote <FaLongArrowAltRight />
    </a>
  </motion.div>
);

const FAQItem = ({ q, a, delay = 0 }) => (
  <motion.details
    {...fadeUp(delay)}
    className="group rounded-xl border border-neutral-200 bg-white p-5"
  >
    <summary className="flex cursor-pointer list-none items-start gap-3 text-black">
      <FaQuestionMark /> <span className="text-base md:text-lg font-bold">{q}</span>
    </summary>
    <p className="mt-3 text-neutral-700 leading-relaxed">{a}</p>
  </motion.details>
);

// Using an inline icon for the FAQ summary (since FaQuestionMark is not in FA5)
const FaQuestionMark = () => (
  <span className=" h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold grid place-items-center mt-1">
    ?
  </span>
);

/* -------------------------------- Main Page -------------------------------- */

export default function CloudServer() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);

  const features = useMemo(
    () => [
      {
        icon: FaCloud,
        title: "Elastic Compute & Auto-Scaling",
        desc:
          "Scale services up or down within seconds based on real usage. Pay only for what you consume.",
        points: [
          "Horizontal & vertical scaling",
          "Spot/on-demand/Reserved strategies",
          "CPU/RAM optimized instance families",
        ],
      },
      {
        icon: FaNetworkWired,
        title: "Global Networking & Load Balancing",
        desc:
          "Anycast routing, multi-region GSLB, and L7 load balancing deliver low latency across the globe.",
        points: [
          "Private subnets & VPC peering",
          "WAF & DDoS protection at edge",
          "Traffic shaping & circuit breakers",
        ],
      },
      {
        icon: FaDatabase,
        title: "Managed Databases & Storage",
        desc:
          "High-availability databases with snapshots, point-in-time recovery, and automated failover.",
        points: [
          "PostgreSQL, MySQL, Redis",
          "S3-class object storage & versioning",
          "Backups, PITR & cross-region replicas",
        ],
      },
      {
        icon: FaShieldAlt,
        title: "Zero-Trust Security & Compliance",
        desc:
          "Best-practice hardening and continuous audits aligned to GDPR, SOC 2, and ISO 27001.",
        points: [
          "IAM with least privilege",
          "Key management & envelope encryption",
          "Secure SDLC & artifact signing",
        ],
      },
      {
        icon: FaSyncAlt,
        title: "Automated CI/CD & Observability",
        desc:
          "Ship safely with staging gates, canary deploys, and real-time monitoring & tracing.",
        points: [
          "GitOps pipelines & approvals",
          "Blue/green & canary releases",
          "Metrics, logs, traces dashboards",
        ],
      },
      {
        icon: FaCogs,
        title: "Containers & Orchestration",
        desc:
          "Production-grade Kubernetes with policies, autoscalers, and service mesh for resilience.",
        points: [
          "K8s, ECS, or Nomad ready",
          "HPA/VPA + cluster autoscaler",
          "Istio/Linkerd mesh & mTLS",
        ],
      },
    ],
    []
  );

  const useCases = useMemo(
    () => [
      {
        icon: FaBolt,
        title: "Realtime APIs & Microservices",
        text:
          "Low-latency gateways, event streaming, and resilient service-to-service communication.",
      },
      {
        icon: FaChartLine,
        title: "Analytics & Data Pipelines",
        text:
          "Ingest terabytes, transform streams, and query quickly with warehouse-ready sinks.",
      },
      {
        icon: FaGlobe,
        title: "Global E-commerce & SaaS",
        text:
          "Multi-zone architectures with auto-healing and geo-replication keep you always available.",
      },
      {
        icon: FaLock,
        title: "Secure Enterprise Apps",
        text:
          "Network isolation, SSO, and policy-as-code ensure compliance without slowing teams down.",
      },
    ],
    []
  );

  const toolchain = useMemo(
    () => [
      { name: "AWS", icon: FaAws },
      { name: "GCP", icon: FaGoogle },
      { name: "Linux", icon: FaLinux },
      { name: "Docker", icon: FaDocker },
      { name: "GitHub", icon: FaGithub },
      { name: "Kubernetes", icon: FaCogs },
      { name: "PostgreSQL", icon: FaDatabase },
      { name: "Windows Server", icon: FaWindows },
      { name: "Apple/ARM", icon: FaApple },
    ],
    []
  );

  return (
    <main className="relative overflow-hidden bg-white text-black">
      {/* Background glow accents */}
      <SoftBlob className="top-[-140px] left-[-100px] w-[380px] h-[380px] bg-red-300" />
      <SoftBlob className="top-[280px] right-[-140px] w-[460px] h-[460px] bg-red-200" />

      {/* ------------------------------- HERO -------------------------------- */}
      <section ref={heroRef} className="relative pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
          {/* Text */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="lg:col-span-6">
            <Pill>
              <FaCloud /> OORJAVERSE PRIVATE LIMITED
            </Pill>
            <h1 className="mt-4 text-3xl md:text-6xl font-extrabold tracking-tight">
              Cloud-Based Servers for <span className="text-red-600">Speed</span>,{" "}
              <span className="text-red-600">Scale</span> &{" "}
              <span className="text-red-600">Security</span>
            </h1>
            <p className="mt-4 md:mt-6 max-w-2xl text-neutral-700 text-lg leading-relaxed">
              Design, deploy, and operate modern infrastructure across regions with zero-trust
              security, automated resilience, and observability—built for high-growth products and
              enterprise workloads.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-bold text-white shadow hover:bg-black transition-all"
              >
                Explore Capabilities <FaLongArrowAltRight />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 font-bold text-neutral-900 hover:bg-neutral-50"
              >
                Talk to Engineers
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat value="99.99%" label="Uptime SLO" />
              <Stat value="< 60ms" label="Global Latency" />
              <Stat value="15 min" label="RTO Targets" />
              <Stat value="AES-256" label="At-Rest Encryption" />
            </div>

            <motion.div {...fadeUp(0.1)} className="mt-8 flex flex-wrap items-center gap-3 text-neutral-700">
              <Badge><FaCogs className="inline -mt-1" /> Kubernetes</Badge>
              <Badge><FaDocker className="inline -mt-1" /> Docker</Badge>
              <Badge><FaAws className="inline -mt-1" /> AWS</Badge>
              <Badge><FaDatabase className="inline -mt-1" /> PostgreSQL</Badge>
              <Badge><FaGithub className="inline -mt-1" /> CI/CD</Badge>
            </motion.div>
          </motion.div>

          {/* Image — replaced with relevant cloud/datacenter photo */}
          <motion.div {...fadeIn(0.05)} className="lg:col-span-6">
            <motion.img
              {...hoverCard}
              src="/Cloud/c1.jpg"
              alt="Modern data center racks with network cabling"
              className="w-full rounded-3xl shadow-2xl object-cover"
            />
            <div className="mt-3 text-xs text-neutral-500">
              Photo: Unsplash · Datacenter / Cloud infrastructure
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* --------------------------- TRUSTED / BRANDS ------------------------- */}
      <Section id="trust" title="Built on battle-tested foundations">
        <motion.div
          {...fadeUp(0.05)}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center"
        >
          {[
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
          ].map((src, i) => (
            <motion.div
              key={i}
              {...hoverCard}
              className="rounded-xl border border-neutral-200 bg-white p-4 grid place-items-center"
            >
              <img
                src={src}
                alt="Tech brand"
                className="h-10 object-contain opacity-80 hover:opacity-100 transition"
              />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ----------------------------- CAPABILITIES --------------------------- */}
      <Section
        id="capabilities"
        title="What We Deliver"
        subtitle="Cloud architectures designed for reliability, performance, and compliance—end-to-end."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard
              key={i}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
              points={f.points}
              delay={i * 0.05}
            />
          ))}
        </div>
      </Section>

      {/* ------------------------------- ARCHITECTURE ------------------------- */}
      <Section
        id="architecture"
        title="Reference Architecture"
        subtitle="A simplified view of a resilient, multi-AZ deployment with private networking, managed data, and secure ingress."
      >
        <motion.div
          {...fadeUp(0.05)}
          className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-sm"
        >
          {/* SVG Diagram */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 1200 540"
              className="w-[1100px] h-auto mx-auto"
              aria-label="Cloud Architecture Diagram"
            >
              {/* Edges */}
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" />
                </marker>
              </defs>

              {/* Internet / CDN */}
              <rect x="40" y="40" width="250" height="120" rx="16" fill="#fff" stroke="#e5e7eb" />
              <text x="165" y="80" textAnchor="middle" className="fill-black" fontSize="16" fontWeight="700">
                Internet / CDN
              </text>
              <text x="165" y="106" textAnchor="middle" className="fill-[#6b7280]" fontSize="12">
                WAF • DDoS • TLS
              </text>
              <text x="165" y="126" textAnchor="middle" className="fill-[#6b7280]" fontSize="12">
                Edge caching
              </text>

              {/* LB */}
              <rect x="340" y="60" width="220" height="100" rx="16" fill="#fff" stroke="#e5e7eb" />
              <text x="450" y="100" textAnchor="middle" className="fill-black" fontSize="16" fontWeight="700">
                L7 Load Balancer
              </text>
              <text x="450" y="120" textAnchor="middle" className="fill-[#6b7280]" fontSize="12">
                Routing • Health checks
              </text>

              {/* App Cluster */}
              <rect x="620" y="40" width="520" height="220" rx="18" fill="#fff" stroke="#e5e7eb" />
              <text x="880" y="76" textAnchor="middle" className="fill-black" fontSize="16" fontWeight="700">
                App Cluster (Kubernetes)
              </text>

              {/* Nodes */}
              {[0, 1, 2].map((n) => (
                <g key={n}>
                  <rect
                    x={650 + n * 160}
                    y="100"
                    width="140"
                    height="120"
                    rx="14"
                    fill="#fef2f2"
                    stroke="#fecaca"
                  />
                  <text
                    x={720 + n * 160}
                    y="130"
                    textAnchor="middle"
                    className="fill-black"
                    fontSize="14"
                    fontWeight="700"
                  >
                    Node {n + 1}
                  </text>
                  <text x={720 + n * 160} y="150" textAnchor="middle" className="fill-[#ef4444]" fontSize="12">
                    Pods + Sidecars
                  </text>
                  <text x={720 + n * 160} y="170" textAnchor="middle" className="fill-[#6b7280]" fontSize="12">
                    HPA / Autoscaler
                  </text>
                </g>
              ))}

              {/* Data Layer */}
              <rect x="260" y="300" width="320" height="180" rx="18" fill="#fff" stroke="#e5e7eb" />
              <text x="420" y="336" textAnchor="middle" className="fill-black" fontSize="16" fontWeight="700">
                Managed Database
              </text>
              <text x="420" y="356" textAnchor="middle" className="fill-[#6b7280]" fontSize="12">
                Multi-AZ • PITR • Backups
              </text>

              <rect x="640" y="300" width="240" height="180" rx="18" fill="#fff" stroke="#e5e7eb" />
              <text x="760" y="336" textAnchor="middle" className="fill-black" fontSize="16" fontWeight="700">
                Object Storage
              </text>
              <text x="760" y="356" textAnchor="middle" className="fill-[#6b7280]" fontSize="12">
                Versioning • Lifecycle
              </text>

              <rect x="920" y="300" width="220" height="180" rx="18" fill="#fff" stroke="#e5e7eb" />
              <text x="1030" y="336" textAnchor="middle" className="fill-black" fontSize="16" fontWeight="700">
                Observability
              </text>
              <text x="1030" y="356" textAnchor="middle" className="fill-[#6b7280]" fontSize="12">
                Metrics • Logs • Traces
              </text>

              {/* Arrows */}
              <line x1="290" y1="100" x2="340" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="560" y1="100" x2="620" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />

              <line x1="760" y1="260" x2="420" y2="300" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="820" y1="260" x2="760" y2="300" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="900" y1="260" x2="1030" y2="300" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>
          </div>
        </motion.div>

        {/* Mini legend */}
        <motion.div {...fadeUp(0.1)} className="mt-6 flex flex-wrap gap-3">
          <Pill>Multi-AZ</Pill>
          <Pill>Private Networking</Pill>
          <Pill>Encryption in Transit & at Rest</Pill>
          <Pill>Autoscaling</Pill>
          <Pill>Observability</Pill>
        </motion.div>
      </Section>

      {/* ------------------------------- BENEFITS ----------------------------- */}
      <Section
        id="benefits"
        title="Why teams choose us"
        subtitle="We focus on production excellence—performance, reliability, and speed of iteration."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Benefit
            icon={FaBolt}
            title="Performance First"
            text="Edge acceleration, optimized AMIs/containers, and efficient cold-start strategies keep P99 low."
            delay={0.05}
          />
          <Benefit
            icon={FaShieldAlt}
            title="Security by Default"
            text="Zero-trust patterns, IAM boundaries, KMS-backed secrets, and SOC 2 ready controls."
            delay={0.1}
          />
          <Benefit
            icon={FaCodeBranch}
            title="Faster Releases"
            text="GitOps pipelines with review apps, canaries, and automatic rollbacks shorten lead-time."
            delay={0.15}
          />
          <Benefit
            icon={FaCogs}
            title="Operational Maturity"
            text="Runbooks, SLIs/SLOs, and on-call health ensure predictable operations even under load."
            delay={0.2}
          />
          <Benefit
            icon={FaSyncAlt}
            title="Future-proof Design"
            text="Vendor-aware architectures with clean boundaries to pivot between services when needed."
            delay={0.25}
          />
          <Benefit
            icon={FaChartLine}
            title="Cost Transparency"
            text="Budgets, anomaly detection, and unit-economics dashboards make spend visible and actionable."
            delay={0.3}
          />
        </div>
      </Section>

      {/* ------------------------------- USE CASES ---------------------------- */}
      <Section
        id="use-cases"
        title="Designed for real workloads"
        subtitle="From real-time APIs to global SaaS—our cloud stack adapts to your goals."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((u, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.05)}
              {...hoverCard}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <u.icon className="text-red-600 text-2xl" />
                <h4 className="font-extrabold text-black">{u.title}</h4>
              </div>
              <p className="mt-3 text-neutral-700 leading-relaxed">{u.text}</p>
              <a
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-red-600 font-semibold hover:underline"
              >
                Discuss your case <FaLongArrowAltRight />
              </a>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ------------------------------ TOOLCHAIN ---------------------------- */}
      <Section
        id="tooling"
        title="Your toolchain, our playbook"
        subtitle="We integrate with the platforms and tools your teams already know."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {toolchain.map((t, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.05)}
              className="rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm hover:shadow-lg transition"
            >
              <t.icon className="mx-auto text-3xl text-red-600" />
              <div className="mt-2 text-sm font-semibold text-neutral-900">{t.name}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ------------------------------ CASE STUDIES ------------------------- */}
      <Section
        id="results"
        title="Recent outcomes"
        subtitle="A glimpse of how we translate diagrams into durable impact."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            {
              title: "Realtime Trading Platform",
              body:
                "Re-platformed to K8s with gRPC microservices and circuit-breakers. Canary releases cut incident risk by 78%.",
              metrics: [
                { label: "Latency (P99)", value: "↓ 43%" },
                { label: "Release Cadence", value: "2× weekly" },
                { label: "Crash-free", value: "99.96%" },
                { label: "Costs", value: "↓ 21%" },
              ],
              img: "/Cloud/c2.jpg",
            },
            {
              title: "Global E-commerce",
              body:
                "Multi-region active-active with GSLB and S3 replication. Observability drove SLO-first culture.",
              metrics: [
                { label: "Uptime", value: "99.99%" },
                { label: "Page Load", value: "1.2s avg" },
                { label: "Incidents/Q", value: "↓ 62%" },
                { label: "AOV", value: "↑ 13%" },
              ],
              img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Healthcare Data Lake",
              body:
                "HIPAA-aligned pipelines, encrypted PHI at rest/in transit, and strict access boundaries.",
              metrics: [
                { label: "Throughput", value: "3TB/day" },
                { label: "Breach Events", value: "0" },
                { label: "Recovery (RTO)", value: "< 15m" },
                { label: "Audit Findings", value: "Resolved" },
              ],
              img: "/Cloud/c3.png",
            },
          ].map((c, i) => (
            <motion.article
              key={i}
              {...fadeUp(i * 0.05)}
              {...hoverCard}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="relative overflow-hidden rounded-xl h-44 bg-neutral-100">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-black">{c.title}</h3>
              <p className="mt-2 text-neutral-700 leading-relaxed">{c.body}</p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {c.metrics.map((m, j) => (
                  <div
                    key={j}
                    className="rounded-lg border border-neutral-200 bg-red-50 p-3 text-center"
                  >
                    <div className="text-lg font-bold text-red-700">{m.value}</div>
                    <div className="text-xs text-neutral-700">{m.label}</div>
                  </div>
                ))}
              </div>
              <a
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-black transition-all"
              >
                See if this fits you <FaLongArrowAltRight />
              </a>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* ------------------------------- PRICING ------------------------------ */}
      <Section
        id="pricing"
        title="Engagement models"
        subtitle="Choose the model that matches your trajectory—validated MVPs to enterprise scale."
      >
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            delay={0.05}
            name="Launch"
            price="Fixed"
            caption="MVP infrastructure ready in weeks"
            bullets={[
              "Single region, HA-ready",
              "CI/CD + staging + review apps",
              "Managed DB + backups",
              "Dashboards & alerts",
            ]}
          />
          <PricingCard
            delay={0.1}
            name="Scale"
            price="Monthly"
            caption="Dedicated squad, roadmap velocity"
            bullets={[
              "K8s + autoscaling",
              "Blue/green & canary",
              "Cost optimization",
              "SLOs & on-call runbooks",
            ]}
            highlight
          />
          <PricingCard
            delay={0.15}
            name="Enterprise"
            price="Custom"
            caption="Regulated & multi-region environments"
            bullets={[
              "Multi-AZ / multi-region",
              "Zero-trust & compliance",
              "Private links & peering",
              "DR drills & pen-tests",
            ]}
          />
        </div>
      </Section>

      {/* ------------------------------- FAQ --------------------------------- */}
      <Section id="faqs" title="FAQs" subtitle="Straight answers, less fluff.">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Can you work in our cloud account?",
              a: "Yes. We can build within your AWS/GCP subscription with strong IAM boundaries and change management.",
            },
            {
              q: "Do you support hybrid setups?",
              a: "Absolutely. We design private links, site-to-site VPNs, or Direct Connect/Interconnect to bridge data centers and cloud.",
            },
            {
              q: "How do you keep costs under control?",
              a: "Budgets, guardrails, tagging, and dashboards with anomaly alerts. We also right-size resources and leverage savings plans.",
            },
            {
              q: "What about compliance?",
              a: "We align the stack with your target frameworks (SOC 2, ISO 27001, HIPAA). We provide evidence, policies, and controls.",
            },
          ].map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} delay={i * 0.05} />
          ))}
        </div>
      </Section>

      {/* ------------------------------ CONTACT CTA -------------------------- */}
      <section className="relative py-16 md:py-20">
        <SoftBlob className="w-[34rem] h-[34rem] -top-10 right-0 bg-red-200" />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            {...fadeUp(0.05)}
            className="rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-8 md:p-12 text-white shadow-xl"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-4xl font-extrabold">
                  Let’s architect your next cloud leap.
                </h3>
                <p className="mt-3 text-white/90">
                  Share requirements and constraints—we’ll come back with an actionable plan,
                  timelines, and a transparent estimate.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-red-700 shadow hover:bg-red-50 transition"
                >
                  <FaEnvelopeOpenText /> Contact Us
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10 transition"
                >
                  <FaPhoneAlt /> Request a Callback
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
