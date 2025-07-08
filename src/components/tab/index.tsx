"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Text } from "../text";
import { useAtom, useSetAtom } from "jotai";
import { stationServiceAtom, updateStationServiceAtom } from "@/store";

type Tab = {
  title: string;
  value: string;
  color?: string;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
}) => {
  const [active] = useAtom(stationServiceAtom);
  const setActive = useSetAtom(updateStationServiceAtom);
   
  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setActive({ id: idx, subItem: null });
  };
  const [, setHovering] = useState(false);
  
  return (
    <div
      className={cn(
        "flex flex-row items-end justify-start gap-x-8 [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
        containerClassName
      )}
    >
      {propTabs.map((tab, idx) => (
        <button
          key={tab.title}
          onClick={() => {
            moveSelectedTabToTop(idx);
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className={cn(
            "relative py-2 w-1/2 cursor-pointer transition-all duration-300",
            active.id === idx ? "lg:h-[74px] h-[37px]" : "lg:h-[53px] h-[31px]",
            tabClassName
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            layoutId="clickedbutton"
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className={cn(
              "absolute inset-0  border border-b-0  rounded-t-[8px] cursor-pointer",
              active.id === idx
                ? "border-t-primary-orange border-l-primary-orange border-r-primary-orange"
                : "border-t-select border-l-select border-r-select",
              activeTabClassName,
              `bg-${tab.color}`
            )}
          />
          <Text
            className="relative block text-primary-blue lg:text-[24px] text-xs"
            font="new"
          >
            {tab.title}
          </Text>
        </button>
      ))}
    </div>
  );
};
