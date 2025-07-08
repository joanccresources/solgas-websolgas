import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Scrollbars } from "react-custom-scrollbars-2"; 
import { Card, Text, LocationIcon, ClockIcon, PhoneOutlineIcon } from "@/components"; // Asume que estos componentes están importados
import tailwindConfig from "@root/tailwind.config";
const primaryBlue = tailwindConfig.theme.extend.colors["primary-blue"];
const inactive = tailwindConfig.theme.extend.colors["select"];
import { useWindowSize } from "@uidotdev/usehooks";

const CustomScrollbars = (props: { onScroll: React.UIEventHandler<unknown>; style: React.CSSProperties; children: React.ReactNode }) => {
  const { onScroll, style, children } = props;

  return (
    <Scrollbars
      style={style}
      onScroll={onScroll} 
      autoHide={false}
      renderThumbVertical={(props) => (
        <div
          {...props}
          style={{ backgroundColor: "#888", borderRadius: "4px",  }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
} 

 
const Item = ({  style }: {  style: React.CSSProperties }) => {
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
        style={{ ...style }}
        className=" px-2 w-[584px]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Card className="w-full h-[283px] hover:border-primary-orange cursor-pointer" color="gray">
          <div>
            <Text className="text-primary-blue text-[27px]" type="h5" font="medium">
            -----
            </Text>
          </div>
          <div className="flex-col mt-8 space-y-4">
            <div className="flex gap-x-4">
              <LocationIcon color={color} />
              <Text className="text-primary-blue text-[17px] truncate" type="h6">
              -----
              </Text>
            </div>
            <div className="flex gap-x-4">
              <ClockIcon color={color} />
              <div className="flex-col">
                <Text className="text-primary-blue text-[17px] truncate" type="h6">
                -----
                </Text>
                <Text className="text-primary-blue text-[17px] truncate" type="h6">
                -----
                </Text>
              </div>
            </div>
            <div className="flex gap-x-4">
              <PhoneOutlineIcon color={color} />
              <Text className="text-primary-blue text-[17px] truncate" type="h6">
              -----
              </Text>
            </div>
          </div>
        </Card>
      </div>
    );
}
const VirtualizedList = () => {
  const size = useWindowSize();
 
  return (
   <div className="mt-8 flex justify-center">
     <List
      style={{overflow: 'hidden'}}
      height={350} 
      itemCount={1000}  
      itemSize={350}  
      width={(size.width ?? 0) - 40}  
      outerElementType={CustomScrollbars}  
      layout="horizontal"
    >
      {Item}
    </List>
   </div>
  );
};

export default VirtualizedList;
