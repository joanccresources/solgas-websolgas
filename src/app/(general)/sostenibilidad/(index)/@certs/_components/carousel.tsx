"use client";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { chunk } from "lodash";
import { Key } from "react";
import Image from "next/image";

const Carousel = dynamic(() => import("@/components/carousel"), { ssr: false });

export interface ItemCarousel {
  id: string;
  imagen: {
    name: string;
    value_format: string;
  };
}
interface PropsCarouselImage {
  items: ItemCarousel[];
}

export default function CarouselImage({ items }: PropsCarouselImage) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 800 });
  const dataCarousel = items.map((item, index) => {
    return {
      ...item,
      id: String(index),
    };
  });

  if (isDesktopOrLaptop) {
    const chunks = chunk(dataCarousel, 3);

    return (
      <Carousel
        items={chunks}
        renderItem={(item: unknown) => {
          const carouselItem = item as ItemCarousel;
          if (carouselItem.id === "a" || carouselItem.id === "b") return <></>;
          return (
            <div className="flex w-full justify-center gap-x-6">
              {(item as ItemCarousel[]).map(
                (el: {
                  id: Key | null | undefined;
                  imagen: { value_format: string };
                }) => (
                  <div className="flex justify-center" key={el?.id}>
                    <Image
                      src={el?.imagen?.value_format}
                      width={241}
                      height={131}
                      alt="Imagen de certificado"
                    />
                  </div>
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
  const result = isDesktopOrLaptop ? 3 : isTablet ? 2 : 1;

  return (
    <>
      <Carousel
        items={dataCarousel}
        renderItem={(item: unknown) => {
          const carouselItem = item as ItemCarousel;
          if (carouselItem.id === "a" || carouselItem.id === "b") return <></>;
          return (
            <div className="flex justify-center w-[241px] mx-auto">
              <Image
                src={carouselItem?.imagen?.value_format}
                width={241}
                height={131}
                alt="Imagen de certificado"
              />
            </div>
          );
        }}
        slidesPerPage={result}
        slidesPerMove={result}
      />
    </>
  );
}
