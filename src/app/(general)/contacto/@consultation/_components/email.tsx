"use client";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { EmailIcon, Text } from "@/components";
import Link from "next/link";

const EmailGradient = () => {
  return (
    <div
      className="
    bg-contain
    bg-no-repeat
    bg-bottom 
    rounded-full
    lg:h-[104px] sm:h-[80px] h-[60px] lg:w-[560px] sm:w-[460px] w-[340px] absolute top-0 left-0 bottom-0 right-0 z-20 bg-linear-to-r from-light-blue to-primary-blue"
    />
  );
};

export const EmailCard = ({ email }: { email: string }) => {
  const min640 = useMediaQuery({ minWidth: 640 });
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [size, setSize] = useState<string>("63");
  useEffect(() => {
    const initial = () => {
      setSize(min1024 ? "63" : min640 ? "55" : "38");
    };

    initial();
  }, [min1024, min640]);

  return (
    <Link href={`mailto:${email}`} className="w-fit mx-auto">
      <div
        className={`relative lg:h-[104px] sm:h-[80px] h-[60px] lg:w-[560px] sm:w-[460px] w-[340px] rounded-full `}
      >
        <EmailGradient />
        <div className="relative flex items-center justify-center h-full sm:px-4 px-4 pr-2 sm:pr-4 z-30 sm:gap-3 gap-2">
          <div>
            <EmailIcon width={size} height={size} />
          </div>
          <Text
            className="text-white lg:text-[26px] sm:text-lg text-base text-left leading-snug"
            type="h6"
            font="medium"
          >
            {email}
          </Text>
        </div>
      </div>
    </Link>
  );
};
