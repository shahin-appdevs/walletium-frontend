"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  Code2,
  CreditCard,
  Globe,
  LineChart,
  Settings2,
  Wallet,
} from "lucide-react";

const SERVICES_BASE = [
  {
    key: "wallet",
    Icon: Wallet,
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    shadow: "0 12px 28px -8px rgba(14,190,152,0.45)",
  },
  {
    key: "payment",
    Icon: CreditCard,
    gradient: "linear-gradient(135deg, #F43F5E 0%, #F97316 100%)",
    shadow: "0 12px 28px -8px rgba(244,63,94,0.45)",
  },
  {
    key: "currency",
    Icon: Globe,
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    shadow: "0 12px 28px -8px rgba(59,130,246,0.45)",
  },
  {
    key: "api",
    Icon: Code2,
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    shadow: "0 12px 28px -8px rgba(99,102,241,0.45)",
  },
  {
    key: "consulting",
    Icon: LineChart,
    gradient: "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
    shadow: "0 12px 28px -8px rgba(34,197,94,0.45)",
  },
  {
    key: "solutions",
    Icon: Settings2,
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    shadow: "0 12px 28px -8px rgba(139,92,246,0.45)",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function ServicesGrid() {
  const t = useTranslations("Frontend.services.whatWeDo");

  const SERVICES = SERVICES_BASE.map((service) => ({
    ...service,
    title: t(`services.${service.key}.title`),
    description: t(`services.${service.key}.description`),
  }));

  return (
    <section
      id="services-grid"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-white dark:bg-walletium-dark"
    >
      {/* Glow accents */}
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 translate-x-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-50 dark:opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-20"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 text-primary-600 dark:text-primary-400">
            {t("eyebrow")}
          </span>
          <h2 className="font-serif font-black leading-tight mb-4 sm:mb-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-neutral-900 dark:text-white">
            {t("heading.part1")}{" "}
            <span className="text-primary-600 dark:text-primary-400">
              {t("heading.highlight")}
            </span>{" "}
            {t("heading.part2")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("description")}
          </p>
        </motion.div>

        {/* Service grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {SERVICES.map(({ title, description, Icon, gradient, shadow }) => (
            <motion.div
              key={title}
              variants={cardReveal}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative p-7 rounded-3xl bg-white dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.3)] hover:border-primary-200 dark:hover:border-primary-500/40 transition-shadow duration-300 overflow-hidden"
            >
              {/* Hover accent corner */}
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: gradient,
                  filter: "blur(40px)",
                }}
              />

              <div className="relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                  style={{ background: gradient, boxShadow: shadow }}
                >
                  <Icon size={26} color="white" strokeWidth={2.2} />
                </div>
                <h3 className="font-serif font-bold text-xl mb-2.5 tracking-tight text-neutral-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed mb-5 text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 group-hover:gap-2.5"
                >
                  {t("learnMore")}
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
