import { getData } from "../actions";
import { formatMultipleElements } from "@/utils/format";
import ImageCard from "@/components/card/image";
import GraySectionTitle from "@/components/text/title";
import Container from "@/components/layouts/container";

export default async function Uses() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Usos"
  )?.content_rels;

  const elements = formatMultipleElements({
    data,
    section_name: "Usos",
    multiple_element_name: "Usos - Hogar - Balon 10kg",
  });

  return (
    <div className="bg-[#E7E9F0] lg:py-20 md:py-16 py-8 w-full">
      <Container>
        <GraySectionTitle>{section_fields?.titulo?.value}</GraySectionTitle>
        <ul className="flex flex-wrap justify-center lg:gap-9 gap-6">
          {elements?.map((element, index) => (
            <li
              key={index}
              className="flex flex-row items-center justify-start w-fit group"
            >
              <ImageCard
                key={index}
                image={element?.imagen?.value_format}
                text={element?.descripcion?.value}
              />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
