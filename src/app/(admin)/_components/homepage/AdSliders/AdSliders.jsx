"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function AdSliders() {
  const slides = [
    {
      title: "Get 10% Cash Back",
      subtitle: "on Your next transaction",
    },
    {
      title: "Earn Rewards Instantly",
      subtitle: "Every time you transfer",
    },
    {
      title: "Low Fees",
      subtitle: "Best rates guaranteed",
    },
  ];

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {slides.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="w-full bg-[#022D25] rounded-2xl p-6 text-white h-40 flex flex-col justify-between">
            {/* Text */}
            <h2 className="text-2xl font-semibold leading-snug">
              {item.title} <br /> {item.subtitle}
            </h2>

            {/* Button */}
            <button className="mt-4 bg-white/10 text-white px-4 py-1.5 rounded-lg text-sm w-fit">
              Transfer Money
            </button>

            {/* Custom Pagination Dots (below card) */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
