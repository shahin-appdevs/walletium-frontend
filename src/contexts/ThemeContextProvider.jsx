"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { ConfigProvider, theme } from "antd";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Sync Tailwind + Ant + LocalStorage
  useEffect(() => {
    localStorage.setItem("theme", mode);

    // Tailwind
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const toggleTheme = () => setMode(mode === "dark" ? "light" : "dark");

  const darkMode = mode === "dark";

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: darkMode
            ? {
                colorPrimary: "#0ebe98",
                colorBgContainer: "oklch(20.8% 0.042 265.755)",
              }
            : { colorPrimary: "#0ebe98" },
          components: {
            Menu: {
              itemSelectedBg: "#ffffff",
              darkItemSelectedBg: "oklch(20.8% 0.042 265.755)",
              itemSelectedColor: "#0ebe98",
              darkItemSelectedColor: "#0ebe98",
              fontSize: 16,
              subMenuItemBg: "#fff",
              darkSubMenuItemBg: "oklch(20.8% 0.042 265.755)",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
