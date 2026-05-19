"use client";
import { FAQ_INTRO, FAQ_ITEMS } from "@/data/faq";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

/**
 * FAQ accordion with live search.
 *
 * Client component because:
 *   - search input is interactive state
 *   - the accordion open/close state is local UI state
 *   - height animation on expand uses framer-motion
 *
 * Search matches both question and answer text, case-insensitively.
 * Only one item can be open at a time (more conventional than multi-open).
 */
export function FaqAccordion() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(FAQ_ITEMS[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-white dark:bg-walletium-dark">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full pointer-events-none opacity-40 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(14,190,152,0.14) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        {FAQ_INTRO && (
          <p className="text-center text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            {FAQ_INTRO}
          </p>
        )}

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-10 sm:mb-12">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
          />
          <input
            type="search"
            placeholder="Search questions..."
            aria-label="Search FAQ"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 focus:outline-none transition-all"
          />
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">
              <HelpCircle size={24} />
            </div>
            <h3 className="font-serif font-bold text-xl mb-2 text-neutral-900 dark:text-white">
              No matching questions
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Try a different keyword, or{" "}
              <a
                href="/contact"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                contact our team
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filtered.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className={`group rounded-2xl border bg-white dark:bg-neutral-800/50 backdrop-blur-sm transition-all duration-300 ${
                    isOpen
                      ? "border-primary-300/80 dark:border-primary-500/40 shadow-lg shadow-primary-500/10"
                      : "border-neutral-200/80 dark:border-neutral-700/60 hover:border-primary-200 dark:hover:border-primary-500/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span className="font-serif font-bold text-base sm:text-lg leading-snug text-neutral-900 dark:text-white">
                      {item.question}
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
                        id={`faq-panel-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
