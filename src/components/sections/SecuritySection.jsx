"use client";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  FileCheck,
  KeyRound,
  Lock,
  Shield,
  ShieldAlert,
} from "lucide-react";

const STEPS = [
  {
    title: "Secure Encryption",
    description:
      "Protects your sensitive data with state-of-the-art encryption technology.",
    Icon: Shield,
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    shadow: "0 12px 28px -8px rgba(14,190,152,0.45)",
  },
  {
    title: "Fraud Detection",
    description: "Detects and prevents fraudulent activities in real-time.",
    Icon: ShieldAlert,
    gradient: "linear-gradient(135deg, #F43F5E 0%, #F97316 100%)",
    shadow: "0 12px 28px -8px rgba(244,63,94,0.45)",
  },
  {
    title: "Two-Factor Auth",
    description: "Adds an extra layer of security to every account.",
    Icon: KeyRound,
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    shadow: "0 12px 28px -8px rgba(59,130,246,0.45)",
  },
  {
    title: "Regular Audits",
    description:
      "Keeps platform security measures up-to-date through regular audits.",
    Icon: ClipboardCheck,
    gradient: "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
    shadow: "0 12px 28px -8px rgba(34,197,94,0.45)",
  },
  {
    title: "Secure Transactions",
    description:
      "Safeguards your transactions with advanced security protocols.",
    Icon: FileCheck,
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    shadow: "0 12px 28px -8px rgba(139,92,246,0.45)",
  },
  {
    title: "Data Privacy",
    description:
      "Ensures privacy of your personal information with strict protection.",
    Icon: Lock,
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    shadow: "0 12px 28px -8px rgba(99,102,241,0.45)",
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

export function SecuritySection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-emerald-50/70 via-white to-emerald-50/30 dark:from-[#091829] dark:via-[#0A1A2E] dark:to-[#0A0F1E] py-16 sm:py-20 lg:py-28">
      {/* Soft radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary-400/15 dark:bg-primary-500/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 sm:mb-4 text-primary-600 dark:text-primary-400">
            Security System
          </span>
          <h2 className="font-serif font-black leading-tight mb-4 sm:mb-5 text-neutral-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tight">
            Our security measures, including secure encryption.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            We treat your data and your money with the same level of care a bank
            would — wrapped in modern, transparent infrastructure.
          </p>
        </motion.div>

        {/* Zigzag steps */}
        <div className="relative max-w-5xl mx-auto">
          {STEPS.map((step, i) => {
            const Icon = step.Icon;
            const isRight = i % 2 === 1;
            const isLast = i === STEPS.length - 1;

            return (
              <div key={step.title} className="relative">
                {/* Step row */}
                <motion.div
                  variants={cardReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex w-full ${
                    isRight ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <div className="relative w-full md:w-[46%] max-w-md">
                    {/* Icon (top-left, partially outside card) */}
                    <div
                      className="absolute -top-3 left-2 w-12 h-12 rounded-xl flex items-center justify-center z-20"
                      style={{
                        background: step.gradient,
                        boxShadow: step.shadow,
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>

                    {/* Card */}
                    <div className="ml-8 mt-2 p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/60 shadow-sm hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300">
                      <h3 className="font-serif font-bold text-base sm:text-lg mb-2 text-neutral-900 dark:text-white tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Animated dashed connector (skipped on last) */}
                {!isLast && (
                  <div className="relative h-12 sm:h-14 md:h-16 w-full pointer-events-none text-primary-400 dark:text-primary-500/70">
                    {/* Mobile: vertical line under the icon column */}
                    <div className="md:hidden absolute top-0 bottom-0 left-8 w-[2px] overflow-hidden">
                      <motion.div
                        className="absolute inset-x-0 -top-3 h-[calc(100%+12px)]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(to bottom, currentColor 0 6px, transparent 6px 12px)",
                        }}
                        animate={{ y: [0, 12] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>

                    {/* Desktop: zigzag SVG path connecting cards */}
                    <svg
                      viewBox="0 0 1000 80"
                      preserveAspectRatio="none"
                      className="hidden md:block w-full h-full"
                    >
                      <motion.path
                        d={
                          isRight
                            ? "M 600 0 C 600 40, 60 40, 60 80"
                            : "M 60 0 C 60 40, 600 40, 600 80"
                        }
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        strokeLinecap="round"
                        animate={{ strokeDashoffset: [0, -12] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
