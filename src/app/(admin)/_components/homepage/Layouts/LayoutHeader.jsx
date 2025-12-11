"use client";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Image from "next/image";
import LucideIcon from "@/components/LucideIcon";
import { Header } from "antd/es/layout/layout";
import ProfileDropdown from "../../header/ProfileDropdown";
import { useTheme } from "@/contexts/ThemeContextProvider";

const LayoutHeader = ({ collapsed, setCollapsed }) => {
  const [theme, setTheme] = useState("light");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { mode, toggleTheme } = useTheme();

  // useEffect(() => {
  //   toggleTheme();
  // }, [theme, toggleTheme]);

  return (
    <Header
      style={{
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        background: mode === "dark" ? "oklch(20.8% 0.042 265.755)" : "#fff",
        // boxShadow: "0 2px 8px #f0f1f2",
        position: "sticky",
        top: "0",
        zIndex: "30",
      }}
    >
      {collapsed ? (
        <MenuUnfoldOutlined
          className="trigger"
          onClick={() => setCollapsed(false)}
          style={{ fontSize: 20, cursor: "pointer" }}
        />
      ) : (
        <MenuFoldOutlined
          className="trigger"
          onClick={() => setCollapsed(true)}
          style={{ fontSize: 20, cursor: "pointer" }}
        />
      )}
      {/* <h2 style={{ marginLeft: 16, marginBottom: 0 }}>Dashboard</h2> */}
      <div className="lg:px-4  w-full!">
        <div className="flex items-center justify-between! ">
          <div className="lg:hidden"></div>
          <div className="hidden lg:block">
            <span className="text-neutral-800 dark:text-white ">
              Welcome Back,
            </span>
            <span className="ms-2">Md. Shahin Hossain</span>
          </div>

          <div>
            <div className="flex items-center gap-6 bg-transparent p-4">
              {/* Theme Switch */}
              <button
                onClick={() => toggleTheme()}
                className="flex items-center bg-white rounded-full px-1 py-1 shadow-sm border border-gray-200 transition"
              >
                {/* Moon */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
                    mode === "dark"
                      ? "bg-[#002d25] text-white"
                      : "text-[#002d25]"
                  }`}
                >
                  <LucideIcon name="Moon" size={20} />
                </div>

                {/* Sun */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
                    mode === "light"
                      ? "bg-[#002d25] text-white"
                      : "text-[#002d25]"
                  }`}
                >
                  <LucideIcon name="Sun" size={20} />
                </div>
              </button>

              {/* Globe */}
              <LucideIcon
                name="Globe"
                className="text-[#002d25] dark:text-white cursor-pointer hover:opacity-70 transition"
                size={24}
              />

              {/* Notification with dot */}
              <div className="relative cursor-pointer">
                <LucideIcon
                  name="Bell"
                  className="text-[#002d25] dark:text-white hover:opacity-70 transition"
                  size={24}
                />
                <span className="w-3 h-3 rounded-full bg-green-500 absolute -top-1 -right-1 border-2 border-white"></span>
              </div>

              {/* Avatar */}
              <div className="group/profile relative ">
                <Image
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  src="https://i.pravatar.cc/60"
                  alt="User"
                  height={100}
                  width={100}
                  className="h-[35px] w-[35px] rounded-full object-cover "
                />
                <div className="hidden group-hover/profile:lg:block absolute top-8 right-0 z-30 py-4">
                  <ProfileDropdown />
                </div>
                {showProfileDropdown && (
                  <div className="lg:hidden absolute top-8 right-0 z-30 py-4">
                    <ProfileDropdown />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default LayoutHeader;
