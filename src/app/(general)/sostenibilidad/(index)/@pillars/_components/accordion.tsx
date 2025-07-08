"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, Text } from "@/components";
import Link from "next/link";

type AccordionItem = {
  icon: string;
  image: string;
  title: string;
  description: string;
  text_button: string;
  link_button: string;
};

export const ImageAccordion = ({ items }: { items: AccordionItem[] }) => {
  const min640 = useMediaQuery({ minWidth: 640 });
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [responsiveSize, setResponsiveSize] = useState<number>(80);

  useEffect(() => {
    const initial = () => {
      const resultSize = min1024 ? 80 : min640 ? 70 : 45;

      setResponsiveSize(resultSize);
    };

    initial();
  }, [min1024, min640]);

  return (
    <>
      <div className="group flex justify-center rounded-3xl overflow-hidden">
        {items.map((item, i: number) => {
          const containerClassName = cn(
            "group/article relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)]",
            "w-full [&:not(:hover)]:group-hover:w-[25%] [&:not(:focus-within):not(:hover)]:group-focus-within:w-[25%]",
            "md:[&:not(:hover)]:group-hover:w-[20%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[20%]",
            "before:absolute before:inset-0 before:transition-all",
            "before:opacity-100 [&:hover]:group-hover:before:opacity-0",
            i % 2 === 0 ? "before:bg-[#73AF4E]" : "before:bg-[#99C380]",
            "after:absolute after:transition-all after:h-[80px] sm:after:h-[105px] md:after:h-[120px] lg:after:h-[150px] after:bottom-0 after:w-full after:left-0",
            i % 2 === 0 ? "after:bg-[#EFEFEF]" : "after:bg-white"
          );

          const circleClassName = cn(
            "h-[32px] sm:h-[50px] md:h-[64px] w-[32px] sm:w-[50px] md:w-[64px] flex items-center justify-center rounded-full absolute top-[-16px] sm:top-[-25px] md:top-[-32px] left-0 right-0 mx-auto",
            i % 2 === 0 ? "bg-[#EFEFEF]" : "bg-white"
          );
          return (
            <article key={i} className={containerClassName}>
              <div>
                <div className="absolute w-full top-0 bottom-[80px] sm:bottom-[105px] md:bottom-[120px] lg:bottom-[150px] text-white z-10 p-3 flex flex-col gap-3 md:gap-5 items-center justify-center group-hover/article:justify-start pt-0 group-hover/article:pt-16 bg-transparent group-hover/article:bg-[#000000]/65">
                  <div
                    style={{ writingMode: "vertical-rl", scale: -1 }}
                    className="hidden group-hover:block group-hover/article:hidden"
                  >
                    <Text
                      className="text-center w-full md:text-[18px] text-[16px] text-white"
                      font="bold"
                    >
                      {item?.title}
                    </Text>
                  </div>
                  <Text
                    className="hidden group-hover/article:block text-center w-full md:text-[18px] text-[16px] text-white"
                    font="bold"
                  >
                    {item?.title}
                  </Text>
                  {item?.icon ? (
                    <div
                      className="bg-no-repeat bg-contain group-hover:hidden"
                      style={{
                        backgroundImage: `url(${item?.icon})`,
                        width: `${responsiveSize}px`,
                        height: `${responsiveSize}px`,
                      }}
                    />
                  ) : null}
                  {item?.icon ? (
                    <div
                      className={
                        "bg-no-repeat bg-contain hidden group-hover/article:block"
                      }
                      style={{
                        backgroundImage: `url(${item?.icon})`,
                        width: `${responsiveSize}px`,
                        height: `${responsiveSize}px`,
                      }}
                    />
                  ) : null}
                  <Text
                    className="hidden group-hover/article:block text-center w-full text-[14px]"
                    font="new"
                  >
                    {item?.description}
                  </Text>
                </div>
                {item?.image ? (
                  <Image
                    className="object-cover h-72 md:h-[420px] w-full "
                    src={item?.image}
                    width={685}
                    height={346}
                    alt="Imagen del elemento del acordion"
                  />
                ) : null}
              </div>
              <div className="h-[80px] sm:h-[105px] md:h-[120px] lg:h-[150px] relative z-10 flex sm:p-3 p-2 items-center justify-center">
                <div className={circleClassName}>
                  <Text
                    className="md:text-[30px] sm:text-[24px] text-[18px] text-select"
                    font="medium"
                  >
                    {i + 1}
                  </Text>
                </div>
                <p className="w-[0] hidden sm:w-full sm:block group-hover/article:w-0 md:block [&:not(:hover)]:group-hover:hidden text-center font-clan-pro-medium lg:text-[18px] sm:text-[12px] text-primary-blue break-words transition-all duration-300 leading-snug">
                  {item?.title}
                </p>
                {item?.link_button ? (
                  <Link
                    href={item?.link_button}
                    className="pt-2 scale-0 w-0 group-hover/article:scale-100 group-hover/article:w-fit transition-all group-hover/article:delay-300"
                  >
                    <Button
                      bg={"primary"}
                      border={"primary"}
                      color={"white"}
                      className="font-clan-pro-bold sm:text-sm text-[10px] w-full lg:h-[63px] sm:h-[50px] h-[45px] sm:px-4 px-1"
                    >
                      {item?.text_button}
                    </Button>
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};
