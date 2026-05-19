import { fetchers } from "@/lib/api/fetchers";
import { JournalGrid } from "./JournalGrid";
import { getLocale } from "next-intl/server";

/**
 * Server Component. Reads the optional `?category=<id>` search param and
 * branches the initial fetch between the generic list and the per-category
 * endpoint. The active category id flows down to <JournalGrid> so its
 * "Load more" path and "Clear filter" chip stay in sync with the URL.
 */
export async function JournalArticles({ searchParams }) {
  const lang = await getLocale();
  const resolved = (await searchParams) || {};
  const rawCategory = resolved.category;
  const categoryId =
    rawCategory != null && rawCategory !== "" ? String(rawCategory) : null;

  const response = categoryId
    ? await fetchers.journal.category(categoryId, {
        lang,
        page: 1,
        perPage: 6,
      })
    : await fetchers.journal.list({ lang, page: 1, perPage: 6 });

  const journals = response?.data?.journals;
  const articles = journals?.data ?? [];
  const hasMore = journals?.next_page_url !== null;
  const currentPage = journals?.current_page ?? 1;

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
        <JournalGrid
          initialArticles={articles}
          initialHasMore={hasMore}
          initialPage={currentPage}
          activeCategoryId={categoryId}
        />
      </div>
    </section>
  );
}
