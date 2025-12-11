import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const cardImage = "/images/partials/card.png";

export default function VirtualCardSlider() {
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
    <div className="  p-5 rounded-xl bg-white dark:bg-slate-900 shadow-sm ">
      <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
        My Virtual Card
      </h2>

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
          <p className="text-2xl font-bold">$259.75</p>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
          <EyeInvisibleOutlined />
        </button>

        <button className="flex items-center gap-2 font-bold text-base lg:text-lg bg-linear-to-r from-[#0EBE98] to-[#50C631] text-white px-5 py-2 rounded-xl hover:bg-green-600 transition">
          Card Top Up
        </button>
      </div>
    </div>
  );
}
