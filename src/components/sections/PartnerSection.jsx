"use client";
import {
  Banknote,
  CircleDollarSign,
  Coins,
  CreditCard,
  Landmark,
  PiggyBank,
  Wallet,
  Zap,
} from "lucide-react";

const PARTNERS = [
  { name: "Finovate", Icon: Wallet },
  { name: "Kanmon", Icon: Landmark },
  { name: "Fizz", Icon: Zap },
  { name: "Plane", Icon: CreditCard },
  { name: "Payva", Icon: Banknote },
  { name: "Gusto", Icon: PiggyBank },
  { name: "Elevate", Icon: CircleDollarSign },
  { name: "Stripe", Icon: Coins },
];

export function PartnerSection() {
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-neutral-50 to-white dark:from-[#091829] dark:to-[#0A1A2E] border-t border-neutral-200/70 dark:border-white/4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase mb-8 text-neutral-500 dark:text-slate-400/60">
          Trusted by industry leaders
        </p>

        <div
          className="marquee-pause relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
          }}
        >
          <div className="animate-marquee-x flex w-max gap-16 lg:gap-20">
            {loop.map(({ name, Icon }, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2.5 shrink-0 transition-opacity duration-300 opacity-60 hover:opacity-100 text-neutral-700 dark:text-slate-300"
              >
                <Icon size={22} strokeWidth={1.8} />
                <span className="text-lg font-semibold tracking-tight whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
