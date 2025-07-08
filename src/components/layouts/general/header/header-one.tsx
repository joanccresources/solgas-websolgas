'use client';
import { useState } from "react";
import {
  Iconify,
  Button,
  ItemNavigationMenu,
  ItemsNavigationMenu,
} from "@/components";
import tailwindConfig from "@root/tailwind.config";
import Container from "../../container";
import { ButtonSubItems } from "@/components/nav/horizontal/navigation-menu";
import Link from "next/link";

const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];

export default function HeaderOne({
  navItems,
}: {
  readonly navItems: readonly ItemsNavigationMenu[];
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownClick = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id); // Toggle dropdown on click
  };

  return (
    <div className="h-[53.1px] bg-header-one w-full">
      <Container className="relative h-[53.1px]">
        <div className="flex gap-x-4 justify-end items-center h-[53.1px]">
          {navItems?.map((item: ItemsNavigationMenu) => {
            return item?.subItems && item?.subItems.length > 0 ? (
              <div
                className="group relative"
                key={item.id}
                onClick={() => handleDropdownClick(item.id)}
              >
                <Button
                  className="h-[28px] w-[119px] flex justify-center gap-x-2 items-center"
                  bg={"transparent"}
                  border={"white"}
                  color={"white"}
                >
                  {item.title}
                  <Iconify
                    icon="solar:alt-arrow-down-outline"
                    width={18}
                    height={18}
                    color={primaryOrange}
                  />
                </Button>
                {/* Hover for desktop and click for mobile */}
                <ul
                  className={`absolute left-1/2 -translate-x-1/2 z-60 space-y-1 bg-transparent max-h-0 overflow-hidden transition-all 
                  ${activeDropdown === item.id ? "block max-h-[700px] pb-4 pt-6" : ""}
                  group-hover:block group-hover:max-h-[700px] group-hover:pb-4 group-hover:pt-6
                  md:hidden`} // Only hide on mobile
                >
                  {item?.subItems?.map((subItem: ItemNavigationMenu) => (
                    <ButtonSubItems subItem={subItem} key={subItem.id} />
                  ))}
                </ul>

                {/* Mobile view */}
                <ul
                  className={`absolute left-1/2 -translate-x-1/2 z-60 space-y-1 bg-transparent max-h-0 overflow-hidden transition-all 
                  ${activeDropdown === item.id ? "block max-h-[700px] pb-4 pt-6" : ""}
                  hidden md:block`} // Show on desktop (no hover)
                >
                  {item?.subItems?.map((subItem: ItemNavigationMenu) => (
                    <ButtonSubItems subItem={subItem} key={subItem.id} />
                  ))}
                </ul>
              </div>
            ) : (
              <Link href={item.path ?? "/"} key={item.id}>
                <Button
                  className="h-[28px] w-[119px]"
                  bg={"transparent"}
                  border={"white"}
                  color={"white"}
                >
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}