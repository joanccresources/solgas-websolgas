"use client";
import GeneralCard from "./card";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { chunk } from "lodash"; 

const Carousel = dynamic(() => import("@/components/carousel"), { ssr: false });

export interface ItemCarouselNotice {
  title: string,
  slug: string
  content: string
  image:string
  image_format: string | null,
  thumbnail: string,
  thumbnail_format: string | null
  short_description: string
  publication_at_format_3: string
}
interface PropsCarouselNotice {
  items: ItemCarouselNotice[]; 
}

export default function CarouselNotice({ items }: PropsCarouselNotice) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1310 });
  const isTable = useMediaQuery({ minWidth: 800 });
  const dataCarousel = items.map((item, index) => {
    return {
      ...item,
      id: String(index),
    };
  });

  if (isDesktopOrLaptop) {
    const chunks = chunk(dataCarousel, 3);

    return (
      <Carousel
        items={chunks}
        renderItem={(item: unknown) => { 
          return (
            <div className="flex w-full justify-center gap-x-6">
              {(item as ItemCarouselNotice[]).map(
                (item) => (
                  <GeneralCard
                    key={item.slug}
                    image={item?.image_format}
                    text={item.publication_at_format_3}
                    title={item.title}
                    slug={item.slug}
                  />
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
  const result = isDesktopOrLaptop ? 4 : isTable ? 2 : 1;

  return (
    <>
      <Carousel
        items={dataCarousel}
        renderItem={(item: unknown) => {
          const carouselItem = item as ItemCarouselNotice; 
          return (
            <GeneralCard
            key={carouselItem.slug}
            image={carouselItem?.image_format}
            text={carouselItem.publication_at_format_3}
            title={carouselItem.title}
            slug={carouselItem.slug}
          />
          );
        }}
        slidesPerPage={result}
        slidesPerMove={result}
      />
    </>
  );
}
