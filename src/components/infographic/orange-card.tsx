"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Image, Text } from "@/components";
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
}: {
  index: number;
  description: string;
  image: string;
  card_position: string[];
  image_position: string[];
  card_reverse?: boolean;
  textClassName?: string;
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
    card_position[index]
  );
  const imageClassNameMerge = cn(
    "absolute rounded-full border-4 border-white z-30 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:delay-300",
    image_position[index]
  );

  const textClassNameMerge = cn(
    "inline-block first-letter:text-4xl lg:first-letter:text-5xl first-letter:font-bold",
    textClassName
  );

  return (
    <div className={classNameMerge}>
      <div className="relative">
        <div className="scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:delay-300">
          <div
            className={card_reverse ? "transform scale-x-[-1] z-10" : "z-10"}
          >
            <BgOrange />
          </div>
          <div className="absolute left-0 right-0 top-0 bottom-0 py-2 lg:px-16 px-10 flex items-center z-10">
            <Text className="prose text-white font-normal lg:text-2xl text-xl">
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
