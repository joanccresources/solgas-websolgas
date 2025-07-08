import { getData } from "./actions";
import { metadata } from "@/utils/metadata";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Noticias",
    seo_description = "",
    seo_keywords = "",
    seo_image_format = "",
    path = '',
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
      url: `https://www.solgas.com.pe${path}`,
      images: [
        {
          url: seo_image_format,
        },
      ],
    },
  };
}


export default async function News({ list }: { list: React.ReactNode }) {
  return (
    <>
      <div className="grid lg:gap-y-20 md:gap-y-16 gap-y-8">{list}</div>
    </>
  );
}
