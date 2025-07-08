import GraySectionTitle from "@/components/text/title";
import { Text } from "@/components";
import { getData } from "../actions";
import Image from "next/image";

export default async function Infographics() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "¿Por qué confiar?"
  )?.content_rels;

  return (
    <>
      <GraySectionTitle>{section_fields?.titulo?.value}</GraySectionTitle>
      <div className="flex justify-center h-[854px] w-full relative">
        <Image
          height={854}
          width={1441}
          src={section_fields?.image_fondo?.value_format}
          alt={""}
          className="object-cover bg-cover max-h-[854px]"
          layout="responsive"
        />

        <div className="absolute top-[8rem] md:top-[3rem] xl:right-[8rem] flex-col xl:space-y-10 space-y-4 lg:px-0 px-4">
          <div className="xl:w-[558px] xl:h-[184px] bg-primary-blue rounded-[20px] flex items-center justify-between lg:gap-0 gap-4 xl:p-12 p-6">
            <Image
              height={112}
              width={116}
              src={section_fields?.imagen_1?.value_format}
              alt={""}
            />

            <Text className="lg:text-[17px] text-sm text-white" font="medium">
              <div
                dangerouslySetInnerHTML={{
                  __html: section_fields?.descripcion_1?.value_format,
                }}
              />
            </Text>
          </div>

          <div className="xl:w-[558px] xl:h-[184px] bg-primary-blue rounded-[20px] flex items-center justify-between lg:gap-0 gap-4 xl:p-12 p-6">
            <Image
              height={112}
              width={116}
              src={section_fields?.imagen_2?.value_format}
              alt={""}
            />

            <Text className="lg:text-[17px] text-sm text-white" font="medium">
              <div
                dangerouslySetInnerHTML={{
                  __html: section_fields?.descripcion_2?.value_format,
                }}
              />
            </Text>
          </div>

          <div className="xl:w-[558px] xl:h-[184px] bg-primary-blue rounded-[20px] flex items-center justify-between lg:gap-0 gap-4 xl:p-12 p-6">
            <Image
              height={112}
              width={116}
              src={section_fields?.imagen_3?.value_format}
              alt={""}
            />

            <Text className="lg:text-[17px] text-sm text-white" font="medium">
              <div
                dangerouslySetInnerHTML={{
                  __html: section_fields?.descripcion_3?.value_format,
                }}
              />
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
