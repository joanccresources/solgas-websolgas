import { ItemsNavigationMenu } from "@/components";

export type ChildMenuType = {
  name: string;
  content: string;
  content_format: string;
  childMenus: {
    name: string;
    content: string;
    content_format: string;
  }[];
};

export type ColumnType = {
  name: string;
  content: string | null;
  content_format: string | null;
  childMenus: ChildMenuType[];
};

export type ServerDataType = {
  page: {
    name: string;
    section_rels: SectionType[];
    seo_description: string | null;
    seo_image_format: string | null;
    seo_keywords: string | null;
    slug: string;
  };
};

export type ElementType = {
  name: string;
  variable_page_field: string;
  type: string;
  value: string;
  value_format: string;
};

type JsonValueFormatType = {
  json_value_format: {
    [key: string]: ElementType;
  };
};

type MultipleFieldRelType = {
  name: string;
  multiple_content_rels: JsonValueFormatType[];
};

export type ContentRelsType = {
  [key: string]: ElementType;
};

type SectionType = {
  name: string;
  content_rels: ContentRelsType;
  multiple_section_rels: {
    multiple_field_rel: MultipleFieldRelType;
  }[];
};

const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const formatMultipleElements = ({
  data,
  section_name,
  multiple_element_name,
}: {
  data: ServerDataType;
  section_name: string;
  multiple_element_name: string;
}) => {
  const normalizedSectionName = normalizeText(section_name);
  const normalizedElementName = normalizeText(multiple_element_name);

  const section = data?.page?.section_rels
    ?.find(
      (item: SectionType) => normalizeText(item?.name) === normalizedSectionName
    )
    ?.multiple_section_rels?.find(
      (item: { multiple_field_rel: { name: string } }) =>
        normalizeText(item.multiple_field_rel.name) === normalizedElementName
    );

  const multiple_content_rels =
    section?.multiple_field_rel?.multiple_content_rels;

  return multiple_content_rels?.map((item) => item.json_value_format) || [];
};

export const generateSlug = (text: string) => {
  return text
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export type InphographicItemType = {
  [key: `descripcion_${string}`]: string;
} & {
  [key: `imagen_${string}`]: string;
};

export const formatInphographicFields = ({
  section_fields,
}: {
  section_fields: ContentRelsType;
}) => {
  const result: InphographicItemType = {};
  if (!section_fields) return result;

  Object.keys(section_fields).forEach((key) => {
    if (key.startsWith("descripcion_")) {
      const suffix = key.split("_")[1]; // Obtiene la letra o número después de "descripcion_"
      result[`descripcion_${suffix}`] = section_fields[key]?.value || "";
    } else if (key.startsWith("imagen_")) {
      const suffix = key.split("_")[1]; // Obtiene la letra o número después de "imagen_"
      result[`imagen_${suffix}`] = section_fields[key]?.value_format || "";
    }
  });

  return result;
};

export const formatPhone = (phone: string) => {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
};

export const formatHeader = (header: {
  name: string;
  content_header_menu_rels: ColumnType[];
}): ItemsNavigationMenu[] => {
  return header?.content_header_menu_rels?.map((item, index) => ({
    id: `${index}`,
    title: item.name,
    path: item.content || undefined,
    subItems:
      item.childMenus.length > 0
        ? item.childMenus.map((subItem, indexSub) => ({
            id: `${index}${indexSub}`,
            title: subItem.name,
            path: subItem.content || "/",
            subItems:
              subItem.childMenus.length > 0
                ? subItem.childMenus.map((subItemChild, indexSubChild) => ({
                    id: `${index}${indexSub}${indexSubChild}`,
                    title: subItemChild.name,
                    path: subItemChild.content || "/",
                  }))
                : undefined,
          }))
        : undefined,
  }));
};

export const formatSoles = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
