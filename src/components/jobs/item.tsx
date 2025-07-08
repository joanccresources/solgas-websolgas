import { Card, LocationIcon, Text, ClockIcon, PhoneOutlineIcon } from "@/components";
import { useState } from "react";
import tailwindConfig from "@root/tailwind.config";
const primaryBlue = tailwindConfig.theme.extend.colors["primary-blue"];
const inactive = tailwindConfig.theme.extend.colors["select"];

export default function Item() {
  const [isHovered, setIsHovered] = useState(false);
  const color = isHovered ? primaryBlue : inactive;

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{ height: 283, width: '100%' }}
      className="mb-[30px] pr-2 pt-6"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave} 
    >
      <Card
        className="w-full h-[283px] hover:border-primary-orange cursor-pointer"
        color="gray"
      >
        <div>
          <Text
            className="text-primary-blue lg:text-[27px] text-lg select-none"
            font="medium"
          >
           -----
          </Text>
        </div>
        <div className="flex-col mt-8 space-y-4">
          <div className="flex gap-x-4">
            <LocationIcon color={color} />
            <Text
              className="text-primary-blue lg:text-[17px] text-xs select-none"
              type="h6"
              line="2"
            >
                 -----
            </Text>
          </div>
          <div className="flex gap-x-4">
            <ClockIcon color={color} />
            <div className="flex-col">
              <Text
                className="text-primary-blue lg:text-[17px] text-xs select-none"
                type="h6"
                line="1"
              >
                   -----
              </Text>
              <Text
                className="text-primary-blue lg:text-[17px] text-xs select-none"
                type="h6"
                line="1"
              >
                   -----
              </Text>
            </div>
          </div>
          <div className="flex gap-x-4">
            <PhoneOutlineIcon color={color} />
            <Text
              className="text-primary-blue lg:text-[17px] text-xs select-none"
              type="h6"
             line="1"
            >
                 -----
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}
