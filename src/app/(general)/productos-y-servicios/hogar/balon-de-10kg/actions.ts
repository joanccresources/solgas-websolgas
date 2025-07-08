import { cache } from "react";
import { get } from "@/utils/fetch";

export const getData = cache(async () => {
  const data = await get({
    path: "/page/productos-y-servicios-hogar-balon-10kg",
  });
  return data;
});
