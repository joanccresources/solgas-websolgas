"use client";
import Script from "next/script";
import { getHeaders } from "@/app/actions";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Recaptcha() {
  const [recaptchaKey, setRecaptchaKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecaptchaKey = async () => {
      try {
        const header = await getHeaders(); 
        const key = header?.data?.general_information?.recaptcha_site_key;
        Cookies.set("recaptcha_site_key", key);
        if (key) {
          setRecaptchaKey(key);
        }
      } catch (error) {
        console.error("Error fetching reCAPTCHA key:", error);
      }
    };

    fetchRecaptchaKey();

    return () => setRecaptchaKey(null);
  }, []);

  return (
    <>
      {recaptchaKey && (
        <Script
          strategy="lazyOnload"
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`}
          onLoad={() => console.log("reCAPTCHA script loaded")}
        />
      )}
    </>
  );
}
