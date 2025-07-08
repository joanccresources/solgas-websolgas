import { getData } from "../actions";
import Infographic from "@/components/infographic";

const CARD_POSITION = [
  "left-[-350px] top-[-240px]",
  "left-[-350px] top-[-60px]",
  "left-[-350px] top-[90px]",
  "left-[-350px] top-[240px]",
  "right-[-350px] top-[-240px]",
  "right-[-350px] top-[-60px]",
  "right-[-350px] top-[150px]",
];

const LINE_POSITION = [
  "left-[10px] top-[-155px] w-[105px] h-[160px] border-r-2 border-t-2",
  "left-[-28px] top-[20px] w-[96px] h-[1px] border-b-2",
  "left-[10px] top-[130px] w-[96px] h-[1px] border-b-2",
  "left-[10px] top-[180px] w-[50px] h-[140px] border-b-2 border-r-2",
  "right-[10px] top-[-155px] w-[115px] h-[175px] border-l-2 border-t-2",
  "right-[10px] top-[25px] w-[45px] h-[90px] border-l-2 border-t-2",
  "right-[10px] top-[135px] w-[80px] h-[90px] border-l-2 border-b-2",
];

export default async function Infographics() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) =>
      item?.name === "¿Por qué ya no usar regulador tradicional?"
  )?.content_rels;
  return (
    <Infographic
      section_fields={section_fields}
      elements={["1", "2", "3", "4", "5", "6", "7"]}
      card_position={CARD_POSITION}
      image_position={[]}
      line_position={LINE_POSITION}
      marker_position={[]}
      base_image_size={[296 * 0.95, 281 * 0.95]}
      responsive_factor={0.8}
      containerClassName={
        "bg-linear-to-br from-[#004996] to-[#0B2265] lg:h-[1155px] sm:h-[900px]"
      }
      reversed_cards_index={[0, 2]}
      textClassName="text-left"
      hasWhiteBg={false}
      imageBaseClassName="lg:h-[750px] sm:h-[650px]"
      card_type="blue"
    />
  );
}
