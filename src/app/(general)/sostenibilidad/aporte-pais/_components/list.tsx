"use client";
import { ContentRelsType } from "@/utils/format";
import { ListItem } from "./item";

export const List = ({ elements }: { elements: ContentRelsType[] }) => {
  return (
    <div className="flex flex-col lg:gap-30 md:gap-24 gap-12">
      {elements.map((element: ContentRelsType, index: number) => {
        return (
          <ListItem
            key={index}
            item={{
              index,
              title_blue: element?.titulo_azul?.value,
              title_orange: element?.titulo_naranja?.value,
              description: element?.descripcion?.value,
              image: element?.imagen?.value_format,
              logo: element?.logo?.value_format,
              icon_hours: element?.icono_horas?.value_format,
              number_hours: element?.numero_horas?.value,
              text_hours: element?.texto_horas?.value,
              icon_beneficiaries: element?.icono_beneficiados?.value_format,
              number_beneficiaries: element?.numero_beneficiados?.value,
              text_beneficiaries: element?.texto_beneficiados?.value,
              icon_alliances: element?.icono_alianzas?.value_format,
              number_alliances: element?.numero_alianzas?.value,
              text_alliances: element?.texto_alianzas?.value,
              icon_connected: element?.icono_conectados?.value_format,
              number_connected: element?.numero_conectados?.value,
              text_connected: element?.texto_conectados?.value,
              text_image: element?.texto_imagen?.value,
              text_button: element?.texto_boton?.value,
              link_button: element?.enlace_boton?.value,
            }}
          />
        );
      })}
    </div>
  );
};
