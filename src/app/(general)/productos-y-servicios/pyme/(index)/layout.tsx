import { metadata } from "@/utils/metadata";
import { getData } from "./actions";
import Container from "@/components/layouts/container";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Productos negocio",
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

export default async function HomeProducts({
  products,
  video,
  whySolgas,
  map,
}: {
  products: React.ReactNode;
  video: React.ReactNode;
  whySolgas: React.ReactNode;
  map: React.ReactNode;
}) {
  return (
    <>
      <Container className="lg:py-20 md:py-16 py-10 grid">{products}</Container>
      <div>
        <Container className="lg:flex justify-center">{video}</Container>
        <Container className="lg:py-20 md:py-16 py-8">{whySolgas}</Container>
        <div className="hidden sm:block">{map}</div>
      </div>
    </>
  );
}
