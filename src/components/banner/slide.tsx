import { TextBorderAnimation } from "@/components";
import { PropsBannerGeneral } from "@/components/banner/general";
import { cn } from "@/lib/utils";

export const BannerSlide = ({ item, height }: { item: PropsBannerGeneral, height: string }) => {
  const classDescriptionMerge = cn(
    "font-clan-pro-medium md:text-[19px] text-md text-white leading-snug lg:leading-10 mt-6 w-full max-w-[535px]"
  );
 
  const backgroundClass = cn("bg-no-repeat banner:hidden block  bg-cover bg-center", ` ${height}`)
  const container = cn("w-full banner:h-[400px]", ` ${height}`)

  return (
    <div className="absolute w-full left-0 overflow-hidden">
      <div className="select-none">
        <div className={container}>
          <div
            className={backgroundClass} 
            style={{
              backgroundImage: `url(${item?.img})`,
              backgroundSize: "cover", 
            }}
          />
        <div className=" banner:block hidden">
        <div
        className="bg-no-repeat bg-cover bg-center w-full h-[400px] sm:block hidden"
        style={{
          backgroundImage: `url(${item?.img})`,
        }}
      />
      <div
        className="bg-no-repeat bg-cover bg-center w-full h-[400px] sm:hidden block"
        style={{
          backgroundImage: `url(${item?.img_sm})`,
        }}
      />
        </div>
        </div> 
        {/* Contenido del banner */}
        <div className="absolute lg:ml-[160px] mx-16 bottom-0 top-[80px] z-20 flex flex-col justify-center pb-6 h-auto">
          {item?.titleChildren  ? (
            item?.titleChildren 
          ) : item?.title  || item.subTitle ? (
            <TextBorderAnimation>
              <div
                className={cn(
                  "font-clan-pro-bold-italic md:text-[51px] text-4xl leading-none",
                  item?.defaultTitleColors ? "text-primary-orange" : "text-white"
                )}
              >
                {item?.title} &nbsp;
              </div>
              <div
                className={cn(
                  "font-clan-pro-bold-italic md:text-[51px] text-4xl line-h leading-none",
                  item?.defaultTitleColors ? "text-white" : "text-primary-orange"
                )}
              >
                {item?.subTitle} &nbsp;
              </div>
            </TextBorderAnimation>
          ) : null}
          {item?.description && (
            <div
              className={classDescriptionMerge}
              dangerouslySetInnerHTML={{ __html: item?.description }}
            />
          )}
        </div>

      </div>
    </div>
  );
};
