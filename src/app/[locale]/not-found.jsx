"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Compass, Home, Search } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function NotFound() {
  const t = useTranslations("Frontend.notFound");

  const quickLinks = [
    { href: "/", label: t("links.home"), Icon: Home },
    { href: "/services", label: t("links.services"), Icon: Compass },
    { href: "/faq", label: t("links.faq"), Icon: Search },
  ];

  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden min-h-screen flex items-center pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 bg-linear-to-b from-slate-50 via-emerald-50/40 to-white dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            color: "rgb(15, 23, 42)",
          }}
        />

        {/* Glow accents */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-70 dark:opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(14,190,152,0.20) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-[10%] right-[8%] w-[420px] h-[420px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.14) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />

        {/* Floating decorative orbs */}
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-16 w-3 h-3 rounded-full hidden lg:block bg-primary-500 shadow-[0_0_20px_rgba(0,201,167,0.8)]"
        />
        <motion.div
          animate={{ y: [0, 14, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-40 left-20 w-2 h-2 rounded-full hidden lg:block bg-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.8)]"
        />

        {/* Main content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Eyebrow chip */}
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6 sm:mb-8 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200/60 dark:ring-primary-500/30"
            >
              <span className="text-[10px]">✦</span>
              {t("eyebrow")}
            </motion.span>

            {/* Giant 404 */}
            <motion.h1
              variants={fadeUp}
              className="font-serif font-black leading-none tracking-tight mb-4 sm:mb-6 select-none"
              style={{ fontSize: "clamp(7rem, 22vw, 18rem)" }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #00C9A7 0%, #00E5FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                404
              </span>
            </motion.h1>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="font-serif font-black leading-[1.1] mb-4 sm:mb-5 tracking-tight text-neutral-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl"
            >
              {t("titleLead")}{" "}
              <span className="text-primary-600 dark:text-primary-400">
                {t("titleAccent")}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-xl mb-8 sm:mb-10"
            >
              {t("description")}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 w-full sm:w-auto"
            >
              <motion.div
                whileHover={{
                  scale: 1.04,
                  y: -2,
                  boxShadow: "0 0 36px rgba(0,201,167,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
                style={{ boxShadow: "0 0 22px rgba(0,201,167,0.32)" }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-white font-bold text-sm sm:text-base bg-linear-to-r from-primary-500 to-cyan-400"
                >
                  <ArrowLeft size={16} />
                  {t("ctaHome")}
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.04,
                  y: -2,
                  boxShadow: "0 0 22px rgba(0,201,167,0.18)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-neutral-900 dark:text-white border border-primary-500/40 hover:bg-primary-500/5 transition-colors"
                >
                  {t("ctaContact")}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick links divider */}
            <motion.div
              variants={fadeUp}
              className="w-full max-w-md pt-6 sm:pt-8 border-t border-neutral-200/80 dark:border-neutral-700/60"
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 sm:mb-5 text-neutral-500 dark:text-neutral-400">
                {t("quickLinksTitle")}
              </p>
              <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {quickLinks.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60 hover:bg-primary-50 dark:hover:bg-primary-500/15 hover:text-primary-700 dark:hover:text-primary-300 hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors"
                    >
                      <Icon size={14} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
