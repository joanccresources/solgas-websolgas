"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { Button, CallWhitIcon } from "@/components";
import { formatPhone } from "@/utils/format";

export const PhoneCard = ({ phone }: { phone: string }) => {
  const min768 = useMediaQuery({ minWidth: 768 });
  const min1280 = useMediaQuery({ minWidth: 1280 });
  const [size, setSize] = useState<string>("79");
  useEffect(() => {
    const initial = () => {
      setSize(min1280 ? "79" : min768 ? "55" : "45");
    };

    initial();
  }, [min1280, min768]);

  return (
    <Link href={`tel:${formatPhone(phone)}` || "/"}>
      <Button
        height="50px"
        bg={"primary"}
        border={"primary"}
        color={"white"}
        className="flex xl:gap-8 md:gap-6 gap-4 items-center xl:text-[40px] md:text-[26px] text-[20px] font-clan-pro-medium xl:w-[475px] md:w-[340px] w-[250px] xl:h-[112px] md:h-[80px] h-[60px]"
      >
        <CallWhitIcon key="call-icon" width={size} height={size} />
        {phone}
      </Button>
    </Link>
  );
};
