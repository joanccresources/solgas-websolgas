"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { Text } from "@/components";
import { cn } from "@/lib/utils";

const BgOrange = () => {
  return (
    <div className="lg:w-[457px] w-[320px] lg:h-[145px] h-[101px]">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 457 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="
            M50 0
            H407
            Q437 0 437 30
            V115
            Q437 145 407 145
            H50
            Q20 145 20 115
            V30
            Q20 0 50 0
            Z
          "
          fill="#FF7900"
          transform="skewX(-10)"
        />
      </svg>
    </div>
  );
};

const size = 160;

export default function OrangeCard({
  index,
  description,
  image,
  card_position,
  image_position,
  card_reverse = false,
  textClassName,
  display_index = false,
  isHovered,
}: {
  index: number;
  description: string;
  image: string;
  card_position: string[];
  image_position: string[];
  card_reverse?: boolean;
  textClassName?: string;
  display_index?: boolean;
  isHovered: boolean;
}) {
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [imageSize, setImageSize] = useState<number>(size);

  useEffect(() => {
    const initial = () => {
      const resultSize = min1024 ? size : size * 0.6;

      setImageSize(resultSize);
    };

    initial();
  }, [min1024]);

  const classNameMerge = cn(
    "absolute hidden group-hover:block",
    card_position[index],
    isHovered ? "block" : ""
  );
  const imageClassNameMerge = cn(
    "absolute rounded-full border-4 border-white z-30 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:delay-300",
    image_position[index],
    isHovered ? "scale-100 opacity-100" : ""
  );

  const textClassNameMerge = cn(
    "inline-block",
    display_index ? "lg:pt-4 pt-3" : "",
    textClassName
  );

  return (
    <div className={classNameMerge}>
      <div className="relative">
        <div
          className={cn(
            "scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:delay-300",
            isHovered ? "scale-100 opacity-100 delay-300" : ""
          )}
        >
          <div
            className={card_reverse ? "transform scale-x-[-1] z-10" : "z-10"}
          >
            <BgOrange />
          </div>
          <div className="absolute left-0 right-0 top-0 bottom-0 pb-2 lg:px-16 px-9 flex gap-2 lg:pt-6 pt-2 z-10">
            {display_index ? (
              <span className="text-white text-4xl lg:text-5xl font-clan-pro-black">
                {index + 1}.
              </span>
            ) : null}
            <Text
              className="prose text-white lg:text-2xl md:text-[18px] text-lg"
              font="new"
            >
              <span
                className={textClassNameMerge}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </Text>
          </div>
        </div>

        {image ? (
          <Image
            src={image}
            alt={"imagen del elemento"}
            width={imageSize}
            height={imageSize}
            className={imageClassNameMerge}
          />
        ) : null}
      </div>
    </div>
  );
}
