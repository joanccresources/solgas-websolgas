"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Social, { Icons } from "@/components/layouts/general/footer/social";
import tailwindConfig from "@root/tailwind.config";

const primaryBlue = tailwindConfig.theme.extend.colors["primary-blue"];

export const SocialNetworks = ({
  elements,
}: {
  elements: {
    url: string;
    master_social_network_rel: { name: string; icon: keyof Icons };
  }[];
}) => {
  const min768 = useMediaQuery({ minWidth: 768 });
  const min1280 = useMediaQuery({ minWidth: 1280 });
  const [size, setSize] = useState<string>("45");
  useEffect(() => {
    const initial = () => {
      setSize(min1280 ? "45" : min768 ? "40" : "35");
    };

    initial();
  }, [min1280, min768]);

  return (
    <Social
      elements={elements}
      orangeIcons={false}
      withTitle={false}
      iconClassName="bg-transparent xl:h-[78px] md:h-[68px] h-[60px] xl:w-[78px] md:w-[68px] w-[60px] border-white border rounded-full"
      iconSize={size}
      triangleColor={primaryBlue}
    />
  );
};
