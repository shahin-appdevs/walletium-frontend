"use client";

import { Layout } from "antd";
import { useEffect, useState } from "react";

// import LayoutHeader from "./_components/homepage/Layouts/LayoutHeader";
// import LayoutSidebar from "./_components/homepage/Layouts/LayoutSidebar";

import dynamic from "next/dynamic";
import { token } from "@/lib/token";
import { getUser } from "@/lib/user";
import { Protected } from "../(auth)/_components/Protected";
import LayoutSidebarSkeleton from "./_components/homepage/Layouts/LayoutSidebarSkeleton";
import LayoutHeaderSkeleton from "./_components/homepage/Layouts/LayoutHeaderSkeleton";
import DashboardProvider from "@/contexts/DashboardProvider";
import { AppProviders } from "@/components/providers/AppProviders";

const LayoutSidebar = dynamic(
  () => import("./_components/homepage/Layouts/LayoutSidebar"),
  {
    // ssr: false,
    loading: () => <LayoutSidebarSkeleton />,
  },
);

const LayoutHeader = dynamic(
  () => import("./_components/homepage/Layouts/LayoutHeader"),
  {
    // ssr: false,
    loading: () => <LayoutHeaderSkeleton />,
  },
);

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    getUser()
      .then((data) => data)
      .catch(() => token.remove())
      .finally(() => {});
  }, []);

  // Sidebar is `position: fixed` on lg+ screens — push the content column
  // right by the sidebar's width when it's expanded so they don't overlap.
  // On mobile the sidebar is rendered as a drawer (no fixed column), so no
  // offset is needed.
  const sidebarOffset = collapsed ? 0 : 252;

  return (
    <AppProviders>
      <Protected>
        <DashboardProvider>
          <Layout style={{ minHeight: "100vh" }}>
            <LayoutSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout
              className="lg:ms-(--sidebar-offset)"
              style={{
                "--sidebar-offset": `${sidebarOffset}px`,
                transition: "margin-inline-start 0.2s",
              }}
            >
              <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />

              {/* Main content */}
              <Content
                style={{
                  margin: "24px 16px",
                  // padding: 24,
                  // background: "#fff",
                  overflow: "hidden",
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </DashboardProvider>
      </Protected>
    </AppProviders>
  );
}
