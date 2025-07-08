import { cache } from "react";
import { get } from "@/utils/fetch";

export const getData = cache(async () => {
  const data = await get({ path: "/page/promociones" });
  return data;
});
