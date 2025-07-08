import { cache } from "react";
import { get } from "@/utils/fetch";

export const getData = cache(async () => {
  const data = await get({ path: "/page/noticias" });
  return data;
});

export const getCategories = cache(async () => {
  const data = await get({ path: "/json/get-categories" });
  return data;
});

export const getElements = cache(async (params: string) => {
  const data = await get({ path: "/blog/post" + (params ? `?${params}` : "") });
  return data;
});
