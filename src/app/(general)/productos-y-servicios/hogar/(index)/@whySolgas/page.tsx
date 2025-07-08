import { getData } from "../actions";
import { formatMultipleElements } from "@/utils/format";
import GeneralCard from "@/components/card/general";
import GraySectionTitle from "@/components/text/title";

export default async function WhySolgas() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "¿Por qué solgas?"
  )?.content_rels;

  const elements = formatMultipleElements({
    data,
    section_name: "¿Por qué solgas?",
    multiple_element_name: "¿Por qué solgas? - Hogar",
  });

  return (
    <div>
      <GraySectionTitle>{section_fields?.titulo?.value}</GraySectionTitle>

      <div className="flex justify-center pt-8">
        <div className="flex flex-wrap justify-center max-w-[1441px] gap-x-4 gap-y-24">
          {elements?.map((element, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center group"
            >
              <GeneralCard
                key={index}
                image={element?.imagen?.value_format}
                text={element?.descripcion?.value}
                horizontal={[4, 7].includes(index)}
                hasIndex
                index={index + 1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
