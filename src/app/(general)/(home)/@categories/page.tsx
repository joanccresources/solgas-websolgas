import { Category, Text } from "@/components";
import { getData } from "../actions";

export default async function Categories() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Productos y servicios"
  )?.content_rels; 
  const categories = [
    {
      id: 0,
      title: section_fields?.texto_hogar?.value,
      icon: section_fields?.imagen_hogar?.value_format,
      icon_disabled: section_fields?.imagen_hogar_disabled?.value_format,
      path: section_fields?.enlace_hogar?.value_format || '#',
    },
    {
      id: 1,
      title: section_fields?.texto_negocio?.value,
      icon: section_fields?.imagen_negocio?.value_format,
      icon_disabled: section_fields?.imagen_negocio_disabled?.value_format,
      path: section_fields?.enlace_negocio?.value_format || '#',
    },
    {
      id: 2,
      title: section_fields?.texto_industria?.value,
      icon: section_fields?.imagen_industria?.value_format,
      icon_disabled: section_fields?.imagen_industria_disabled?.value_format,
      path: section_fields?.enlace_industria?.value_format || '#',
    },
    {
      id: 3,
      title: section_fields?.texto_vehiculo?.value,
      icon: section_fields?.imagen_vehiculo?.value_format,
      icon_disabled: section_fields?.imagen_vehiculo_disabled?.value_format,
      path: section_fields?.enlace_vehiculo?.value_format || '#',
    },
  ];

  return (
    <div>
      <Text
        className="text-primary-blue md:text-[36px] text-xl md:ml-24 md:text-left text-center"
        type="h1"
        font="regular"
      >
        {section_fields?.titulo?.value}
      </Text>

      <div className="lg:mt-12 md:mt-8 mt-6">
        <Category items={categories} />
      </div>
    </div>
  );
}
