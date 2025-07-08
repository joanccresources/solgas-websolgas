import { cache } from "react";
import { get, post } from "@/utils/fetch";

export const getData = cache(async () => {
  const data = await get({ path: "/page/quiero-ser-distribuidor" });
  return data;
});

export const createPost = async (
  data: Record<string, string | number | boolean>
) => {
  const result = await post({
    path: "/post/lead-distributor",
    params: data,
  });
  return result;
};
