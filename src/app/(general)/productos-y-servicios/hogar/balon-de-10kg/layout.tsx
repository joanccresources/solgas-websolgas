import { getData } from "./actions";
import { metadata } from "@/utils/metadata";
import Container from "@/components/layouts/container";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Balón de 10kg",
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

export default function Home10KgProduct({
  phones,
  benefits,
  uses,
  presentations,
  action,
  infographic,
  map,
  banner,
}: {
  phones: React.ReactNode;
  benefits: React.ReactNode;
  uses: React.ReactNode;
  presentations: React.ReactNode;
  action: React.ReactNode;
  infographic: React.ReactNode;
  map: React.ReactNode;
  banner: React.ReactNode;
}) { 
  return (
    <>
     {banner}
      <div>
        {phones}
        <Container className="lg:my-20 md:my-16 my-8">{benefits}</Container>
        <div className="lg:grid lg:gap-y-20 md:gap-y-16 gap-y-8 lg:mt-20 md:mt-16 mt-8">
          {uses}
          <div>
            <Container className="grid lg:gap-y-20 md:gap-y-16 gap-y-8">
              {presentations}
              {action}
            </Container>
            {infographic}
          </div>
          {map}
        </div>
      </div>
    </>
  );
}
