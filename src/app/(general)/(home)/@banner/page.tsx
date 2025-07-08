import { BannerGeneral } from "@/components";
import { getData } from "../actions";

export default async function Banner() {
  const { data } = await getData();
  const elements = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner"
  )?.content_rels;

  const items = [
    {
      id: "0",
      title: elements.title.value, 
      img: elements.imagen.value_format,
      img_sm: elements.imagen_responsive.value_format,
      subTitle: elements.subTitle.value,
      defaultTitleColors: true,
    },
  ];
  return <BannerGeneral items={items} height="h-home" />;
}
