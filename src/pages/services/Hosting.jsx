// src/pages/services/Hosting.jsx
import { motion } from "framer-motion";
import {
  FaServer,
  FaCloud,
  FaLock,
  FaCheckCircle,
  FaNetworkWired,
  FaDatabase,
  FaGlobeAsia,
  FaEnvelopeOpenText,
  FaLongArrowAltRight,
} from "react-icons/fa";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const hoverCard = {
  whileHover: { y: -6, scale: 1.01 },
  transition: { duration: 0.35, ease: "easeOut" },
};

const SectionTitle = ({ title, subtitle }) => (
  <motion.div {...fadeUp(0.05)} className="text-center max-w-3xl mx-auto mb-14">
    <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-neutral-600 text-lg leading-relaxed">{subtitle}</p>
    )}
  </motion.div>
);

const Stat = ({ label, value, delay }) => (
  <motion.div
    {...fadeUp(delay)}
    className="flex flex-col items-center text-center p-6 border border-neutral-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all"
  >
    <div className="text-4xl font-extrabold text-red-600">{value}</div>
    <div className="mt-2 text-neutral-700 font-semibold">{label}</div>
  </motion.div>
);

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    {...fadeUp(delay)}
    {...hoverCard}
    className="p-7 rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer"
  >
    <div className="text-red-600 text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-black">{title}</h3>
    <p className="mt-3 text-neutral-700 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function Hosting() {
  return (
    <main className="relative bg-white text-black overflow-hidden">

      {/* HERO SECTION */}
      <section className="pt-32 md:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
          
          {/* TEXT */}
          <div>
            <motion.h1
              {...fadeUp(0.05)}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              Reliable <span className="text-red-600">Hosting Services</span> Built
              For Performance & Growth
            </motion.h1>

            <motion.p
              {...fadeUp(0.1)}
              className="mt-5 text-lg md:text-xl text-neutral-600 leading-relaxed"
            >
              Your business deserves secure, stable, and scalable hosting.
              We deliver enterprise-grade hosting solutions backed by global
              uptime, high-speed architecture, and next-gen infrastructure.
            </motion.p>

            <motion.div
              {...fadeUp(0.2)}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#plans"
                className="px-6 py-3 rounded-lg font-semibold bg-red-600 text-white shadow hover:bg-red-700 transition-all"
              >
                View Plans
              </a>
              <a
                href="/contact"
                className="px-6 py-3 rounded-lg font-semibold border border-black text-black hover:bg-black hover:text-white transition-all"
              >
                Contact Support
              </a>
            </motion.div>
          </div>

          {/* ✅ IMAGE FIXED — THIS ONE ALWAYS LOADS */}
          <motion.img
            {...fadeUp(0.15)}
            src="/Hosting/h1.jpeg"
            alt="Modern Cloud Hosting Servers"
            className="rounded-3xl shadow-xl object-cover w-full h-[390px]"
          />
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 border-y border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Stat label="Global Uptime" value="99.99%" delay={0.05} />
          <Stat label="Active Deployments" value="850+" delay={0.1} />
          <Stat label="Data Centers" value="12+" delay={0.15} />
          <Stat label="Response Time" value="< 50ms" delay={0.2} />
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="py-20">
        <SectionTitle
          title="Hosting Solutions We Provide"
          subtitle="Choose the hosting type that best matches your business performance scale."
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <FeatureCard delay={0.05} icon={<FaServer />} title="Shared Hosting" desc="Cost-efficient hosting built for growing businesses." />
          <FeatureCard delay={0.1} icon={<FaCloud />} title="Cloud Hosting" desc="Auto-scaling environments with high availability." />
          <FeatureCard delay={0.15} icon={<FaLock />} title="Secure VPS Hosting" desc="Full control + isolated performance for enterprise usage." />
          <FeatureCard delay={0.2} icon={<FaDatabase />} title="Database Hosting" desc="High-speed distributed storage for heavy workloads." />
          <FeatureCard delay={0.25} icon={<FaNetworkWired />} title="Dedicated Servers" desc="Dedicated bare-metal power and maximum reliability." />
          <FeatureCard delay={0.3} icon={<FaGlobeAsia />} title="Global CDN" desc="Lightning-fast worldwide delivery with zero lag." />
        </div>
      </section>

      {/* PRICING */}
      <section id="plans" className="py-20 bg-neutral-50 border-y border-neutral-200">
        <SectionTitle
          title="Flexible Hosting Plans"
          subtitle="Transparent pricing. Enterprise-level performance. No hidden fees."
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-8">

          {[
            {
              name: "Starter",
              price: "$19/mo",
              features: ["10GB SSD Storage", "Free SSL", "Global CDN", "Daily Backups"],
            },
            {
              name: "Business",
              price: "$79/mo",
              features: ["200GB NVMe", "Priority Support", "Dedicated CPU & RAM", "Premium CDN"],
            },
            {
              name: "Enterprise",
              price: "Custom",
              features: ["Private Infrastructure", "Zero-Downtime", "Load Balancing", "Dedicated Team"],
            },
          ].map((plan, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              {...hoverCard}
              className="rounded-2xl bg-white border border-neutral-200 p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-bold text-black">{plan.name}</h3>
              <p className="mt-2 text-red-600 text-3xl font-extrabold">{plan.price}</p>
              <ul className="mt-5 space-y-2 text-neutral-700">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <FaCheckCircle className="text-red-600 mt-1" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                Request Quote <FaLongArrowAltRight />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-black">
          Ready to Host With Confidence?
        </h2>
        <p className="mt-4 text-neutral-700 text-lg max-w-2xl mx-auto">
          Secure, scalable, and high-performance hosting backed by 24/7 monitoring & priority support.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-black transition-all"
        >
          <FaEnvelopeOpenText /> Contact Us
        </a>
      </section>

    </main>
  );
}
