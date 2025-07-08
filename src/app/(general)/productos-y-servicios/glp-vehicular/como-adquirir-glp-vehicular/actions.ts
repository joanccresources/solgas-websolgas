"use server";
import { cache } from "react";
import { get, post } from "@/utils/fetch";

export const getData = cache(async () => {
  const data = await get({
    path: "/page/productos-y-servicios-glp-vehicular-como-adquirir",
  });
  return data;
});

export const createPost = async (formData: FormData) => {
  const params = Object.fromEntries(formData);
  const result = await post({ path: "/post/lead-service-station", params });
  return result;
};
