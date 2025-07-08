"use client";
import AnimatedContent from "@/components/animation/content";
import { Button, Text } from "@/components";
import { useAtom } from "jotai";
import { cookiesAcceptedAtom, floatBannerCookieAtom, heightFooterAtom } from "@/store";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import isUndefined from "lodash/isUndefined";
import { getCaptchaToken } from "@/utils/recaptcha";
import { setCookies } from "@/app/actions";
import Link from "next/link";

interface PropsCookies {
  data_cookie: {
    description_cookie: string;
    more_information_cookie: string;
    more_information_cookie_format: string;
    text_button_allow_cookie: string;
    text_button_necessary_cookie: string;
    title_cookie: string;
  }
}
export default function CookiesView({data_cookie}: PropsCookies) {
  const [floatBannerCookie] = useAtom(floatBannerCookieAtom);
  const [cookiesView, setCookiesView] = useAtom(cookiesAcceptedAtom);
  const [isVisible, setIsVisible] = useState(false);
  const [heightFooter] = useAtom(heightFooterAtom); 
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const cookiesAccepted = Cookies.get("cookies_view");  
    if(!isUndefined(cookiesAccepted)){
      setCookiesView(false);
      setShouldRender(false);
    }
  }, []);

  useEffect(() => {
    if (isUndefined(cookiesView)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match the transition duration
      return () => clearTimeout(timer);
    }
  }, [cookiesView]);
 
  const acceptCookies = async () => {
    Cookies.set("cookies_view", "true", { expires: 180 });
    setCookiesView(false);
    const token = await getCaptchaToken();
    if(token) setCookies(true,token);
  };  

  const rejectCookies = async () => {
    Cookies.set("cookies_view", "false", { expires: 180 });
    setCookiesView(false);
    const token = await getCaptchaToken();
    if(token) setCookies(false,token);
  };

  if (!shouldRender) return null;

  return (
    <AnimatedContent
      distance={150}
      direction="vertical"
      reverse={false}
      config={{ tension: 80, friction: 20 }}
      initialOpacity={0.2}
      animateOpacity
      scale={1.1}
      threshold={0.2}
      style={{
        position: floatBannerCookie ? "absolute" : "fixed",
        bottom: floatBannerCookie ? heightFooter : 0,
        left: 0,
        width: "100%",
        zIndex: 120,
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div
        className="w-full  bg-user-comment lg:min-h-[220px] xl:min-h-auto z-[1000] p-6"
        id="cookies"
      >
        <Text className="text-primary-blue md:text-[18px] text-[15px] pb-2" font="medium">
          {data_cookie.title_cookie}
        </Text>
        <div className="flex flex-wrap">
          <Text className="text-black md:text-[13px] text-[12px]">
            {data_cookie.description_cookie}
            <Link href={`/pdf/informacion/${data_cookie.more_information_cookie}`}>
              <Text
              className="text-primary-blue md:text-[13px] text-[10px] pl-2 underline"
              font="medium"
              type="span"
            >
              Más información
            </Text>
            </Link>
          </Text>
        </div>
        <div className="md:flex  w-full grid justify-end gap-2 px-4 pt-4">
          <div>
            <Button onClick={rejectCookies} className="px-2 bg-primary-orange text-white md:text-[12px] text-[10px] font-clan-pro-medium min-h-[38px] rounded-none">
              {data_cookie.text_button_necessary_cookie}
            </Button>
          </div>
          <Button onClick={acceptCookies} className="px-2 bg-primary-blue text-white md:text-[12px] text-[10px] font-clan-pro-medium min-h-[38px] rounded-none">
            {data_cookie.text_button_allow_cookie}
          </Button>
        </div>
      </div>
    </AnimatedContent>
  );
}
