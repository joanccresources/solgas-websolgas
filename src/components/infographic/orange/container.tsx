"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Image } from "@/components";
import OrangeCard from "./card";
import ImageMarker from "../marker";
import Line from "./line";
import { InphographicItemType } from "@/utils/format";
import { cn } from "@/lib/utils";

type SectionType = {
  background_image: string;
  elements: string[];
  card_position: string[];
  image_position: string[];
  line_position: string[];
  marker_position: string[];
  base_image_size: [number, number];
  responsive_factor: number;
  items: InphographicItemType;
  reversed_cards_index: number[];
  textClassName?: string;
  imageBaseClassName: string;
  display_index?: boolean;
};

export default function OrangeSectionContainer({
  background_image,
  elements,
  card_position,
  image_position,
  line_position,
  marker_position,
  base_image_size,
  responsive_factor,
  items,
  reversed_cards_index,
  textClassName,
  imageBaseClassName,
  display_index = false,
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
    "flex lg:h-[800px] h-[650px] lg:items-center items-end lg:pb-0 pb-5",
    imageBaseClassName
  );

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={classNameMerge}>
      {background_image ? (
        <div className="relative">
          <Image
            src={background_image}
            alt={"imagen de fondo"}
            width={imageWidth}
            height={imageHeight}
            className="relative z-10"
          />
          {elements.map((element, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ImageMarker
                  marker_position={marker_position[index]}
                  isHovered={isHovered}
                />
                <Line
                  line_position={line_position[index]}
                  isHovered={isHovered}
                />
                <OrangeCard
                  index={index}
                  description={items[`descripcion_${element}`]}
                  image={items[`imagen_${element}`]}
                  card_position={card_position}
                  image_position={image_position}
                  card_reverse={reversed_cards_index.includes(index)}
                  textClassName={textClassName}
                  display_index={display_index}
                  isHovered={isHovered}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
