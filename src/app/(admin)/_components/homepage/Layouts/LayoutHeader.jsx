"use client";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Image from "next/image";
import LucideIcon from "@/components/LucideIcon";
import { Header } from "antd/es/layout/layout";
import ProfileDropdown from "../../header/ProfileDropdown";
import { useTheme } from "@/contexts/ThemeContextProvider";
import useDrawer from "@/hooks/useDrawer";
import LayoutMobileSidebar from "./LayoutModileSidebar";
import NotificationPopup from "../../header/NotificationPopup";

const LayoutHeader = ({ collapsed, setCollapsed }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { mode, toggleTheme } = useTheme();
  const { isDrawerOpen, handleDrawerOpen, handleDrawerClose } = useDrawer();
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <>
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
            className="trigger hidden! lg:block!"
            onClick={() => setCollapsed(false)}
            // onClick={() => handleDrawerOpen(false)}
            style={{ fontSize: 20, cursor: "pointer" }}
          />
        ) : (
          <MenuFoldOutlined
            className="trigger hidden! lg:block!"
            onClick={() => setCollapsed(true)}
            // onClick={() => handleDrawerOpen(true)}
            style={{ fontSize: 20, cursor: "pointer" }}
          />
        )}
        <MenuFoldOutlined
          className="trigger lg:hidden!"
          onClick={() => handleDrawerOpen()}
          style={{ fontSize: 20, cursor: "pointer" }}
        />
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
                <div className="group/notification relative cursor-pointer ">
                  <LucideIcon
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    name="Bell"
                    className="text-[#002d25] dark:text-white hover:opacity-70 transition"
                    size={24}
                  />
                  <span className="w-3 h-3 rounded-full bg-green-500 absolute -top-1 -right-1 border-2 border-white"></span>

                  <div className="translate-y-10  opacity-0 group-hover/notification:lg:translate-y-0 group-hover/notification:lg:opacity-100 group-hover/notification:lg:visible invisible duration-300 absolute top-6 -right-2 z-30 py-5">
                    <NotificationPopup />
                  </div>
                  {notificationOpen && (
                    <div className="lg:hidden absolute top-8 -right-18 z-30 py-4">
                      <NotificationPopup
                        onClose={() => setNotificationOpen(false)}
                      />
                    </div>
                  )}

                  {/* <div>
                    <NotificationPopup
                      onClose={() => setNotificationOpen(false)}
                    />
                  </div> */}

                  {/* {notificationOpen && (
                    <NotificationPopup
                      onClose={() => setNotificationOpen(false)}
                    />
                  )} */}
                </div>

                {/* Avatar */}
                <div className="group/profile relative">
                  <Image
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    src="https://i.pravatar.cc/60"
                    alt="User"
                    height={100}
                    width={100}
                    className="h-[35px] w-[35px] rounded-full object-cover"
                  />
                  <div className="translate-y-10  opacity-0 group-hover/profile:lg:translate-y-0 group-hover/profile:lg:opacity-100 group-hover/profile:lg:visible invisible duration-300 absolute top-8 right-0 z-30 py-4">
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
      <LayoutMobileSidebar
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </>
  );
};

export default LayoutHeader;
