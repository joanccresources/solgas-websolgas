import { ActionSection, Button, Text } from "@/components";
import { getData } from "../actions";
import Link from "next/link";

export default async function Action() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner adquiere tu balón"
  )?.content_rels;
  return (
    <ActionSection heightClassName="lg:h-[240px] md:h-[180px] h-[140px]">
      <div className="h-full flex flex-col justify-center items-center xl:gap-8 md:gap-6 gap-4">
        <Text
          className="text-white md:text-[32px] text-[18px] text-center leading-snug"
          type="h1"
          font="bold"
        >
          {section_fields?.descripcion?.value}
        </Text>
        <Link href={section_fields?.enlace_boton?.value || "/"}>
          <Button
            height="50px"
            bg={"primary"}
            border={"primary"}
            color={"white"}
            className="sm:text-sm text-[12px] font-clan-pro-bold sm:w-[390px] min-w-[320px] lg:h-[63px] h-[36px] lg:px-0 px-4 "
          >
            {section_fields?.texto_boton?.value}
          </Button>
        </Link>
      </div>
    </ActionSection>
  );
}
