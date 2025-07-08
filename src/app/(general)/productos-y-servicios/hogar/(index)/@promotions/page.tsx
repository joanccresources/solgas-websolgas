import { ActionSection, Button, Text } from "@/components";
import { getData } from "../actions";
import Link from "next/link";

export default async function Action() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner promociones"
  )?.content_rels;

  return (
    <ActionSection heightClassName="h-[140px] z-30">
      <div className="h-full flex flex-row justify-center items-center gap-8">
        <Text
          className="text-white md:text-[36px] text-[18px] text-center leading-snug"
          type="h1"
          font="bold"
        >
          {section_fields?.descripcion?.value}
        </Text>
        <div>
          <Link href={section_fields?.enlace_boton?.value} target="_blank">
            <Button
              height="50px"
              bg={"primary"}
              border={"primary"}
              color={"white"}
              className="lg:text-base sm:text-sm text-[12px] font-clan-pro-bold lg:min-w-[180px] min-w-[160px] lg:h-[50px] h-[36px]"
            >
              {section_fields?.texto_boton?.value}
            </Button>
          </Link>
        </div>
      </div>
    </ActionSection>
  );
}
