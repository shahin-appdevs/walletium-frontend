"use client";
import { motion } from "framer-motion";
import {
  Banknote,
  Code2,
  Globe,
  Send,
  Ticket,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";

const FEATURES = [
  {
    key: "addMoney",
    Icon: Wallet,
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    shadow: "0 12px 28px -8px rgba(14,190,152,0.45)",
  },
  {
    key: "p2p",
    Icon: Send,
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    shadow: "0 12px 28px -8px rgba(59,130,246,0.45)",
  },
  {
    key: "payouts",
    Icon: Banknote,
    gradient: "linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)",
    shadow: "0 12px 28px -8px rgba(245,158,11,0.45)",
  },
  {
    key: "multiCurrency",
    Icon: Globe,
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    shadow: "0 12px 28px -8px rgba(139,92,246,0.45)",
  },
  {
    key: "vouchers",
    Icon: Ticket,
    gradient: "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
    shadow: "0 12px 28px -8px rgba(34,197,94,0.45)",
  },
  {
    key: "developerApi",
    Icon: Code2,
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    shadow: "0 12px 28px -8px rgba(99,102,241,0.45)",
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

export function AboutFeatures() {
  const t = useTranslations("Frontend.about.features");

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-linear-to-b from-white via-emerald-50/40 to-rose-50/30 dark:from-[#091829] dark:via-walletium-dark-mid dark:to-[#0A0F1E]">
      {/* Glow accents */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-100 dark:opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.22) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 translate-x-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-100 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.14) 0%, transparent 65%)",
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
            {t("heading")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("description")}
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {FEATURES.map(({ key, Icon, gradient, shadow }) => (
            <motion.div
              key={key}
              variants={cardReveal}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative p-7 rounded-3xl backdrop-blur-sm bg-white/70 dark:bg-neutral-800/50 border border-white/90 dark:border-neutral-700/60 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.3)] hover:border-primary-200 dark:hover:border-primary-500/40 transition-shadow duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                style={{ background: gradient, boxShadow: shadow }}
              >
                <Icon size={26} color="white" strokeWidth={2.2} />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2.5 tracking-tight text-neutral-900 dark:text-white">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {t(`items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
