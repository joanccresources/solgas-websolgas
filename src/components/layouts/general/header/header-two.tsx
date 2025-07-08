"use client";
import { Search } from "@/components/forms/input";
import { ItemsNavigationMenu, NavigationMenu } from "@/components/nav";
import BtnPhone from "./btn-phone";
import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { Call, Image } from "@/components";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAtom } from "jotai";
import { floatBannerCookieAtom, headerAtom, heightFooterAtom } from "@/store";
import { isPDF, pathsBgDark } from "@/utils/navigation";
import Container from "../../container";

const SidebarDrawer = dynamic(
  () => import("@/components/layouts/general/sidebar"),
  {
    ssr: false,
  }
);

export default function HeaderTwo({
  logo_principal,
  phone,
  navItems,
  notFound = false,
}: {
  logo_principal: string;
  phone: string;
  navItems: ItemsNavigationMenu[];
  notFound?: boolean;
}) {
  const [sticky, setSticky] = useState<boolean>(false);
 
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const osInstanceRef = useRef<OverlayScrollbars | null>(null);
  const pathname = usePathname();
  const bgDark = pathsBgDark.includes(pathname) || isPDF(pathname) || notFound;
  const [header] = useAtom(headerAtom);
  const [, setFloatBannerCookie] = useAtom(floatBannerCookieAtom);
  const [, setHeightFooter] = useAtom(heightFooterAtom);
  useEffect(() => {
    function onscroll() {
      osInstanceRef.current = OverlayScrollbars(
        document.body,
        {
          overflow: {
            x: "hidden",
            y: "scroll",
          },
          scrollbars: {
            theme: "os-theme-dark",
            visibility: "auto",
            autoHide: "never",
            autoHideDelay: 1300,
            autoHideSuspend: false,
            dragScroll: true,
            clickScroll: false,
            pointers: ["mouse", "touch", "pen"],
          },
        },
        {
          scroll: () => {
            const elements = osInstanceRef.current?.elements();
            const viewport = elements?.viewport;
            const scrollTop = viewport?.scrollTop || 0;
            const scrollHeight = viewport?.scrollHeight || 0;
            const clientHeight = viewport?.clientHeight || 0;
            const distanceToBottom = scrollHeight - scrollTop - clientHeight;
            const footer = document.getElementById("footer");
            const footerHeight = footer?.offsetHeight || 0;
            setHeightFooter(footerHeight);
            if(distanceToBottom  <= footerHeight){
              setFloatBannerCookie(true);
            }else{
              setFloatBannerCookie(false);
            }
            if (scrollTop > 53) {
              setSticky(true);
            } else {
              setSticky(false);
            }
          },
        }
      );
    }

    if (header.view) onscroll();

    return () => {
      osInstanceRef?.current?.destroy();
    };
  }, [isDesktopOrLaptop, header]);

  const className = cn(
    "h-[67px] z-50 left-0 w-full ",
    sticky
      ? "fixed top-0 z-50 animate-fade animate-fade-down  bg-header/80"
      : "absolute top-[53.1px]  bg-header/60",
    bgDark
      ? "bg-linear-to-r from-header-two-2 to-header-two-1"
      : " backdrop-blur-[10px]"
  );

  return (
    <div className={cn(bgDark ? "pb-[65px]" : "")}>
      <Call />
      {/* <div className="h-4 absolute left-0 w-full bg-black  z-10" /> */}
      <div className={className}>
        <Container className="h-[67px] z-50 relative">
          <div className="flex h-[67px] justify-between items-center w-full  gap-8">
            <div className="lg:block hidden">
              <Link href="/">
                {logo_principal ? (
                  <Image
                    src={logo_principal}
                    width={141}
                    height={25}
                    alt={"Logo"}
                    objectFit="contain"
                    style={{ height: 25, width: 141 }}
                  />
                ) : null}
              </Link>
            </div>
            <div className="w-full flex justify-between gap-8 items-center">
              <div className="lg:block hidden">
                <NavigationMenu items={navItems} />
              </div>
              <div className="lg:hidden relative h-10 ">
                <div className="absolute top-0">
                  <SidebarDrawer items={navItems} logo={logo_principal} />
                </div>
              </div>

              <Search />
              <div className="lg:block hidden">
                <BtnPhone phone={phone} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
