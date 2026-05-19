"use client";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function PrivacyHero({ lastUpdated = "October 2026" }) {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44 pb-10 sm:pb-12 lg:pb-14 bg-linear-to-b from-slate-50 via-emerald-50/40 to-white dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* Glow accents */}
      <div
        className="absolute top-1/3 left-0 -translate-x-1/3 w-[600px] h-[600px] rounded-full pointer-events-none opacity-70 dark:opacity-35"
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-5 sm:mb-6"
        >
          <Link
            href="/"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={13} className="text-neutral-400" />
          <span className="text-neutral-900 dark:text-white font-semibold">
            Privacy Policy
          </span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-5 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200/60 dark:ring-primary-500/30">
            <ShieldCheck size={12} /> Legal
          </span>

          <h1 className="font-serif font-black leading-[1.05] mb-5 text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] tracking-tight text-neutral-900 dark:text-white">
            Privacy{" "}
            <span className="text-primary-600 dark:text-primary-400">
              Policy
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-2xl mb-6">
            Your privacy and data security matter to us. Learn how Walletium
            collects, uses, and protects your information.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/80 dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-400 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400" />
            Last updated:{" "}
            <span className="text-neutral-900 dark:text-white">
              {lastUpdated}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
