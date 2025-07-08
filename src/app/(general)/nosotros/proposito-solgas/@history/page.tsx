import { getData } from "../actions";
import { formatMultipleElements } from "@/utils/format";

import CarouselHistory, { ItemCarousel } from "./_components/carousel";
import GraySectionTitle from "@/components/text/title";

export default async function PageValues() {
  const { data } = await getData();
  const info = data.page.section_rels.find(
    (item: { name: string }) => item.name === "Historias inspiradoras"
  );
 
  const title = info.content_rels.titulo?.value;
  const items = formatMultipleElements({
    data,
    section_name: "Historias inspiradoras",
    multiple_element_name: "Historias inspiradoras",
  }) as unknown as ItemCarousel[]; 
  return (
    <div className="lg:pt-16 md:pt-12 pt-8">
      <GraySectionTitle>{title}</GraySectionTitle>
      <div className="flex justify-center">
        <div className="lg:max-w-[1440px] w-screen lg:pb-20 md:pb-16 pb-8 ">
          <CarouselHistory items={items} />
        </div>
      </div>
    </div>
  );
}
