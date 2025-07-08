"use client";
import { useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Image, Text } from "@/components";

const width_card = 530;
const height_card = 400;
const width_image = 419;
const height_image = 267;

export default function PresentationCard({
  image,
  text,
}: {
  image: string;
  text: string;
}) {
  const min768 = useMediaQuery({ minWidth: 768 });
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [cardHeight, setCardHeight] = useState<number>(height_card);
  const [cardWidth, setCardWidth] = useState<number>(width_card);
  const [imageHeight, setImageHeight] = useState<number>(height_image);
  const [imageWidth, setImageWidth] = useState<number>(width_image);

  useLayoutEffect(() => {
    const initial = () => {
      const resultCardHeight = min1024
        ? height_card
        : min768
        ? height_card * 0.7
        : height_card * 0.6;
      const resultCardWidth = min1024
        ? width_card
        : min768
        ? width_card * 0.7
        : width_card * 0.6;
      const resultImageHeight = min1024
        ? height_image
        : min768
        ? height_image * 0.7
        : height_image * 0.6;
      const resultImageWidth = min1024
        ? width_image
        : min768
        ? width_image * 0.7
        : width_image * 0.6;

      setCardHeight(resultCardHeight);
      setCardWidth(resultCardWidth);
      setImageHeight(resultImageHeight);
      setImageWidth(resultImageWidth);
    };

    initial();
  }, [min1024, min768]);
  return (
    <div className="animate-fade animate-once animate-duration-700 animate-ease-linear">
      <div
        className="flex items-end justify-center rounded-3xl bg-primary-blue relative"
        style={{ width: cardWidth, height: cardHeight }}
      >
        <Image src={image} alt={text} width={imageWidth} height={imageHeight} />
        <div className="absolute top-3 left-0 w-full p-4 z-15">
          <Text
            font="medium"
            className="text-center text-white lg:text-[48px] text-[30px] leading-snug relative z-20"
          >
            {text}
          </Text>
        </div>
      </div>
    </div>
  );
}
