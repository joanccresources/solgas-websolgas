"use client";
import { useEffect, useState } from "react";
import { Button, Image, Text } from "@/components";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

const height = 245;
const width = 372;

export default function ProductCard({
  text,
  image,
  button_text,
  link_text,
}: {
  text: string;
  image: string;
  button_text: string;
  link_text: string;
}) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const [responsiveHeight, setResponsiveHeight] = useState<number>(height);
  const [responsiveWidth, setResponsiveWidth] = useState<number>(width);

  useEffect(() => {
    const initial = () => {
      const resultHeight = isDesktopOrLaptop ? height : height * 0.75;
      const resultWidth = isDesktopOrLaptop ? width : width * 0.75;

      setResponsiveHeight(resultHeight);
      setResponsiveWidth(resultWidth);
    };

    initial();
  }, [isDesktopOrLaptop]);

  return (
    <div className="animate-fade animate-once animate-duration-700 animate-ease-linear">
      <div className="flex flex-col items-center border border-primary-orange rounded-3xl p-4">
        {image ? (
          <Image
            src={image}
            alt={text}
            width={responsiveWidth}
            height={responsiveHeight}
            className="mb-4 rounded-3xl"
          />
        ) : null}
        <Text
          font="medium"
          className="text-center text-primary-blue lg:text-lg text-[16px] leading-snug"
        >
          {text}
        </Text>
        <Link href={link_text ? link_text : "/"}>
          <Button
            height="50px"
            bg={"primary"}
            border={"primary"}
            color={"white"}
            className="lg:text-base md:text-xs text-[10px] font-clan-pro-bold lg:w-[140px] w-[120px] md:h-[40px] h-[25px] mt-4 lg:mt-6"
            onClick={() => {}}
          >
            {button_text}
          </Button>
        </Link>
      </div>
    </div>
  );
}
