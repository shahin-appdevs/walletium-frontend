"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const TRUST_POINTS = ["freeTrial", "noCard", "cancelAnytime"];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ServicesCTA() {
  const t = useTranslations("Frontend.services.cta");

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-white dark:bg-walletium-dark">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative rounded-[32px] overflow-hidden"
        >
          {/* Dark gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #06141F 0%, #0A1F2E 50%, #06141F 100%)",
            }}
          />

          {/* Decorative glows */}
          <div
            className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-90"
            style={{
              background:
                "radial-gradient(circle, rgba(14,190,152,0.40) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-80"
            style={{
              background:
                "radial-gradient(circle, rgba(0,229,255,0.30) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />

          {/* Top hairline */}
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary-400/60 to-transparent" />

          {/* Content */}
          <div className="relative px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-5 bg-white/10 text-primary-300 border border-primary-400/30 backdrop-blur-sm">
              <MessageCircle size={12} /> {t("badge")}
            </span>
            <h2 className="font-serif font-black leading-tight mb-4 sm:mb-5 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white">
              {t("headingPart1")}{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                }}
              >
                {t("headingHighlight")}
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-300 max-w-2xl mx-auto mb-8 sm:mb-10">
              {t("description")}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-neutral-900 font-bold text-sm bg-white hover:bg-neutral-100 shadow-2xl shadow-primary-500/20 transition-shadow"
              >
                {t("startTrial")}{" "}
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="rtl:rotate-180"
                />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm border-2 border-white/20 hover:border-primary-400/60 hover:bg-white/5 backdrop-blur-sm transition-colors"
              >
                {t("bookDemo")}
              </motion.a>
            </div>

            {/* Trust microcopy */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-neutral-400">
              {TRUST_POINTS.map((point) => (
                <span key={point} className="flex items-center gap-1.5">
                  <CheckCircle2
                    size={14}
                    className="text-primary-400"
                    strokeWidth={2.5}
                  />
                  {t(`trustPoints.${point}`)}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
