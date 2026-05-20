"use client";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, User } from "lucide-react";
import { useTranslations } from "next-intl";

const SOLUTIONS = [
  {
    type: "individuals",
    Icon: User,
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    shadow: "0 18px 40px -10px rgba(14,190,152,0.4)",
    featureKeys: ["f1", "f2", "f3", "f4"],
  },
  {
    type: "businesses",
    Icon: Building2,
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    shadow: "0 18px 40px -10px rgba(99,102,241,0.4)",
    featureKeys: ["f1", "f2", "f3", "f4"],
  },
];

const cardReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function AboutSolutions() {
  const t = useTranslations("Frontend.about.solutions");

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-linear-to-b from-rose-50/30 via-white to-slate-50 dark:from-[#0A0F1E] dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, rgba(14,190,152,0.16) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 text-primary-600 dark:text-primary-400">
            {t("eyebrow")}
          </span>
          <h2 className="font-serif font-black leading-tight mb-4 sm:mb-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-neutral-900 dark:text-white">
            {t("headingPart1")}{" "}
            <span className="text-primary-600 dark:text-primary-400">
              {t("headingHighlight1")}
            </span>{" "}
            {t("headingConnector")}{" "}
            <span className="text-primary-600 dark:text-primary-400">
              {t("headingHighlight2")}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("description")}
          </p>
        </motion.div>

        {/* Solution cards */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {SOLUTIONS.map((sol, i) => (
            <motion.div
              key={sol.type}
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-7 sm:p-9 lg:p-10 rounded-3xl bg-white dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)] hover:border-primary-200 dark:hover:border-primary-500/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                  style={{ background: sol.gradient, boxShadow: sol.shadow }}
                >
                  <sol.Icon size={26} color="white" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400 mb-1">
                    {t(`${sol.type}.eyebrow`)}
                  </p>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
                    {t(`${sol.type}.title`)}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 mb-7">
                {t(`${sol.type}.description`)}
              </p>

              <ul className="space-y-3">
                {sol.featureKeys.map((fKey) => (
                  <li key={fKey} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-primary-500 dark:text-primary-400 shrink-0 mt-0.5"
                      strokeWidth={2.2}
                    />
                    <span className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {t(`${sol.type}.features.${fKey}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
