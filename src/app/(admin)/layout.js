"use client";
import { Layout } from "antd";
import { useEffect, useState } from "react";

// import LayoutHeader from "./_components/homepage/Layouts/LayoutHeader";
// import LayoutSidebar from "./_components/homepage/Layouts/LayoutSidebar";

import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import { Protected } from "@/components/auth/Protected";
import { token } from "@/lib/token";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/user";

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
  const router = useRouter();

  useEffect(() => {
    if (!token.get()) {
      return router.replace("/login");
    }

    getUser()
      .then((data) => console.log(data))
      .catch(() => token.remove())
      .finally(() => {});
  }, []);

  return (
    // <Protected>
    <Layout style={{ minHeight: "100vh" }}>
      <LayoutSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
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
      {/* React Toast Container */}
      <ToastContainer />
    </Layout>
    // </Protected>
  );
}
