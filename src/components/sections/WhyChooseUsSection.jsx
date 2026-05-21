"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CreditCard,
  Headphones,
  ShieldCheck,
  Smile,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const FEATURES = [
  { key: "trusted", Icon: ShieldCheck },
  { key: "userFriendly", Icon: Smile },
  { key: "support", Icon: Headphones },
];

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function WhyChooseUsSection() {
  const t = useTranslations("WhyChooseUs");

  return (
    <section
      aria-labelledby="why-choose-us-title"
      className="relative overflow-hidden bg-linear-to-b from-slate-50 via-emerald-50/60 to-rose-50/40 dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]"
    >
      {/* radial glow blobs */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-100 dark:opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.22) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 translate-x-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-100 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.14) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: dashboard image + floating stat card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Animated forward-moving gradient border wrapper */}
            <div className="relative rounded-2xl p-[2px] sm:p-[2.5px] lg:p-[3px] overflow-hidden">
              {/* Static base border tint */}
              <div className="absolute inset-0 rounded-2xl bg-neutral-200/50 dark:bg-neutral-700/40 pointer-events-none" />

              {/* Forward-rotating conic-gradient trail */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  inset: "-50%",
                  background:
                    "conic-gradient(from 0deg, transparent 0%, transparent 65%, rgba(14,190,152,0.45) 75%, rgba(14,190,152,1) 85%, rgba(0,229,255,1) 92%, rgba(14,190,152,0.45) 97%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Image clipped inside */}
              <div className="relative rounded-[14px] sm:rounded-[13.5px] lg:rounded-[13px] overflow-hidden bg-white dark:bg-neutral-900">
                <Image
                  src="/images/partials/finance_dashboard.png"
                  alt=""
                  width={1520}
                  height={960}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* floating badge: top-right */}
            <motion.div
              className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 shadow-lg border border-neutral-100 dark:border-neutral-700/60"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                }}
              >
                <TrendingUp size={15} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] leading-none text-neutral-500 dark:text-neutral-400">
                  Growth
                </p>
                <p className="text-sm font-bold leading-tight text-neutral-900 dark:text-white">
                  +24.5%
                </p>
              </div>
            </motion.div>

            {/* floating badge: bottom-left */}
            <motion.div
              className="absolute -bottom-4 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 shadow-lg border border-neutral-100 dark:border-neutral-700/60"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
                }}
              >
                <CreditCard size={15} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] leading-none text-neutral-500 dark:text-neutral-400">
                  Transactions
                </p>
                <p className="text-sm font-bold leading-tight text-neutral-900 dark:text-white">
                  1.2K+
                </p>
              </div>
            </motion.div>

            {/* floating badge: bottom-right */}
            <motion.div
              className="absolute -bottom-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 shadow-lg border border-neutral-100 dark:border-neutral-700/60"
              animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
              transition={{
                duration: 3.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)",
                }}
              >
                <Zap size={15} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] leading-none text-neutral-500 dark:text-neutral-400">
                  Speed
                </p>
                <p className="text-sm font-bold leading-tight text-neutral-900 dark:text-white">
                  Instant
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6 lg:gap-8"
          >
            <span className="self-start text-xs font-bold uppercase tracking-widest text-primary-500 dark:text-primary-400">
              {t("eyebrow")}
            </span>

            <h2
              id="why-choose-us-title"
              className="font-serif font-black leading-tight tracking-tight text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-neutral-900 dark:text-white"
            >
              {t("heading")}
            </h2>

            <div className="grid gap-4 sm:gap-5">
              {FEATURES.map(({ key, Icon }) => (
                <article
                  key={key}
                  className="group flex gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 shadow-[0_4px_16px_-6px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_16px_-6px_rgba(0,0,0,0.4)] hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors duration-300"
                >
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-md group-hover:from-primary-300 group-hover:to-primary-500 group-hover:bg-linear-to-br group-hover:shadow-primary-500/40 group-hover:shadow-lg transition-all duration-300">
                    <Icon size={22} strokeWidth={2.2} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-serif font-semibold tracking-tight text-neutral-900 dark:text-white">
                      {t(`features.${key}.title`)}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {t(`features.${key}.description`)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
