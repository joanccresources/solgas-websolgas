"use client";
import dynamic from "next/dynamic";
import { chunk } from "lodash";
import { Text } from "@/components";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Carousel = dynamic(() => import("@/components/carousel"), { ssr: false });

export interface ItemCarousel {
  id: number | string;
  title: string;
  description: string;
  image: string;
  icon: string;
  text_button: string;
  link_button: string;
}

interface PropsCarouselPillars {
  items: ItemCarousel[];
}

const Card = (el: {
  id: number | string;
  title: string;
  description: string;
  image: string;
  icon: string;
  text_button: string;
  link_button: string;
}) => {
  const circleClassName = cn(
    "h-[64px] w-[64px] flex items-center justify-center rounded-full absolute top-[-32px] left-0 right-0 mx-auto",
    "bg-[#EFEFEF]"
  );

  return (
    <div className="h-[348px] w-[270px] flex flex-col justify-center mx-auto rounded-l-[30px] rounded-se-[26px] rounded-ee-[41px] overflow-hidden">
      <div className="flex flex-col justify-center items-center bg-[#73AF4E] h-[211px]">
        <div
          className="bg-no-repeat bg-contain mb-1"
          style={{
            backgroundImage: `url(${el?.icon})`,
            width: `104px`,
            height: `104px`,
          }}
        />
      </div>
      <div className="bg-white h-[137px] relative z-10 flex sm:p-3 p-2 items-center justify-center">
        <div className={circleClassName}>
          <Text className="text-[30px] text-select" font="medium">
            {typeof el?.id == "number" ? el.id + 1 : 0}
          </Text>
        </div>
        <p className="text-center font-clan-pro-medium text-[22px] text-primary-blue break-words leading-snug pt-1 max-w-[180px]">
          {el?.title}
        </p>
      </div>
    </div>
  );
};
export default function ImageCarousel({ items }: PropsCarouselPillars) {
  const dataCarousel = items.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });

  const chunks = chunk(dataCarousel, 1);

  return (
    <Carousel
      hasNavigationButtons={false}
      items={chunks}
      renderItem={(item: unknown) => {
        const carouselItem = item as ItemCarousel;
        if (carouselItem.id === "a" || carouselItem.id === "b") return <></>;

        return (
          <div>
            {(item as ItemCarousel[]).map(
              (el: {
                id: number | string;
                title: string;
                description: string;
                image: string;
                icon: string;
                text_button: string;
                link_button: string;
              }) => (
                <div key={el?.id}>
                  {el?.link_button ? (
                    <Link href={el?.link_button} key={el?.id}>
                      <Card {...el} />
                    </Link>
                  ) : (
                    <div key={el?.id}>
                      <Card {...el} />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        );
      }}
      slidesPerPage={1}
      slidesPerMove={1}
    />
  );
}
