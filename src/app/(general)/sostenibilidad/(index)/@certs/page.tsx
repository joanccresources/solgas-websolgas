import { getData } from "../actions";
import { formatMultipleElements } from "@/utils/format";
import Carousel, { ItemCarousel } from "./_components/carousel";
import Container from "@/components/layouts/container";

export default async function PageCerts() {
  const { data } = await getData();
  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Certificaciones"
  )?.content_rels;

  const elements = formatMultipleElements({
    data,
    section_name: "Certificaciones",
    multiple_element_name: "Certificaciones",
  }) as unknown as ItemCarousel[];

  return (
    <div className="sm:bg-linear-to-br from-[#E7E9F0] to-[#FFFFFF]">
      <Container className="lg:py-20 md:py-16 sm:py-10 py-6">
        <p className="text-mobile sm:text-primary-blue md:text-[28px] text-xl text-center lg:mb-8 md:mb-6 mb-4 font-clan-pro-regular sm:font-clan-pro-medium">
          {section_fields?.titulo?.value}
        </p>
        <div className="flex justify-center">
          <div className="lg:max-w-[1440px] w-full">
            <Carousel items={elements} />
          </div>
        </div>
      </Container>
    </div>
  );
}
