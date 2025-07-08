import { getReports } from "../actions";
import { Body } from "./_components/body";
import Container from "@/components/layouts/container";

export type ReportType = {
  title: string;
  pdf: string;
  pdf_format: string;
  title_milestones: string;
  sustainability_report_objects_rels: {
    image: string;
    image_format: string;
  }[];
};

export default async function PageReport() {
  const { data: reports } = await getReports();

  return (
    <Container>
      <div className="lg:grid lg:gap-y-20 md:gap-y-16 gap-y-8 w-full">
        {reports ? <Body elements={reports} /> : null}
      </div>
    </Container>
  );
}
