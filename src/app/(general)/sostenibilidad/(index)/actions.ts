import { cache } from "react";
import "server-only";
import { get } from "@/utils/fetch";

export const getData = cache(async () => {
  const data = await get({ path: "/page/sostenibilidad" });
  return data;
});

export const getReports = cache(async () => {
  const data = await get({ path: "/json/get-reporte-de-sostenibilidad" });
  return data;
});
