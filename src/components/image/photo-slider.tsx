"use client";
import { PhotoSlider } from "react-photo-view";
import { Iconify } from "@/components/iconify";

interface PropPhotoSliderApp {
  images: { src: string; key: number }[];
  visible: boolean;
  onClose: () => void;
  index?: number;
  setIndex?: (value: number) => void;
}

export default function ImageSlider({
  images,
  visible,
  onClose,
  index = 0,
  setIndex,
}: PropPhotoSliderApp) {
  if (!visible) return null;

  return (
    <PhotoSlider
      images={images}
      visible={visible}
      onClose={onClose}
      speed={() => 300}
      index={index}
      onIndexChange={setIndex}
      easing={(type) =>
        type === 2
          ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
          : "cubic-bezier(0.34, 1.56, 0.64, 1)"
      }
      maskOpacity={0.55}
      className="z-50 fixed left-0 top-0 w-full h-full flex items-center justify-center bg-black/80 backdrop-blur-s"
      toolbarRender={({ onScale, scale }) => (
        <div className="flex gap-2 pt-1">
          <button onClick={() => onScale(scale + 1)} className="cursor-pointer">
            <Iconify
              icon="solar:magnifer-zoom-in-bold"
              color="white"
              width={24}
              height={24}
            />
          </button>
          <button onClick={() => onScale(scale - 1)} className="cursor-pointer">
            <Iconify
              icon="solar:magnifer-zoom-out-bold"
              color="white"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
    />
  );
}
