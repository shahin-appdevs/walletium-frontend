"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Globe,

  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
const image = "/icons/wallet.webp";

const FLOATING_CARDS = [
  {
    key: "instantTransfers",
    Icon: Send,
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    position: "top-2 -left-2 sm:top-4 sm:-left-6 lg:-left-4",
    animate: { y: [0, -14, 0], rotate: [0, -2, 0] },
    duration: 4.5,
    delay: 0,
  },
  {
    key: "multiCurrency",
    Icon: Globe,
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    position: "top-20 -right-2 sm:top-24 sm:-right-6 lg:-right-4",
    animate: { y: [0, -10, 0], rotate: [0, 3, 0] },
    duration: 4,
    delay: 0.5,
  },
  {
    key: "bankGrade",
    Icon: ShieldCheck,
    gradient: "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
    position: "bottom-16 -left-2 sm:-left-6 lg:-left-4",
    animate: { y: [0, -12, 0], rotate: [0, -3, 0] },
    duration: 4.8,
    delay: 0.8,
  },
  {
    key: "realtime",
    Icon: TrendingUp,
    gradient: "linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)",
    position: "bottom-2 -right-2 sm:-right-6 lg:-right-4",
    animate: { y: [0, -10, 0], rotate: [0, 2, 0] },
    duration: 4.3,
    delay: 0.3,
  },
];

export function AboutHero() {
  const t = useTranslations("Frontend.about.hero");

  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-28 bg-linear-to-b from-slate-50 via-emerald-50/40 to-white dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* Background glow */}
      <div
        className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-80 dark:opacity-40"
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
              <Sparkles size={12} /> {t("badge")}
            </span>
            <h1 className=" font-black leading-[1.05] mb-5 text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] tracking-tight text-neutral-900 dark:text-white">
              {t("headingPart1")}{" "}
              <span className="text-primary-600 dark:text-primary-400">
                {t("headingHighlight")}
              </span>{" "}
              {t("headingPart2")}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow"
                style={{
                  background:
                    "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                }}
              >
                {t("ctaGetStarted")}{" "}
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="rtl:rotate-180"
                />
              </motion.a>
              
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <div className="flex items-center gap-1.5">
                <BadgeCheck size={16} className="text-primary-500" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  {t("trustUsers")}
                </span>
              </div>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-primary-500" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  {t("trustSecurity")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center"
          >
            {/* Background orb */}
            <div
              className="absolute inset-6 sm:inset-8 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(14,190,152,0.30) 0%, rgba(0,229,255,0.15) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* Center wallet badge */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-[28px] flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                boxShadow: "0 30px 80px -10px rgba(14,190,152,0.5)",
              }}
            >
              {/* <Wallet size={56} color="white" strokeWidth={2} /> */}
              <Image
                    src={image}
                    alt=""
                    width={100}
                    height={100}
                    className="-rotate-45"
                  />
              {/* Spark badge */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                }}
              >
                <Zap
                  size={16}
                  color="white"
                  strokeWidth={3}
                  fill="white"
                />
              </motion.div>
            </motion.div>

            {/* Floating cards */}
            {FLOATING_CARDS.map(
              ({
                key,
                Icon,
                gradient,
                position,
                animate,
                duration,
                delay,
              }) => (
                <motion.div
                  key={key}
                  animate={animate}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute ${position} flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white dark:bg-neutral-800/90 backdrop-blur-sm shadow-xl border border-neutral-100 dark:border-neutral-700/80`}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: gradient }}
                  >
                    <Icon size={18} color="white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[10px] leading-none text-neutral-500 dark:text-neutral-400 mb-1">
                      {t(`floatingCards.${key}.subtitle`)}
                    </p>
                    <p className="text-xs sm:text-sm font-bold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">
                      {t(`floatingCards.${key}.title`)}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
