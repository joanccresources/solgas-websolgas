import { get } from "@/utils/fetch"; 

export const getData = async () => {
  const data = await get({ path: "/page/home", revalidate: 3});
  return data;
}
