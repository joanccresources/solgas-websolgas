import { Image, Text } from "@/components";

export default function GeneralCard({
  image,
  text,
  horizontal = false,
  hasIndex = false,
  index,
}: {
  image: string;
  text: string;
  horizontal?: boolean;
  hasIndex?: boolean;
  index?: number;
}) {
  // w-[267px] carousel-body
  return (
    <div className=" w-[293px] border border-select  rounded-[33px]  flex justify-center h-full">
      <div className="animate-fade animate-once animate-duration-700 animate-ease-linear h-full  group">
        <div
          className={`flex flex-col items-center px-5 pb-7 w-full h-full relative ${
            hasIndex ? "pt-12" : "pt-10"
          }`}
        >
          {image ? (
            <Image
              src={image}
              alt={text}
              width={horizontal ? 110 : 91}
              height={91}
              className="mb-4 rounded-3xl select-none"
            />
          ) : null}
          <Text
            font="medium"
            className="text-center text-primary-blue lg:text-md text-sm leading-snug select-none"
          >
            {text}
          </Text>
          {hasIndex ? (
            <div className="absolute left-0 right-0 top-[-50px] flex justify-center">
              <div className="w-[80px] h-[80px] bg-gray-light flex justify-center items-center rounded-full">
                <div className="w-[60px] h-[60px] bg-gray flex justify-center items-center rounded-full group-hover:bg-primary-orange transition-all duration-300 ease-in-out">
                  <Text
                    font="bold"
                    className="text-center text-primary-blue lg:text-xl text-lg group-hover:text-white select-none"
                  >
                    {index}
                  </Text>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
