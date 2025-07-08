"use client";
import { useMediaQuery } from "react-responsive";
import { getHeaders } from "@/app/actions";
import { CallWhitIcon, WhatsappIcon, Text } from "@/components";
import { cn } from "@/lib/utils";
import { formatPhone } from "@/utils/format";
import { useEffect, useState } from "react";
import { useHover } from "@uidotdev/usehooks";

export function CallPhone({ number }: { number: string }) {
  const phoneNumber = `tel:${formatPhone(number)}`;
  const [ref, hovering] = useHover();
  const min640 = useMediaQuery({ minWidth: 640 });
  const [size, setSize] = useState<string>("60");

  useEffect(() => {
    const initial = () => {
      setSize(min640 ? "60" : "45");
    };

    initial();
  }, [min640]);

  const className = cn(
    `fixed right-0  z-[110] transition-all duration-300 ease-in-out  top-1/2`,
    hovering ? "-right-[10px]" : "-right-[200px]"
  );

  const classNameTransition = cn(
    "absolute  w-[183px] flex-col transition-all duration-300 text-center ease-in-out cursor-pointer",
    hovering ? "left-1/3" : "right-0"
  );

  return (
    <div className={className} ref={ref}>
      <div className="sm:h-[86px] h-[70px] relative bg-gradient-to-r from-light-blue sm:w-[308px] w-[280px] to-primary-blue flex items-center pl-6 rounded-l-full ">
        <button className="cursor-pointer">
          <CallWhitIcon width={size} height={size} />
        </button>
        <a className={classNameTransition} href={phoneNumber}>
          <Text
            font="medium"
            className="sm:text-[18px] text-[14px] text-white"
            type="p"
            line="1"
          >
            Central de pedidos
          </Text>
          <Text
            font="bold"
            className="sm:text-[25px] text-[20px] text-white"
            type="p"
            line="1"
          >
            {number}
          </Text>
        </a>
      </div>
    </div>
  );
}

export function CallWhatsApp({ number }: { number: string }) {
  const phoneNumber = `https://wa.me/${formatPhone(number)}`;

  const [ref, hovering] = useHover();
  const min640 = useMediaQuery({ minWidth: 640 });
  const [size, setSize] = useState<string>("60");

  useEffect(() => {
    const initial = () => {
      setSize(min640 ? "60" : "45");
    };

    initial();
  }, [min640]);

  const className = cn(
    " fixed right-0 top-[795px] z-[110] transition-all duration-300 ease-in-out top-1/2 sm:mt-26 mt-22",
    hovering ? "right-[0px]" : "-right-[200px]"
  );

  const classNameTransition = cn(
    "absolute  sm:w-[208px] flex-col transition-all duration-300 ease-in-out text-center cursor-pointer",
    hovering ? "left-[90px]" : "-right-16"
  );
  return (
    <div className={className} ref={ref}>
      <div className="sm:h-[86px] h-[70px] relative bg-gradient-to-r from-light-green  to-green sm:w-[308px] w-[280px]  flex items-center pl-6 rounded-l-full ">
        <button className="cursor-pointer">
          <WhatsappIcon width={size} height={size} />
        </button>
        <a className={classNameTransition} href={phoneNumber} target="_blank">
          <Text
            font="medium"
            className="sm:text-[18px] text-[14px] text-white"
            type="p"
            line="1"
          >
            Central de pedidos
          </Text>
          <Text
            font="bold"
            className="sm:text-[25px] text-[20px] text-white"
            type="p"
            line="1"
          >
            {number}
          </Text>
        </a>
      </div>
    </div>
  );
}

export default function Call() {
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
    <div>
      <CallPhone number={phone} />
      <CallWhatsApp number={whatsapp} />
    </div>
  );
}
