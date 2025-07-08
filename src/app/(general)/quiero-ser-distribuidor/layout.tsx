import { getData } from "./actions";
import { metadata } from "@/utils/metadata";
import Container from "@/components/layouts/container";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Quiero ser distribuidor",
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

export default async function Distributor({
  action,
  valueProposition,
  banner
}: {
  action: React.ReactNode;
  valueProposition: React.ReactNode;
  banner: React.ReactNode;
}) { 
  return (
    <>
     {banner}
      <Container className="grid lg:gap-y-20 md:gap-y-16 gap-y-8">
        {action}
        <div className="pb-16 grid lg:gap-y-20 gap-y-8">{valueProposition}</div>
      </Container>
    </>
  );
}
