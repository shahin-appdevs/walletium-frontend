"use client";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "How do I get started with Walletium?",
    a: "Create a free account in under two minutes, complete a quick KYC verification, and you can send, receive, and exchange money right away. No credit card required to start.",
  },
  {
    q: "Is Walletium safe and secure?",
    a: "Yes. Every transaction is protected by bank-grade encryption, 2FA, and round-the-clock fraud monitoring. We're PCI-DSS Level 1 and ISO 27001 certified.",
  },
  {
    q: "What are the transaction fees?",
    a: "Personal P2P transfers within the same currency are free. Cross-border and FX transfers use transparent mid-market rates with a small fee shown upfront — no hidden charges, ever.",
  },
  {
    q: "How long do international transfers take?",
    a: "Most international transfers settle in under 10 seconds for supported corridors, with the longest taking a single business day. You'll get real-time status updates throughout.",
  },
  {
    q: "Do you support my country?",
    a: "Walletium operates in 120+ countries with 180+ supported corridors. Check our coverage page or just sign up — we'll instantly show you what's available in your region.",
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-linear-to-b from-slate-50 via-white to-emerald-50/30 dark:from-[#091829] dark:via-walletium-dark-mid dark:to-[#0A0F1E]">
      {/* Glow */}
      <div
        className="absolute top-1/3 right-0 translate-x-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.16) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-4 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200/60 dark:ring-primary-500/30">
            <HelpCircle size={12} /> FAQ
          </span>
          <h2 className="font-serif font-black leading-tight mb-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-neutral-900 dark:text-white">
            Frequently asked questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Quick answers to the questions we hear most. Still curious? The
            form above is the fastest way to reach us.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`group rounded-2xl border bg-white dark:bg-neutral-800/50 backdrop-blur-sm transition-all duration-300 ${
                  isOpen
                    ? "border-primary-300/80 dark:border-primary-500/40 shadow-lg shadow-primary-500/10"
                    : "border-neutral-200/80 dark:border-neutral-700/60 hover:border-primary-200 dark:hover:border-primary-500/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg leading-snug text-neutral-900 dark:text-white">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen
                        ? "text-white"
                        : "bg-neutral-100 dark:bg-neutral-700/60 text-neutral-600 dark:text-neutral-300"
                    }`}
                    style={
                      isOpen
                        ? {
                            background:
                              "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                          }
                        : undefined
                    }
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
