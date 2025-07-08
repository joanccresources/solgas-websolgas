import { Image, Text } from "@/components";
import { getData } from "../actions";
import { formatMultipleElements } from "@/utils/format";
import GraySectionTitle from "@/components/text/title";

export default async function ValueProposition() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Propuesta de valor"
  )?.content_rels;

  const elements = formatMultipleElements({
    data,
    section_name: "Propuesta de valor",
    multiple_element_name: "Propuesta de valor",
  });

  return (
    <div className="flex justify-center">
      <div>
        <GraySectionTitle>{section_fields?.titulo?.value}</GraySectionTitle>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-8  max-w-[1026px] w-full">
          {elements.map((element, index: number) => (
            <li
              key={index}
              className="flex flex-row items-center justify-start gap-x-8 group"
            >
              <div className="animate-jump-in animate-once animate-duration-700 animate-ease-linear">
                <div className="animate-fade animate-once animate-duration-700 animate-ease-linear">
                  <div className="lg:h-[132px] lg:w-[132px] w-[110px] h-[110px] border border-gray rounded-full flex justify-center items-center">
                    <div className="w-full h-full bg-white group-hover:bg-primary-orange border-gray rounded-full flex items-center justify-center transition-all duration-700 ease-in-out">
                      <Image
                        src={element.imagen.value_format}
                        alt="icon"
                        width={50}
                        height={50}
                        className="group-hover:hidden"
                      />
                      <Image
                        src={element.imagen_active.value_format}
                        alt="icon active"
                        width={50}
                        height={50}
                        className="hidden group-hover:block"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Text
                className="text-primary-blue mt-2 lg:text-lg text-md transition-all duration-300 ease-in-out group-hover:opacity-85"
                type="h6"
                font="medium"
              >
                {element.descripcion.value_format}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
