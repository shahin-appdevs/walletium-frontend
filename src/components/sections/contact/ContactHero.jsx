"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-10 sm:pb-14 lg:pb-16 bg-linear-to-b from-slate-50 via-emerald-50/40 to-white dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* Glow accents */}
      <div
        className="absolute top-1/4 left-0 -translate-x-1/3 w-[600px] h-[600px] rounded-full pointer-events-none opacity-70 dark:opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.20) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/4 right-0 translate-x-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.14) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200/60 dark:ring-primary-500/30">
            <MessageCircle size={12} /> Contact Us
          </span>
          <h1 className="font-serif font-black leading-[1.05] mb-6 text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] tracking-tight text-neutral-900 dark:text-white">
            Let&apos;s connect with{" "}
            <span className="text-primary-600 dark:text-primary-400">
              Walletium
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            We&apos;re here to help you on your financial journey — from quick
            answers to deep integrations, our team is one message away.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
