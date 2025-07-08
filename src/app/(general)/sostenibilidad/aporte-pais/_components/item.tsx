import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { Button, Text } from "@/components";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ItemType = {
  index: number;
  title_blue: string;
  title_orange: string;
  description: string;
  image: string;
  logo: string;
  icon_hours: string;
  number_hours: string;
  text_hours: string;
  icon_beneficiaries: string;
  number_beneficiaries: string;
  text_beneficiaries: string;
  icon_alliances: string;
  number_alliances: string;
  text_alliances: string;
  icon_connected: string;
  number_connected: string;
  text_connected: string;
  text_image: string;
  text_button: string;
  link_button: string;
};

const width = 589;
const height = 499;

type DataType = "hours" | "beneficiaries" | "alliances" | "connected";
const data: DataType[] = ["hours", "beneficiaries", "alliances", "connected"];

const ItemInfoSection = ({
  item,
  className,
}: {
  item: ItemType;
  className: string;
}) => {
  const min640 = useMediaQuery({ minWidth: 640 });
  const [size, setSize] = useState<number>(34);
  useEffect(() => {
    const initial = () => {
      const resultSize = min640 ? 34 : 24;

      setSize(resultSize);
    };

    initial();
  }, [min640]);

  const classNameMerge = cn("grid-cols-2 gap-4 lg:gap-6", className);
  return (
    <div className={classNameMerge}>
      {data.map((key) => (
        <div
          className="col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1"
          key={key}
        >
          <div className="flex gap-4 sm:gap-2 items-center">
            <div>
              <div className="xl:h-[76px] sm:h-[60px] h-[50px] xl:w-[76px] sm:w-[60px] w-[50px] rounded-full bg-white shadow-lg flex items-center justify-center">
                {item?.[`icon_${key}`] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item?.[`icon_${key}`]}
                    alt="Icono"
                    width={size}
                    height={size}
                  />
                ) : null}
              </div>
            </div>
            <div className="flex items-center sm:gap-4 gap-2">
              <Text
                className="text-primary-orange xl:text-[45px] md:text-[36px] text-[28px] text-left"
                type="h6"
                font="bold"
              >
                {item?.[`number_${key}`]}
              </Text>
              <Text
                className="text-primary-blue xl:text-[19px] md:text-[16px] text-[14px] text-left leading-[1.2]"
                type="h6"
                font="medium"
              >
                {item?.[`text_${key}`]}
              </Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ListItem = ({ item }: { item: ItemType }) => {
  const min640 = useMediaQuery({ minWidth: 640 });
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const min1400 = useMediaQuery({ minWidth: 1400 });
  const min1441 = useMediaQuery({ minWidth: 1441 });
  const [imageHeight, setImageHeight] = useState<number>(width);
  const [imageWidth, setImageWidth] = useState<number>(height);
  const [imageFirst, setImageFirst] = useState<boolean>(true);
  const [bordeRadius, setBorderRadius] = useState<string>("rounded-3xl");

  useEffect(() => {
    const initial = () => {
      const resultHeight = min1400
        ? height
        : min1024
        ? height * 0.75
        : min640
        ? height * 0.6
        : height * 0.5;
      const resultWidth = min1400
        ? width
        : min1024
        ? width * 0.75
        : min640
        ? width * 0.6
        : width * 0.5;

      const imageFirstResult = min640 && item.index % 2 == 1 ? true : false;

      setImageHeight(resultHeight);
      setImageWidth(resultWidth);
      setImageFirst(imageFirstResult);
    };

    initial();
  }, [min640, min1024, min1400, min1441, item.index]);

  useEffect(() => {
    const settingBorderRadius = () => {
      const borderRadiusResult = min1441
        ? "rounded-3xl"
        : imageFirst
        ? "rounded-r-3xl"
        : "rounded-l-3xl";
      setBorderRadius(borderRadiusResult);
    };
    settingBorderRadius();
  }, [min640, min1024, min1400, min1441, imageFirst]);

  const infoColumnClassName = cn(
    "flex flex-col lg:gap-10 md:gap-6 gap-4 flex-1 px-8 2xl:px-12",
    imageFirst ? "order-last" : "order-first"
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row 2xl:gap-40 lg:gap-20 md:gap-10 gap-4">
        <div className={infoColumnClassName}>
          <Text
            className=" lg:text-[29px] md:text-[24px] text-[20px] text-left leading-[1.2]"
            type="h6"
            font="medium"
          >
            <span className="text-primary-blue">{item.title_blue}</span>
            <span className="text-primary-orange inline-block ml-2">
              {item.title_orange}
            </span>
          </Text>
          {item?.logo ? (
            <div className="flex justify-center">
              <Image
                src={item.logo}
                alt="Logo del aporte pais"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ) : null}
          <div
            className="text-primary-blue sm:text-[18px] text-[16px] text-left font-clan-pro-regular"
            dangerouslySetInnerHTML={{
              __html: item?.description,
            }}
          />
          <ItemInfoSection className="hidden lg:grid" item={item} />
        </div>
        <div
          className={cn(
            "flex mt-4 sm:mt-16",
            imageFirst ? "order-first" : "order-last justify-end"
          )}
        >
          {item?.image ? (
            <div
              className="relative"
              style={{ width: imageWidth, height: imageHeight }}
            >
              <Image
                src={item.image}
                alt="Imagen del aporte pais"
                width={imageWidth}
                height={imageHeight}
                className={cn("object-cover w-full h-full", bordeRadius)}
              />
              <div className="absolute bottom-4 left-6 right-6 flex gap-6 items-center justify-center">
                <Text
                  className="text-white lg:text-[17px] md:text-[15px] text-[14px] text-left"
                  type="h6"
                  font="medium"
                >
                  {item.text_image}
                </Text>
                <Link
                  href={item?.link_button || "/"}
                  className="w-fit"
                  target="_blank"
                >
                  <Button
                    bg={"primary"}
                    border={"primary"}
                    color={"white"}
                    className="font-clan-pro-bold lg:text-[14px] md:text-[13px] w-full lg:h-[47px] sm:h-[44px] h-[36px] md:px-8 px-6"
                  >
                    {item?.text_button}
                  </Button>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <ItemInfoSection
        className="grid lg:hidden lg:mt-12 md:mt-8 mt-6 px-4"
        item={item}
      />
    </div>
  );
};
