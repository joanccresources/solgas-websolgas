import { formatMultipleElements } from "@/utils/format";
import { getData } from "../actions"; 
import { BannerGeneral } from "@/components"; 
 
interface PropsPS {
   titulo: { value_format: string; }; descripcion: { value_format: string; }; imagen: { value_format: string; }; imagen_responsive: { value_format: string; }; 
}
export default async function Banner() {
  const { data } = await getData();

  const elements = formatMultipleElements({
    data,
    section_name: "Banner",
    multiple_element_name: "Banner GLP vehicular",
  }) as unknown as  PropsPS[] ;

 
    const items = elements?.map((item:  PropsPS, index: number)=> ({
    id: index.toString(),
    title: item.titulo.value_format,
    description: item.descripcion.value_format,
    img: item.imagen.value_format,
    img_sm: item.imagen_responsive.value_format,
    defaultTitleColors: true
  }))
  return <BannerGeneral items={items} height='h-glp' />;
}
 