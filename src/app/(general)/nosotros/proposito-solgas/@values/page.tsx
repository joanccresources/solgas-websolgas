import { Divider, Text } from "@/components";
import { getData } from "../actions";
import { formatMultipleElements } from "@/utils/format";
import Image from "next/image";
import GraySectionTitle from "@/components/text/title";
import Container from "@/components/layouts/container";

export default async function PageValues() {
  const { data } = await getData();
  const info = data.page.section_rels.find(
    (item: { name: string }) => item.name === "Valores solgas"
  );
  const title = info?.content_rels?.titulo?.value;
  const items = formatMultipleElements({
    data,
    section_name: "Valores solgas",
    multiple_element_name: "Valores solgas",
  });

  return (
    <Container className="md:px-0">
      <div className="py-8">
        <GraySectionTitle>{title}</GraySectionTitle>
      </div>
      <div className="grid lg:gap-y-20 md:gap-y-16 gap-y-8">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-16">
          {items?.map((item, index) => (
            <div
              key={index}
              className="md:w-[394.66px] w-full h-[372.39px] col-span-4 bg-cover bg-center rounded-[40px] px-4"
              style={{
                backgroundImage: `url(${item.imagen_fondo.value_format})`,
              }}
            >
              <div className="flex justify-center items-center">
                <Image
                  src={item.icon.value_format}
                  alt="Logo"
                  height={115}
                  width={117}
                  className="my-4"
                />
              </div>
              <Text
                font="bold"
                className="text-[30px] text-center text-white mb-4 leading-[1.2]"
                type="p"
                line="2"
              >
                {item.titulo.value_format}
              </Text>
              <div className="flex justify-center">
                <div className="w-[325px]">
                  <Text
                    className="text-[15px] text-center text-white"
                    type="p"
                    line="5"
                  >
                    {item.descripcion.value_format}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Divider className="lg:mx-32" />
      </div>
    </Container>
  );
}
