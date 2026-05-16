"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Facebook, Github, Heart, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "FAQ", href: "/faq" },
];

const SOCIAL_LINKS = [
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Github, href: "https://github.com", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-[#0A0F1E] via-[#091627] to-[#06101E] text-neutral-300">
      {/* Top gradient hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary-500/40 to-transparent" />

      {/* Ambient glow accents */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[400px] rounded-full pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse, rgba(14,190,152,0.20) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.14) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 lg:mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div
                className="w-10 h-10 flex items-center justify-center text-white font-black text-base transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00C9A7, #00E5FF)",
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              >
                W
              </div>
              <span className="font-black tracking-[0.2em] text-lg text-white">
                WALLETIUM
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-md mb-7">
              Walletium is the ultimate digital wallet solution, offering
              seamless money management with features like instant transactions
              and multi-currency support.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] hover:bg-primary-500/15 border border-white/10 hover:border-primary-400/50 text-neutral-400 hover:text-primary-400 backdrop-blur-sm transition-colors duration-300"
                >
                  <Icon size={17} strokeWidth={2} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white mb-5">
              Resources
            </h3>
            <ul className="space-y-3.5">
              {POLICY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white mb-5">
              Get in touch
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              Have a question or feedback? Our team is just an email away —
              we&apos;ll get back to you within one business day.
            </p>
            <a
              href="mailto:hello@walletium.com"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
            >
              <Mail size={15} strokeWidth={2.2} />
              hello@walletium.com
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="relative h-px mb-6">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent" />
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-between">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            Copyright ©2026. All Rights Reserved. — Designed with{" "}
            <Heart
              size={12}
              className="inline-block mx-0.5 -mt-0.5 text-primary-400 fill-primary-400/50"
              strokeWidth={2.2}
            />{" "}
            by{" "}
            <span className="text-neutral-300 font-semibold">Walletium</span>
          </p>
          <p className="text-xs text-neutral-500 tracking-wider">
            Available worldwide ·{" "}
            <span className="text-primary-400 font-semibold">v1.0</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
