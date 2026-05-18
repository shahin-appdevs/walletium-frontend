import {
  estimateReadTime,
  formatDate,
  getCategoryGradient,
} from "@/utils/journal";
import { Calendar, ChevronRight, Clock, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function JournalArticleHero({ article }) {
  if (!article) return null;

  const gradient = getCategoryGradient(article.category);
  const date = formatDate(article.created_at);
  const readTime = estimateReadTime(article.description);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-12 lg:pb-14 bg-linear-to-b from-slate-50 via-emerald-50/40 to-white dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-0 -translate-x-1/3 w-[520px] h-[520px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-0 right-0 translate-x-1/3 w-[460px] h-[460px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.14) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6 sm:mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Home size={13} /> Home
          </Link>
          <ChevronRight size={13} className="opacity-60" />
          <Link
            href="/journal"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Journal
          </Link>
          <ChevronRight size={13} className="opacity-60" />
          <span className="truncate text-neutral-700 dark:text-neutral-300">
            {article.title}
          </span>
        </nav>

        {/* Eyebrow + title */}
        <div className="max-w-3xl">
          {article.category && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-5 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400 ring-1 ring-primary-200/60 dark:ring-primary-500/30">
              {article.category}
            </span>
          )}
          <h1 className="font-serif font-black leading-[1.08] mb-5 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] tracking-tight text-neutral-900 dark:text-white">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            {date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} /> {date}
              </span>
            )}
            {date && (
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} /> {readTime}
            </span>
          </div>
        </div>

        {/* Featured image */}
        {article.image && (
          <figure className="mt-8 sm:mt-10 lg:mt-12 relative aspect-[16/9] sm:aspect-[16/8] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-neutral-200/70 dark:ring-neutral-700/60">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
              style={{ background: gradient }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
          </figure>
        )}
      </div>
    </section>
  );
}
