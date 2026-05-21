"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

const ThemeContext = createContext({ mode: "light", toggleTheme: () => {} });

const THEME_CHANGE_EVENT = "walletium-theme-change";
const THEME_COOKIE = "theme";

function writeCookie(value) {
  // 1 year, root path, lax — readable by the server layout to avoid FOUC.
  document.cookie = `${THEME_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
}

function getClientSnapshot() {
  const stored = localStorage.getItem("theme");
  return stored === "dark" ? "dark" : "light";
}

function getServerSnapshot() {
  return "light";
}

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

export function ThemeProvider({ children }) {
  // useSyncExternalStore returns the server snapshot during SSR + first client
  // render, so server HTML and the first client render match — no hydration
  // mismatch. After hydration React re-renders with the real localStorage value.
  const mode = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  // Mirror the current mode onto <html> so Tailwind's `dark:` variants apply.
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  // Sync existing localStorage theme into the cookie on mount so the server
  // layout can pick it up on the next request and SSR with the right class.
  useEffect(() => {
    writeCookie(getClientSnapshot());
  }, []);

  const toggleTheme = useCallback(() => {
    const next = getClientSnapshot() === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    writeCookie(next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
