"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Image, Text } from "@/components";

const height = 273;
const width = 361;

const BgBlue = ({ height, width }: { height: string; width: string }) => {
  const min1280 = useMediaQuery({ minWidth: 1280 });
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [blueBgHeight, setBlueBgHeight] = useState<string>("0.15");
  const [blueGradientBgHeight, setBlueGradientBgHeight] =
    useState<string>("0.5");

  useEffect(() => {
    const initial = () => {
      const resultBlue = min1280 ? "0.15" : min1024 ? "0.2" : "0.35";
      const resultBlueGradient = min1280 ? "0.5" : min1024 ? "0.6" : "0.65";

      setBlueBgHeight(resultBlue);
      setBlueGradientBgHeight(resultBlueGradient);
    };

    initial();
  }, [min1280, min1024]);

  return (
    <div
      className="bg-contain bg-no-repeat bg-bottom w-full absolute top-0 left-0 z-10 overflow-hidden"
      style={{ height, width }}
    >
      <svg
        width={361}
        height={273}
        viewBox="0 0 361 273"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={361} height={273} fill="url(#paint0_linear_361x273)" />
        <defs>
          <linearGradient
            id="paint0_linear_361x273"
            x1="180.5"
            y1="273"
            x2="180.5"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={blueBgHeight} stopColor="#0B2265" stopOpacity="1" />
            <stop
              offset={blueGradientBgHeight}
              stopColor="#0B2265"
              stopOpacity="0.4"
            />
            <stop offset="1" stopColor="#3C4E84" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function ImageCard({
  image,
  text,
}: {
  image: string;
  text: string;
}) {
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [responsiveHeight, setResponsiveHeight] = useState<number>(height);
  const [responsiveWidth, setResponsiveWidth] = useState<number>(width);

  useEffect(() => {
    const initial = () => {
      const resultHeight = min1024 ? height : height * 0.8;
      const resultWidth = min1024 ? width : width * 0.8;

      setResponsiveHeight(resultHeight);
      setResponsiveWidth(resultWidth);
    };

    initial();
  }, [min1024]);

  return (
    <div className="animate-fade animate-once animate-duration-700 animate-ease-linear h-full w-fit">
      <div className="flex flex-col items-center border border-select rounded-3xl h-full w-fit relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={text}
            width={responsiveWidth}
            height={responsiveHeight}
            className="rounded-3xl"
          />
        ) : null}
        <BgBlue
          height={`${responsiveHeight}px`}
          width={`${responsiveWidth}px`}
        />
        <div className="absolute bottom-0 left-0 w-full p-4 z-15">
          <Text
            font="medium"
            className="text-center text-white lg:text-xl text-md leading-snug relative z-20"
          >
            {text}
          </Text>
        </div>
      </div>
    </div>
  );
}
