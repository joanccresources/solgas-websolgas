import { Simulator } from "@/components";
import Container from "@/components/layouts/container";
import GraySectionTitle from "@/components/text/title";
import { getData } from "../actions";

export default async function SimulatorPage() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Simulador de ahorro"
  )?.content_rels;

  return (
    <div className="bg-simulator">
      <Container className="lg:py-20 md:pt-16 py-8">
        <GraySectionTitle>{section_fields.title.value}</GraySectionTitle>
        <Simulator />
      </Container>
    </div>
  );
}
