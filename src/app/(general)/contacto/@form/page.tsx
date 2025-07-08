import { getData } from "../actions";
import PageForm from "./_components/form";

export default async function Form() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Formulario"
  )?.content_rels;

  return <PageForm title={section_fields?.titulo?.value} />;
}
