import { getData } from "../actions";
import { formatMultipleElements } from "@/utils/format";
import CarouselBenefit, {
  ItemCarouselBenefit,
} from "@/components/carousel/benefits";
import GraySectionTitle from "@/components/text/title";

export default async function Benefits() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Beneficios"
  )?.content_rels;

  const elements = formatMultipleElements({
    data,
    section_name: "Beneficios",
    multiple_element_name: "Beneficios - Hogar - Kit regulador premium",
  }) as unknown as ItemCarouselBenefit[];

  return (
    <div>
      <GraySectionTitle>{section_fields?.titulo?.value}</GraySectionTitle>
      <div className="flex justify-center lg:mx-[70px]">
        <div className="max-w-[1285px] w-full lg:px-0 px-8 relative">
          <CarouselBenefit
            items={elements}
            desktopQuantity={3}
            responsiveCard
          />
        </div>
      </div>
    </div>
  );
}
