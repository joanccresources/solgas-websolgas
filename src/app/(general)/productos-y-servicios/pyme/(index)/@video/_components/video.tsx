"use client";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
const Video = dynamic(() => import("@/components/video"), { ssr: false });

interface PropsVideoSolgasExpert {
  url: string;
}
export default function VideoSolgasExpert({ url }: PropsVideoSolgasExpert) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1310 });
  const isTable = useMediaQuery({ minWidth: 800 });

  const result = isDesktopOrLaptop
    ? { width: "1125px", height: "619px" }
    : isTable
    ? { width: "600px", height: "330px" }
    : { width: "100%", height: "100%" };
  return (
    <div className=" xl:h-[639px] lg:h-[500px] sm:h-[350px] h-[180px] relative w-full max-w-[1441px]">
      <div className="w-full h-full md:flex justify-center items-center px-4 sm:px-0">
        <Video width={result.width} height={result.height} url={url} />
      </div>
    </div>
  );
}
