"use client";
import GeneralCard from "./card";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { chunk } from "lodash";
import { Key } from "react";

const Carousel = dynamic(() => import("@/components/carousel"), { ssr: false });

export interface ItemCarouselBenefit {
  id: string;
  title: {
    value: string;
  };
  descripcion: {
    name: string;
    type: string;
    value_format: string;
    value: string;
  };
  imagen: {
    name: string;
    value_format: string;
  };
}
interface PropsCarouselBenefit {
  items: ItemCarouselBenefit[];
  classNameDescription?: string;
  classNamePaddingTop?: string;
  desktopQuantity?: number;
  responsiveCard?: boolean;
}

export default function CarouselBenefit({
  items,
  classNameDescription,
  classNamePaddingTop,
  desktopQuantity = 4,
  responsiveCard = false,
}: PropsCarouselBenefit) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1310 });
  const isTable = useMediaQuery({ minWidth: 800 });
  const dataCarousel = items.map((item, index) => {
    return {
      ...item,
      id: String(index),
    };
  });

  if (isDesktopOrLaptop) {
    const chunks = chunk(dataCarousel, desktopQuantity);

    return (
      <Carousel
        items={chunks}
        renderItem={(item: unknown) => {
          const carouselItem = item as ItemCarouselBenefit;
          if (carouselItem.id === "a" || carouselItem.id === "b") return <></>;
          return (
            <div className="flex w-full justify-center gap-x-6">
              {(item as ItemCarouselBenefit[]).map(
                (el: {
                  title: { value: string };
                  id: Key | null | undefined;
                  imagen: { value_format: string };
                  descripcion: { value: string };
                }) => (
                  <GeneralCard
                    key={el.id}
                    image={el.imagen.value_format}
                    text={el.descripcion.value}
                    title={el?.title ? el.title.value : ""}
                    classNameDescription={classNameDescription}
                    classNamePaddingTop={classNamePaddingTop}
                  />
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
  const result = isDesktopOrLaptop ? desktopQuantity : isTable ? 2 : 1;

  return (
    <>
      <Carousel
        items={dataCarousel}
        renderItem={(item: unknown) => {
          const carouselItem = item as ItemCarouselBenefit;
          if (carouselItem.id === "a" || carouselItem.id === "b") return <></>;
          return (
            <GeneralCard
              key={carouselItem.id}
              image={carouselItem.imagen.value_format}
              text={carouselItem.descripcion.value}
              title={carouselItem?.title ? carouselItem.title.value : ""}
              classNameDescription={classNameDescription}
              classNamePaddingTop={classNamePaddingTop}
              responsiveCard={responsiveCard}
            />
          );
        }}
        slidesPerPage={result}
        slidesPerMove={result}
      />
    </>
  );
}
