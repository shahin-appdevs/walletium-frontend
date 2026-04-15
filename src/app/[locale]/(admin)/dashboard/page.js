"use client";
import React from "react";
import Stats from "../_components/homepage/Stats";
import TransactionOverview from "../_components/homepage/TransactionOverview/TransactionOverview";
import TransactionHistory from "../_components/homepage/TransactionHistory/TransactionHistory";
import VirtualCardSlider from "../_components/homepage/VirtualCardSlider/VirtualCardSlider";

const DashboardHome = () => {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4 lg:grid-6">
        <div className="col-span-1 2xl:col-span-2">
          <Stats />

          {/* <LatestTransactions /> */}
        </div>
        <div className="2xl:col-span-1 hidden 2xl:block">
          <div>
            {/* <AdSliders /> */}
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
