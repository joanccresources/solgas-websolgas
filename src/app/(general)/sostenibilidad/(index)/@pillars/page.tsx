import { getData } from "../actions";
import GraySectionTitle from "@/components/text/title";
import { ImageAccordion } from "./_components/accordion";
import Container from "@/components/layouts/container";
import ImageCarousel from "./_components/carousel";

const ARRAY = [1, 2, 3, 4, 5, 6];

export default async function PagePillars() {
  const { data } = await getData();
  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Pilares"
  )?.content_rels;

  const items = ARRAY.map((item) => {
    return {
      id: item,
      title: section_fields?.[`sub_titulo_${item}`]?.value,
      description: section_fields?.[`descripcion_${item}`]?.value,
      image: section_fields?.[`imagen_fondo_${item}`]?.value_format,
      icon: section_fields?.[`imagen_${item}`]?.value_format,
      text_button: section_fields?.[`texto_boton_${item}`]?.value,
      link_button: section_fields?.[`enlace_boton_${item}`]?.value,
    };
  });

  return (
    <div className="sm:bg-linear-to-l from-[#E7E9F0] to-[#FFFFFF]">
      <Container className="lg:py-20 md:py-16 sm:py-10 py-6">
        <GraySectionTitle
          text_align="left"
          line
          marginBottomClassName="lg:mb-10 md:mb-8 mb-6"
        >
          {section_fields?.titulo?.value}
        </GraySectionTitle>
        <div className="sm:hidden">
          <ImageCarousel items={items} />
        </div>
        <div className="hidden sm:block">
          <ImageAccordion items={items} />
        </div>
      </Container>
    </div>
  );
}
