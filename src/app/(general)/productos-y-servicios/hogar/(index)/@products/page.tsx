import { getData } from "../actions";
import ProductCard from "@/components/card/product";
import GraySectionTitle from "@/components/text/title";

const PRODUCTS = ["10kg", "45kg", "kit"];

export default async function Products() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Productos"
  )?.content_rels;

  return (
    <div>
      <GraySectionTitle>{section_fields?.titulo?.value}</GraySectionTitle>

      <div className="flex gap-6 lg:gap-8 justify-center flex-wrap">
        {PRODUCTS.map((product, index: number) => (
          <ProductCard
            key={index}
            text={section_fields?.[`texto_producto_${product}`]?.value}
            image={section_fields?.[`imagen_producto_${product}`]?.value_format}
            button_text={
              section_fields?.[`texto_boton_producto_${product}`]?.value
            }
            link_text={
              section_fields?.[`enlace_boton_producto_${product}`]?.value
            }
          />
        ))}
      </div>
    </div>
  );
}
