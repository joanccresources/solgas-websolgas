import { Divider, Text } from "@/components";
import { getData } from "../actions";
import Container from "@/components/layouts/container";
import { PhoneCard } from "@/components/action/phones";
import Image from "next/image";
const ELEMENTS = ["hogar", "negocio"];

export default async function Phones() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Pedidos y atención al cliente"
  )?.content_rels;

  return (
    <Container className="pt-16">
      <Text
        className="text-primary-blue md:text-[38px] text-2xl text-center"
        type="h1"
        font="medium"
      >
        {section_fields?.titulo?.value}
      </Text>

      <div className="grid grid-cols-2 justify-center lg:gap-8 gap-6 max-w-[920px] mx-auto lg:my-12 md:my-10 my-8">
        {ELEMENTS.map((element, index) => {
          return (
            <div
              className="col-span-2 sm:col-span-1 rounded-3xl border border-select lg:p-8 md:p-6 p-4 w-full flex flex-col items-center justify-between gap-4 md:gap-6 lg:gap-8"
              key={index}
            >
              <div className="h-[70px] md:h-[80px]">
                <Image
                  src={section_fields?.[`imagen_${element}`]?.value_format}
                  alt={element}
                  width={index === 0 ? 72 : 116}
                  height={index === 0 ? 69 : 80}
                  className="scale-75 md:scale-100"
                />
              </div>
              <Text
                className="text-primary-blue lg:text-[54px] md:text-[38px] text-2xl text-center"
                type="h6"
                font="regular"
              >
                {section_fields?.[`texto_${element}`]?.value}
              </Text>
              <PhoneCard
                index={0}
                phone_number={section_fields?.[`telefono_${element}`]?.value}
              />
            </div>
          );
        })}
      </div>

      <Divider />
    </Container>
  );
}
