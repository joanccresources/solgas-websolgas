"use client";
import Container from "@/components/layouts/container";
import ImageCarousel from "./carousel";
import { RecognitionImage } from "./image";
import { ContentRelsType, ElementType } from "@/utils/format";
import { useState } from "react";
import { ImageSlider } from "@/components";

export const Body = ({
  section_fields,
  elements,
}: {
  section_fields: ContentRelsType;
  elements: {
    [key: string]: ElementType;
  }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <ImageSlider
        images={elements.map((item, index) => {
          return {
            src: item?.imagen?.value_format,
            key: index,
          };
        })}
        index={index}
        setIndex={setIndex}
        visible={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="sm:bg-linear-to-r from-[#E7E9F0] to-[#FFFFFF]">
        <Container className="lg:py-20 md:py-16 sm:py-10 py-6">
          <p className="text-mobile sm:text-primary-blue md:text-[28px] text-xl text-center lg:mb-8 md:mb-6 mb-4 font-clan-pro-regular sm:font-clan-pro-medium">
            {section_fields?.titulo?.value}
          </p>
          <div className="sm:hidden">
            <ImageCarousel
              items={elements}
              setIsOpen={setIsOpen}
              setIndex={setIndex}
            />
          </div>
          <div className="hidden sm:flex flex-wrap lg:gap-8 sm:gap-6 gap-4 justify-center">
            {elements.map((item, i) => (
              <RecognitionImage
                key={i}
                src={item?.imagen?.value_format}
                alt={`Reconocimiento ${index}`}
                setIsOpen={setIsOpen}
                index={i}
                setIndex={setIndex}
              />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};
