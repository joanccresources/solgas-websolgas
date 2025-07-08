import { LocationIcon, Text } from "@/components";
import Image from "next/image";
import tailwindConfig from "@root/tailwind.config";
const gray = tailwindConfig.theme.extend.colors["select"];

export default function GeneralCard({
  image,
  title,
  description,
  location,
}: {
  image: string;
  title: string;
  description: string;
  location: string;
}) {
  // w-[267px] carousel-body
  return (
    <>
      <Image
        src={image}
        alt={title}
        width={347}
        height={527}
        layout="fixed"
        className="rounded-[48px] lg:w-[347px] w-[250px] md:block hidden select-none object-cover shrink-0"
      />

      <div className="px-8 py-12 sm:py-8">
        <Text
          className="md:text-[27px] text-xl text-primary-blue"
          line="2"
          type="h6"
          font="new"
        >
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </Text>

        <div className="flex gap-x-2 py-8 items-center">
          <LocationIcon color={gray} />
          <Text className="md:text-[17px] text-sm text-black">{location}</Text>
        </div>
        <Text className="md:text-[19px] text-base text-gray-card" line="7">
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            style={{ lineHeight: 2 }}
          />
        </Text>
      </div>
      {/* <div
        className={`flex flex-col items-center rounded-3xl px-5 pb-7 h-full w-auto relative  pt-24`}
      > 
          <Image
            src={image}
            alt={text}
            width={138}
            height={138}
            className="mb-4 object-cover select-none"
          />
    
        <Text
          font="medium"
          className="text-center text-primary-blue lg:text-md text-sm leading-snug select-none text-[17px]"
          line="9"
        >
             <div dangerouslySetInnerHTML={{ __html: text }} /> 
             
        </Text>
     
      </div> */}
    </>
  );
}
