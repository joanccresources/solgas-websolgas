"use client";

import { Iconify } from "@/components";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
interface PropsMultipleItems {
  items: unknown[];
  renderItem: (item: unknown) => React.ReactElement;
  slidesPerPage: number;
  slidesPerMove: number;
  className?: string;
  inViewThreshold?: number;
  hasNavigationButtons?: boolean;
}
import tailwindConfig from "@root/tailwind.config";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CarouselCustom({
  items,
  renderItem,
  hasNavigationButtons = true,
}: PropsMultipleItems) {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const onPrev = () => {
    instanceRef.current?.prev();
  };

  const onNext = () => {
    instanceRef.current?.next();
  };

  const btClassNamePrev = cn(
    "bg-gray w-[42px] h-[39px] rounded-full  justify-center items-center rotate-180 xl:flex hidden cursor-pointer",
    currentSlide !== 0 ? "bg-primary-orange" : "bg-gray"
  );

  const btClassNameNext = cn(
    "bg-gray w-[42px] h-[39px]  rounded-full justify-center items-center xl:flex hidden cursor-pointer",
    currentSlide + 1 !== items?.length ? "bg-primary-orange" : "bg-gray"
  );

  return (
    <>
      <div className="flex items-center justify-center gap-x-4 ">
        {hasNavigationButtons ? (
          <button onClick={onPrev} className={btClassNamePrev}>
            <Iconify
              icon={"weui:arrow-outlined"}
              color={currentSlide !== 0 ? "#FFFFFF" : primaryOrange}
              height={24}
              width={24}
            />
          </button>
        ) : null}
        <div ref={sliderRef} className="keen-slider">
          {items.map((item, index) => (
            <div key={index} className="keen-slider__slide">
              {renderItem(item)}
            </div>
          ))}
        </div>
        {hasNavigationButtons ? (
          <button onClick={onNext} className={btClassNameNext}>
            <Iconify
              icon={"weui:arrow-outlined"}
              color={
                currentSlide + 1 !== items?.length ? "#FFFFFF" : primaryOrange
              }
              height={24}
              width={24}
            />
          </button>
        ) : null}
      </div>
      {loaded && instanceRef.current && (
        <div className="flex justify-center items-center mt-8">
          {items.map((idx, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  instanceRef.current?.moveToIdx(index);
                }}
                className={
                  currentSlide === index
                    ? "carousel-active-navigation"
                    : "carousel-navigation"
                }
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}
