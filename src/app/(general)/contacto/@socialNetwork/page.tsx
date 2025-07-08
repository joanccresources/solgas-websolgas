import Container from "@/components/layouts/container";
import { getData } from "../actions";
import { Text } from "@/components";
import { getFooter } from "@/app/actions";
import { SocialNetworks } from "./_components/social";

export default async function SocialNetwork() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Redes sociales"
  )?.content_rels;

  const footer = await getFooter();
  const elements = footer?.data?.content_social_network;

  return (
    <div
      className="hidden sm:block h-[405px] bg-repeat bg-cover bg-center mt-[-1px] w-full"
      style={{
        backgroundImage: `url(${section_fields?.imagen_fondo?.value_format})`,
      }}
    >
      <Container className="h-full flex flex-col justify-center items-center lg:gap-10 md:gap-8 gap-6">
        <Text
          className="text-white xl:text-[35px] md:text-[30px] text-[24px] text-center leading-snug"
          type="h6"
          font="medium"
        >
          {section_fields?.titulo?.value}
        </Text>
        <SocialNetworks elements={elements} />
      </Container>
    </div>
  );
}
