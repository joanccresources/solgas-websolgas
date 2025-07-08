import { Iconify, ItemsNavigationMenu } from "@/components";
import React, { useState, useEffect, useRef } from "react";
import { Image } from "@/components";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "./data";
import { Scrollbars } from "react-custom-scrollbars-2";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { headerAtom } from "@/store";
import Link from "next/link";

const Sidebar = ({
  logo,
  items,
}: {
  logo: string;
  items: ItemsNavigationMenu[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [, setHeader] = useAtom(headerAtom);
  const classNameMenu = cn(
    ` transition ease transform duration-300`,
    isOpen ? "rotate-180" : ""
  );
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setHeader({ view: false });
    } else {
      setHeader({ view: true });
    }
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen, setHeader]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      contentRef.current &&
      !contentRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {isOpen ? (
        <div className="fixed top-0 left-0 bg-linear-to-r from-black/80 to-header/80  backdrop-blur-md  h-screen w-screen  z-90" />
      ) : null}
      <div
        ref={contentRef}
        className={` transition-margin duration-300 ml-0 absolute top-0 left-0 z-90  ${
          isOpen ? "ml-[15rem]" : ""
        }`}
      >
        <button
          className="flex flex-col h-10 w-10 border-1 border-white  rounded-full bg-white/30 backdrop-blur-md justify-center items-center group z-50"
          onClick={toggleSidebar}
        >
          <Iconify
            icon={
              !isOpen
                ? "solar:hamburger-menu-line-duotone"
                : "material-symbols:close-rounded"
            }
            color="white"
            className={classNameMenu}
          />
        </button>
      </div>

      <div className="  bg-primary-blue z-100">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-primary-blue fixed h-screen z-200 top-0 left-0 w-64 text-white transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Link href="/" className="flex justify-center py-6">
            <Image
              src={logo}
              alt="Logo"
              height={33}
              width={184}
              className="bg-cover"
              objectFit="contain"
            />
          </Link>

          <Scrollbars
            className="mt-4"
            style={{ height: "calc( 100vh - 10rem)", position: "relative" }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            thumbMinSize={40}
            universal={true}
          >
            <Accordion multiple>
              {items?.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionHeader
                    icon={
                      item?.subItems ? (
                        <Iconify icon="solar:alt-arrow-right-line-duotone" />
                      ) : null
                    }
                  >
                    {!item?.subItems && item.path ? (
                      <Link href={item.path}>
                        <button onClick={() => setIsOpen(false)}>
                          {item.title}
                        </button>
                      </Link>
                    ) : (
                      item.title
                    )}
                  </AccordionHeader>
                  {item?.subItems ? (
                    <>
                      <AccordionPanel>
                        {item?.subItems.map((subItem) => (
                          <AccordionItem key={subItem.id} value={subItem.id}>
                            <AccordionHeader icon={null}>
                              {subItem.path ? (
                                <Link href={subItem.path}>
                                  <button onClick={() => setIsOpen(false)}>
                                    {subItem.title}
                                  </button>
                                </Link>
                              ) : (
                                subItem.title
                              )}
                            </AccordionHeader>
                            {subItem?.subItems ? (
                              <AccordionPanel>
                                {subItem?.subItems.map((subItemTwo) => (
                                  <AccordionItem
                                    key={subItemTwo.id}
                                    value={subItemTwo.id}
                                  >
                                    <AccordionHeader icon={null}>
                                      {subItemTwo.path ? (
                                        <Link href={subItemTwo.path}>
                                          <button
                                            onClick={() => setIsOpen(false)}
                                          >
                                            {subItemTwo.title}
                                          </button>
                                        </Link>
                                      ) : (
                                        subItemTwo.title
                                      )}
                                    </AccordionHeader>
                                  </AccordionItem>
                                ))}
                              </AccordionPanel>
                            ) : null}
                          </AccordionItem>
                        ))}
                      </AccordionPanel>
                    </>
                  ) : null}
                </AccordionItem>
              ))}
            </Accordion>
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
