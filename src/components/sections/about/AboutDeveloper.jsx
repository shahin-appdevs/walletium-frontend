"use client";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Terminal, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FEATURE_KEYS = ["f1", "f2", "f3", "f4"];

export function AboutDeveloper() {
  const t = useTranslations("Frontend.about.developer");

  const CODE_LINES = [
    { tone: "comment", text: t("terminal.comment") },
    { tone: "default", text: "const transfer = await walletium" },
    { tone: "method", text: "  .payments.create({" },
    { tone: "key", text: "    amount: 250.00," },
    { tone: "key", text: '    currency: "USD",' },
    { tone: "key", text: '    recipient: "acct_42x9",' },
    { tone: "method", text: "  });" },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-linear-to-b from-slate-50 via-emerald-50/30 to-white dark:from-[#091829] dark:via-walletium-dark-mid dark:to-[#0A0F1E]">
      {/* Glow */}
      <div
        className="absolute top-1/3 right-0 translate-x-1/3 w-[600px] h-[600px] rounded-full pointer-events-none opacity-70 dark:opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.20) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 -translate-x-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.14) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Code visual */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="relative order-2 lg:order-1"
          >
            {/* Gradient frame outline */}
            <div
              className="absolute -inset-px rounded-2xl pointer-events-none opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14,190,152,0.6) 0%, transparent 50%, rgba(0,229,255,0.4) 100%)",
              }}
            />

            <div className="relative rounded-2xl bg-[#0A0F1E] border border-neutral-800/80 shadow-[0_30px_80px_-20px_rgba(14,190,152,0.25)] overflow-hidden">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900/80">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex-1 flex justify-center items-center gap-2 text-xs text-neutral-400 font-mono">
                  <Terminal size={12} /> walletium.js
                </div>
                <div className="w-8" />
              </div>

              {/* Code body */}
              <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed min-h-[200px]">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className={`whitespace-pre ${
                      line.tone === "comment"
                        ? "text-neutral-500"
                        : line.tone === "method"
                        ? "text-cyan-300"
                        : line.tone === "key"
                        ? "text-emerald-300"
                        : "text-neutral-200"
                    }`}
                  >
                    {line.text}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block w-1.5 h-4 bg-primary-400 mt-2"
                />
              </div>
            </div>

            {/* Floating success badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -right-3 sm:-right-5 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl border border-neutral-100 dark:border-neutral-700"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
                }}
              >
                <Zap size={15} color="white" strokeWidth={3} fill="white" />
              </div>
              <div>
                <p className="text-[10px] leading-none text-neutral-500 dark:text-neutral-400">
                  {t("terminal.statusCode")}
                </p>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">
                  {t("terminal.statusText")}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-5 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200/60 dark:ring-primary-500/30">
              <Code2 size={12} /> {t("badge")}
            </span>
            <h2 className="font-serif font-black leading-tight mb-4 sm:mb-5 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 dark:text-white">
              {t("headingPart1")}{" "}
              <span className="text-primary-600 dark:text-primary-400">
                {t("headingHighlight")}
              </span>
              {t("headingPart2")}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg">
              {t("description")}
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-8">
              {FEATURE_KEYS.map((fKey) => (
                <li key={fKey} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400 shrink-0" />
                  <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                    {t(`features.${fKey}`)}
                  </span>
                </li>
              ))}
            </ul>

            <motion.a
              href="#"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow"
              style={{
                background: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
              }}
            >
              {t("ctaReadDocs")}{" "}
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="rtl:rotate-180"
              />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
