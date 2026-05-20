"use client";
import { motion } from "framer-motion";
import { Activity, Globe2, TrendingUp, Zap } from "lucide-react";
import { useTranslations } from "next-intl";



const STATS = [
  { key: "currencies", Icon: Globe2 },
  { key: "countries", Icon: TrendingUp },
  { key: "avgSettle", Icon: Zap },
  { key: "uptime", Icon: Activity },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ServicesGlobal() {
  const t = useTranslations("Frontend.services.globalPayments");

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-linear-to-b from-rose-50/30 via-white to-emerald-50/30 dark:from-[#091829] dark:via-walletium-dark-mid dark:to-[#0A0F1E]">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-0 -translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.18) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 translate-x-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.14) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-5 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200/60 dark:ring-primary-500/30">
              <Globe2 size={12} /> {t("badge")}
            </span>
            <h2 className="font-serif font-black leading-tight mb-4 sm:mb-5 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 dark:text-white">
              {t("headingPart1")}{" "}
              <span className="text-primary-600 dark:text-primary-400">
                {t("headingHighlight")}
              </span>{" "}
              {t("headingPart2")}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg">
              {t("description")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {STATS.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60 backdrop-blur-sm"
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                    }}
                  >
                    <Icon size={18} color="white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-black font-serif leading-none text-neutral-900 dark:text-white">
                      {t(`stats.${key}.value`)}
                    </p>
                    <p className="text-[11px] mt-1 leading-none text-neutral-500 dark:text-neutral-400">
                      {t(`stats.${key}.label`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Currency chips visual */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="relative h-[440px] sm:h-[480px] lg:h-[520px] flex items-center justify-center"
          >
            {/* Center glow */}
            <div
              className="absolute inset-8 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(14,190,152,0.28) 0%, rgba(0,229,255,0.14) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* Central globe */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                boxShadow: "0 30px 80px -10px rgba(14,190,152,0.5)",
              }}
            >
              <Globe2 size={56} color="white" strokeWidth={1.8} />
            </motion.div>

           
          </motion.div>
        </div>
      </div>
    </section>
  );
}
