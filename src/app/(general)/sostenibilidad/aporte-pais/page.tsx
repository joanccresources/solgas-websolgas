import { Text } from "@/components";
import { getData } from "./actions";
import { formatMultipleElements } from "@/utils/format";
import { metadata } from "@/utils/metadata";
import { List } from "./_components/list";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Sostenibilidad - Aporte pais",
    seo_description = "",
    seo_keywords = "",
    seo_image_format = "",
  } = data.page;
  return {
    ...result,
    title: name,
    description: seo_description,
    keyword: seo_keywords,
    openGraph: {
      title: name,
      description: seo_description,
      type: "website",
      url: "https://solgas-web.gutenbergreader.com/sostenibilidad/aporte-pais",
      images: [
        {
          url: seo_image_format
        }
      ],
    },
  };
}

export default async function PageSustainability() {
  const { data } = await getData();
  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Aporte pais"
  )?.content_rels;

  const elements = formatMultipleElements({
    data,
    section_name: "Aporte pais",
    multiple_element_name: "Aporte pais",
  });

  return (
    <>
      <div className="max-w-[1440px] sm:mx-auto lg:py-20 md:py-16 py-10">
        <div>
          <Text
            className="text-primary-blue lg:text-[51px] md:text-[42px] text-[36px] text-center"
            type="h1"
            font="medium"
          >
            {section_fields?.titulo?.value}
          </Text>
          <div className="bg-primary-orange w-[82px] h-[5px] mx-auto lg:mt-10 md:mt-8 mt-6 lg:mb-16 md:mb-12 mb-8 rounded-full animate-fade-right animate-once animate-duration-300 animate-ease-linear" />
          <List elements={elements} />
        </div>
      </div>
    </>
  );
}
