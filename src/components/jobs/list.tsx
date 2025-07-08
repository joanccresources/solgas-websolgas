import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  Text,
  LocationIcon,
  ClockIcon,
  PhoneOutlineIcon,
} from "@/components";
import tailwindConfig from "@root/tailwind.config";
import { PropsDistributor } from "./body";
import { Virtuoso } from "react-virtuoso";
const primaryBlue = tailwindConfig.theme.extend.colors["primary-blue"];
const inactive = tailwindConfig.theme.extend.colors["select"];

const ItemCard = ({
  distributor,
  color,
}: {
  distributor: PropsDistributor;
  color: string;
}) => {
  return (
    <Card
      className="w-full h-full hover:border-primary-orange cursor-pointer lg:rounded-[48px] sm:rounded-[36px]"
      color="gray"
    >
      <div>
        <Text
          className="text-primary-blue xl:text-[27px] lg:text-lg text-md text-center leading-[1.2] line-clamp-2"
          type="p"
          font="medium"
        >
          {distributor?.name}
        </Text>
      </div>
      <div className="flex-col xl:mt-8 md:mt-6 mt-4 space-y-4">
        <div className="flex flex-col items-center gap-y-2">
          <div>
            <LocationIcon color={color} />
          </div>
          <Text
            className="text-primary-blue xl:text-[17px] lg:text-sm text-[12px] break-words text-center"
            type="p"
          >
            {distributor?.address}
          </Text>
        </div>
        {distributor?.schedule !== "-" ? (
          <div className="flex flex-col items-center gap-y-2">
            <div>
              <ClockIcon color={color} />
            </div>
            <div className="flex-col">
              <Text
                className="text-primary-blue xl:text-[17px] lg:text-sm text-[12px] break-words text-center"
                type="p"
              >
                {distributor?.schedule}
              </Text>
            </div>
          </div>
        ) : null}
        {distributor?.phone !== "0" ? (
          <div className="flex flex-col items-center gap-y-2">
            <div>
              <PhoneOutlineIcon color={color} />
            </div>
            <Text
              className="text-primary-blue xl:text-[17px] lg:text-sm text-[12px] truncate text-center"
              type="p"
            >
              {distributor?.phone}
            </Text>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

const ChunkRow = ({ chunk }: { chunk: PropsDistributor[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-12 gap-6 mb-[24px] w-full">
      {chunk?.map((distributor, index) => {
        const isHovered = hoveredIndex === index;
        const color = isHovered ? primaryBlue : inactive;
        return (
          <div
            key={index}
            className="sm:col-span-4 col-span-12 h-[300px] sm:h-[350px] lg:h-[400px]"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <ItemCard distributor={distributor} color={color} />
          </div>
        );
      })}
    </div>
  );
};

const VirtualizedList = ({
  distributors,
  onSearch,
  firstRender,
}: {
  distributors: PropsDistributor[][];
  onSearch: () => void;
  firstRender: boolean;
}) => {
  const min640 = useMediaQuery({ minWidth: 640 });
  const min1024 = useMediaQuery({ minWidth: 1024 });

  if (distributors.length === 0 && firstRender)
    return (
      <div className="text-primary-blue text-center text-lg">
        No se encontraron resultados
      </div>
    );

  if (distributors.length === 1) {
    return (
      <div className="px-6 lg:px-12 w-full">
        <ChunkRow chunk={distributors[0]} />
      </div>
    );
  }
  return (
    <Virtuoso
      totalCount={distributors.length}
      itemContent={(index) => <ChunkRow chunk={distributors[index]} />}
      endReached={onSearch}
      initialTopMostItemIndex={0}
      overscan={3}
      style={{ height: min1024 ? 624 : min640 ? 549 : 474, width: "100%" }}
    />
  );
};

export default VirtualizedList;
