import Container from "@/components/layouts/container";
import { getData } from "./actions";
import { metadata } from "@/utils/metadata";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Productos hogar",
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
  action,
  video,
  whySolgas,
  promotions,
}: {
  products: React.ReactNode;
  action: React.ReactNode;
  video: React.ReactNode;
  whySolgas: React.ReactNode;
  promotions: React.ReactNode;
}) {
  return (
    <>
      <Container className="lg:py-20 md:py-16 py-10 grid">{products}</Container>
      <div>
        {promotions}
        <div className="lg:flex justify-center -mt-1">{video}</div>
        {action}
        <Container className="lg:py-20 md:py-16 py-8">{whySolgas}</Container>
      </div>
    </>
  );
}
