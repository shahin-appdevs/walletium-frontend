import {
  ArrowUpRight,
  Baby,
  Clock,
  Database,
  FileText,
  Lock,
  RefreshCw,
  Settings2,
  Share2,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

/**
 * Long-form legal content layout. Server Component — no client JS — so
 * legal routes ship near-zero JavaScript.
 *
 * Content is fully data-driven via props; icons are referenced by string
 * keys so the data files (src/data/<policy>.js) stay pure.
 *
 * @param {object}    props
 * @param {string}    props.intro
 * @param {object[]}  props.sections     [{ id, number, title, icon, blocks: [{ heading?, body }] }]
 * @param {string?}   props.closing      Optional closing statement
 * @param {object}    props.contactCta   { heading, body, href, buttonText }
 */

const ICON_MAP = {
  baby: Baby,
  clock: Clock,
  database: Database,
  "file-text": FileText,
  lock: Lock,
  "refresh-cw": RefreshCw,
  "settings-2": Settings2,
  "share-2": Share2,
  "shield-alert": ShieldAlert,
  "shield-check": ShieldCheck,
  "user-check": UserCheck,
  users: Users,
};

export function LegalContent({
  intro,
  sections = [],
  closing,
  contactCta = {
    heading: "Need help?",
    body: "Our team is one message away — we typically respond within 24 hours.",
    href: "/contact",
    buttonText: "Contact us",
  },
}) {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-20 bg-white dark:bg-walletium-dark">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/3 right-0 translate-x-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.14) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sticky TOC */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav
              aria-label="Section navigation"
              className="sticky top-24 space-y-1"
            >
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400 mb-4">
                On this page
              </p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-start gap-3 px-3 py-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/40 transition-colors"
                >
                  <span className="shrink-0 text-xs font-bold text-neutral-400 dark:text-neutral-500 group-hover:text-primary-500 transition-colors mt-0.5">
                    {String(s.number).padStart(2, "0")}
                  </span>
                  <span className="leading-snug">{s.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <article className="lg:col-span-9 space-y-10 sm:space-y-12">
            {/* Intro */}
            {intro && (
              <div className="relative p-6 sm:p-8 rounded-2xl bg-primary-50/60 dark:bg-primary-500/5 border border-primary-200/60 dark:border-primary-500/20">
                <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-200">
                  {intro}
                </p>
              </div>
            )}

            {/* Sections */}
            {sections.map(({ id, number, title, icon, blocks }) => {
              const Icon = ICON_MAP[icon] ?? FileText;
              return (
                <section
                  key={id}
                  id={id}
                  aria-labelledby={`${id}-title`}
                  className="scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-5 sm:mb-6">
                    <div
                      className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                        boxShadow: "0 12px 24px -8px rgba(14,190,152,0.4)",
                      }}
                    >
                      <Icon
                        size={22}
                        color="white"
                        strokeWidth={2.2}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400 mb-1">
                        Section {String(number).padStart(2, "0")}
                      </p>
                      <h2
                        id={`${id}-title`}
                        className="font-serif font-black leading-tight text-2xl sm:text-3xl tracking-tight text-neutral-900 dark:text-white"
                      >
                        {title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-5 sm:space-y-6 pl-0 sm:pl-16">
                    {blocks.map((b, i) => (
                      <div key={i}>
                        {b.heading && (
                          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">
                            {b.heading}
                          </h3>
                        )}
                        <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {b.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Optional closing */}
            {closing && (
              <div className="relative p-6 sm:p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/60">
                <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-200">
                  {closing}
                </p>
              </div>
            )}

            {/* Contact CTA */}
            <div className="relative rounded-3xl overflow-hidden">
              <div
                className="absolute -inset-px rounded-3xl pointer-events-none opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,190,152,0.35) 0%, transparent 45%, rgba(0,229,255,0.25) 100%)",
                }}
              />
              <div className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-white mb-1.5">
                    {contactCta.heading}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {contactCta.body}
                  </p>
                </div>
                <Link
                  href={contactCta.href}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                  }}
                >
                  {contactCta.buttonText}
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
