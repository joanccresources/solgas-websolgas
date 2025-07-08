import { getData } from "./actions";
import { metadata } from "@/utils/metadata";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Contacto",
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
 
export default async function Contact({
  phones,
  consultation,
  form,
  emergency,
  socialNetwork,
}: {
  phones: React.ReactNode;
  consultation: React.ReactNode;
  form: React.ReactNode;
  emergency: React.ReactNode;
  socialNetwork: React.ReactNode;
}) {
  return (
    <>
      <div className="lg:pt-16 md:pt-12 pt-8 grid lg:gap-y-20 md:gap-y-16 gap-y-8 w-full">
        <div id="numeros-de-contacto">{phones}</div>
        {consultation}
        {form}
        <div>
          {emergency}
          {socialNetwork}
        </div>
      </div>
    </>
  );
}
