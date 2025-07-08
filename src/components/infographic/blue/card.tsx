"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { Text } from "@/components";
import { cn } from "@/lib/utils";

const size = 75;

export default function BlueCard({
  index,
  description,
  image,
  card_position,
  image_left = true,
  textClassName,
}: {
  index: number;
  description: string;
  image: string;
  card_position?: string[];
  image_left: boolean;
  textClassName?: string;
}) {
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [imageSize, setImageSize] = useState<number>(size);

  useEffect(() => {
    const initial = () => {
      const resultSize = min1024 ? size : size * 0.8;

      setImageSize(resultSize);
    };

    initial();
  }, [min1024]);

  const classNameMerge = cn(
    "absolute",
    card_position ? card_position?.[index] : "relative"
  );
  const cardClassNameMerge = cn(
    "bg-[#004996] rounded-3xl p-5 lg:p-6 flex items-center justify-between lg:max-w-[360px] sm:max-w-[325px] max-w-[400px] lg:gap-5 gap-4",
    card_position ? "" : "h-full z-40"
  );
  const textClassNameMerge = cn("prose text-white", textClassName);

  return (
    <div className={classNameMerge}>
      {/* <div className="scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:delay-300"> */}
      <div className={cardClassNameMerge}>
        <Text className={textClassNameMerge} font="medium">
          <span
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Text>
        <div>
          <div
            style={{ width: imageSize, height: imageSize }}
            className="relative flex items-center"
          >
            {image ? (
              <Image
                src={image}
                alt={"imagen del elemento"}
                width={imageSize}
                height={imageSize}
                className={image_left ? "order-first" : "order-last"}
                style={{ maxHeight: imageSize, maxWidth: imageSize }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
