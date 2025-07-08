import { getData } from "./actions";
import { metadata } from "@/utils/metadata";

export async function generateMetadata() {
  const { data } = await getData();
  const result = metadata();
  const {
    name = "Sostenibilidad",
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
          url: seo_image_format
        }
      ],
    },
  };
}

export default async function PageSustainability({
  video,
  reports,
  pillars,
  certs,
  recognitions,
}: {
  video: React.ReactNode;
  reports: React.ReactNode;
  pillars: React.ReactNode;
  certs: React.ReactNode;
  recognitions: React.ReactNode;
}) {
  return (
    <div className="bg-simulator sm:bg-transparent">
      {video}
      <div id="reporte-de-sostenibilidad">{reports}</div>
      <div id="pilares">{pillars}</div>
      <div id="certificaciones">{certs}</div>
      <div id="reconocimientos">{recognitions}</div>
    </div>
  );
}
