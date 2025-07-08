"use client";
import * as animationData from "../../../public/loading.json";
import { Image } from "@/components";

import { useLottie } from "lottie-react";

export default function Loading() {
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  const { View } = useLottie(options);

  return (
    <div className="fixed left-0 top-0 bg-blur h-screen w-screen flex justify-center items-center z-5 select-none">
      <div className="relative">
        <div style={{ width: 600, height: 600 }}>{View}</div>
        <div className="absolute top-[280px] left-[220px]">
          <Image
            src="logo.svg"
            alt="Image Info"
            height={33}
            width={184}
            className="mb-12"
          />
        </div>
      </div>
    </div>
  );
}
