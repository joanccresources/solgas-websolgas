"use client";
import { useState } from "react";
import { ImageSlider } from "@/components";
import GraySectionTitle from "@/components/text/title";
import CarouselImage, { ItemCarousel } from "./carousel";
import Container from "@/components/layouts/container";

export const Milestones = ({
  title,
  elements = [],
}: {
  title: string;
  elements: ItemCarousel[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <Container className="lg:pt-20 md:pt-16 pt-10 px-0">
      <ImageSlider
        images={elements?.map((item, index) => {
          return {
            src: item?.image_format,
            key: index,
          };
        })}
        index={index}
        setIndex={setIndex}
        visible={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="w-full">
        <GraySectionTitle
          text_align="left"
          marginBottomClassName="lg:mb-10 md:mb-8 mb-6"
        >
          {title}
        </GraySectionTitle>
        <div className="flex justify-center w-full">
          <div className="2xl:max-w-[1440px] w-full lg:pb-20 md:pb-16 sm:pb-10 pb-6">
            <CarouselImage
              items={elements}
              setIsOpen={setIsOpen}
              setIndex={setIndex}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
