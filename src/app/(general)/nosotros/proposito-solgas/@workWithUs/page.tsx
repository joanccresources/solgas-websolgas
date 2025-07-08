import { ActionSection, Button, Text } from "@/components";
import { getData } from "../actions";
import Link from "next/link";

export default async function PageWork() {
  const { data } = await getData();
  const info = data.page.section_rels.find(
    (item: { name: string }) => item.name === "Banner trabaja con nosotros"
  );

  const title = info?.content_rels?.titulo?.value_format;
  const description = info?.content_rels.breve_descripcion?.value_format;
  const text_btn = info?.content_rels.texto_boton?.value_format;
  const link_btn = info?.content_rels.enlace_boton?.value_format;

  return (
    <ActionSection heightClassName="hidden sm:block h-[207px]">
      <div className="flex justify-center items-center gap-x-8 h-[207px]">
        <div>
          <Text font="bold" className="lg:text-[40px] text-white">
            {title}
          </Text>
          <Text className="lg:text-[25px] text-white">{description}</Text>
        </div>
        <Link href={link_btn || ""} target="_blank">
          <Button
            className="h-[50px] px-8 font-clan-pro-bold min-w-[155px]"
            bg={"primary"}
            border={"primary"}
            color={"white"}
          >
            {text_btn}
          </Button>
        </Link>
      </div>
    </ActionSection>
  );
}
