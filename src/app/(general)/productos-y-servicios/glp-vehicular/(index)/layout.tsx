import { Divider } from "@/components";
import { getData } from "./actions";
import { metadata } from "@/utils/metadata";
import Container from "@/components/layouts/container";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();

  const {
    name = "Productos y Servicios - GLP Vehicular",
    seo_description = "",
    seo_keywords = "",
    seo_image_format = "",
    path = "",
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

export default async function Home10KgProduct({
  banner,
  moreInfo,
  benefits,
  whyGLP,
  simulator,
  moreInfo2,
}: {
  banner: React.ReactNode;
  moreInfo: React.ReactNode;
  benefits: React.ReactNode;
  whyGLP: React.ReactNode;
  simulator: React.ReactNode;
  moreInfo2: React.ReactNode;
}) {

  return (
    <>
      {banner}
      <div className="-mt-0.5">
        {moreInfo}
        <Container className="lg:my-20 md:my-16 my-8">
          {benefits}
          <div className="flex justify-center">
            <Divider className="mt-8 w-full max-w-[1227px]" />
          </div>
        </Container>
        <div className="pt-16">{whyGLP}</div>
        {moreInfo2}
        {simulator}
      </div>
    </>
  );
}
