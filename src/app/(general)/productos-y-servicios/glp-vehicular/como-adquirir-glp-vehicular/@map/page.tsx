 
import { getHeaders } from "@/app/actions";
import { getData } from "../actions";
import Jobs, { PropsJobs } from "@/components/jobs-tabs";

export default async function Map() {
   const { data } = await getData();
   const header = await getHeaders(); 
   const token_map = header?.data?.general_information?.token_map;
   const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner ¿Tienes una estación de servicio?"
  )?.content_rels; 

  const fields: PropsJobs = {
    title: section_fields?.title?.value || '',
    description: section_fields?.description?.value || '',
    token_map
  }

  return  <Jobs {...fields} />
}