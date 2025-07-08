"use client";
import { InphographicItemType } from "@/utils/format";
import OrangeSectionContainer from "./orange/container";
import BlueSectionContainer from "./blue/container";

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
  card_type?: "default" | "blue";
  imageBaseClassName: string;
  display_index?: boolean;
};

export default function SectionContainer({
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
  card_type = "default",
  imageBaseClassName,
  display_index = false,
}: SectionType) {
  return (
    <div>
      {card_type === "default" ? (
        <OrangeSectionContainer
          items={items}
          background_image={background_image}
          elements={elements}
          card_position={card_position}
          image_position={image_position}
          line_position={line_position}
          marker_position={marker_position}
          base_image_size={base_image_size}
          responsive_factor={responsive_factor}
          reversed_cards_index={reversed_cards_index}
          textClassName={textClassName}
          imageBaseClassName={imageBaseClassName}
          display_index={display_index}
        />
      ) : (
        <BlueSectionContainer
          items={items}
          background_image={background_image}
          elements={elements}
          card_position={card_position}
          line_position={line_position}
          base_image_size={base_image_size}
          responsive_factor={responsive_factor}
          reversed_cards_index={reversed_cards_index}
          textClassName={textClassName}
          imageBaseClassName={imageBaseClassName}
        />
      )}
    </div>
  );
}
