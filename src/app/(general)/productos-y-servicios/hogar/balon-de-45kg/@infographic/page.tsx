import { getData } from "../actions";
import Infographic from "@/components/infographic";

const CARD_POSITION = [
  "lg:left-[-330px] left-[-65px] lg:top-[10px] top-[-160px]",
  "lg:right-[-340px] right-[-60px] lg:top-[-55px] top-[-165px]",
  "lg:left-[-370px] left-[-60px] lg:bottom-[160px] lg:top-[auto] top-[-180px]",
  "lg:right-[-360px] right-[-65px] lg:bottom-[240px] lg:top-auto top-[-180px]",
];

const IMAGE_POSITION = [
  "lg:top-[-140px] top-[85px] lg:left-[65px] right-[-10px] lg:right-auto",
  "lg:bottom-[-135px] bottom-[-70px] lg:right-[150px] right-[10px]",
  "lg:top-[-135px] top-[90px] lg:left-[85px] left-[-10px]",
  "lg:bottom-[-140px] bottom-[-85px] lg:left-[85px] left-[20px]",
];

const LINE_POSITION = [
  "lg:left-[-105px] left-[132px] lg:top-[-55px] top-[10px] lg:w-[255px] w-[90px] lg:h-[110px] h-[50px] border-r-2 lg:border-t-2 lg:border-b-0 border-b-2",
  "lg:left-[205px] left-[108px] lg:top-[140px] top-[-40px] lg:w-[125px] w-[38px] lg:h-[1px] h-[100px] border-l-2 border-t-2",
  "lg:left-[-130px] left-[-20px] lg:top-[355px] top-[5px] lg:w-[265px] w-[100px] lg:h-[1px] h-[205px] lg:border-r-2 lg:border-l-0 border-l-2 lg:border-t-2 lg:border-b-0 border-b-2",
  "lg:right-[5px] right-[117px] lg:bottom-[82px] bottom-[40px] lg:w-[120px] w-[70px] lg:h-[85px] h-[432px] lg:border-t-2 lg:border-b-0 border-b-2 lg:b-r-2 lg:b-l-0 border-l-2",
];

const MARKER_POSITION = [
  "lg:right-[112px] right-[60px] lg:top-[55px] top-[24px]",
  "lg:right-[90px] right-[50px] lg:top-[110px] top-[60px]",
  "lg:right-24 right-12 lg:top-80 top-44",
  "lg:left-[140px] left-[75px] lg:bottom-5 bottom-2",
];

export default async function Infographics() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Reconocimiento 4 pasos"
  )?.content_rels;
  return (
    <Infographic
      section_fields={section_fields}
      elements={["1", "2", "3", "4"]}
      card_position={CARD_POSITION}
      image_position={IMAGE_POSITION}
      line_position={LINE_POSITION}
      marker_position={MARKER_POSITION}
      base_image_size={[296, 711]}
      responsive_factor={0.65}
      containerClassName={"bg-primary-blue lg:h-[1242px] h-[1050px]"}
      reversed_cards_index={[0, 2]}
      textClassName="text-left"
      imageBaseClassName="lg:h-[800px] h-[650px]"
      display_index={true}
    />
  );
}
