"use client";

import LucideIcon from "@/components/LucideIcon";
import CurrencyCard from "./StatsCard";
import useToggleShow from "@/hooks/useToggleShow";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import StatsSkeleton from "./StatsSkeleton";
import { useEffect, useState } from "react";
import { useDashboardContext } from "@/contexts/DashboardProvider";
import { useRouter } from "next/navigation";

const Stats = ({ t }) => {
  const { toggleShow, setToggleShow } = useToggleShow();
  const [showSidebar, setShowSidebar] = useState(true);
  const { wallets } = useDashboardContext();
  const router = useRouter();

  // show sidebar skeleton condition
  useEffect(() => {
    const timer = setTimeout(() => setShowSidebar(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSidebar ? (
        <StatsSkeleton />
      ) : (
        <div>
          <div className="w-full flex flex-col md:flex-row items-center justify-between pb-4 lg:pb-6">
            {/* Left Section */}
            <div className="flex items-center gap-4 mb-4">
              <div>
                <p className="text-muted text-base font-medium ">
                  {t("totalWalletBalance")}
                </p>
                <h2 className="text-2xl font-bold text-title" dir="ltr">
                  {toggleShow ? "$98,000.00" : "********"}
                </h2>
              </div>
              <button
                onClick={() => setToggleShow(!toggleShow)}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <LucideIcon
                  name={toggleShow ? "EyeOff" : "Eye"}
                  className="w-5 h-5 text-gray-500 dark:text-neutral-300"
                />
              </button>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/dashboard/add-money")}
                className="flex items-center gap-2 bg-green-950 text-white px-5 py-2 rounded-xl hover:bg-green-900 transition"
              >
                {t("addMoney")} <LucideIcon name={"Plus"} className="w-4 h-4" />
              </button>

              <PrimaryButton
                icon="ArrowUpRight"
                className={"text-sm font-normal!"}
                onClick={() => router.push("/dashboard/send-money")}
                iconClassName={
                  "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1"
                }
              >
                {t("sendMoney")}
              </PrimaryButton>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {wallets?.map((item, index) => (
              <CurrencyCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Stats;
