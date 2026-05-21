"use client";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import Image from "next/image";
import LucideIcon from "@/components/LucideIcon";
import { Header } from "antd/es/layout/layout";
import ProfileDropdown from "../../header/ProfileDropdown";
import { useTheme } from "@/contexts/ThemeContextProvider";
import useDrawer from "@/hooks/useDrawer";
import LayoutMobileSidebar from "./LayoutModileSidebar";
import NotificationPopup from "../../header/NotificationPopup";
import { useDashboardContext } from "@/contexts/DashboardProvider";
import { getImageUrl } from "@/utils/getImageUrl";
import LanguageSwitcher from "@/components/partials/LanguageSwitcher";
import { useTranslations } from "next-intl";

const LayoutHeader = ({ collapsed, setCollapsed }) => {
  const t = useTranslations("Dashboard.header");

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { mode, toggleTheme } = useTheme();
  const { isDrawerOpen, handleDrawerOpen, handleDrawerClose } = useDrawer();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { dashboardData, userInfo } = useDashboardContext();

  const profileImagePaths = dashboardData?.profile_image_paths;
  const profileImage = dashboardData?.user_info?.image;
  const profileImageUrl = profileImage
    ? getImageUrl(`${profileImagePaths?.path_location}/${profileImage}`)
    : getImageUrl(profileImagePaths?.default_image);

  return (
    <>
      <Header
        className="bg-white! dark:bg-slate-900!"
        style={{
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: "0",
          zIndex: "30",
        }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined
            className="trigger hidden! lg:block! rtl:rotate-180!"
            onClick={() => setCollapsed(false)}
            // onClick={() => handleDrawerOpen(false)}
            style={{ fontSize: 20, cursor: "pointer" }}
          />
        ) : (
          <MenuFoldOutlined
            className="trigger hidden! lg:block! rtl:rotate-180!"
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
          <div className="flex items-center justify-between!">
            <div className="lg:hidden"></div>
            <div className="hidden lg:block">
              <span className="text-neutral-800 dark:text-white">
                {t("welcomeText")},
              </span>
              <span className="ms-2">{userInfo?.fullname}</span>
            </div>

            <div>
              <div className="flex items-center gap-6 bg-transparent p-4">
                {/* Theme Switch */}
                <button
                  dir="ltr"
                  onClick={toggleTheme}
                  className="relative flex items-center bg-white dark:bg-neutral-800 rounded-full p-1 border border-gray-200 dark:border-neutral-700 w-[72px] shrink-0 transition-colors duration-300"
                  title={
                    mode === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                >
                  {/* Sliding Background */}
                  <div
                    className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-[#002d25] dark:bg-primary-500 transition-all duration-300 ${
                      mode === "dark" ? "translate-x-0" : "translate-x-8"
                    }`}
                  />

                  {/* Moon */}
                  <div className="w-8 h-8 flex items-center justify-center z-10">
                    <LucideIcon
                      name="Moon"
                      size={16}
                      className={`transition-colors duration-300 ${
                        mode === "dark" ? "text-white" : "text-[#002d25]"
                      }`}
                    />
                  </div>

                  {/* Sun */}
                  <div className="w-8 h-8 flex items-center justify-center z-10">
                    <LucideIcon
                      name="Sun"
                      size={16}
                      className={`transition-colors duration-300 ${
                        mode === "light" ? "text-white" : "text-neutral-400"
                      }`}
                    />
                  </div>
                </button>

                {/* Globe */}

                <LanguageSwitcher />

                {/* Notification with dot */}
                <div className="group/notification relative cursor-pointer ">
                  <LucideIcon
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    name="Bell"
                    className="text-[#002d25] dark:text-white hover:opacity-70 transition"
                    size={24}
                  />
                  <span className="w-3 h-3 rounded-full bg-green-500 absolute -top-1 -right-1 border-2 border-white"></span>

                  <div className="translate-y-10  opacity-0 group-hover/notification:lg:translate-y-0 group-hover/notification:lg:opacity-100 group-hover/notification:lg:visible invisible duration-300 absolute top-6 ltr:-right-2 rtl:left-2 z-30 py-5">
                    <NotificationPopup />
                  </div>
                  {notificationOpen && (
                    <div className="lg:hidden absolute top-8 ltr:-right-18 rtl:left-0 z-30 py-4">
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
                {profileImageUrl && (
                  <div className="group/profile relative  p-2 rounded-lg border-black/10 dark:border-white/10">
                    <Image
                      onClick={() =>
                        setShowProfileDropdown(!showProfileDropdown)
                      }
                      src={profileImageUrl}
                      alt="User"
                      height={100}
                      width={100}
                      className="h-[35px] w-[35px] rounded-full object-cover"
                    />
                    <div className="translate-y-10  opacity-0 group-hover/profile:lg:translate-y-0 group-hover/profile:lg:opacity-100 group-hover/profile:lg:visible invisible duration-300 absolute top-8 ltr:right-0 rtl:left-0 z-30 py-4">
                      <ProfileDropdown
                        userInfo={{ ...userInfo, image: profileImageUrl }}
                      />
                    </div>
                    {showProfileDropdown && (
                      <div className="lg:hidden absolute top-8 ltr:right-0 rtl:left-0 z-30 py-4">
                        <ProfileDropdown
                          userInfo={{ ...userInfo, image: profileImageUrl }}
                        />
                      </div>
                    )}
                  </div>
                )}
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
