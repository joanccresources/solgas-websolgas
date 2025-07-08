"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Line from "./line";
import { InphographicItemType } from "@/utils/format";
import BlueCard from "./card";
import { cn } from "@/lib/utils";

type SectionType = {
  background_image: string;
  elements: string[];
  card_position: string[];
  line_position: string[];
  base_image_size: [number, number];
  responsive_factor: number;
  items: InphographicItemType;
  reversed_cards_index?: number[];
  textClassName?: string;
  imageBaseClassName: string;
  has_markers?: boolean;
};

export default function BlueSectionContainer({
  background_image,
  elements,
  card_position,
  line_position,
  base_image_size,
  responsive_factor,
  items,
  reversed_cards_index = [],
  textClassName,
  imageBaseClassName,
}: SectionType) {
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [imageHeight, setImageHeight] = useState<number>(base_image_size[1]);
  const [imageWidth, setImageWidth] = useState<number>(base_image_size[0]);
  useEffect(() => {
    const initial = () => {
      const resultHeight = min1024
        ? base_image_size[1]
        : base_image_size[1] * responsive_factor;
      const resultWidth = min1024
        ? base_image_size[0]
        : base_image_size[0] * responsive_factor;

      setImageHeight(resultHeight);
      setImageWidth(resultWidth);
    };

    initial();
  }, [min1024, base_image_size, responsive_factor]);

  const classNameMerge = cn(
    "hidden lg:flex lg:h-[800px] h-[650px] lg:items-center items-end lg:pb-0 pb-5",
    imageBaseClassName
  );

  return (
    <>
      <div className={classNameMerge}>
        {background_image ? (
          <div className="relative">
            <Image
              src={background_image}
              alt={"imagen de fondo"}
              width={imageWidth}
              height={imageHeight}
              className="relative z-50"
            />
            {elements.map((element, index) => (
              <div key={index} className="group">
                <Line line_position={line_position[index]} />
                <BlueCard
                  index={index}
                  description={items[`descripcion_${element}`]}
                  image={items[`imagen_${element}`]}
                  card_position={card_position}
                  image_left={reversed_cards_index.includes(index)}
                  textClassName={textClassName}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="lg:hidden">
        <div className="grid sm:grid-cols-2 gap-4 pb-16">
          {elements.map((element, index) => (
            <BlueCard
              key={index}
              index={index}
              description={items[`descripcion_${element}`]}
              image={items[`imagen_${element}`]}
              image_left={index % 2 === 0}
              textClassName={textClassName}
            />
          ))}
        </div>
      </div>
    </>
  );
}
