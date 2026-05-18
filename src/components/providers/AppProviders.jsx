"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ToastContainer } from "react-toastify";
import ReduxStoreProvider from "@/redux/provider/ReduxStoreProvider";
import { AntdThemeBridge } from "@/contexts/AntdThemeBridge";

import "@/app/[locale]/styles/antd.css";

export function AppProviders({ children }) {
  return (
    <ReduxStoreProvider>
      <AntdRegistry>
        <AntdThemeBridge>
          {children}
          <ToastContainer />
        </AntdThemeBridge>
      </AntdRegistry>
    </ReduxStoreProvider>
  );
}
