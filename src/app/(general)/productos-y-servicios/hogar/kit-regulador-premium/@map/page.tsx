import Jobs, { PropsJobs } from "@/components/jobs";
import { getData } from "../actions";

export default async function Map() {
  const { data } = await getData();
  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Mapa de distribuidores"
  )?.content_rels;

  const fields: PropsJobs = {
    title: section_fields?.titulo?.value || "",
    subTitle: section_fields?.sub_titulo?.value || "",
    text_departament: section_fields?.texto_departamento?.value || "",
    text_province: section_fields?.texto_provincia?.value || "",
    text_district: section_fields?.texto_distrito?.value || "",
    text_btn: section_fields?.texto_boton?.value || "",
  };

  return <Jobs {...fields} />;
}
