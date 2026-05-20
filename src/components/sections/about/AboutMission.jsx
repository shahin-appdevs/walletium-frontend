"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const STATS = [
  { key: "activeUsers" },
  { key: "transactions" },
  { key: "countries" },
  { key: "uptime" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function AboutMission() {
  const t = useTranslations("Frontend.about.mission");

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-white dark:bg-walletium-dark">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, rgba(14,190,152,0.16) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 sm:mb-4 text-primary-600 dark:text-primary-400">
            {t("eyebrow")}
          </span>
          <h2 className="font-serif font-black leading-tight mb-4 sm:mb-5 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 dark:text-white">
            {t("headingPart1")}{" "}
            <span className="text-primary-600 dark:text-primary-400">
              {t("headingHighlight")}
            </span>{" "}
            {t("headingPart2")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("description")}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              transition={{ delay: i * 0.08 }}
              className="group relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/60 shadow-sm hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <p
                className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight mb-2 text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                }}
              >
                {t(`stats.${stat.key}.value`)}
              </p>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {t(`stats.${stat.key}.label`)}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t(`stats.${stat.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
