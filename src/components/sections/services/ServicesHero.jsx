"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Globe,
  Layers,
  Play,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

const PREVIEW_CARDS_BASE = [
  {
    Icon: Wallet,
    key: "wallet",
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    shadow: "0 20px 50px -12px rgba(14,190,152,0.45)",
    position:
      "top-0 right-2 sm:right-6 lg:right-10 rotate-[3deg] hover:rotate-[1deg]",
    animate: { y: [0, -10, 0] },
    duration: 4,
    delay: 0,
  },
  {
    Icon: Globe,
    key: "global",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    shadow: "0 20px 50px -12px rgba(59,130,246,0.45)",
    position:
      "top-[33%] left-0 sm:left-2 lg:left-4 -rotate-[4deg] hover:-rotate-[2deg]",
    animate: { y: [0, -14, 0] },
    duration: 4.6,
    delay: 0.4,
  },
  {
    Icon: Code2,
    key: "api",
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    shadow: "0 20px 50px -12px rgba(99,102,241,0.45)",
    position:
      "bottom-2 right-4 sm:right-10 lg:right-12 rotate-[2deg] hover:rotate-[1deg]",
    animate: { y: [0, -12, 0] },
    duration: 5,
    delay: 0.8,
  },
];

export function ServicesHero() {
  const t = useTranslations("Frontend.services.hero");

  const PREVIEW_CARDS = PREVIEW_CARDS_BASE.map((card) => ({
    ...card,
    eyebrow: t(`cards.${card.key}.eyebrow`),
    title: t(`cards.${card.key}.title`),
    detail: t(`cards.${card.key}.detail`),
  }));

  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-28 bg-linear-to-b from-slate-50 via-emerald-50/40 to-white dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* Background glow */}
      <div
        className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-80 dark:opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.20) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-70 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.16) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-5 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200/60 dark:ring-primary-500/30">
              <Sparkles size={12} /> {t("eyebrow")}
            </span>
            <h1 className="font-serif font-black leading-[1.05] mb-5 text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] tracking-tight text-neutral-900 dark:text-white">
              {t("heading.part1")}{" "}
              <span className="text-primary-600 dark:text-primary-400">
                {t("heading.highlight")}
              </span>{" "}
              {t("heading.part2")}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <motion.a
                href="#services-grid"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow"
                style={{
                  background:
                    "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                }}
              >
                Explore Services <ArrowRight size={16} strokeWidth={2.5} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500/50 bg-white/80 dark:bg-neutral-900/40 backdrop-blur-sm text-neutral-900 dark:text-white font-bold text-sm transition-colors"
              >
                <Play size={14} strokeWidth={2.5} fill="currentColor" />
                {t("buttons.talkToSales")}
              </motion.a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-primary-500" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  {t("trust.security")}
                </span>
              </div>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="flex items-center gap-1.5">
                <Layers size={16} className="text-primary-500" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  {t("trust.businesses")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visual: cascading service preview cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[440px] sm:h-[480px] lg:h-[520px]"
          >
            {/* Center backdrop glow */}
            <div
              className="absolute inset-x-8 inset-y-12 rounded-[40px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(14,190,152,0.28) 0%, rgba(0,229,255,0.14) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {PREVIEW_CARDS.map(
              (
                {
                  Icon,
                  eyebrow,
                  title,
                  detail,
                  gradient,
                  shadow,
                  position,
                  animate,
                  duration,
                  delay,
                },
                i
              ) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  className={`absolute ${position} w-60 sm:w-64 lg:w-72 transition-transform duration-500`}
                >
                  <motion.div
                    animate={animate}
                    transition={{
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="p-5 rounded-2xl bg-white dark:bg-neutral-800/90 backdrop-blur-xl shadow-2xl border border-neutral-100 dark:border-neutral-700/80"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: gradient, boxShadow: shadow }}
                      >
                        <Icon size={22} color="white" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-600 dark:text-primary-400 mb-1">
                          {eyebrow}
                        </p>
                        <p className="text-sm font-bold leading-tight text-neutral-900 dark:text-white">
                          {title}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-neutral-400 dark:text-neutral-500 shrink-0"
                      />
                    </div>
                    <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {detail}
                    </p>
                  </motion.div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
