import { Text } from "@/components";
import { getData } from "../actions";
import Image from "next/image";
export default async function MoreInfo() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) =>
      item?.name === "Banner ¿Tienes una estación de servicio?"
  )?.content_rels;

  const background = section_fields?.background?.value_format;
  const title = section_fields?.title?.value_format;
  const description = section_fields?.description?.value_format;

  return (
    <>
      <div className="flex justify-center sm:h-[488px] h-[331px] w-full relative">
        <Image
          height={488}
          width={1441}
          src={background}
          alt={""}
          className="object-cover bg-cover sm:max-h-[488px] max-h-[331px]"
          layout="responsive"
        />
        <div className="absolute flex justify-center items-center text-center sm:h-[488px] h-[331px] lg:mx-0 mx-6">
          <div>
            <Text className="sm:text-[50px] text-xl text-white" font="bold">
              <div
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            </Text>
            <Text
              className="lg:text-[22px] text-[15px] text-white mt-6"
              font="new"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
