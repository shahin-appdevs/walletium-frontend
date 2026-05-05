"use client";
import React from "react";
import Stats from "../_components/homepage/Stats";
import TransactionOverview from "../_components/homepage/TransactionOverview/TransactionOverview";
import TransactionHistory from "../_components/homepage/TransactionHistory/TransactionHistory";
import VirtualCardSlider from "../_components/homepage/VirtualCardSlider/VirtualCardSlider";
import { useTranslations } from "next-intl";
import AdSliders from "../_components/homepage/AdSliders/AdSliders";

const DashboardHome = () => {
  const t = useTranslations("Dashboard.home");
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:grid-6">
        <div className="col-span-1 xl:col-span-2">
          <Stats t={t} />
        </div>
        <div className="col-span-1 xl:col-span-1">
          <div className="space-y-4 lg:space-y-4">
            <AdSliders />
            <VirtualCardSlider />
          </div>
        </div>
      </div>
      <TransactionOverview />
      <TransactionHistory />
    </div>
  );
};

export default DashboardHome;
