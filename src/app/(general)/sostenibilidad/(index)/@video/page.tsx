import { TextBorderAnimation } from "@/components";
import { getData } from "../actions";

const BgBlue = () => {
  return (
    <div
      className="bg-contain
    bg-no-repeat
    bg-bottom w-full absolute top-0 left-0 z-20 overflow-hidden h-[615px] banner:h-[467px]"
    >
      <svg
        width="1440"
        height="690"
        viewBox="0 0 1440 690"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="0.904175"
          width="1440"
          height="689"
          fill="url(#paint0_linear_616_1896)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_616_1896"
            x1="779.5"
            y1="345"
            x2="318.245"
            y2="534.221"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3C4E84" stopOpacity="0" />
            <stop offset="0.458057" stopColor="#0B2265" stopOpacity="0.5" />
            <stop offset="1" stopColor="#0B2265" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default async function PageVideo() {
  const { data } = await getData();
  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner"
  )?.content_rels;

  return (
    <div className="w-full h-[615px] banner:h-[467px] relative">
      <video
        className="w-full h-[615px] banner:h-[467px] object-cover z-100"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={section_fields?.video?.value_format} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <BgBlue />
      <div className="absolute lg:ml-[160px] mx-16 bottom-0 top-[80px] z-20 flex flex-col justify-center pb-6">
        <TextBorderAnimation>
          <span className="font-clan-pro-regular lg:text-[80px] sm:text-[56px] text-[32px] text-white line-h leading-none">
            {section_fields?.titulo?.value} &nbsp;
          </span>
        </TextBorderAnimation>
      </div>
    </div>
  );
}
