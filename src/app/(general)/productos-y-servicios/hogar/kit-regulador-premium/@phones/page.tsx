import ActionPhone from "@/components/action/phones";
import { getData } from "../actions";

export default async function Phones() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner"
  )?.content_rels;

  return <ActionPhone section_fields={section_fields} />;
}
