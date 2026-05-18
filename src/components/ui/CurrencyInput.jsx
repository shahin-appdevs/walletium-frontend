"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContextProvider";
import Image from "next/image";

// Hardcoded fallback used only when no `currencies` prop is supplied
// (e.g. preview, storybook, or dashboard pages that don't have API data).
const FALLBACK_CURRENCIES = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar" },
  { code: "EUR", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", name: "British Pound" },
  { code: "BDT", flag: "🇧🇩", name: "Taka" },
];

/**
 * Currency-aware amount input with a flag-and-code dropdown.
 *
 * @param {object}   props
 * @param {string}   [props.value]                Controlled numeric value as string.
 * @param {Function} [props.onChange]             Called with the new amount string.
 * @param {string}   [props.defaultCurrency]      Initial selected code (uncontrolled mode).
 * @param {boolean}  [props.readOnly]
 * @param {Array}    [props.currencies]           Currency list. Each item should have
 *                                                { code, name?, flag?, flagUrl? }.
 * @param {string}   [props.selectedCode]         Controls the selected currency.
 * @param {Function} [props.onCurrencyChange]     Fires with the picked currency item.
 */
export function CurrencyInput({
  value,
  onChange,
  defaultCurrency = "USD",
  readOnly = false,
  currencies,
  selectedCode,
  onCurrencyChange,
}) {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const defaultBorder = isDark
    ? "1px solid rgba(255,255,255,0.1)"
    : "1px solid rgba(15,23,42,0.1)";

  const [isOpen, setIsOpen] = useState(false);

  // Resolve the working list: API-driven if provided, else fallback.
  const list =
    Array.isArray(currencies) && currencies.length > 0
      ? currencies
      : FALLBACK_CURRENCIES;

  const isControlled = typeof selectedCode === "string";

  // Uncontrolled internal selection.
  const [internal, setInternal] = useState(
    () => list.find((c) => c.code === defaultCurrency) || list[0],
  );

  // If the list swaps in async (API resolves), keep the uncontrolled
  // selection valid by snapping to the first entry when the old code drops.
  useEffect(() => {
    if (isControlled) return;
    if (!internal || !list.find((c) => c.code === internal.code)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInternal(list[0]);
    }
  }, [isControlled, list, internal]);

  const selected = isControlled
    ? list.find((c) => c.code === selectedCode) || list[0]
    : internal;

  const pick = (currency) => {
    if (!isControlled) setInternal(currency);
    onCurrencyChange?.(currency);
    setIsOpen(false);
  };

  if (!selected) return null; // empty list → render nothing rather than crash

  return (
    <div
      className="flex items-center rounded-xl relative transition-all duration-200 w-full min-w-0"
      style={{
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)",
        border: defaultBorder,
      }}
    >
      <input
        type="number"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder="0.00"
        className={`flex-1 min-w-0 w-full bg-transparent text-lg font-medium px-4 py-3.5 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
          isDark
            ? "text-white placeholder:text-white/20"
            : "text-slate-900 placeholder:text-slate-900/25"
        }`}
        style={{ caretColor: "#00C9A7" }}
        onFocus={(e) => {
          e.currentTarget.parentElement.style.border =
            "1px solid rgba(0,201,167,0.5)";
          e.currentTarget.parentElement.style.boxShadow =
            "0 0 0 3px rgba(0,201,167,0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.parentElement.style.border = defaultBorder;
          e.currentTarget.parentElement.style.boxShadow = "none";
        }}
      />

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className={`flex items-center gap-2 px-4 py-3.5 transition-colors rounded-r-xl ${
            isDark
              ? "text-white hover:bg-white/5"
              : "text-slate-900 hover:bg-slate-900/5"
          }`}
          style={{
            borderLeft: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(15,23,42,0.08)",
          }}
        >
          <CurrencyFlag currency={selected} size="sm" />
          <span className="text-sm font-bold min-w-8">{selected.code}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            <ChevronDown
              size={13}
              className={isDark ? "text-white/50" : "text-slate-600"}
            />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 z-50 w-56 rounded-2xl overflow-hidden max-h-72 overflow-y-auto"
              style={{
                background: isDark
                  ? "rgba(8, 18, 38, 0.98)"
                  : "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(15,23,42,0.08)",
                boxShadow: isDark
                  ? "0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,201,167,0.05)"
                  : "0 20px 40px rgba(15,23,42,0.12), 0 0 0 1px rgba(0,201,167,0.05)",
              }}
            >
              {list.map((currency) => {
                const isSel = currency.code === selected.code;
                return (
                  <button
                    key={currency.code}
                    type="button"
                    onClick={() => pick(currency)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150"
                    style={{
                      background: isSel
                        ? "rgba(0,201,167,0.12)"
                        : "transparent",
                      color: isSel
                        ? "#00C9A7"
                        : isDark
                          ? "rgba(255,255,255,0.75)"
                          : "rgba(71,85,105,0.95)",
                    }}
                    onMouseEnter={(e) => {
                      if (isSel) return;
                      e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(15,23,42,0.04)";
                      e.currentTarget.style.color = isDark
                        ? "#ffffff"
                        : "#0F172A";
                    }}
                    onMouseLeave={(e) => {
                      if (isSel) return;
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = isDark
                        ? "rgba(255,255,255,0.75)"
                        : "rgba(71,85,105,0.95)";
                    }}
                  >
                    <CurrencyFlag currency={currency} size="md" />
                    <div className="min-w-0">
                      <div className="text-sm font-bold leading-tight">
                        {currency.code}
                      </div>
                      {currency.name && (
                        <div className="text-xs opacity-50 leading-tight mt-0.5 truncate">
                          {currency.name}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Renders either an `<img>` (when `flagUrl` is provided) or the emoji
 * `flag` string. Keeps the dropdown / trigger button visually consistent.
 */
function CurrencyFlag({ currency, size }) {
  const dim = size === "sm" ? "w-5 h-5" : "w-6 h-6";

  if (currency.flagUrl) {
    return (
      <Image
        src={currency.flagUrl}
        alt=""
        aria-hidden
        loading="lazy"
        height={20}
        width={20}
        className={`${dim} rounded-full object-cover shrink-0`}
      />
    );
  }

  if (currency.flag) {
    return (
      <span
        className={
          size === "sm" ? "text-xl leading-none" : "text-2xl leading-none"
        }
      >
        {currency.flag}
      </span>
    );
  }

  return null;
}
