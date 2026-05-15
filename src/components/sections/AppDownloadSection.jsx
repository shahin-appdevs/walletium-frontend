"use client";
import { motion } from "framer-motion";
import {
  AppWindow,
  Bell,
  Mail,
  PlayCircle,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FLOATING_ICONS = [
  {
    Icon: PlayCircle,
    label: "play",
    gradient: "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
    shadow: "0 18px 40px -12px rgba(16,185,129,0.55)",
    className:
      "top-10 left-3 sm:top-16 sm:left-8 lg:top-20 lg:left-16 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16",
    iconSize: 26,
    duration: 3.6,
    delay: 0,
    animate: { y: [0, -14, 0], rotate: [0, 8, 0, -8, 0] },
  },
  {
    Icon: AppWindow,
    label: "appstore",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    shadow: "0 18px 40px -12px rgba(59,130,246,0.55)",
    className:
      "bottom-16 left-2 sm:bottom-24 sm:left-6 lg:bottom-28 lg:left-20 w-11 h-11 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px]",
    iconSize: 24,
    duration: 4.3,
    delay: 0.6,
    animate: { y: [0, -12, 0], rotate: [0, -10, 0, 10, 0] },
  },
  {
    Icon: Smartphone,
    label: "phone",
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    shadow: "0 18px 40px -12px rgba(99,102,241,0.55)",
    className:
      "top-14 right-3 sm:top-20 sm:right-8 lg:top-16 lg:right-16 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16",
    iconSize: 26,
    duration: 3.9,
    delay: 0.3,
    animate: { y: [0, -16, 0], rotate: [0, 6, 0, -6, 0] },
  },
  {
    Icon: Mail,
    label: "mail",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)",
    shadow: "0 18px 40px -12px rgba(244,63,94,0.5)",
    className:
      "bottom-10 right-2 sm:bottom-16 sm:right-6 lg:bottom-24 lg:right-20 w-11 h-11 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px]",
    iconSize: 24,
    duration: 3.3,
    delay: 0.9,
    animate: { y: [0, -12, 0], rotate: [0, -8, 0, 8, 0] },
  },
  {
    Icon: Bell,
    label: "bell",
    gradient: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
    shadow: "0 18px 40px -12px rgba(236,72,153,0.5)",
    className:
      "top-1/2 -left-1 sm:left-2 lg:left-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 hidden sm:flex",
    iconSize: 22,
    duration: 4.5,
    delay: 1.1,
    animate: { y: [0, -10, 0], rotate: [0, 12, 0, -12, 0] },
  },
  {
    Icon: Sparkles,
    label: "sparkles",
    gradient: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
    shadow: "0 18px 40px -12px rgba(251,191,36,0.5)",
    className:
      "top-1/3 -right-1 sm:right-2 lg:right-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 hidden sm:flex",
    iconSize: 22,
    duration: 4.0,
    delay: 0.4,
    animate: { y: [0, -12, 0], rotate: [0, -10, 0, 10, 0] },
  },
];

export function AppDownloadSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-linear-to-b from-slate-50 via-emerald-50/40 to-white dark:from-[#0A0F1E] dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-90 dark:opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.20) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* Floating animated icons */}
      {FLOATING_ICONS.map(
        ({
          Icon,
          label,
          gradient,
          shadow,
          className,
          iconSize,
          duration,
          delay,
          animate,
        }) => (
          <motion.div
            key={label}
            className={`absolute ${className} rounded-2xl flex items-center justify-center pointer-events-none z-0`}
            style={{ background: gradient, boxShadow: shadow }}
            animate={animate}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={iconSize} color="white" strokeWidth={2} />
          </motion.div>
        )
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Phone mockup */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src="/images/partials/mobile.webp"
                alt="Walletium mobile app"
                width={500}
                height={700}
                className="w-auto h-[380px] sm:h-[460px] lg:h-[560px] object-contain drop-shadow-[0_25px_50px_rgba(14,190,152,0.25)] dark:drop-shadow-[0_25px_50px_rgba(14,190,152,0.15)]"
              />
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center lg:text-left order-1 lg:order-2"
          >
            <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 sm:mb-4 text-primary-600 dark:text-primary-400">
              Mobile App
            </span>
            <h2 className="font-serif font-black leading-tight mb-4 sm:mb-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-neutral-900 dark:text-white">
              Download our{" "}
              <span className="text-primary-600 dark:text-primary-400">
                mobile app
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 text-neutral-600 dark:text-neutral-400 max-w-md mx-auto lg:mx-0">
              Manage your finances with us — send, receive, and exchange money
              in just a few taps. Available on Google Play and the App Store.
            </p>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.a
                href="#"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
                }}
              >
                <PlayCircle size={30} strokeWidth={2} />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest opacity-90 leading-none">
                    Download from
                  </p>
                  <p className="text-sm font-bold leading-tight mt-1">
                    Google Play
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <AppWindow size={30} strokeWidth={2} />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest opacity-80 leading-none">
                    Download from
                  </p>
                  <p className="text-sm font-bold leading-tight mt-1">
                    App Store
                  </p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
