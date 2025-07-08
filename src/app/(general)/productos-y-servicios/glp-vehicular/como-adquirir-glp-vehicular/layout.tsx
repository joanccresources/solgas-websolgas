
import { getData } from "./actions";
import { metadata } from "@/utils/metadata"; 

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Inicio",
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
          url: seo_image_format
        }
      ],
    },
  };
}

export const revalidate = 3600
export default async function Page({
  map, 
  info,
  form
}: {
  map: React.ReactNode; 
  info: React.ReactNode;
  form: React.ReactNode;
}) { 

  return (
    <div className="lg:mt-16 md:mt-12 mt-8 grid lg:gap-y-20 md:gap-y-16 gap-y-8">
      <div>{map}</div>
      <div>{info}</div>
      <div className="flex justify-center">{form}</div> 
    </div>
  );
}
