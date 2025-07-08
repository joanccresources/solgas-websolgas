import { getData } from "../actions";
import { formatMultipleElements } from "@/utils/format";
import { Body } from "./_components/body";

export default async function PageRecognitions() {
  const { data } = await getData();
  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Reconocimientos"
  )?.content_rels;

  const elements = formatMultipleElements({
    data,
    section_name: "Reconocimientos",
    multiple_element_name: "Reconocimientos",
  });

  return <Body section_fields={section_fields} elements={elements} />;
}
