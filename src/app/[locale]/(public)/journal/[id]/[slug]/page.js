import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JournalArticleHero } from "@/components/sections/journal/JournalArticleHero";
import { JournalSidebar } from "@/components/sections/journal/JournalSidebar";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { fetchers } from "@/lib/api/fetchers";
import { stripHtml, truncate } from "@/utils/journal";
import { Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getArticle({ id, slug, locale }) {
  try {
    const response = await fetchers.journal.detail(id, slug, { lang: locale });
    return response?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id, slug, locale } = await params;
  const data = await getArticle({ id, slug, locale });
  const article = data?.journal_details;

  if (!article) {
    return { title: "Article not found — Walletium Journal" };
  }

  const title = `${article.title} — Walletium Journal`;
  const description = truncate(stripHtml(article.description), 160);
  const image = article.image;

  return {
    title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.created_at,
      images: image ? [{ url: image, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function JournalDetailsPage({ params }) {
  const { id, slug, locale } = await params;
  const data = await getArticle({ id, slug, locale });
  const article = data?.journal_details;

  if (!article) notFound();

  const categories = data?.categories ?? [];
  const recentPosts = data?.recent_journals ?? [];

  return (
    <main>
      <Navbar />

      <JournalArticleHero article={article} />

      <section className="relative py-12 sm:py-16 lg:py-20 bg-white dark:bg-walletium-dark">
        <div
          className="absolute top-1/4 right-0 translate-x-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(14,190,152,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Article body */}
            <article className="lg:col-span-8 xl:col-span-9">
              <div
                className="
                  max-w-none text-neutral-700 dark:text-neutral-300
                  text-base sm:text-[17px] leading-[1.8]
                  [&_p]:my-5
                  [&_h1]:font-serif [&_h1]:font-black [&_h1]:text-3xl sm:[&_h1]:text-4xl [&_h1]:mt-12 [&_h1]:mb-5 [&_h1]:tracking-tight [&_h1]:text-neutral-900 dark:[&_h1]:text-white
                  [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight [&_h2]:text-neutral-900 dark:[&_h2]:text-white
                  [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:tracking-tight [&_h3]:text-neutral-900 dark:[&_h3]:text-white
                  [&_h4]:font-bold [&_h4]:text-lg [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-neutral-900 dark:[&_h4]:text-white
                  [&_a]:text-primary-600 dark:[&_a]:text-primary-400 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary-300/60 hover:[&_a]:decoration-primary-500
                  [&_strong]:font-bold [&_strong]:text-neutral-900 dark:[&_strong]:text-white
                  [&_em]:italic
                  [&_ul]:my-5 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2
                  [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2
                  [&_li]:leading-[1.7]
                  [&_blockquote]:my-7 [&_blockquote]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary-500 [&_blockquote]:italic [&_blockquote]:text-neutral-600 dark:[&_blockquote]:text-neutral-400
                  [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:bg-neutral-100 dark:[&_code]:bg-neutral-800 [&_code]:text-[0.9em] [&_code]:font-mono [&_code]:text-primary-700 dark:[&_code]:text-primary-300
                  [&_pre]:my-6 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:bg-neutral-900 dark:[&_pre]:bg-neutral-950 [&_pre]:text-neutral-100 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0
                  [&_img]:my-6 [&_img]:rounded-xl [&_img]:w-full [&_img]:h-auto
                  [&_hr]:my-10 [&_hr]:border-neutral-200 dark:[&_hr]:border-neutral-700
                "
                dangerouslySetInnerHTML={{ __html: article.description ?? "" }}
              />

              {Array.isArray(article.tags) && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700/60">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag
                      size={16}
                      className="text-primary-600 dark:text-primary-400"
                    />
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300">
                      Tags
                    </h2>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <li key={tag}>
                        <Link
                          href={`/journal?tag=${encodeURIComponent(tag)}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60 hover:bg-primary-50 dark:hover:bg-primary-500/15 hover:text-primary-700 dark:hover:text-primary-300 hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors"
                        >
                          #{tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <JournalSidebar
                categories={categories}
                recentPosts={recentPosts}
              />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </main>
  );
}
