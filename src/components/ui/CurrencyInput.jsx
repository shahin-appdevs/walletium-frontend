"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const CURRENCIES = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar" },
  { code: "EUR", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", name: "British Pound" },
  { code: "BDT", flag: "🇧🇩", name: "Taka" },
];

export function CurrencyInput({
  value,
  onChange,
  defaultCurrency = "USD",
  readOnly = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    CURRENCIES.find((c) => c.code === defaultCurrency) || CURRENCIES[0]
  );

  return (
    <div
      className="flex items-center rounded-xl relative transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <input
        type="number"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder="0.00"
        className="flex-1 bg-transparent text-white text-lg font-medium px-4 py-3.5 outline-none placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        style={{ caretColor: "#00C9A7" }}
        onFocus={(e) => {
          e.currentTarget.parentElement.style.border =
            "1px solid rgba(0,201,167,0.5)";
          e.currentTarget.parentElement.style.boxShadow =
            "0 0 0 3px rgba(0,201,167,0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.parentElement.style.border =
            "1px solid rgba(255,255,255,0.1)";
          e.currentTarget.parentElement.style.boxShadow = "none";
        }}
      />

      <div className="relative flex-shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3.5 text-white hover:bg-white/5 transition-colors rounded-r-xl"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-xl leading-none">{selected.flag}</span>
          <span className="text-sm font-bold min-w-[2rem]">{selected.code}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            <ChevronDown size={13} className="text-white/50" />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 z-50 w-48 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8, 18, 38, 0.98)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,201,167,0.05)",
              }}
            >
              {CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => {
                    setSelected(currency);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150"
                  style={{
                    background:
                      selected.code === currency.code
                        ? "rgba(0,201,167,0.12)"
                        : "transparent",
                    color:
                      selected.code === currency.code
                        ? "#00C9A7"
                        : "rgba(255,255,255,0.75)",
                  }}
                  onMouseEnter={(e) => {
                    if (selected.code !== currency.code) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selected.code !== currency.code) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                    }
                  }}
                >
                  <span className="text-2xl leading-none">{currency.flag}</span>
                  <div>
                    <div className="text-sm font-bold leading-tight">{currency.code}</div>
                    <div className="text-xs opacity-50 leading-tight mt-0.5">{currency.name}</div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
