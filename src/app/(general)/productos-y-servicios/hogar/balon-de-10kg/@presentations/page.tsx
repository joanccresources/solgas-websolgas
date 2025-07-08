import { Button, Text } from "@/components";
import { getData } from "../actions";
import PresentationCard from "../_components/presentation-card";
import GraySectionTitle from "@/components/text/title";
import Link from "next/link";

export default async function Presentations() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Presentaciones"
  )?.content_rels;

  return (
    <div className="pt-8 md:pt-16 lg:pt-0">
      <GraySectionTitle>
        <div
          className={
            "text-select md:text-[54px] text-xl text-center leading-[1.1] font-clan-pro-regular"
          }
          dangerouslySetInnerHTML={{
            __html: section_fields?.titulo?.value,
          }}
        />
      </GraySectionTitle>
      <div className="flex flex-wrap justify-center lg:mx-[70px] lg:gap-9 gap-6">
        <PresentationCard
          image={section_fields?.imagen_premium?.value_format}
          text={section_fields?.texto_premium?.value}
        />
        <PresentationCard
          image={section_fields?.imagen_tradicional?.value_format}
          text={section_fields?.texto_tradicional?.value}
        />
      </div>
      <Text className="prose text-primary-blue font-normal text-lg text-center lg:mt-16 md:mt-12 mt-8">
        <div
          dangerouslySetInnerHTML={{
            __html: section_fields?.descripcion?.value_format,
          }}
        />
      </Text>
      <div className="hidden sm:flex justify-center">
        <Link href={section_fields?.enlace_boton?.value || "/"}>
          <Button
            height="50px"
            bg={"primary"}
            border={"primary"}
            color={"white"}
            className="sm:text-sm text-[12px] font-clan-pro-bold sm:w-[325px] w-[310px] lg:h-[63px] h-[36px] lg:px-0 px-4 lg:mt-14 md:mt-10 mt-6 "
          >
            {section_fields?.texto_boton?.value}
          </Button>
        </Link>
      </div>
    </div>
  );
}
