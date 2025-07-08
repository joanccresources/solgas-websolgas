import GLPVehicular from "@/components/action/gpl-vehicular";
import { getData } from "../actions";

export default async function MoreInfo() {
  const { data } = await getData();
 
  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner ¿Cómo adquirir GLP?"
  )?.content_rels;
 
  return <GLPVehicular 
    title={section_fields?.texto_pregunta?.value}
    btn_text={section_fields?.texto_boton?.value}
    href={section_fields?.enlace_boton?.value}
   />;
}
