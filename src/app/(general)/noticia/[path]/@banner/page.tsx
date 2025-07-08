import { BannerGeneral } from "@/components";
import { getData } from "../actions";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Banner() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const slug = pathname ? pathname.split("/").pop() : "";
  const { data } = slug ? await getData(slug || "") : { data: null };
  if(data?.active === 0) notFound()

  const items = [
    {
      id: "0", 
      img: data?.image_format,
      img_sm: data?.image_format,
       
      defaultTitleColors: true,
    },
  ];
  return <BannerGeneral items={items} height='h-home' />;
}
 