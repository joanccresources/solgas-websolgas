"use client";
import GeneralCard from "./card";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Iconify } from "@/components";
import tailwindConfig from "@root/tailwind.config";
import { useMediaQuery } from "react-responsive";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];

export interface ItemCarousel {
  id: string;
  titulo: {
    name: string;
    type: string;
    value_format: string;
    value: string;
  };
  descripcion: {
    name: string;
    type: string;
    value_format: string;
    value: string;
  };
  ubicacion: {
    name: string;
    type: string;
    value_format: string;
    value: string;
  };
  imagen_usuario: {
    name: string;
    value_format: string;
  };
}
interface PropsCarousel {
  items: ItemCarousel[];
}

export default function CarouselHistory({ items }: PropsCarousel) {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1310 });
  const isTable = useMediaQuery({ minWidth: 800 });

  const result = isDesktopOrLaptop ? "center" : isTable ? "center" : "auto";

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free-snap",
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      origin: result,
      perView: "auto",
      spacing: 60,
    },
  });

  const onPrev = () => {
    instanceRef.current?.prev();
  };

  const onNext = () => {
    instanceRef.current?.next();
  };

  return (
    <>
      <div ref={sliderRef} className="keen-slider relative py-6 lg:px-0 px-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="keen-slider__slide h-[527px] lg:min-w-[846px] min-w-fit flex border border-border-history shadow-xl rounded-[48px]"
          >
            <GeneralCard
              image={item.imagen_usuario.value_format}
              title={item.titulo.value_format}
              description={item.descripcion.value_format}
              location={item.ubicacion.value_format}
            />
          </div>
        ))}
        {loaded && instanceRef.current ? (
          <>
            <button
              onClick={onPrev}
              className="bg-gray w-[39px] h-[39px] absolute top-1/2 left-[250px] rounded-full  justify-center items-center rotate-180 xl:flex hidden cursor-pointer"
            >
              <Iconify
                icon={"weui:arrow-outlined"}
                color={primaryOrange}
                height={24}
                width={24}
              />
            </button>
            <button
              onClick={onNext}
              className="bg-gray w-[39px] h-[39px] absolute top-1/2 right-[250px] rounded-full justify-center items-center xl:flex hidden cursor-pointer"
            >
              <Iconify
                icon={"weui:arrow-outlined"}
                color={primaryOrange}
                height={24}
                width={24}
              />
            </button>
          </>
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
