"use client";
import React, { useEffect, useState } from "react";
import LucideIcon from "@/components/LucideIcon";
import CurrencyCard from "./StatsCard";
import useToggleShow from "@/hooks/useToggleShow";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

const Stats = () => {
  const { toggleShow, setToggleShow } = useToggleShow();

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-center justify-between pb-4 lg:pb-6">
        {/* Left Section */}
        <div className="flex items-center gap-4 mb-4">
          <div>
            <p className="text-muted text-base font-medium ">
              Total Wallet Balance
            </p>
            <h2 className="text-2xl font-bold text-title">
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
          <button className="flex items-center gap-2 bg-green-950 text-white px-5 py-2 rounded-xl hover:bg-green-900 transition">
            Add Money <LucideIcon name={"Plus"} className="w-4 h-4" />
          </button>

          <PrimaryButton
            icon="ArrowUpRight"
            className={"text-sm font-normal!"}
            iconClassName={
              "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
            }
          >
            Send Money
          </PrimaryButton>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {currencyData.map((item, index) => (
          <CurrencyCard
            key={index}
            icon={item.icon}
            name={item.name}
            amount={item.amount}
            bg={item.bg}
            iconBg={item.iconBg}
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;

export const currencyData = [
  {
    name: "United States Dollar",
    amount: "$910,000.00",
    icon: "/icons/dollar.png",
    bg: "bg-blue-300",
    iconBg: "bg-blue-200",
  },
  {
    name: "Bangladeshi Taka",
    amount: "৳1,88,000.00",
    icon: "/icons/taka.png", // best match for BDT
    bg: "bg-purple-300",
    iconBg: "bg-purple-200",
  },
  {
    name: "Indian Rupee",
    amount: "₹50,000.00",
    icon: "/icons/taka.png",
    bg: "bg-sky-300",
    iconBg: "bg-sky-200",
  },
  {
    name: "Pakistani Rupee",
    amount: "₨70,000.00",
    icon: "/icons/taka.png", // general currency icon
    bg: "bg-green-300",
    iconBg: "bg-green-200",
  },
  {
    name: "British Pound",
    amount: "£10,000.00",
    icon: "/icons/taka.png",
    bg: "bg-pink-300",
    iconBg: "bg-pink-200",
  },
  {
    name: "British Pound",
    amount: "£10,000.00",
    icon: "/icons/taka.png",
    bg: "bg-pink-300",
    iconBg: "bg-pink-200",
  },
  {
    name: "British Pound",
    amount: "£10,000.00",
    icon: "/icons/taka.png",
    bg: "bg-pink-300",
    iconBg: "bg-pink-200",
  },
  {
    name: "British Pound",
    amount: "£10,000.00",
    icon: "/icons/taka.png",
    bg: "bg-pink-300",
    iconBg: "bg-pink-200",
  },
  {
    name: "British Pound",
    amount: "£10,000.00",
    icon: "/icons/taka.png",
    bg: "bg-pink-300",
    iconBg: "bg-pink-200",
  },
  {
    name: "British Pound",
    amount: "£10,000.00",
    icon: "/icons/taka.png",
    bg: "bg-pink-300",
    iconBg: "bg-pink-200",
  },
];
