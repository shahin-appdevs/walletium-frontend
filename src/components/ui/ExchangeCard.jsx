"use client";
import { useMemo, useState } from "react";
import { ArrowUpDown, Send, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { CurrencyInput } from "./CurrencyInput";
import { ExchangeCardSkeleton } from "./ExchangeCardSkeleton";
import { useTheme } from "@/contexts/ThemeContextProvider";
import Link from "next/link";
import { useBannerSendMoneyInfoQuery } from "@/redux/api/publicApi/homepageApi";

// Build a flag image URL from API fields. Trims stray slashes between parts.
const buildFlagUrl = (baseUrl, imagePath, flag) => {
  if (!baseUrl || !imagePath || !flag) return null;
  const root = baseUrl.replace(/\/+$/, "");
  const dir = imagePath.replace(/^\/+|\/+$/g, "");
  const file = flag.replace(/^\/+/, "");
  return `${root}/${dir}/${file}`;
};

// Map an API currency object to the CurrencyInput view-model shape.
const toOption = (c, baseUrl) => ({
  code: c.currency_code,
  name: c.name,
  symbol: c.currency_symbol,
  rate: c.rate,
  flagUrl: buildFlagUrl(baseUrl, c.image_path, c.flag),
});

export function ExchangeCard() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const t = useTranslations("Frontend.homepage.hero.exchangeCard");
  const [senderAmount, setSenderAmount] = useState("1");
  const [senderCode, setSenderCode] = useState("USD");
  const [receiverCode, setReceiverCode] = useState("USD");

  const { data, isLoading, isError } = useBannerSendMoneyInfoQuery();

  // View-model lists driven entirely by the API response.

  const senderOptions = useMemo(
    () =>
      (data?.sender_currencies ?? []).map((c) => toOption(c, data?.base_url)),
    [data],
  );
  const receiverOptions = useMemo(
    () =>
      (data?.receiver_currencies ?? []).map((c) => toOption(c, data?.base_url)),
    [data],
  );

  // Resolve currently-selected options (with fallback to first if missing).
  const sender =
    senderOptions.find((c) => c.code === senderCode) ?? senderOptions[0];
  const receiver =
    receiverOptions.find((c) => c.code === receiverCode) ?? receiverOptions[0];

  // Cross-rate: rates are quoted against USD = 1, so
  // sender → receiver = receiver.rate / sender.rate.
  const rate = sender?.rate && receiver?.rate ? receiver.rate / sender.rate : 1;

  const recipientAmount = (Number(senderAmount) * rate || 0).toFixed(2);

  if (isLoading) {
    return <ExchangeCardSkeleton />;
  }

  if (isError) {
    return <ExchangeCardSkeleton />;
  }

  return (
    <div
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
            {t("title")}
          </h3>
          <p
            className="text-xs"
            style={{ color: isDark ? "#94A3B8" : "#64748B" }}
          >
            {t("subtitle")}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#00C9A7", boxShadow: "0 0 6px #00C9A7" }}
          />
          <span className="text-xs font-medium" style={{ color: "#00C9A7" }}>
            {t("live")}
          </span>
        </div>
      </div>

      {/* Exchange Rate Banner */}
      <div
        className="flex items-center justify-between px-4 py-3.5 rounded-xl mb-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,201,167,0.1), rgba(0,229,255,0.05))",
        }}
      >
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Zap size={11} style={{ color: "#00C9A7" }} />
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#00C9A7" }}
            >
              {t("exchangeRate")}
            </p>
          </div>
          <p
          dir="ltr"
            className={`text-sm font-bold  ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            1 {sender?.code ?? "USD"} = {Number(rate).toFixed(4)}{" "}
            {receiver?.code ?? "USD"}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(0,201,167,0.12)",
          }}
        >
          <ArrowUpDown size={15} style={{ color: "#00C9A7" }} />
        </div>
      </div>

      {/* Amount cards with floating swap button between them */}
      <div className="relative mb-6">
        {/* Sender Amount card */}
        <div
          className="rounded-2xl p-4 sm:p-5"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.03)"
              : "rgba(15,23,42,0.025)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{
                color: isDark ? "#94A3B8" : "#64748B",
              }}
            >
              {t("senderAmount")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CurrencyInput
              bare
              autoFocus
              value={senderAmount}
              onChange={setSenderAmount}
              defaultCurrency="USD"
              currencies={senderOptions}
              selectedCode={senderCode}
              onCurrencyChange={(c) => setSenderCode(c.code)}
            />
          </div>
        </div>

        {/* Floating circular swap button */}
        <div className="flex justify-center -my-3 relative z-10">
          <button
            type="button"
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00C9A7 0%, #00E5FF 100%)",
              boxShadow:
                "0 8px 22px rgba(0,201,167,0.45), 0 0 0 4px " +
                (isDark ? "rgba(10,15,30,0.85)" : "rgba(255,255,255,0.9)"),
            }}
          >
            <ArrowUpDown size={17} className="text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Receiver Amount card */}
        <div
          className="rounded-2xl p-4 sm:p-5"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.03)"
              : "rgba(15,23,42,0.025)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{
                color: isDark ? "#94A3B8" : "#64748B",
              }}
            >
              {t("recipientsAmount")}
            </span>
            <span
              className="text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ color: "#00C9A7" }}
            >
              {t("exchangeRate")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CurrencyInput
              bare
              value={recipientAmount}
              defaultCurrency="USD"
              readOnly
              currencies={receiverOptions}
              selectedCode={receiverCode}
              onCurrencyChange={(c) => setReceiverCode(c.code)}
            />
          </div>
        </div>
      </div>

      {/* Send Button */}

      <Link href={`/dashboard/send-money`}>
        <button
          type="button"
          className="w-full py-4 rounded-full text-white font-bold text-base tracking-wide flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #00C9A7 0%, #00E5FF 100%)",
            boxShadow: "0 0 24px rgba(0,201,167,0.28)",
          }}
        >
          {t("sendMoney")}
          <Send
            size={18}
            strokeWidth={2.5}
            className="rtl:-scale-x-100"
          />
        </button>
      </Link>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <ShieldCheck size={13} style={{ color: "#00C9A7" }} />
        <p
          className="text-xs"
          style={{
            color: isDark ? "rgba(148,163,184,0.55)" : "rgba(71,85,105,0.7)",
          }}
        >
          {t("securityNote")}
        </p>
      </div>
    </div>
  );
}
