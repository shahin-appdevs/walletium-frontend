"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Clock, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

const PILLARS_BASE = [
  {
    key: "security",
    Icon: ShieldCheck,
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    shadow: "0 14px 30px -10px rgba(14,190,152,0.45)",
  },
  {
    key: "availability",
    Icon: Clock,
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    shadow: "0 14px 30px -10px rgba(59,130,246,0.45)",
  },
  {
    key: "scale",
    Icon: Sparkles,
    gradient: "linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)",
    shadow: "0 14px 30px -10px rgba(245,158,11,0.45)",
  },
  {
    key: "support",
    Icon: HeartHandshake,
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    shadow: "0 14px 30px -10px rgba(99,102,241,0.45)",
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

export function ServicesWhyChoose() {
  const t = useTranslations("Frontend.services.whyChoose");

  const PILLARS = PILLARS_BASE.map((pillar) => ({
    ...pillar,
    title: t(`pillars.${pillar.key}.title`),
    description: t(`pillars.${pillar.key}.description`),
  }));

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-linear-to-b from-white via-emerald-50/40 to-rose-50/30 dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none opacity-50 dark:opacity-30"
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
            {t("heading.part1")}{" "}
            <span className="text-primary-600 dark:text-primary-400">
              {t("heading.highlight")}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("description")}
          </p>
        </motion.div >

        {/* Pillars 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative flex gap-5 p-6 sm:p-7 rounded-3xl bg-white dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/60 shadow-sm hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-500/40 transition-all duration-300"
            >
              <div
                className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                style={{
                  background: pillar.gradient,
                  boxShadow: pillar.shadow,
                }}
              >
                <pillar.Icon size={26} color="white" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif font-bold text-lg sm:text-xl mb-1.5 tracking-tight text-neutral-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
