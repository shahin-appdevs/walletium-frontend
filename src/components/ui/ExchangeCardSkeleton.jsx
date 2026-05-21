"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContextProvider";

/**
 * Reusable shimmer placeholder.
 * Theme-aware: light mode uses a near-black base + white highlight,
 * dark mode uses a translucent slate base + soft white highlight.
 */
function Shimmer({ width, height, className = "" }) {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const baseColor = isDark
    ? "rgba(148,163,184,0.18)"
    : "rgba(15,23,42,0.08)";
  const sweepColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)";

  return (
    <motion.div
      aria-hidden="true"
      className={`rounded-md ${className}`}
      style={{
        width,
        height,
        backgroundColor: baseColor,
        backgroundImage: `linear-gradient(90deg, transparent 0%, ${sweepColor} 50%, transparent 100%)`,
        backgroundSize: "200% 100%",
        backgroundRepeat: "no-repeat",
      }}
      animate={{ backgroundPositionX: ["-200%", "200%"] }}
      transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
    />
  );
}

/**
 * ExchangeCardSkeleton — visual placeholder shown while the real
 * ExchangeCard's data is fetched. Layout, dimensions, paddings, and
 * radii match ExchangeCard so the swap is non-jarring.
 *
 * On-brand bits: the header icon tile and the send button placeholder
 * use the Walletium teal→cyan gradient at reduced opacity. Everything
 * else is a neutral shimmer.
 */
export function ExchangeCardSkeleton() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const dividerColor = isDark
    ? "rgba(255,255,255,0.06)"
    : "rgba(15,23,42,0.08)";

  return (
    <motion.div
      role="status"
      aria-label="Loading exchange card"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
      className="w-full max-w-[420px] min-w-0 p-4 sm:p-6 lg:p-7 rounded-3xl"
      style={{
        background: isDark
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: isDark
          ? "0 0 60px rgba(0,180,160,0.12), 0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 0 60px rgba(0,180,160,0.10), 0 30px 60px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 mb-6">
        <div
          aria-hidden="true"
          className="w-11 h-11 rounded-xl shrink-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,201,167,0.4), rgba(0,229,255,0.4))",
          }}
        />
        <div className="flex flex-col gap-1.5 min-w-0">
          <Shimmer width="140px" height="14px" />
          <Shimmer width="100px" height="10px" />
        </div>
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <div
            aria-hidden="true"
            className="w-2 h-2 rounded-full"
            style={{
              background: "#00C9A7",
              boxShadow: "0 0 6px rgba(0,201,167,0.6)",
            }}
          />
          <Shimmer width="28px" height="10px" />
        </div>
      </div>

      {/* Exchange rate banner */}
      <div
        className="flex items-center justify-between px-4 rounded-xl mb-6"
        style={{
          height: "72px",
          background:
            "linear-gradient(135deg, rgba(0,201,167,0.1), rgba(0,229,255,0.05))",
        }}
      >
        <div className="flex flex-col gap-1.5">
          <Shimmer width="80px" height="9px" />
          <Shimmer width="120px" height="13px" />
        </div>
        <Shimmer width="40px" height="40px" className="rounded-xl shrink-0" />
      </div>

      {/* Sender amount */}
      <div className="mb-4">
        <div className="mb-2.5">
          <Shimmer width="110px" height="12px" />
        </div>
        <Shimmer width="100%" height="56px" className="rounded-xl" />
      </div>

      {/* Swap divider */}
      <div className="flex items-center gap-3 my-3">
        <div
          aria-hidden="true"
          className="flex-1 h-px"
          style={{ background: dividerColor }}
        />
        <Shimmer
          width="36px"
          height="36px"
          className="rounded-full shrink-0"
        />
        <div
          aria-hidden="true"
          className="flex-1 h-px"
          style={{ background: dividerColor }}
        />
      </div>

      {/* Recipient amount */}
      <div className="mb-6">
        <div className="mb-2.5">
          <Shimmer width="125px" height="12px" />
        </div>
        <Shimmer width="100%" height="56px" className="rounded-xl" />
      </div>

      {/* Send button (brand gradient at ~60% opacity) */}
      <div
        aria-hidden="true"
        className="w-full rounded-full"
        style={{
          height: "56px",
          background:
            "linear-gradient(135deg, rgba(0,201,167,0.6) 0%, rgba(0,229,255,0.6) 100%)",
          boxShadow: "0 0 24px rgba(0,201,167,0.2)",
        }}
      />

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <div
          aria-hidden="true"
          className="w-3 h-3 rounded-full"
          style={{ background: "rgba(0,201,167,0.45)" }}
        />
        <Shimmer width="180px" height="10px" />
      </div>
    </motion.div>
  );
}
