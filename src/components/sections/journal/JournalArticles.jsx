"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Clock,
  Code2,
  Globe,
  Layers,
  Lock,
  Plus,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";

const ARTICLES = [
  {
    id: 1,
    category: "Insights",
    title: "The future of digital wallets: 5 trends shaping 2026",
    description:
      "From embedded finance to cross-border instant payments, here are the five most important trends defining the next generation of digital wallets — and what they mean for users and businesses alike.",
    date: "May 12, 2026",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    Icon: TrendingUp,
    featured: true,
  },
  {
    id: 2,
    category: "Insights",
    title: "Why multi-currency support matters more than ever",
    description:
      "Cross-border commerce is exploding. Here's how a true multi-currency wallet beats wire transfers every time — and what to look for when picking one for your business.",
    date: "May 8, 2026",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    Icon: Globe,
  },
  {
    id: 3,
    category: "Product",
    title: "Introducing Walletium 2.5: Real-time payouts everywhere",
    description:
      "Real-time payouts to 80+ countries, smarter fraud rules, and a redesigned admin console. Here's what's new in our biggest release of the year.",
    date: "May 3, 2026",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    Icon: Rocket,
  },
  {
    id: 4,
    category: "Security",
    title: "Best practices for securing your digital wallet",
    description:
      "Strong passwords are just the start. A practical guide to 2FA, biometric locks, transaction signing, and the habits that keep your wallet truly safe.",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg, #F43F5E 0%, #F97316 100%)",
    Icon: ShieldCheck,
  },
  {
    id: 5,
    category: "Tutorials",
    title: "How to integrate Walletium API in 10 minutes",
    description:
      "Step-by-step walk-through of connecting Walletium to your app — auth, your first payment, webhooks, and going live. With copy-pastable code for Node, Python, and Go.",
    date: "Apr 24, 2026",
    readTime: "10 min read",
    gradient: "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
    Icon: Code2,
  },
  {
    id: 6,
    category: "Insights",
    title: "Cross-border payments: The complete guide",
    description:
      "Everything you need to know about moving money internationally — settlement rails, hidden fees, FX spreads, regulation, and how Walletium fits into the modern toolkit.",
    date: "Apr 18, 2026",
    readTime: "12 min read",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)",
    Icon: Send,
  },
  {
    id: 7,
    category: "Security",
    title: "What 2FA actually protects (and what it doesn't)",
    description:
      "Two-factor authentication is essential, but it's not magic. A clear-eyed look at the attacks 2FA stops cold, the ones it doesn't, and what to add on top.",
    date: "Apr 14, 2026",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    Icon: Lock,
  },
  {
    id: 8,
    category: "Tutorials",
    title: "Building a Walletium-powered marketplace",
    description:
      "A complete tutorial for adding split payments, escrow, and vendor payouts to your marketplace using the Walletium API. Production-ready patterns, real code.",
    date: "Apr 10, 2026",
    readTime: "15 min read",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #6366F1 100%)",
    Icon: Layers,
  },
  {
    id: 9,
    category: "Product",
    title: "Inside the Walletium roadmap: Q2 2026",
    description:
      "What we're shipping next quarter, why, and how it ties together. From new merchant tools to better dispute handling and AI-powered fraud detection.",
    date: "Apr 5, 2026",
    readTime: "9 min read",
    gradient: "linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)",
    Icon: Sparkles,
  },
];

const CATEGORIES = ["All", "Insights", "Product", "Security", "Tutorials"];
const DEFAULT_COUNT = 6;

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function JournalArticles() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(DEFAULT_COUNT);

  const isFiltered =
    activeCategory !== "All" || searchQuery.trim().length > 0;

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const inCat = activeCategory === "All" || a.category === activeCategory;
      const inSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q);
      return inCat && inSearch;
    });
  }, [activeCategory, searchQuery]);

  const featured = !isFiltered
    ? ARTICLES.find((a) => a.featured)
    : null;

  const gridArticles = filtered.filter(
    (a) => !featured || a.id !== featured.id
  );
  const visibleGrid = gridArticles.slice(0, displayCount);
  const hasMore = gridArticles.length > displayCount;

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setDisplayCount(DEFAULT_COUNT);
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-white dark:bg-walletium-dark">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.14) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search + filters */}
        <div className="flex flex-col gap-5 sm:gap-6 mb-10 sm:mb-12">
          <div className="relative w-full max-w-lg mx-auto">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search articles, topics, or keywords…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayCount(DEFAULT_COUNT);
              }}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 focus:outline-none transition-all"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-200 ${
                    active
                      ? "text-white shadow-md shadow-primary-500/30"
                      : "bg-white/80 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700/80 hover:border-primary-300 dark:hover:border-primary-500/40 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                        }
                      : undefined
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured article */}
        <AnimatePresence>
          {featured && (
            <motion.article
              key="featured"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="group relative mb-12 lg:mb-14 rounded-3xl bg-white dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.1)] dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)] hover:shadow-2xl hover:border-primary-200 dark:hover:border-primary-500/40 overflow-hidden transition-all duration-300"
            >
              <div className="grid lg:grid-cols-2">
                {/* Visual */}
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: featured.gradient }}
                  />
                  {/* Decorative pattern */}
                  <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.15) 0%, transparent 50%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <featured.Icon
                      size={96}
                      color="white"
                      strokeWidth={1.5}
                      className="opacity-90 drop-shadow-lg"
                    />
                  </div>
                  {/* Badges */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white/20 backdrop-blur-md text-white border border-white/30">
                    <Sparkles size={11} /> Featured
                  </span>
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-white backdrop-blur-md">
                    {featured.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400 mb-3">
                    Editor&apos;s Pick
                  </span>
                  <h2 className="font-serif font-black leading-tight mb-4 text-2xl sm:text-3xl lg:text-4xl tracking-tight text-neutral-900 dark:text-white">
                    {featured.title}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {featured.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={13} /> {featured.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} /> {featured.readTime}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all duration-300 self-start"
                  >
                    Read article <ArrowRight size={15} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {visibleGrid.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">
              <Search size={24} />
            </div>
            <h3 className="font-serif font-bold text-xl mb-2 text-neutral-900 dark:text-white">
              No articles found
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Try a different keyword or category.
            </p>
          </div>
        )}

        {/* Grid */}
        {visibleGrid.length > 0 && (
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
              {visibleGrid.map((article) => (
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
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                      style={{ background: article.gradient }}
                    />
                    <div
                      className="absolute inset-0 opacity-40 mix-blend-overlay"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 80%, rgba(0,0,0,0.12) 0%, transparent 50%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <article.Icon
                        size={56}
                        color="white"
                        strokeWidth={1.6}
                        className="opacity-90 drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {/* Category badge */}
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
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-700/60">
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={11} /> {article.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                        <span className="inline-flex items-center gap-1">
                          <Clock size={11} /> {article.readTime}
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
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-10 sm:mt-12">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDisplayCount((c) => c + 3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-neutral-800/80 text-neutral-900 dark:text-white font-bold text-sm border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400 shadow-sm hover:shadow-md transition-all"
            >
              <Plus size={16} strokeWidth={2.5} />
              Load more articles
              <ChevronDown size={16} strokeWidth={2.5} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
