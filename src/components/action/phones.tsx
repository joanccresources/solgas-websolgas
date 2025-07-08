"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CallWhitIcon, WhatsappIcon, Text, ActionSection } from "@/components";
import { ContentRelsType, formatPhone } from "@/utils/format";
import { getHeaders } from "@/app/actions";
import Link from "next/link";

const FIELDS = ["telefono", "whatsapp"];

const BgGradient = ({ index }: { index: number }) => {
  if (index === 0) {
    return (
      <div
        className="
    bg-contain
    bg-no-repeat
    bg-bottom 
    rounded-full
    lg:h-[70px] sm:h-[45px] h-[33px] lg:w-[310px] sm:w-[230px] w-[160px] absolute top-0 left-0 bottom-0 right-0 z-20 bg-linear-to-r from-light-blue to-primary-blue"
      />
    );
  } else {
    return (
      <div
        className="
    bg-contain
    bg-no-repeat
    bg-bottom 
    rounded-full
    lg:h-[70px] sm:h-[45px] h-[33px] lg:w-[310px] sm:w-[230px] w-[160px] absolute top-0 left-0 bottom-0 right-0 z-20 bg-linear-to-r from-light-green  to-green"
      />
    );
  }
};

export const PhoneCard = ({
  description,
  phone_number,
  index,
}: {
  description?: string;
  phone_number: string;
  index: number;
}) => {
  const min640 = useMediaQuery({ minWidth: 640 });
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [size, setSize] = useState<string>("45");
  useEffect(() => {
    const initial = () => {
      setSize(min1024 ? "45" : min640 ? "25" : "20");
    };

    initial();
  }, [min1024, min640]);

  const ICONS = [
    <CallWhitIcon key="call-icon" width={size} height={size} />,
    <WhatsappIcon key="whatsapp-icon" width={size} height={size} />,
  ];

  return (
    <div className="lg:col-span-2 col-span-3 flex flex-col items-center">
      {description ? (
        <Text
          className="text-white lg:text-[30px] sm:text-lg text-md lg:w-[315px] lg:block hidden text-left leading-snug mb-2"
          type="h6"
          font="medium"
        >
          {description}
        </Text>
      ) : null}
      <Link
        href={
          index === 0
            ? `tel:${formatPhone(phone_number)}`
            : `https://wa.me/${formatPhone(phone_number)}`
        }
      >
        <div
          className={`relative lg:h-[70px] sm:h-[45px] h-[33px] lg:w-[310px] sm:w-[230px] w-[160px] rounded-full `}
        >
          <BgGradient index={index} />
          <div className="relative flex items-center justify-between h-full sm:px-6 px-4 pr-4 sm:pr-6 z-30 sm:gap-3 gap-2">
            {ICONS[index]}
            <Text
              className="text-white lg:text-[26px] sm:text-lg text-[13px] text-left leading-snug"
              type="h6"
              font="medium"
            >
              {phone_number}
            </Text>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function ActionPhone({
  section_fields,
}: {
  section_fields: ContentRelsType;
}) {
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");

  const onInitial = async () => {
    const data = await getHeaders();
    setWhatsapp(data.data.general_information.whatsapp);
    setPhone(data.data.general_information.phone);
  };

  useEffect(() => {
    onInitial();
  }, []);

  return (
    <ActionSection heightClassName="lg:h-[208px] h-[110px]">
      <div className="h-full grid grid-cols-6 justify-center items-center lg:gap-x-6 gap-x-4">
        <Text
          className="text-white lg:text-[37px] text-md text-center lg:text-left leading-snug lg:col-span-2 col-span-6 mb-[-24px] lg:mb-0"
          type="h1"
          font="bold"
        >
          {section_fields?.descripcion_pedido?.value}
        </Text>
        {FIELDS.map((field, index) => (
          <PhoneCard
            key={index}
            description={section_fields?.[`descripcion_${field}`]?.value}
            phone_number={index === 0 ? phone : whatsapp}
            index={index}
          />
        ))}
      </div>
    </ActionSection>
  );
}
