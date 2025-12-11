"use client";
import { Layout } from "antd";
import { useState } from "react";

// import LayoutHeader from "./_components/homepage/Layouts/LayoutHeader";
// import LayoutSidebar from "./_components/homepage/Layouts/LayoutSidebar";

import dynamic from "next/dynamic";

const LayoutSidebar = dynamic(
  () => import("./_components/homepage/Layouts/LayoutSidebar"),
  {
    ssr: false,
  }
);
const LayoutHeader = dynamic(
  () => import("./_components/homepage/Layouts/LayoutHeader"),
  {
    ssr: false,
  }
);

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <LayoutSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main content */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            // background: "#fff",
            overflow: "hidden",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
