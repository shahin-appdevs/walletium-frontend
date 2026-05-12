"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeftRight,
  Banknote,
  Code2,
  FileText,
  Globe,
  Shield,
  Ticket,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    title: "Instant Transactions",
    description: "Send money instantly to friends and family across the globe.",
    Icon: Zap,
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    shadow: "0 12px 28px -8px rgba(14,190,152,0.45)",
  },
  {
    title: "Multi Currency Support",
    description: "Manage funds in multiple currencies effortlessly.",
    Icon: Globe,
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    shadow: "0 12px 28px -8px rgba(59,130,246,0.45)",
  },
  {
    title: "Secure Vouchers",
    description: "Add funds securely with our voucher and redeem system.",
    Icon: Ticket,
    gradient: "linear-gradient(135deg, #F43F5E 0%, #F97316 100%)",
    shadow: "0 12px 28px -8px rgba(244,63,94,0.45)",
  },
  {
    title: "Seamless Exchanges",
    description: "Exchange money between balances with real-time rates.",
    Icon: ArrowLeftRight,
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    shadow: "0 12px 28px -8px rgba(139,92,246,0.45)",
  },
  {
    title: "Hassle Free Withdrawals",
    description: "Easily withdraw funds via manual and automated gateways.",
    Icon: Banknote,
    gradient: "linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)",
    shadow: "0 12px 28px -8px rgba(245,158,11,0.45)",
  },
  {
    title: "Payment Requests",
    description: "Streamline payment collection with effortless requests.",
    Icon: FileText,
    gradient: "linear-gradient(135deg, #22C55E 0%, #0ebe98 100%)",
    shadow: "0 12px 28px -8px rgba(34,197,94,0.45)",
  },
  {
    title: "Developer API",
    description: "Integrate Walletium with other applications seamlessly.",
    Icon: Code2,
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    shadow: "0 12px 28px -8px rgba(99,102,241,0.45)",
  },
  {
    title: "Admin Oversight",
    description: "Ensure secure oversight with robust role management.",
    Icon: Shield,
    gradient: "linear-gradient(135deg, #EF4444 0%, #F97316 100%)",
    shadow: "0 12px 28px -8px rgba(239,68,68,0.45)",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function FeaturesSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F8FBFA 0%, #EAFBF5 50%, #FDF4F0 100%)",
      }}
    >
      {/* Soft radial glow blobs */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 translate-x-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-20"
        >
          <span
            className="inline-block text-sm font-bold tracking-widest uppercase mb-4"
            style={{ color: "#0ebe98" }}
          >
            Our Features
          </span>
          <h2
            className="font-serif font-black leading-tight mb-5"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0A0F1E",
              letterSpacing: "-0.02em",
            }}
          >
            With Walletium, managing your finances has never been easier.
          </h2>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: "#64748B" }}
          >
            Everything you need to send, receive, exchange, and manage your
            money — built into one seamless platform.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {FEATURES.map(({ title, description, Icon, gradient, shadow }) => (
            <motion.div
              key={title}
              variants={cardReveal}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative p-7 rounded-3xl backdrop-blur-sm transition-shadow duration-300"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow:
                  "0 4px 16px -4px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)",
              }}
            >
              {/* Icon squircle */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                style={{ background: gradient, boxShadow: shadow }}
              >
                <Icon size={26} color="white" strokeWidth={2.2} />
              </div>

              {/* Title */}
              <h3
                className="font-serif font-bold text-xl mb-2.5"
                style={{ color: "#0A0F1E", letterSpacing: "-0.01em" }}
              >
                {title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "#64748B" }}
              >
                {description}
              </p>

              {/* Learn more link */}
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-300 group-hover:gap-2.5"
                style={{ color: "#0ebe98" }}
              >
                Learn more
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
