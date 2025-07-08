"use client";
import { useState } from "react";
import { Text, Button, Modal, ActionSection } from "@/components";
import Form from "./form";

export interface SectionRel {
  name: string;
  content_rels: {
    texto_pregunta?: { value: string };
    texto_boton?: { value: string };
    texto_boton_enviar?: { value: string };
    titulo?: { value: string };
    descripcion?: { value: string };
  }[];
}

export interface Data {
  page: {
    section_rels: SectionRel[];
  };
}

export default function ActionWithModalSection({ data }: { data: Data }) {
  const section_fields_banner = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Banner"
  )?.content_rels as unknown as {
    texto_pregunta: { value: string };
    texto_boton: { value: string };
  };

  const section_fields_form = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Formulario"
  )?.content_rels as unknown as {
    titulo: { value: string };
    descripcion: { value: string };
    texto_boton_enviar: { value: string };
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ActionSection heightClassName="h-[119px]">
        <div className="h-full flex flex-row justify-center items-center gap-8">
          <Text
            className="text-white text-xl text-center"
            type="h1"
            font="bold"
          >
            {section_fields_banner?.texto_pregunta?.value}
          </Text>
          <div>
            <Button
              height="50px"
              bg={"primary"}
              border={"primary"}
              color={"white"}
              className="sm:text-sm text-[12px] font-clan-pro-bold sm:w-[180px] w-[130px] lg:h-[63px] h-[36px]"
              onClick={() => setIsOpen(true)}
            >
              {section_fields_banner?.texto_boton?.value}
            </Button>
          </div>
        </div>
      </ActionSection>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        persists
        fullWidth
        closeButton
      >
        <div className="w-full h-full">
          <div className="hidden sm:block">
            <Text
              className="text-primary-blue md:text-[38px] text-xl text-center"
              type="h3"
              font="bold"
            >
              {section_fields_form?.titulo?.value}
            </Text>
            <p className="text-secondary-blue font-clan-pro-regular md:text-lg text-md text-center my-6">
              {section_fields_form?.descripcion?.value}
            </p>
          </div>
          <Form
            title={section_fields_form?.titulo?.value}
            description={section_fields_form?.descripcion?.value}
            setIsOpen={setIsOpen}
            button_text={section_fields_form?.texto_boton_enviar?.value}
          />
        </div>
      </Modal>
    </div>
  );
}
