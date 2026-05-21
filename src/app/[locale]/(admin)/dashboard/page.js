"use client";
import React from "react";
import Stats from "../_components/homepage/Stats";
import TransactionOverview from "../_components/homepage/TransactionOverview/TransactionOverview";
import TransactionHistory from "../_components/homepage/TransactionHistory/TransactionHistory";
// import VirtualCardSlider from "../_components/homepage/VirtualCardSlider/VirtualCardSlider";
import { useTranslations } from "next-intl";
import { useDashboardContext } from "@/contexts/DashboardProvider";
// import AdSliders from "../_components/homepage/AdSliders/AdSliders";

const DashboardHome = () => {
  const t = useTranslations("Dashboard.home");
  const tHeader = useTranslations("Dashboard.header");
  const { userInfo } = useDashboardContext();

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Mobile/tablet welcome — desktop renders the same in LayoutHeader. */}
      <div className="lg:hidden">
        <p className="text-base sm:text-lg">
          <span className="text-neutral-800 dark:text-white">
            {tHeader("welcomeText")},
          </span>
          <span className="ms-2 font-semibold text-neutral-900 dark:text-white">
            {userInfo?.fullname}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 ">
        <div className="col-span-1 xl:col-span-3">
          <Stats t={t} />
        </div>
        {/* <div className="col-span-1 xl:col-span-1">
          <div className="space-y-4 lg:space-y-4">
            <AdSliders />
            <VirtualCardSlider />
          </div>
        </div> */}
      </div>
      <TransactionOverview />
      <TransactionHistory />
    </div>
  );
};

export default DashboardHome;
