"use client";

import * as React from "react";
import { Text } from "@/components";
import ButtonAnimatedGradient from "./item";
import { ItemNavigationMenu, ItemsNavigationMenu } from "./type";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const ButtonSubItems = ({
  subItem,
}: {
  subItem: ItemNavigationMenu;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative px-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ButtonAnimatedGradient title={subItem.title} path={subItem.path}>
        {isHovered ? (
          <div className="z-80 absolute -right-[145px]  top-0">
            {subItem.subItems?.map((item) => (
              <ButtonAnimatedGradient
                key={item.id}
                title={item.title}
                path={item.path}
              />
            ))}
          </div>
        ) : null}
      </ButtonAnimatedGradient>
    </div>
  );
};

export default function NavigationMenu({
  items,
}: {
  items: ItemsNavigationMenu[];
}) {
  const path = usePathname();
  const getActive = (item: string | undefined, subItems: string[]) => {
    const pathInitial = path.split("/")[1];
    if (path === "/") {
      return false;
    } else if (item) {
      const pathWithoutBaseUrl = item
        .replace(/^https?:\/\/[^/]+\//, "")
        .split("/")[0];
      return pathWithoutBaseUrl === `${pathInitial}`;
    } else if (subItems.length > 0) {
      const pathsWithoutBaseUrl = subItems.map(
        (subItem) => subItem.replace(/^https?:\/\/[^/]+\//, "").split("/")[0]
      );
      return pathsWithoutBaseUrl.includes(`${pathInitial}`);
    }

    return false;
  };

  const titleRoute = (
    title: string,
    path: string | undefined,
    subItems: string[]
  ) => (
    <div className=" flex items-center cursor-pointer text-center">
      <Text
        className="text-white xl:text-sm text-xs"
        type="h1"
        border
        border_active={getActive(path, subItems)}
      >
        {title}
      </Text>
    </div>
  );

  return (
    <div>
      <div className="flex lg:flex-wrap lg:justify-center py-3 relative">
        <div
          id="collapseMenu"
          className="max-lg:hidden lg:block! max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <ul
            className=" flex items-center max-lg:fixed max-lg:w-2/3 max-lg:min-w-[280px] max-lg:top-0 max-lg:left-0 max-lg:p-4 
                max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 w-auto "
          >
            {items?.map((item: ItemsNavigationMenu) => (
              <li
                className="group max-lg:px-3 relative xl:mx-[11px] mx-[8px] items-center "
                key={item.id}
              >
                {item?.subItems ? (
                  titleRoute(
                    item.title,
                    item.path,
                    item.subItems.map((sub) => sub.path)
                  )
                ) : (
                  <Link href={item.path || ""} legacyBehavior>
                    {titleRoute(item.title, item.path, [])}
                  </Link>
                )}

                {item?.subItems ? (
                  <ul
                    className="absolute max-lg:top-8  left-1/2 -translate-x-1/2  z-50 space-y-1 bg-transparent max-h-0 
                    hidden group-hover:block   group-hover:max-h-[700px] group-hover:pb-4 group-hover:pt-6 "
                  >
                    {item?.subItems?.map((subItem: ItemNavigationMenu) => (
                      <ButtonSubItems subItem={subItem} key={subItem.id} />
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
