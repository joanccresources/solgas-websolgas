import { Text } from "@/components";
import Container from "@/components/layouts/container";
import { getData } from "../actions";
import { PhoneCard } from "./_components/phone";

export default async function Emergency() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Emergencias"
  )?.content_rels;

  return (
    <div className="hidden sm:block h-[210px] sm:h-[221px] bg-primary-blue">
      <Container className="h-full">
        <div className="h-full flex flex-col sm:flex-row justify-center items-center xl:gap-12 md:gap-8 gap-6">
          <Text
            className="text-white xl:text-[46px] md:text-[32px] text-[24px] text-center leading-snug"
            type="h1"
            font="medium"
          >
            {section_fields?.titulo?.value}
          </Text>
          <PhoneCard phone={section_fields?.telefono?.value} />
        </div>
      </Container>
    </div>
  );
}
