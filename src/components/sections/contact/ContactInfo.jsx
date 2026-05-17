"use client";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const CARDS = [
  {
    label: "Our Location",
    Icon: MapPin,
    lines: ["20-22 Wenlock Road", "London, England, N1 7GU"],
    gradient: "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
    shadow: "0 14px 30px -10px rgba(14,190,152,0.45)",
  },
  {
    label: "Call Us",
    Icon: Phone,
    lines: ["+03601 885399"],
    sub: "Available during office hours",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    shadow: "0 14px 30px -10px rgba(59,130,246,0.45)",
    href: "tel:+03601885399",
  },
  {
    label: "Office Hours",
    Icon: Clock,
    lines: ["Monday – Friday"],
    sub: "9:00am – 9:00pm GMT",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)",
    shadow: "0 14px 30px -10px rgba(245,158,11,0.45)",
  },
  {
    label: "Email Us",
    Icon: Mail,
    lines: ["support@example.com", "example@gmail.com"],
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    shadow: "0 14px 30px -10px rgba(99,102,241,0.45)",
    href: "mailto:support@example.com",
  },
];

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function ContactInfo() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-white dark:bg-walletium-dark">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {CARDS.map(
            ({ label, Icon, lines, sub, gradient, shadow, href }) => {
              const Tag = href ? "a" : "div";
              return (
                <motion.div
                  key={label}
                  variants={cardReveal}
                  whileHover={{ y: -6 }}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/60 shadow-sm hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-500/40 transition-all duration-300"
                >
                  <Tag
                    {...(href ? { href } : {})}
                    className="block"
                  >
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                      style={{ background: gradient, boxShadow: shadow }}
                    >
                      <Icon size={24} color="white" strokeWidth={2.2} />
                    </div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400 mb-2">
                      {label}
                    </p>
                    <div className="space-y-1">
                      {lines.map((line) => (
                        <p
                          key={line}
                          className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug"
                        >
                          {line}
                        </p>
                      ))}
                      {sub && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                          {sub}
                        </p>
                      )}
                    </div>
                  </Tag>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </div>
    </section>
  );
}
