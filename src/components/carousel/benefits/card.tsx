"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Image, Text } from "@/components";
import { cn } from "@/lib/utils";

export default function GeneralCard({
  image,
  text,
  title,
  classNameDescription,
  classNamePaddingTop = "pt-18 2xl:pt-24",
  responsiveCard = false,
}: {
  image: string;
  text: string;
  title?: string;
  classNameDescription?: string;
  classNamePaddingTop?: string;
  responsiveCard?: boolean;
}) {
  const min1280 = useMediaQuery({ minWidth: 1280 });
  const [size, setSize] = useState<number>(138);
  useEffect(() => {
    const initial = () => {
      setSize(min1280 ? 138 : 115);
    };

    initial();
  }, [min1280]);

  const classNameDescriptionMerge = cn(
    "text-center text-primary-blue select-none sm:text-[17px] text-[16px] div-benefits-html",
    classNameDescription
  );

  const classNameCardDescriptionMerge = cn(
    "flex flex-col items-center border border-select rounded-3xl px-4 pb-7 h-full w-auto relative",
    responsiveCard ? "pt-8 sm:pt-24" : classNamePaddingTop
  );

  return (
    <div className="w-auto flex justify-center">
      <div
        className={cn(
          "animate-fade animate-once animate-duration-700 animate-ease-linear 2xl:w-[267px] xl:w-[220px] sm:w-[260px] w-200 group",
          responsiveCard ? "h-[350px] sm:h-[456px]" : "h-[456px]"
        )}
      >
        <div className={classNameCardDescriptionMerge}>
          {title ? (
            <div className="absolute 2xl:top-[2rem] top-[1.8rem]">
              <Text
                font="bold"
                className="text-center text-primary-blue text-sm leading-snug select-none text-[20px]"
                line="1"
              >
                {title}
              </Text>
            </div>
          ) : null}
          <div className="h-[138px] w-[138px] flex justify-center items-center mb-5">
            <Image
              src={image}
              alt={text}
              width={size}
              height={size}
              className="object-cover select-none"
            />
          </div>

          <Text className={classNameDescriptionMerge} line="9">
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </Text>
        </div>
      </div>
    </div>
  );
}
