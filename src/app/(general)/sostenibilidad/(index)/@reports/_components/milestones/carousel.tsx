"use client";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { chunk } from "lodash";
import { Key, useEffect, useState } from "react";
import Image from "next/image";

const Carousel = dynamic(() => import("@/components/carousel"), { ssr: false });

export interface ItemCarousel {
  id: string;
  image: string;
  image_format: string;
}
interface PropsCarouselImage {
  items: ItemCarousel[];
  setIsOpen: (value: boolean) => void;
  setIndex: (value: number) => void;
}

export default function CarouselImage({
  items = [],
  setIsOpen,
  setIndex,
}: PropsCarouselImage) {
  const min1440 = useMediaQuery({ minWidth: 1440 });
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 800 });
  const dataCarousel = items?.map((item, index) => {
    return {
      ...item,
      id: String(index),
    };
  });
  const [imageSize, setImageSize] = useState<number>(284);

  useEffect(() => {
    const initial = () => {
      const resultImageSize = min1440 ? 390 : 284;

      setImageSize(resultImageSize);
    };
    initial();
  }, [min1440]);

  if (isDesktopOrLaptop) {
    const chunks = chunk(dataCarousel, 4);

    if (chunks.length === 1) {
      return (
        <div className="flex w-full justify-center gap-x-2">
          {chunks[0].map(
            (
              el: {
                id: Key | null | undefined;
                image: string;
                image_format: string;
              },
              index: number
            ) => (
              <button
                key={el?.id}
                onClick={() => {
                  setIndex(index);
                  setIsOpen(true);
                }}
                className="cursor-pointer flex justify-center p-4 hover:scale-105 sm:hover:scale-125 transition-all duration-300 ease-in-out"
              >
                <Image
                  src={el?.image_format}
                  width={imageSize}
                  height={imageSize}
                  alt="Imagen de certificado"
                />
              </button>
            )
          )}
        </div>
      );
    }

    return (
      <Carousel
        hasNavigationButtons={false}
        items={chunks}
        renderItem={(item: unknown) => {
          const carouselItem = item as ItemCarousel;
          if (carouselItem.id === "a" || carouselItem.id === "b") return <></>;
          return (
            <div className="flex w-full justify-center gap-x-2">
              {(item as ItemCarousel[]).map(
                (
                  el: {
                    id: Key | null | undefined;
                    image: string;
                    image_format: string;
                  },
                  index: number
                ) => (
                  <button
                    key={el?.id}
                    onClick={() => {
                      setIndex(index);
                      setIsOpen(true);
                    }}
                    className="cursor-pointer flex justify-center p-4 hover:scale-105 sm:hover:scale-125 transition-all duration-300 ease-in-out"
                  >
                    <Image
                      src={el?.image_format}
                      width={imageSize}
                      height={imageSize}
                      alt="Imagen de certificado"
                    />
                  </button>
                )
              )}
            </div>
          );
        }}
        slidesPerPage={1}
        slidesPerMove={1}
      />
    );
  }
  const result = isDesktopOrLaptop ? 4 : isTablet ? 2 : 1;

  return (
    <>
      <Carousel
        items={dataCarousel}
        renderItem={(item: unknown) => {
          const carouselItem = item as ItemCarousel;
          if (carouselItem.id === "a" || carouselItem.id === "b") return <></>;
          return (
            <button
              onClick={() => {
                setIndex(Number(carouselItem.id));
                setIsOpen(true);
              }}
              className="cursor-pointer flex justify-center w-[284px] mx-auto p-4 hover:scale-110 sm:hover:scale-125 transition-all duration-300 ease-in-out"
            >
              <Image
                src={carouselItem?.image_format}
                width={imageSize}
                height={imageSize}
                alt="Imagen de certificado"
              />
            </button>
          );
        }}
        slidesPerPage={result}
        slidesPerMove={result}
      />
    </>
  );
}
