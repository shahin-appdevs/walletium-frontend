import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

/**
 * "Still have questions?" CTA section. Server Component — pure presentation.
 * Two paths: live chat / contact form, or direct email.
 */
export function FaqSupport({
  contactHref = "/contact",
  email = "support@walletium.com",
}) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-linear-to-b from-white via-emerald-50/30 to-slate-50 dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, rgba(14,190,152,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient outline */}
          <div
            className="absolute -inset-px rounded-3xl pointer-events-none opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,190,152,0.35) 0%, transparent 45%, rgba(0,229,255,0.25) 100%)",
            }}
          />

          {/* Card */}
          <div className="relative p-8 sm:p-10 lg:p-12 rounded-3xl text-center bg-white dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
            {/* Icon badge */}
            <div
              className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-xl shadow-primary-500/30"
              style={{
                background:
                  "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
              }}
            >
              <MessageCircle size={28} color="white" strokeWidth={2.2} />
            </div>

            <h2 className="font-serif font-black leading-tight mb-3 text-2xl sm:text-3xl lg:text-4xl tracking-tight text-neutral-900 dark:text-white">
              Still have{" "}
              <span className="text-primary-600 dark:text-primary-400">
                questions?
              </span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-7 sm:mb-8 leading-relaxed">
              Contact our support team for personalized assistance — we
              typically respond within one business day.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow"
                style={{
                  background:
                    "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                }}
              >
                Contact support
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </Link>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-neutral-900 dark:text-white bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Mail size={15} strokeWidth={2.5} />
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
