"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import useToggleShow from "@/hooks/useToggleShow";
import LucideIcon from "@/components/LucideIcon";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

const cardImage = "/images/partials/card.png";

export default function VirtualCardSlider() {
  const { toggleShow, setToggleShow } = useToggleShow();

  const cards = [
    {
      name: "TOMSON MARTON",
      number: "1247 **** 0000 8471",
      valid: "12/36",
      bg: "from-blue-900 to-blue-700",
    },
    {
      name: "TOMSON MARTON",
      number: "1247 **** 0000 8471",
      valid: "12/36",
      bg: "from-purple-700 to-purple-500",
    },
    {
      name: "TOMSON MARTON",
      number: "1247 **** 0000 8471",
      valid: "12/36",
      bg: "from-green-700 to-green-500",
    },
  ];

  return (
    <div className="  p-5 rounded-xl bg-white dark:bg-slate-900 shadow-xs ">
      <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
        My Virtual Card
      </h3>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1.3}
        centeredSlides={true}
        className="pb-8"
      >
        {cards.map((card, i) => (
          <SwiperSlide key={i}>
            <Image src={cardImage} alt="Image" height={300} width={500} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Balance Section */}
      <div className="flex justify-between items-center mt-5">
        <div>
          <p className="text-gray-500 text-sm">Total Balance</p>
          <p className="text-2xl font-bold">
            {" "}
            {toggleShow ? "$98,000" : "********"}
          </p>
        </div>

        <button
          onClick={() => setToggleShow(!toggleShow)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
        >
          <LucideIcon
            name={toggleShow ? "EyeOff" : "Eye"}
            className="w-5 h-5 text-gray-500 dark:text-neutral-300"
          />
        </button>

        <PrimaryButton
          icon="ArrowUpRight"
          className={"text-sm font-normal!"}
          iconClassName={
            "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
          }
        >
          Card Top Up
        </PrimaryButton>
      </div>
    </div>
  );
}
