"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSection({ autoPlay = true }) {
  const t = useTranslations("Testimonials");
  const swiperRef = useRef(null);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white dark:from-[#0A0F1E] dark:via-[#0D2137] dark:to-[#091829]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-60 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(14,190,152,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 text-primary-600 dark:text-primary-400">
            {t("kicker")}
          </span>
          <h2
            id="testimonials-title"
            className="font-serif font-black leading-tight mb-4 sm:mb-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-neutral-900 dark:text-white"
          >
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("subtitle")}
          </p>
        </motion.div>

        <div
          className="testimonials-carousel relative"
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() =>
            autoPlay && swiperRef.current?.autoplay?.start()
          }
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay, Keyboard, Navigation, Pagination]}
            slidesPerView={1}
            centeredSlides
            spaceBetween={20}
            loop
            keyboard={{ enabled: true }}
            autoplay={
              autoPlay
                ? { delay: 5000, disableOnInteraction: false }
                : false
            }
            pagination={{
              el: ".testimonials-pagination",
              clickable: true,
              bulletClass: "testimonial-bullet",
              bulletActiveClass: "testimonial-bullet-active",
            }}
            navigation={{
              prevEl: ".testimonials-prev",
              nextEl: ".testimonials-next",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="testimonials-swiper"
          >
            {TESTIMONIALS.map((item) => (
              <SwiperSlide key={item.id}>
                <article className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(14,190,152,0.28)] dark:hover:shadow-[0_18px_40px_-12px_rgba(14,190,152,0.35)]">
                  <Quote
                    size={44}
                    strokeWidth={1.6}
                    className="text-primary-500/80 dark:text-primary-400/70"
                    aria-hidden
                  />

                  <div className="flex justify-center mt-4">
                    <div className="relative w-20 h-20 rounded-full ring-4 ring-primary-100 dark:ring-primary-500/20 overflow-hidden">
                      <Image
                        src={item.avatar}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <blockquote className="mt-5 text-sm sm:text-base text-center italic leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {item.message}
                  </blockquote>

                  <div
                    className="flex justify-center gap-1 mt-4"
                    role="img"
                    aria-label={t("ratingLabel", { rating: item.rating })}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        strokeWidth={0}
                        className={
                          i < item.rating
                            ? "fill-primary-500 text-primary-500"
                            : "fill-neutral-200 text-neutral-200 dark:fill-neutral-700 dark:text-neutral-700"
                        }
                        aria-hidden
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-base sm:text-lg font-bold text-center text-neutral-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs sm:text-sm text-center text-neutral-500 dark:text-neutral-400">
                    {item.role}
                  </p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label={t("prevLabel")}
            className="testimonials-prev hidden md:flex absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 shadow-md hover:text-primary-500 hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label={t("nextLabel")}
            className="testimonials-next hidden md:flex absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 shadow-md hover:text-primary-500 hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div className="testimonials-pagination flex justify-center gap-2 mt-8" />
        </div>
      </div>

      <style>{`
        .testimonials-swiper { padding-bottom: 4px; }
        .testimonials-swiper .swiper-slide {
          height: auto;
          display: flex;
          opacity: 0.35;
          transform: scale(0.94);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .testimonials-swiper .swiper-slide > article { width: 100%; }
        .testimonials-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
        .testimonial-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(14, 190, 152, 0.25);
          cursor: pointer;
          transition: width 0.3s ease, background 0.3s ease;
        }
        .testimonial-bullet-active {
          width: 26px;
          background: #0ebe98;
        }
      `}</style>
    </section>
  );
}
