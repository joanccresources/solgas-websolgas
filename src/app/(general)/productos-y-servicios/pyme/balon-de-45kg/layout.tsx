import { getData } from "./actions";
import { metadata } from "@/utils/metadata";
import Container from "@/components/layouts/container";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Productos negocio - Balon de 45kg",
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

export default function Home10KgProduct({
  phones,
  benefits,
  uses,
  infographic,
  map,
  banner
}: {
  phones: React.ReactNode;
  benefits: React.ReactNode;
  uses: React.ReactNode;
  infographic: React.ReactNode;
  map: React.ReactNode;
  banner: React.ReactNode
}) { 
  return (
    <>
      {banner}
      <div>
        {phones}
        <Container className="lg:my-20 md:my-16 my-8">{benefits}</Container>
        {uses}
        <div>{infographic}</div>
        <div className="lg:mt-20 md:mt-16 mt-8">{map}</div>
      </div>
    </>
  );
}
