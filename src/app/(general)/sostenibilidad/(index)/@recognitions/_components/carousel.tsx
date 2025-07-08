"use client";
import dynamic from "next/dynamic";
import { chunk } from "lodash";
import { RecognitionImage } from "./image";
import { Key } from "react";
import { ElementType } from "@/utils/format";

const Carousel = dynamic(() => import("@/components/carousel"), { ssr: false });

export interface ItemCarousel {
  id: Key | null | undefined;
  imagen: { value_format: string };
}

export default function ImageCarousel({
  items,
  setIndex,
  setIsOpen,
}: {
  items: {
    [key: string]: ElementType;
  }[];
  setIsOpen: (value: boolean) => void;
  setIndex: (value: number) => void;
}) {
  const dataCarousel = items.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });

  const chunks = chunk(dataCarousel, 1);

  return (
    <Carousel
      hasNavigationButtons={false}
      items={chunks}
      renderItem={(item: unknown) => {
        const carouselItem = item as ItemCarousel;
        if (carouselItem.id === "a" || carouselItem.id === "b") return <></>;
        return (
          <div className="flex justify-center">
            {(item as ItemCarousel[]).map(
              (
                el: {
                  id: Key | null | undefined;
                  imagen: { value_format: string };
                },
                index: number
              ) => (
                <RecognitionImage
                  key={el.id}
                  src={el?.imagen?.value_format}
                  alt={`Reconocimiento ${el?.id}`}
                  setIndex={() => setIndex(index)}
                  setIsOpen={setIsOpen}
                  index={el.id as number}
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
