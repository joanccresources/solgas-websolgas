import { Button, Iconify } from "@/components";
import { cn } from "@/lib/utils";
import { ElementType } from "@/utils/format";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const width = 1163;
const height = 207;
const responsiveWidth = 640;
const responsiveHeight = 250;

export const Item = ({
  item,
}: {
  item: {
    [key: string]: ElementType;
  };
}) => {
  const min1440 = useMediaQuery({ minWidth: 1440 });
  const min1280 = useMediaQuery({ minWidth: 1280 });
  const min640 = useMediaQuery({ minWidth: 640 });
  const [imageWidth, setImageWidth] = useState(width);
  const [imageHeight, setImageHeight] = useState(height);
  const [imageSource, setImageSource] = useState(item?.imagen?.value_format);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const initial = () => {
      const resultWidth = min1440
        ? width * 1.4
        : min1280
        ? width * 1.1
        : min640
        ? width
        : responsiveWidth;
      const resultHeight = min1440
        ? height * 1.2
        : min1280
        ? height * 1.1
        : min640
        ? height
        : responsiveHeight;
      const resultSource = min640
        ? item?.imagen?.value_format
        : item?.imagen_responsive?.value_format;

      setImageWidth(resultWidth);
      setImageHeight(resultHeight);
      setImageSource(resultSource);
    };

    initial();
  }, [
    min1440,
    min1280,
    min640,
    item?.imagen?.value_format,
    item?.imagen_responsive?.value_format,
  ]);

  const accordionClassName = cn(
    "transition-all duration-100 ease-in-out overflow-hidden",
    isOpened ? "sm:p-12 p-10" : "h-0"
  );

  const accordionTextClassName = cn(
    "text-primary-blue md:text-[17px] sm:text-[15px] text-[14px] font-clan-pro-new leading-snug custom-html",
    "transition-all duration-200 ease-in-out",
    isOpened ? "scale-y-100" : "scale-y-0"
  );

  return (
    <div className="bg-[#0B2265]/[8%] rounded-3xl">
      <div className="border border-select rounded-3xl sm:p-4 p-3 bg-[#FBFBFB]">
        {item?.imagen?.value_format ? (
          <Image
            src={imageSource}
            alt="Imagen de la promoción"
            width={imageWidth}
            height={imageHeight}
            className="rounded-3xl object-cover"
          />
        ) : null}

        <div className="sm:p-6 p-4 sm:pb-0 pb-0">
          <p className="text-primary-blue md:text-[38px] sm:text-[28px] text-[20px] text-left font-clan-pro-new leading-[1.1]">
            {item?.titulo?.value}
          </p>
          <p className="text-primary-blue md:text-[17px] sm:text-[15px] text-[14px] text-left lg:my-8 md:my-6 my-4 font-clan-pro-new leading-[1.2]">
            {item?.descripcion?.value}
          </p>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <Button
              bg={"transparent"}
              border={"primary"}
              color={"blue"}
              className="md:text-[19px] sm:text-base text-sm font-clan-pro-regular md:w-[290px] sm:w-[265px] w-[225px] lg:h-[50px] h-[40px] order-2 sm:order-1"
              onClick={() => setIsOpened(!isOpened)}
            >
              <div className="flex items-center gap-4 pl-1">
                {item?.texto_acordeon?.value}
                <Iconify
                  icon={"weui:arrow-outlined"}
                  color={"#FF7900"}
                  height={24}
                  width={24}
                  className={cn(
                    "transition-all duration-200 ease-in-out",
                    isOpened
                      ? "transform rotate-[270deg]"
                      : "transform rotate-90"
                  )}
                />
              </div>
            </Button>
            <p className="font-clan-pro-new md:text-[18px] text-[15px] text-[13px] text-primary-blue order-1 sm:order-2 text-right">
              {item?.texto_fecha_promocion?.value}
            </p>
          </div>
        </div>
      </div>
      <div className={accordionClassName}>
        <div
          dangerouslySetInnerHTML={{
            __html: item?.lista_terminos_condiciones?.value,
          }}
          className={accordionTextClassName}
        />
      </div>
    </div>
  );
};
