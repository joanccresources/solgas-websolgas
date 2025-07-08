import "server-only";
import { get } from "@/utils/fetch";

export const getData =  async () => {
  const data = await get({ path: "/page/nosotros-proposito-solgas", revalidate: 3 });
  return data;
}
