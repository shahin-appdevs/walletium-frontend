import React from "react";
import MyCardStatsCard from "./MyCardStatsCard";
import { Card } from "antd";
import Link from "next/link";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

const MyCardStats = () => {
  const StatsCardExtra = (
    <div className="flex items-center gap-2 md:gap-0 ">
      <div className="md:w-full md:flex justify-end">
        <Link href={"/dashboard/my-card/create-new-card"}>
          <PrimaryButton
            icon={"Plus"}
            iconClassName={"group-hover/primary-btn:rotate-90 duration-200"}
          >
            <span className="hidden md:block">Create Card</span>
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <Card title="Card Statistics" extra={StatsCardExtra}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statisticsData?.map((item, index) => (
            <MyCardStatsCard
              key={index}
              icon={item.icon}
              name={item.name}
              value={item.value}
              bg={item.bg}
              iconColor={item.iconColor}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MyCardStats;

export const statisticsData = [
  {
    name: "Total Cards Balance",
    value: "648.80 USD",
    icon: "Banknote",
    bg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    name: "Total Cards",
    value: "42",
    icon: "GalleryVerticalEnd", // best match for BDT
    bg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    name: "Active Cards",
    value: "33",
    icon: "ShieldCheck",
    bg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    name: "Freeze Cards",
    value: "2",
    icon: "ShieldX", // general currency icon
    bg: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    name: "Card Transactions",
    value: "5.00 USD",
    icon: "ArrowRightLeft",
    bg: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
];
