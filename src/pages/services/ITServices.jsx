// src/pages/services/ITServices.jsx
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaShieldAlt,
  FaLaptopCode,
  FaServer,
  FaNetworkWired,
  FaCloud,
  FaCogs,
  FaLifeRing,
  FaMobileAlt,
  FaDatabase,
  FaProjectDiagram,
  FaTools,
  FaUserShield,
  FaSyncAlt,
  FaChartLine,
  FaRocket,
  FaLock,
  FaThumbsUp,
  FaClipboardCheck,
  FaWifi,
  FaBug,
  FaHeadset,
  FaCheckCircle,
  FaArrowRight,
  FaLongArrowAltRight,
  FaChevronRight,
  FaCodeBranch,
  FaExchangeAlt,
  FaBolt,
  FaGlobeAsia,
  FaPlay,
} from "react-icons/fa";

/**
 * OORJAVERSE PRIVATE LIMITED — IT Services (Rich & Different)
 * - White/Black/Red palette (+ subtle neutral grays)
 * - Smooth, lag-free animations with Framer Motion (transform/opacity only)
 * - Mobile-first, responsive
 * - Hover effects & icons everywhere
 * - Uses URL images (Unsplash) for hero/sections
 * - All CTAs point ONLY to /contact
 * - One file, production-ready
 */

/* ------------------------------ ANIMATION UTILS ------------------------------ */

const fadeUp = (delay = 0, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

const hoverLift = {
  whileHover: { y: -6, scale: 1.01 },
  transition: { type: "spring", stiffness: 260, damping: 20 },
};

/* ------------------------------ SMALL UI ATOMS ------------------------------ */

const Badge = ({ children, tone = "red" }) => {
  const colors =
    tone === "red"
      ? "bg-red-50 text-red-700 border-red-200"
      : tone === "dark"
      ? "bg-black text-white border-black"
      : "bg-neutral-100 text-neutral-800 border-neutral-200";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${colors}`}>
      {children}
    </span>
  );
};

const Kpi = ({ value, label }) => (
  <motion.div {...fadeUp(0.05)} className="rounded-2xl border border-neutral-200 bg-white/80 p-6 shadow-sm">
    <div className="text-3xl md:text-4xl font-extrabold text-red-600">{value}</div>
    <div className="mt-2 text-neutral-700">{label}</div>
  </motion.div>
);

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="relative py-16 md:py-20">
    {/* dotted bg pattern */}
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
      style={{
        backgroundImage:
          "radial-gradient(currentColor 1px, transparent 1px)",
        backgroundSize: "14px 14px",
        color: "#000",
      }}
    />
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="mb-10 md:mb-14">
        {eyebrow && (
          <motion.div {...fadeUp(0.02)}>
            <Badge>{eyebrow}</Badge>
          </motion.div>
        )}
        <motion.h2
          {...fadeUp(0.05)}
          className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight text-black"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            {...fadeUp(0.08)}
            className="mt-3 md:mt-4 max-w-3xl text-neutral-700 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {children}
    </div>
  </section>
);

const SoftGlow = ({ className = "", color = "red" }) => {
  const bg =
    color === "red"
      ? "bg-red-300"
      : color === "yellow"
      ? "bg-yellow-300"
      : "bg-neutral-300";
  return (
    <div className={`pointer-events-none absolute blur-[110px] opacity-30 ${bg} ${className}`} aria-hidden />
  );
};

const ArrowLink = ({ children, href = "/contact", className = "" }) => (
  <a
    href={href}
    className={`inline-flex items-center gap-2 rounded-lg border border-black px-5 py-3 font-semibold text-black hover:bg-black hover:text-white transition ${className}`}
  >
    {children} <FaLongArrowAltRight />
  </a>
);

/* ------------------------------ HERO SECTION ------------------------------ */

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const fadeHero = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 md:pt-36 pb-16">
      {/* soft glows */}
      <SoftGlow className="-top-28 -left-20 w-[420px] h-[420px]" color="yellow" />
      <SoftGlow className="top-36 -right-24 w-[540px] h-[540px]" color="red" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center">
        <motion.div  style={{ y: yTitle, opacity: fadeHero }}>
          <Badge tone="red" >OORJAVERSE PRIVATE LIMITED</Badge>
          <h1 className="mt-4 text-3xl md:text-6xl font-extrabold tracking-tight text-black">
            Enterprise-Grade <span className="text-red-600">IT Services</span> for
            Predictable <span className="underline decoration-red-600/30 underline-offset-8">Growth</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-neutral-700 max-w-2xl">
            We architect, secure, and operate the backbone of modern businesses — cloud,
            networks, apps, and data — so your teams ship faster and your customers stay delighted.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-lg bg-red-600 px-5 py-3 font-bold text-white shadow hover:bg-red-700"
            >
              Start a Project <FaRocket className="-mb-px" />
            </a>
            <ArrowLink>Talk to Experts</ArrowLink>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 gap-4">
            <Kpi value="8+ yrs" label="Deep Expertise" />
            <Kpi value="120+" label="Projects Delivered" />
            <Kpi value="99.9%" label="Uptime Targets" />
            <Kpi value="24/7" label="Managed Support" />
          </div>
        </motion.div>

        {/* Hero Image Panel */}
        <motion.div
          style={{ y: yImage, opacity: fadeHero }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl">
            {/* main image */}
            <img
              src="/ItServicesimages/it6.jpg"
              alt="Modern server racks and dashboard"
              className="h-[300px] md:h-[420px] w-full object-cover"
              loading="lazy"
            />
            {/* floating stat chips */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-4 left-4 rounded-xl bg-white/90 px-4 py-3 shadow border border-neutral-200">
                <div className="text-xs text-neutral-700">SLA Performance</div>
                <div className="text-lg font-extrabold text-red-600">99.95%</div>
              </div>
              <div className="absolute bottom-4 right-4 rounded-xl bg-black/90 text-white px-4 py-3 shadow">
                <div className="text-xs text-white/70">Security Events</div>
                <div className="text-lg font-extrabold">Mitigated in Real-Time</div>
              </div>
            </div>
          </div>

          {/* small strip logos */}
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-neutral-600">
            {[
              "/ItServicesimages/it5.jpg",
              "/ItServicesimages/it7.jpg",
              "/ItServicesimages/it4.jpg",
            ].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <img src={src} alt="infra" className="h-20 w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------ MARQUEE STRIP ------------------------------ */

const Marquee = () => (
  <div className="relative border-y border-neutral-200 bg-white/70">
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="flex gap-10 whitespace-nowrap"
      >
        {[
          ["Security First", <FaLock key="i1" />],
          ["Cloud Native", <FaCloud key="i2" />],
          ["Zero Downtime", <FaSyncAlt key="i3" />],
          ["Observability", <FaChartLine key="i4" />],
          ["DevOps CI/CD", <FaCodeBranch key="i5" />],
          ["SRE Practices", <FaTools key="i6" />],
        ].concat(
          [
            ["Security First", <FaLock key="i1a" />],
            ["Cloud Native", <FaCloud key="i2a" />],
            ["Zero Downtime", <FaSyncAlt key="i3a" />],
            ["Observability", <FaChartLine key="i4a" />],
            ["DevOps CI/CD", <FaCodeBranch key="i5a" />],
            ["SRE Practices", <FaTools key="i6a" />],
          ]
        ).map(([text, icon], idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-700 hover:border-black transition"
          >
            <span className="text-red-600">{icon}</span>
            {text}
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);

/* ------------------------------ SERVICE CARDS ------------------------------ */

const ServiceCard = ({ icon: Icon, title, desc, accent = "red" }) => {
  const ring =
    accent === "red"
      ? "bg-red-100 text-red-700"
      : "bg-neutral-100 text-neutral-800";
  return (
    <motion.article
      {...fadeUp(0.05)}
      {...hoverLift}
      className="group h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
    >
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${ring}`}>
        <Icon className="text-xl" />
      </div>
      <h3 className="mt-4 text-lg md:text-xl font-extrabold text-black">{title}</h3>
      <p className="mt-2 text-neutral-700 leading-relaxed">{desc}</p>
      <a
        href="/contact"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600"
      >
        Discuss this service <FaChevronRight className="transition group-hover:translate-x-0.5" />
      </a>
    </motion.article>
  );
};

const ServicesGrid = () => {
  const services = useMemo(
    () => [
      {
        icon: FaLaptopCode,
        title: "Managed IT & Helpdesk",
        desc: "Proactive endpoint care, updates, backup, license tracking, and rapid end-user support that prevents downtime.",
      },
      {
        icon: FaNetworkWired,
        title: "Network Architecture",
        desc: "LAN/WAN, SD-WAN, VPN, Wi-Fi mesh — secure, monitored networks with QoS and redundancy baked in.",
      },
      {
        icon: FaServer,
        title: "Servers & Virtualization",
        desc: "Modernize on VMware/Proxmox, automate builds, right-size resources, and maintain reliable on-prem footprints.",
      },
      {
        icon: FaCloud,
        title: "Cloud & DevOps",
        desc: "AWS/Azure cloud adoption, infra-as-code, CI/CD pipelines, blue/green deployments and cost governance.",
      },
      {
        icon: FaUserShield,
        title: "Security & Compliance",
        desc: "SOC, SIEM, MFA, SSO, device hardening. Align to ISO 27001, SOC2, GDPR — with audits & playbooks.",
      },
      {
        icon: FaLifeRing,
        title: "24×7 Monitoring & SRE",
        desc: "On-call SRE, synthetic checks, error budgets and incident response for stress-free reliability.",
      },
    ],
    []
  );

  return (
    <Section
      id="services"
      eyebrow="What we do"
      title="High-Impact IT Services, Delivered End-to-End"
      subtitle="We combine strategy, engineering, and operations to own outcomes — not just deliverables."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={i} icon={s.icon} title={s.title} desc={s.desc} />
        ))}
      </div>
    </Section>
  );
};

/* ------------------------------ FEATURED ROWS ------------------------------ */

const FeatureRow = ({ flip = false, eyebrow, title, text, bullets, image }) => (
  <div className={`grid md:grid-cols-2 gap-10 items-center ${flip ? "md:[&>*:first-child]:order-last" : ""}`}>
    <motion.div {...scaleIn(0.02)}>
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow">
        <img
          src={image}
          alt="feature"
          className="h-[260px] md:h-[360px] w-full object-cover"
          loading="lazy"
        />
        {/* overlay highlight */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">
          <FaPlay className="text-red-600" /> demo ready
        </div>
      </div>
    </motion.div>

    <motion.div {...fadeUp(0.04)} className="max-w-xl">
      {eyebrow && <Badge tone="red">{eyebrow}</Badge>}
      <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-black">{title}</h3>
      <p className="mt-3 text-neutral-700 leading-relaxed">{text}</p>
      <ul className="mt-4 space-y-2 text-neutral-800">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <FaCheckCircle className="mt-1 text-red-600" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <a
        href="/contact"
        className="mt-6 inline-flex items-center gap-3 rounded-lg bg-black px-5 py-3 font-bold text-white hover:bg-red-700 transition"
      >
        Get a tailored plan <FaArrowRight />
      </a>
    </motion.div>
  </div>
);

const Featured = () => (
  <Section
    id="featured"
    eyebrow="How we make it work"
    title="Architected for Speed, Security, and Scale"
    subtitle="These pillars ensure each rollout is reliable on day one — and even better at day one thousand."
  >
    <FeatureRow
      image="/ItServicesimages/it9.jpg"
      eyebrow="Cloud & DevOps"
      title="Delivery without bottlenecks"
      text="We build with infra-as-code, containerization, and progressive delivery, so you can release features with safety nets."
      bullets={[
        "GitOps pipelines with approvals and rollbacks",
        "Observability: logs, traces, and SLO dashboards",
        "Cost policies to avoid surprise bills",
      ]}
    />

    <div className="my-12" />

    <FeatureRow
      flip
      image="/ItServicesimages/it3.jpg"
      eyebrow="Security"
      title="Defense that scales with your org"
      text="Security is never an afterthought. We design authentication, encryption, and monitoring into the system from the start."
      bullets={[
        "SSO, MFA, SCIM provisioning across apps",
        "Vulnerability scanning & patch orchestration",
        "Playbooks for detection & response",
      ]}
    />
  </Section>
);

/* ------------------------------ PROCESS TIMELINE ------------------------------ */

const Step = ({ n, title, text }) => (
  <motion.div {...fadeUp(n * 0.05)} className="relative pl-10">
    <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-red-600 text-white grid place-items-center font-extrabold">
      {n}
    </div>
    <div className="absolute left-4 top-8 bottom-0 w-px bg-neutral-300" />
    <h4 className="text-lg md:text-xl font-extrabold text-black">{title}</h4>
    <p className="mt-1 text-neutral-700 leading-relaxed">{text}</p>
  </motion.div>
);

const Process = () => (
  <Section
    id="process"
    eyebrow="Process"
    title="A Clear Path from Idea to Reality"
    subtitle="We keep you in the loop at every milestone. No guesswork, just visible progress."
  >
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-8">
        <Step n={1} title="Discovery" text="Workshops, system review, goals, constraints, and success metrics." />
        <Step n={2} title="Blueprint" text="Architecture, backlog, and a release plan aligned with your budget." />
        <Step n={3} title="Implementation" text="Sprints with demos. Quality gates with testing and security checks." />
        <Step n={4} title="Launch & Handover" text="Staged releases, training, documentation, and rollout support." />
        <Step n={5} title="Operate & Improve" text="SLAs, monitoring, roadmaps, and continuous performance gains." />
      </div>

      <motion.div
        {...scaleIn(0.05)}
        className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <h4 className="text-lg font-extrabold text-black">Delivery Toolkit</h4>
        <ul className="mt-4 space-y-2 text-neutral-800">
          {[
            [FaClipboardCheck, "ClickUp/Jira for sprint visibility"],
            [FaBug, "Automated tests & QA gates"],
            [FaHeadset, "24×7 helpdesk & escalation runbooks"],
            [FaExchangeAlt, "Blue/green & canary releases"],
            [FaWifi, "Synthetic checks and real user monitoring"],
          ].map(([Icon, label], i) => (
            <li key={i} className="flex items-start gap-2">
              <Icon className="mt-1 text-red-600" />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-neutral-200 bg-red-50 p-4">
            <div className="text-xs text-neutral-700">Change Failure Rate</div>
            <div className="text-lg font-extrabold text-red-700">＜ 10%</div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-xs text-neutral-700">MTTR</div>
            <div className="text-lg font-extrabold text-black">Under 30 min</div>
          </div>
        </div>

        <a
          href="/contact"
          className="mt-6 inline-flex items-center gap-3 rounded-lg bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
        >
          Request a walkthrough <FaLongArrowAltRight />
        </a>
      </motion.div>
    </div>
  </Section>
);

/* ------------------------------ CAPABILITIES WALL ------------------------------ */

const Capability = ({ icon: Icon, label, sub }) => (
  <motion.div
    {...fadeUp(0.02)}
    className="rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm hover:shadow transition"
  >
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-700">
      <Icon className="text-xl" />
    </div>
    <div className="mt-3 font-bold text-black">{label}</div>
    <div className="text-xs text-neutral-700">{sub}</div>
  </motion.div>
);

const Capabilities = () => (
  <Section
    id="capabilities"
    eyebrow="Toolbox"
    title="Technical Capabilities"
    subtitle="We work across mainstream ecosystems so you don’t get locked into niche stacks."
  >
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      <Capability icon={FaCloud} label="AWS" sub="Compute & Infra" />
      <Capability icon={FaCloud} label="Azure" sub="Hybrid Cloud" />
      <Capability icon={FaDatabase} label="PostgreSQL" sub="Relational DB" />
      <Capability icon={FaServer} label="Proxmox" sub="Virtualization" />
      <Capability icon={FaCogs} label="Docker" sub="Containers" />
      <Capability icon={FaProjectDiagram} label="Terraform" sub="IaC" />
      <Capability icon={FaMobileAlt} label="MDM" sub="Device Control" />
      <Capability icon={FaShieldAlt} label="WAF/IDS" sub="Perimeter Sec" />
      <Capability icon={FaGlobeAsia} label="CDN/Edge" sub="Global Scale" />
      <Capability icon={FaBolt} label="Kafka" sub="Event Streams" />
      <Capability icon={FaSyncAlt} label="ArgoCD" sub="GitOps" />
      <Capability icon={FaCodeBranch} label="GitHub Actions" sub="CI/CD" />
    </div>
  </Section>
);

/* ------------------------------ CASE STUDIES GRID ------------------------------ */

const CaseCard = ({ title, metric, desc, image }) => (
  <motion.article
    {...fadeUp(0.05)}
    {...hoverLift}
    className="group rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
  >
    <div className="relative h-44 md:h-56 w-full overflow-hidden">
      <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold">
        {metric}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-lg md:text-xl font-extrabold text-black">{title}</h3>
      <p className="mt-2 text-neutral-700 leading-relaxed">{desc}</p>
      <a href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
        See how it applies to you <FaChevronRight className="group-hover:translate-x-0.5 transition" />
      </a>
    </div>
  </motion.article>
);

const CaseStudies = () => (
  <Section
    id="work"
    eyebrow="Results"
    title="Proven Impact"
    subtitle="A few snapshots of how we turned complexity into clarity."
  >
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      <CaseCard
        title="Cloud modernization for fintech"
        metric="+42% efficiency"
        desc="Refactored core services, added GitOps CI/CD, and slashed lead time from weekly to daily."
        image="/ItServicesimages/it1.jpg"
      />
      <CaseCard
        title="Network revamp for logistics"
        metric="99.9% uptime"
        desc="Designed resilient SD-WAN with central observability. Reduced outages caused by last-mile links."
        image="/ItServicesimages/it2.jpg"
      />
      <CaseCard
        title="Security uplift for healthcare"
        metric="-73% vulns"
        desc="Introduced SSO/MFA, auditing, and vulnerability management with remediation SLAs."
        image="/ItServicesimages/it6.jpg"
      />
    </div>
  </Section>
);

/* ------------------------------ PRICING/ENGAGEMENT ------------------------------ */

const Plan = ({ name, tagline, bullets, popular = false }) => (
  <motion.div
    {...fadeUp(0.05)}
    className={`relative rounded-3xl border p-6 md:p-8 shadow-sm bg-white ${
      popular ? "border-black ring-2 ring-red-500/20" : "border-neutral-200"
    }`}
  >
    {popular && (
      <div className="absolute -top-3 left-6 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
        Popular
      </div>
    )}
    <div className="text-xl md:text-2xl font-extrabold text-black">{name}</div>
    <div className="mt-1 text-neutral-700">{tagline}</div>
    <ul className="mt-4 space-y-2 text-neutral-800">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2">
          <FaThumbsUp className="mt-1 text-red-600" /> {b}
        </li>
      ))}
    </ul>
    <a
      href="/contact"
      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 font-bold text-white hover:bg-red-700 transition"
    >
      Request quote <FaArrowRight />
    </a>
  </motion.div>
);

const Pricing = () => (
  <Section
    id="pricing"
    eyebrow="Engagement"
    title="Flexible Ways to Work Together"
    subtitle="Pick a path that suits your stage. We’ll refine the plan after our first call."
  >
    <div className="grid md:grid-cols-3 gap-6">
      <Plan
        name="Managed IT"
        tagline="Steady care for teams & endpoints"
        bullets={[
          "Helpdesk + device lifecycle",
          "Patch management & backups",
          "Asset & license tracking",
          "Monthly reporting",
        ]}
      />
      <Plan
        name="Project Delivery"
        tagline="Fixed scope, reliable timeline"
        bullets={[
          "Architecture & build",
          "Security & QA gates",
          "Documentation & handover",
          "Training sessions",
        ]}
        popular
      />
      <Plan
        name="SRE / DevOps"
        tagline="Operate & optimize continuously"
        bullets={[
          "24×7 monitoring & on-call",
          "SLOs, error budgets, runbooks",
          "Release management",
          "Performance tuning",
        ]}
      />
    </div>
  </Section>
);

/* ------------------------------ TESTIMONIALS ------------------------------ */

const Quote = ({ text, by, role }) => (
  <motion.blockquote
    {...fadeUp(0.05)}
    {...hoverLift}
    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
  >
    <p className="text-neutral-800 leading-relaxed">“{text}”</p>
    <div className="mt-3 font-bold text-black">{by}</div>
    <div className="text-sm text-neutral-600">{role}</div>
  </motion.blockquote>
);

const Testimonials = () => (
  <Section
    id="testimonials"
    eyebrow="Social proof"
    title="Teams that trust us"
    subtitle="Outcomes matter more than buzzwords — here’s what clients say."
  >
    <div className="grid md:grid-cols-3 gap-6">
      <Quote
        text="Their roadmap clarity and fast delivery gave us confidence to scale our product."
        by="Priya Sharma"
        role="Product Head, Fintech"
      />
      <Quote
        text="Zero-drama migration with visibility at each step. Downtime went from hours to minutes."
        by="Rahul Mehta"
        role="CTO, SaaS"
      />
      <Quote
        text="Security and performance both improved. The team is responsive and proactive."
        by="Ananya Gupta"
        role="Director, Healthcare"
      />
    </div>
  </Section>
);

/* ------------------------------ FAQ ------------------------------ */

const FaqItem = ({ q, a, i }) => (
  <motion.details
    {...fadeUp(0.02 * i)}
    className="group rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
  >
    <summary className="flex cursor-pointer list-none items-start gap-3">
      <FaShieldAlt className="mt-0.5 text-red-600" />
      <span className="text-base md:text-lg font-bold text-black">{q}</span>
    </summary>
    <p className="mt-3 text-neutral-700">{a}</p>
  </motion.details>
);

const FAQ = () => (
  <Section
    id="faqs"
    eyebrow="FAQ"
    title="Answers, upfront"
    subtitle="If you don’t see your question here, we’ll answer it on a quick call."
  >
    <div className="grid md:grid-cols-2 gap-6">
      {[
        [
          "Will you work with our existing stack?",
          "Yes. We integrate with your current tools and recommend gradual improvements without disrupting teams.",
        ],
        [
          "How do you price projects?",
          "Transparent proposals based on scope, risk, and timeline. Managed services are on monthly retainers.",
        ],
        [
          "Can you take over from another vendor?",
          "Yes. We begin with an audit, stabilize the environment, then improve with agreed milestones.",
        ],
        [
          "Do you provide documentation & training?",
          "Always. We produce runbooks, architecture diagrams, and host walkthroughs for your team.",
        ],
      ].map(([q, a], i) => (
        <FaqItem key={i} i={i} q={q} a={a} />
      ))}
    </div>
  </Section>
);

/* ------------------------------ FINAL CTA ------------------------------ */

const FinalCTA = () => (
  <section className="relative py-16 md:py-20">
    <SoftGlow className="-bottom-10 right-10 w-[420px] h-[420px]" color="red" />
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <motion.div
        {...scaleIn(0.03)}
        className="rounded-3xl bg-gradient-to-r from-black via-black to-red-700 p-8 md:p-12 text-white shadow-xl"
      >
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="dark"><FaRocket /> Ready to move</Badge>
              <Badge tone="red"><FaClipboardCheck /> Free audit</Badge>
            </div>
            <h3 className="mt-4 text-2xl md:text-4xl font-extrabold">
              Let’s build a reliable foundation for your next 10x.
            </h3>
            <p className="mt-2 text-white/80">
              Share your goals — we’ll respond with a practical plan, clear timeline, and transparent pricing.
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 font-bold text-black hover:bg-red-50"
            >
              Contact OORJAVERSE <FaLongArrowAltRight />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------ PAGE COMPOSITION ------------------------------ */

export default function ITServices() {
  return (
    <main className="relative w-full overflow-hidden bg-white text-black">
      {/* background accents */}
      <SoftGlow className="-top-28 -left-28 w-[520px] h-[520px]" color="yellow" />
      <SoftGlow className="top-[420px] -right-28 w-[620px] h-[620px]" color="red" />

      <Hero />
      <Marquee />
      <ServicesGrid />
      <Featured />
      <Process />
      <Capabilities />
      <CaseStudies />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
