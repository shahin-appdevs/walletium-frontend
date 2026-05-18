"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Calendar, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CATEGORY_GRADIENTS = {
  "Security Measures": "linear-gradient(135deg, #F43F5E 0%, #F97316 100%)",
  Introduction: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
  Insights: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
  Product: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  Tutorials: "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
};
const DEFAULT_GRADIENT = "linear-gradient(135deg, #64748B 0%, #94A3B8 100%)";

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "").trim();
const truncate = (text, max = 160) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function JournalGrid({ initialArticles, initialHasMore, initialPage }) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/journal?page=${nextPage}&per_page=6`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Request failed");
      const body = await res.json();
      const journals = body?.data?.journals;
      const newItems = journals?.data ?? [];
      setArticles((prev) => [...prev, ...newItems]);
      setHasMore(journals?.next_page_url !== null);
      setPage(nextPage);
    } catch (err) {
      setError("Couldn't load more articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">
          <BookOpen size={24} />
        </div>
        <h3 className="font-serif font-bold text-xl mb-2 text-neutral-900 dark:text-white">
          No articles yet
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Check back soon for new stories from the Walletium team.
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
      >
        <AnimatePresence>
          {articles.map((article) => {
            const gradient =
              CATEGORY_GRADIENTS[article.category] ?? DEFAULT_GRADIENT;
            const excerpt = truncate(stripHtml(article.description));
            const date = formatDate(article.created_at);

            return (
              <motion.article
                key={article.id}
                variants={cardReveal}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)] hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-500/40 overflow-hidden transition-all duration-300 flex flex-col"
              >
                {/* Visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
                    style={{ background: gradient }}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-white backdrop-blur-md">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col">
                  <h3 className="font-serif font-bold text-lg sm:text-xl tracking-tight mb-2.5 text-neutral-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5 line-clamp-3 flex-1">
                    {excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-700/60">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={11} /> {date}
                      </span>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:gap-2 transition-all"
                      aria-label={`Read ${article.title}`}
                    >
                      Read <ArrowUpRight size={13} strokeWidth={2.5} />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {error && (
        <div className="mt-8 text-center">
          <p className="text-sm text-red-500 dark:text-red-400 mb-3">
            {error}
          </p>
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-800/80 text-neutral-900 dark:text-white font-bold text-sm border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
          >
            Try again
          </button>
        </div>
      )}

      {hasMore && !error && (
        <div className="text-center mt-10 sm:mt-12">
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-neutral-800/80 text-neutral-900 dark:text-white font-bold text-sm border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400 shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} strokeWidth={2.5} className="animate-spin" />
                Loading…
              </>
            ) : (
              <>Load more articles</>
            )}
          </motion.button>
        </div>
      )}
    </>
  );
}
