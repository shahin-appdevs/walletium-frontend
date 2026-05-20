"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu, X, ChevronDown, Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContextProvider";
import { token } from "@/lib/token";
import { routing } from "@/i18n/routing";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "developer", href: "/developer" },
  { key: "aboutUs", href: "/about" },
  { key: "services", href: "/services" },
  { key: "webJournal", href: "/journal" },
  { key: "contact", href: "/contact" },
];

// Mirror the list used by the dashboard <LanguageSwitcher /> so both surfaces
// show the same set of supported locales.
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export function Navbar() {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === "dark";
  const t = useTranslations("Frontend.navbar");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Locale comes from the URL — same pattern as the dashboard LanguageSwitcher.
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = pathname.split("/")[1] || routing.defaultLocale;
  const currentLang =
    LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];

  const handleLanguageChange = (code) => {
    setLangOpen(false);
    const pathSegments = pathname.split("/");
    pathSegments[1] = code;
    const search = searchParams.toString();
    const newPath =
      `${pathSegments.join("/")}${search ? `?${search}` : ""}` || "/";
    router.push(newPath);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthenticated(!!token.get());
  }, []);
  const ctaHref = isAuthenticated ? "/dashboard" : "/login";
  const ctaLabel = isAuthenticated ? t("cta.dashboard") : t("cta.loginNow");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? isDark
            ? "rgba(10, 15, 30, 0.88)"
            : "rgba(255, 255, 255, 0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        // Keep a 1px border slot always present so toggling visibility
        // doesn't cause a layout shift / visible "flip" when scrolling starts.
        borderBottom: `1px solid ${
          scrolled
            ? isDark
              ? "rgba(255,255,255,0.06)"
              : "rgba(15,23,42,0.08)"
            : "transparent"
        }`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo/web_logo.webp"
              alt={t("logoAlt")}
              width={180}
              height={40}
              priority
              className="h-6 sm:h-7 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
                  isDark
                    ? "text-white/75 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t(`links.${link.key}`)}
                <span
                  className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{
                    background: "linear-gradient(90deg, #00C9A7, #00E5FF)",
                  }}
                />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              dir="ltr"
              onClick={toggleTheme}
              className="relative flex items-center bg-white dark:bg-neutral-800 rounded-full p-1 border border-gray-200 dark:border-neutral-700 w-[72px] shrink-0 transition-colors duration-300"
              title={
                mode === "dark"
                  ? t("theme.switchToLight")
                  : t("theme.switchToDark")
              }
            >
              <div
                className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-[#002d25] dark:bg-primary-500 transition-all duration-300 ${
                  mode === "dark" ? "translate-x-0" : "translate-x-8"
                }`}
              />
              <div className="w-8 h-8 flex items-center justify-center z-10">
                <Moon
                  size={16}
                  className={`transition-colors duration-300 ${
                    mode === "dark" ? "text-white" : "text-[#002d25]"
                  }`}
                />
              </div>
              <div className="w-8 h-8 flex items-center justify-center z-10">
                <Sun
                  size={16}
                  className={`transition-colors duration-300 ${
                    mode === "light" ? "text-white" : "text-neutral-400"
                  }`}
                />
              </div>
            </button>

            {/* Language selector */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-colors duration-200 ${
                  isDark
                    ? "text-white/70 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={{
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(15,23,42,0.1)",
                }}
              >
                <Globe size={14} />
                <span>{currentLang.label}</span>
                <motion.span
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  <ChevronDown size={13} />
                </motion.span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-40 rounded-2xl overflow-hidden z-50"
                    style={{
                      background: isDark
                        ? "rgba(8, 18, 38, 0.98)"
                        : "rgba(255, 255, 255, 0.98)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: isDark
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(15,23,42,0.08)",
                      boxShadow: isDark
                        ? "0 20px 40px rgba(0,0,0,0.6)"
                        : "0 20px 40px rgba(15,23,42,0.12)",
                    }}
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left"
                        style={{
                          background:
                            currentLang.code === lang.code
                              ? "rgba(0,201,167,0.1)"
                              : "transparent",
                          color:
                            currentLang.code === lang.code
                              ? "#00C9A7"
                              : isDark
                                ? "rgba(255,255,255,0.75)"
                                : "rgba(71,85,105,0.9)",
                        }}
                        onMouseEnter={(e) => {
                          if (currentLang.code !== lang.code) {
                            e.currentTarget.style.background = isDark
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(15,23,42,0.04)";
                            e.currentTarget.style.color = isDark
                              ? "#ffffff"
                              : "#0F172A";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentLang.code !== lang.code) {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = isDark
                              ? "rgba(255,255,255,0.75)"
                              : "rgba(71,85,105,0.9)";
                          }
                        }}
                      >
                        <span className="text-base">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login / Dashboard button */}
            <motion.a
              href={ctaHref}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 30px rgba(0,201,167,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="px-5 py-2.5 rounded-full text-white font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #00C9A7, #00E5FF)",
                boxShadow: "0 0 16px rgba(0,201,167,0.3)",
              }}
            >
              {ctaLabel}
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isDark
                ? "text-white hover:bg-white/10"
                : "text-slate-900 hover:bg-slate-900/5"
            }`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
            style={{
              background: isDark
                ? "rgba(10, 15, 30, 0.97)"
                : "rgba(255, 255, 255, 0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderTop: isDark
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(15,23,42,0.08)",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                      isDark
                        ? "text-white/80 hover:text-white hover:bg-white/5"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/5"
                    }`}
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-3 flex flex-col gap-3"
              >
                {/* Theme toggle row */}
                <div className="flex items-center justify-between px-1">
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    {mode === "dark"
                      ? t("theme.darkMode")
                      : t("theme.lightMode")}
                  </span>
                  <button
                    dir="ltr"
                    onClick={toggleTheme}
                    className="relative flex items-center bg-white rounded-full p-1 border border-gray-200 w-[72px] shrink-0"
                  >
                    <div
                      className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-[#002d25] transition-all duration-300 ${
                        mode === "dark" ? "translate-x-0" : "translate-x-8"
                      }`}
                    />
                    <div className="w-8 h-8 flex items-center justify-center z-10">
                      <Moon
                        size={16}
                        className={
                          mode === "dark" ? "text-white" : "text-[#002d25]"
                        }
                      />
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center z-10">
                      <Sun
                        size={16}
                        className={
                          mode === "light" ? "text-white" : "text-[#002d25]"
                        }
                      />
                    </div>
                  </button>
                </div>

                <Link
                  href={ctaHref}
                  className="block py-3.5 rounded-xl text-white font-semibold text-center text-sm"
                  style={{
                    background: "linear-gradient(135deg, #00C9A7, #00E5FF)",
                  }}
                >
                  {ctaLabel}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
