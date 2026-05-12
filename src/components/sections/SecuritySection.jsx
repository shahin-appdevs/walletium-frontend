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
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 lg:mb-24"
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

        {/* Steps */}
        <div className="relative">
          {/* Horizontal dashed connector (xl only) */}
          <div className="hidden xl:block absolute top-7 left-[8%] right-[8%] border-t-2 border-dashed border-primary-300/70 dark:border-primary-500/25 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-10 sm:gap-y-12 gap-x-5 sm:gap-x-6 lg:gap-x-6 xl:gap-x-4">
            {STEPS.map((step, i) => {
              const Icon = step.Icon;
              const offset = i % 2 === 1 ? "xl:mt-28" : "";
              return (
                <motion.div
                  key={step.title}
                  variants={cardReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.07 }}
                  className={`relative flex flex-col items-center text-center ${offset}`}
                >
                  {/* Card */}
                  <div className="group w-full rounded-2xl p-5 lg:p-4 xl:p-5 bg-white dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300">
                    {/* Icon squircle with same gradient */}
                    <div
                      className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                      style={{
                        background: step.gradient,
                        boxShadow: step.shadow,
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="font-serif font-bold text-base lg:text-base xl:text-lg mb-2 text-neutral-900 dark:text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
