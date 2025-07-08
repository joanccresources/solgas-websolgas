"use client";
import { BannerSlide } from "./slide";
import { useState, useEffect, useRef } from "react";
import { Iconify } from "@/components";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { cn } from "@/lib/utils";

export interface PropsBannerGeneral {
  id?: string
  title?:  string
  subTitle?:  string
  description?: string
  img:string
  img_sm:string
  titleChildren?: React.ReactNode;
  defaultTitleColors?: boolean;
}
interface PropsCarousel {
  items: PropsBannerGeneral[];
  height: string
}

export default function CarouselBanner({ items = [], height }: PropsCarousel){
  const swiperRef = useRef<SwiperRef>(null);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      swiperRef.current.swiper.params.navigation &&
      typeof swiperRef.current.swiper.params.navigation === "object"
    ) {
      swiperRef.current.swiper.params.navigation.prevEl = ".custom-prev";
      swiperRef.current.swiper.params.navigation.nextEl = ".custom-next";
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
      setNavReady(true);
    }
  }, []);

  const swiperClass = cn( "banner:h-[400px]", `${height}`)
  return (
    <div className="relative">
      <Swiper 
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={
          navReady ? { prevEl: ".custom-prev", nextEl: ".custom-next" } : false
        }
        modules={[Autoplay, Pagination, Navigation]}
        className={swiperClass} 
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <BannerSlide
              item={item}
              height={height}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {items.length > 1 ? (
        <>
          <button
            className="custom-prev rotate-180 absolute top-1/2 left-[24px] -translate-y-1/2 z-10 bg-black/30 banner:w-[24px] w-[34px] 
        banner:h-[24px] h-[34px] rounded-full justify-center items-center flex cursor-pointer border border-white
        transition-opacity duration-300 swiper-button-disabled:!opacity-50"
          >
            <Iconify
              icon="weui:arrow-outlined"
              color="white"
              height={24}
              width={24}
            />
          </button>

          <button
            className="custom-next absolute top-1/2 right-[24px] -translate-y-1/2 z-10 bg-black/30 banner:w-[24px] w-[34px] 
        banner:h-[24px] h-[34px] rounded-full justify-center items-center flex cursor-pointer border border-white
        transition-opacity duration-300 swiper-button-disabled:!opacity-50"
          >
            <Iconify
              icon="weui:arrow-outlined"
              color="white"
              height={24}
              width={24}
            />
          </button>
        </>
      ) : null}
    </div>
  );
};
