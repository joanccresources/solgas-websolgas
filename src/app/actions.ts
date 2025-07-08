"use server";
import { get, post } from "@/utils/fetch";

export const getDepartments = async () => {
  const data = await get({ path: "/json/departments" });
  return data;
};

export const getProvinces = async (department_id: string) => {
  const data = await get({ path: `/json/provinces/${department_id}` });
  return data;
};

export const getDistricts = async (
  department_id: string,
  province_id: string
) => {
  const data = await get({
    path: `/json/districts/${department_id}/${province_id}`,
  });
  return data;
};

export const getHeaders = async () => {
  const data = await get({ path: `/layout/header` });
  return data;
};
export const getFooter = async () => {
  const data = await get({ path: `/layout/footer` });
  return data;
};

export const geSiteMapPages = async () => {
  const data = await get({ path: `/sitemap/pages` });
  return data;
};

export const geSiteMapPosts = async () => {
  const data = await get({ path: `/sitemap/posts` });
  return data;
};

export const getPages = async (params: Record<string, string>) => {
  const data = await get({ path: `/layout/hierarchy`, params });
  return data;
};

export const getMapDistributor = async (params = "?page=1&per_page=9") => {
  const data = await get({
    path: "/json/get-map-distributor" + params,
  });
  return data;
};

export const setCookies = async (accept: boolean, captcha: string) => {
  const data = await post({ path: `/post/cookie-consent`, params: { 
      "cookie_preferences": {
        "necessary": {
          "contact_form_captcha": true,
          "google_maps": true
        },
        "analytics": {
          "google_tag_manager_analytics": accept
        },
        "marketing": {
          "google_tag_manager_marketing": accept
        }
      },
      "q_recaptcha": captcha
   } });
  return data;
};