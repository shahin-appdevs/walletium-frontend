"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ExchangeCard } from "@/components/ui/ExchangeCard";
import { useTheme } from "@/contexts/ThemeContextProvider";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const TRUST_POINTS = ["No hidden fees", "Instant transfers", "Bank-grade security"];

export function HeroSection() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(140deg, #0A0F1E 0%, #0D2137 60%, #091829 100%)"
          : "linear-gradient(140deg, #F8FAFC 0%, #E2E8F0 60%, #F1F5F9 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark ? "opacity-[0.025]" : "opacity-[0.06]"
        }`}
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)"
            : "linear-gradient(rgba(15,23,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Animated glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[520px] h-[520px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(0,201,167,0.13) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(0,201,167,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[5%] right-[5%] w-[420px] h-[420px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -45, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 7 }}
          className="absolute top-[55%] left-[45%] w-[300px] h-[300px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(0,201,167,0.06) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(0,201,167,0.04) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Floating decorative orb top-right */}
      <motion.div
        animate={{ y: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-12 w-3 h-3 rounded-full hidden lg:block"
        style={{ background: "#00C9A7", boxShadow: "0 0 20px rgba(0,201,167,0.8)" }}
      />
      <motion.div
        animate={{ y: [0, 14, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 left-16 w-2 h-2 rounded-full hidden lg:block"
        style={{ background: "#00E5FF", boxShadow: "0 0 15px rgba(0,229,255,0.8)" }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-20 items-center">

          {/* Left content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 sm:gap-6 text-center lg:text-left items-center lg:items-start"
          >
            {/* Trust badge */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold"
                style={{
                  background: "rgba(0,201,167,0.08)",
                  border: "1px solid rgba(0,201,167,0.28)",
                  color: "#00C9A7",
                  boxShadow: "0 0 24px rgba(0,201,167,0.1)",
                }}
              >
                <span className="text-[10px] sm:text-xs">✦</span>
                Trusted by 50,000+ users worldwide
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              className={`font-black leading-[1.12] break-words max-w-full ${
                isDark ? "text-white" : "text-slate-900"
              }`}
              style={{ fontSize: "clamp(1.5rem, 7vw, 3.5rem)" }}
            >
              <span
                style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  lineHeight: "inherit",
                  background: "linear-gradient(135deg, #00C9A7 0%, #00E5FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Walletium
              </span>{" "}
              – Your Ultimate Digital Mobile Wallet Solution
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="leading-relaxed max-w-xl"
              style={{
                color: isDark ? "#94A3B8" : "#475569",
                fontSize: "clamp(0.95rem, 1.15vw, 1.08rem)",
              }}
            >
              Experience seamless money transfers, real-time currency exchange, and
              secure digital payments — all in one powerful wallet platform built
              for the modern world.
            </motion.p>

            {/* Trust checklist */}
            <motion.ul
              variants={fadeUp}
              className="flex flex-wrap justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2"
            >
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    style={{ color: "#00C9A7" }}
                    className="sm:size-[15px]"
                  />
                  <span
                    className="text-xs sm:text-sm font-medium"
                    style={{
                      color: isDark
                        ? "rgba(148,163,184,0.9)"
                        : "rgba(71,85,105,0.9)",
                    }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-2 w-full sm:w-auto"
            >
              <motion.a
                href="#"
                whileHover={{
                  scale: 1.04,
                  y: -2,
                  boxShadow: "0 0 36px rgba(0,201,167,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-white font-bold text-sm sm:text-base"
                style={{
                  background: "linear-gradient(135deg, #00C9A7, #00E5FF)",
                  boxShadow: "0 0 22px rgba(0,201,167,0.32)",
                }}
              >
                Get Started <ArrowRight size={16} />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{
                  scale: 1.04,
                  y: -2,
                  boxShadow: "0 0 22px rgba(0,201,167,0.18)",
                  background: "rgba(0,201,167,0.06)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
                style={{ border: "1px solid rgba(0,201,167,0.4)" }}
              >
                Developer API <ArrowRight size={16} />
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-10 pt-5 sm:pt-6 mt-2 w-full"
              style={{
                borderTop: isDark
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(15,23,42,0.08)",
              }}
            >
              {[
                { value: "50K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
                { value: "150+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-xl sm:text-2xl font-black"
                    style={{ color: "#00C9A7" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-0.5"
                    style={{ color: isDark ? "#94A3B8" : "#64748B" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Exchange Card */}
          <div className="flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-md lg:max-w-none">
              <ExchangeCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
