import Container from "@/components/layouts/container";
import { getData } from "../actions";
import { Text } from "@/components";
import { EmailCard } from "./_components/email";

export default async function Consultation() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Consulta adicional"
  )?.content_rels;

  return (
    <div
      className="h-[450px] sm:h-[590px] lg:h-[695px] w-full relative"
      style={{
        background: "url('/background/contact.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Container className="position-relative z-10 h-full flex flex-col lg:gap-10 md:gap-8 gap-6 justify-center">
        <Text
          className="text-white lg:text-[50px] md:text-[40px] text-2xl text-center"
          type="h6"
          font="bold"
        >
          {section_fields?.titulo?.value}
        </Text>
        <Text
          className="text-white lg:text-[26px] md:text-[20px] text-base text-center"
          type="h6"
          font="new"
        >
          {section_fields?.descripcion?.value}
        </Text>
        <EmailCard email={section_fields?.email?.value} />
      </Container>
    </div>
  );
}
