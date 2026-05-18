import { formatDate, getCategoryGradient } from "@/utils/journal";
import { ChevronRight, FolderOpen, History } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CategoriesWidget({ categories = [] }) {
  if (!categories?.length) return null;

  return (
    <div className="rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-neutral-100 dark:border-neutral-700/60">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400">
          <FolderOpen size={16} strokeWidth={2.2} />
        </div>
        <h2 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
          Categories
        </h2>
      </div>
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-700/60">
        {categories.map((cat) => {
          const name = cat.name ?? cat.category ?? cat.title;
          const id = cat.id ?? name;
          const count = cat.journal_count ?? cat.count ?? cat.total ?? 0;
          if (!name) return null;
          return (
            <li key={id}>
              <Link
                href={`/journal?category=${encodeURIComponent(name)}`}
                className="flex items-center justify-between gap-3 px-5 py-3 group hover:bg-primary-50/60 dark:hover:bg-primary-500/5 transition-colors"
              >
                <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  <ChevronRight
                    size={14}
                    className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                  />
                  {name}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-700/60 text-neutral-600 dark:text-neutral-300 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                  {count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RecentPostsWidget({ posts = [] }) {
  if (!posts?.length) return null;

  return (
    <div className="rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-neutral-100 dark:border-neutral-700/60">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400">
          <History size={16} strokeWidth={2.2} />
        </div>
        <h2 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
          Recent Posts
        </h2>
      </div>
      <ul className="p-3 sm:p-4 space-y-2">
        {posts.map((post) => {
          const gradient = getCategoryGradient(post.category);
          return (
            <li key={post.id}>
              <Link
                href={`/journal/${post.id}/${post.slug}`}
                className="group flex gap-3 p-2 rounded-xl hover:bg-primary-50/60 dark:hover:bg-primary-500/5 transition-colors"
              >
                <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                  {post.image && (
                    <>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none"
                        style={{ background: gradient }}
                      />
                    </>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {post.category && (
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-primary-600 dark:text-primary-400 mb-1">
                      {post.category}
                    </span>
                  )}
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  {post.created_at && (
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                      {formatDate(post.created_at)}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function JournalSidebar({ categories, recentPosts }) {
  return (
    <aside className="lg:sticky lg:top-24 space-y-6">
      <CategoriesWidget categories={categories} />
      <RecentPostsWidget posts={recentPosts} />
    </aside>
  );
}
