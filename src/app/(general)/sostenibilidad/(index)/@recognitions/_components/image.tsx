"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

const width = 413;
const height = 185;

export const RecognitionImage = ({
  src,
  alt,
  setIsOpen,
  setIndex,
  index,
}: {
  src: string;
  alt: string;
  setIsOpen: (value: boolean) => void;
  setIndex: (value: number) => void;
  index: number;
}) => {
  const min640 = useMediaQuery({ minWidth: 640 });
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [imageHeight, setImageHeight] = useState<number>(height);
  const [imageWidth, setImageWidth] = useState<number>(width);

  useEffect(() => {
    const resultHeight = min1024
      ? height
      : min640
      ? height * 0.7
      : height * 0.6;
    const resultWidth = min1024 ? width : min640 ? width * 0.7 : width * 0.6;
    setImageHeight(resultHeight);
    setImageWidth(resultWidth);
  }, [min1024, min640]);

  return (
    <button
      onClick={() => {
        setIndex(index);
        setIsOpen(true);
      }}
      className="w-fit h-fit p-4 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:sm:scale-125"
    >
      <Image
        src={src}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        className="object-cover"
      />
    </button>
  );
};
