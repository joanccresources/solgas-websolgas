import { BannerGeneral, TextBorderAnimation } from "@/components";
import { getData } from "../actions";

export default async function Banner() {
  const { data } = await getData();
  const elements = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner"
  )?.content_rels;

  const items = [
    {
      id: "0", 
      img: elements.imagen.value_format,
      img_sm: elements.imagen_responsive.value_format,
      titleChildren: 
        <TextBorderAnimation borderClassName="mt-1 h-0.5">
          <div className="font-clan-pro-bold-italic md:text-[51px] text-4xl leading-none text-white">
            {elements?.titulo?.value} &nbsp;
          </div>
        </TextBorderAnimation>
       ,
      defaultTitleColors: true,
    },
  ];
  return <BannerGeneral items={items} height='h-glp' />;
}
 