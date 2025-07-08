import Divider from "@/components/divider";
import { getData } from "./actions";
import { metadata } from "@/utils/metadata";
import Container from "@/components/layouts/container";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata(); 
  const {
    name = "Inicio",
    seo_description = "",
    seo_keywords = "",
    seo_image_format = "",
    path = ''
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


export default function Home({
  map,
  categories,
  info,
  banner
}: {
  map: React.ReactNode;
  categories: React.ReactNode;
  info: React.ReactNode;
  banner: React.ReactNode;
}) { 
  return (
    <>
       {banner}
      <div className="md:pt-16 pt-8 grid lg:gap-y-20 md:gap-y-16 gap-y-8">
        <div id="productos-y-servicios">
          <Container className="container sm:mx-auto grid lg:gap-y-20 md:gap-y-16 gap-y-8">
            {categories}
            <Divider className="lg:mx-24" />
          </Container>
        </div>
        <div id="encuentra-tu-distribuidor-mas-cercano">{map}</div>
        <div id="experta-a-solgas">{info}</div>
      </div>
    </>
  );
}
