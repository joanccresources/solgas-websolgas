"use client";
import dynamic from "next/dynamic";
import { getImageProps } from "next/image";
import { Button, Text } from "@/components";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
const Video = dynamic(() => import("@/components/video"), { ssr: false });

interface PropsVideoSolgasExpert {
  url: string;
  description: string;
  btn_link: string;
  image: string;
  btn_text: string;
}
export default function VideoSolgasExpert({
  url,
  description,
  btn_link,
  image,
  btn_text,
}: PropsVideoSolgasExpert) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1310 });
  const isTable = useMediaQuery({ minWidth: 800 });

  const result = isDesktopOrLaptop
    ? { width: "627px", height: "349px" }
    : isTable
    ? { width: "400px", height: "209px" }
    : { width: "100%", height: "100%" };

  const common = { alt: "Banner", width: 1440, height: 645, quality: 100 };

  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({ ...common, src: image });

  return (
    <div className=" xl:h-[639px] lg:h-[500px] h-[300px] relative  w-full  overflow-hidden">
      <div className="absolute h-full w-full top-0 left-0">
        {/* Imagen de fondo */}
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileSrcSet} />
          <source media="(min-width: 769px)" srcSet={image} />
          <img
            {...rest}
            alt="Banner Image"
            className="object-cover w-full h-full"
          />
        </picture>
      </div>
      <div className="absolute sm:top-0 top-4 md:left-0 right-0 px-6 md:px-16 max-w-[1441px] mx-auto w-full h-full flex justify-between items-center">
        <div>
          <Text
            className="lg:text-[56px] md:text-3xl text-lg text-white"
            font="medium-italic"
          >
            {description}
          </Text>
          <Link href={btn_link}>
            <Button
              bg={"primary"}
              border={"primary"}
              color={"white"}
              className="lg:h-[50px] h-8 mt-4 px-8 font-clan-pro-bold lg:text-[17px] md:text-sm text-xs"
            >
              {btn_text}
            </Button>
          </Link>
        </div>
        <div className="w-[183px] sm:w-fit">
          <Video width={result.width} height={result.height} url={url} />
        </div>
      </div>
    </div>
  );
}
