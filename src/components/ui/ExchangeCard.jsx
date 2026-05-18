"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ShieldCheck, Zap } from "lucide-react";
import { CurrencyInput } from "./CurrencyInput";
import { useTheme } from "@/contexts/ThemeContextProvider";
import { useBannerSendMoneyInfoQuery } from "@/redux/api/publicApi/homepageApi";

export function ExchangeCard() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [senderAmount, setSenderAmount] = useState("1000");

  const { data, isLoading, isError } = useBannerSendMoneyInfoQuery();
  const sender = data?.sender_currencies?.[0];
  const receiver = data?.receiver_currencies?.[0];
  const rate = sender?.rate ?? 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.35,
      }}
      className="w-full max-w-[420px] min-w-0 p-4 sm:p-6 lg:p-7 rounded-3xl"
      style={{
        background: isDark
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(15,23,42,0.08)",
        boxShadow: isDark
          ? "0 0 60px rgba(0,180,160,0.12), 0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 0 60px rgba(0,180,160,0.10), 0 30px 60px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #00C9A7, #00E5FF)" }}
        >
          <ArrowUpDown size={19} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h3
            className={`font-bold text-lg leading-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Money Exchange
          </h3>
          <p
            className="text-xs"
            style={{ color: isDark ? "#94A3B8" : "#64748B" }}
          >
            Fast &amp; Secure Transfers
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#00C9A7", boxShadow: "0 0 6px #00C9A7" }}
          />
          <span className="text-xs font-medium" style={{ color: "#00C9A7" }}>
            Live
          </span>
        </div>
      </div>

      {/* Exchange Rate Banner */}
      <div
        className="flex items-center justify-between px-4 py-3.5 rounded-xl mb-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,201,167,0.1), rgba(0,229,255,0.05))",
          border: "1px solid rgba(0,201,167,0.18)",
        }}
      >
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Zap size={11} style={{ color: "#00C9A7" }} />
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#00C9A7" }}
            >
              Exchange Rate
            </p>
          </div>
          <p
            className={`text-sm font-bold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            1 {sender?.currency_code ?? "USD"} = {Number(rate).toFixed(4)}{" "}
            {receiver?.currency_code ?? "USD"}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(0,201,167,0.12)",
            border: "1px solid rgba(0,201,167,0.25)",
          }}
        >
          <ArrowUpDown size={15} style={{ color: "#00C9A7" }} />
        </div>
      </div>

      {/* Sender Amount */}
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2.5"
          style={{
            color: isDark ? "rgba(148,163,184,0.9)" : "rgba(71,85,105,0.95)",
          }}
        >
          Sender Amount
          <span style={{ color: "#00C9A7" }}>*</span>
        </label>
        <CurrencyInput
          value={senderAmount}
          onChange={setSenderAmount}
          defaultCurrency="USD"
        />
      </div>

      {/* Swap divider */}
      <div className="flex items-center gap-3 my-3">
        <div
          className="flex-1 h-px"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.06)"
              : "rgba(15,23,42,0.08)",
          }}
        />
        <motion.button
          type="button"
          whileHover={{ rotate: 180, scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(0,201,167,0.1)",
            border: "1px solid rgba(0,201,167,0.25)",
          }}
        >
          <ArrowUpDown size={15} style={{ color: "#00C9A7" }} />
        </motion.button>
        <div
          className="flex-1 h-px"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.06)"
              : "rgba(15,23,42,0.08)",
          }}
        />
      </div>

      {/* Recipient Amount */}
      <div className="mb-6">
        <label
          className="block text-sm font-semibold mb-2.5"
          style={{
            color: isDark ? "rgba(148,163,184,0.9)" : "rgba(71,85,105,0.95)",
          }}
        >
          Recipients Amount
          <span style={{ color: "#00C9A7" }}>*</span>
        </label>
        <CurrencyInput
          value={(Number(senderAmount) * rate).toFixed(2)}
          defaultCurrency="USD"
          readOnly
        />
      </div>

      {/* Send Button */}
      <motion.button
        type="button"
        whileHover={{
          scale: 1.02,
          y: -2,
          boxShadow: "0 0 40px rgba(0,201,167,0.5)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="w-full py-4 rounded-xl text-white font-bold text-base tracking-wide"
        style={{
          background: "linear-gradient(135deg, #00C9A7 0%, #00E5FF 100%)",
          boxShadow: "0 0 24px rgba(0,201,167,0.28)",
        }}
      >
        Send Money →
      </motion.button>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <ShieldCheck size={13} style={{ color: "#00C9A7" }} />
        <p
          className="text-xs"
          style={{
            color: isDark ? "rgba(148,163,184,0.55)" : "rgba(71,85,105,0.7)",
          }}
        >
          256-bit encrypted &amp; secure transfers
        </p>
      </div>
    </motion.div>
  );
}
