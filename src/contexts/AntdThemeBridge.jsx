"use client";

import { ConfigProvider, theme } from "antd";
import { useTheme } from "@/contexts/ThemeContextProvider";

export function AntdThemeBridge({ children }) {
  const { mode } = useTheme();
  const darkMode = mode === "dark";

  return (
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
          Form: {
            fontSize: "clamp(14px, 1.2vw, 16px)",
          },
          Drawer: {
            colorBgElevated: "oklch(20.8% 0.042 265.755)",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
