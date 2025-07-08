import { getData } from "../actions";
import Infographic from "@/components/infographic";

const CARD_POSITION = [
  "lg:left-[-330px] left-[-10px] lg:top-[-100px] top-[-160px]",
  "lg:right-[-300px] right-[-10px] lg:top-[-55px] top-[-140px]",
  "lg:left-[-370px] left-[-10px] lg:bottom-[140px] lg:top-[auto] top-[-180px]",
  "lg:right-[-360px] right-[-5px] lg:top-[120px] top-[-180px]",
  "lg:right-[-370px] right-[-45px] lg:bottom-[-20px] lg:top-[auto] top-[-140px]",
];

const IMAGE_POSITION = [
  "lg:bottom-[-140px] bottom-[-75px] lg:right-[65px] right-[20px]",
  "lg:top-[-135px] top-[85px] lg:right-[85px] right-[10px]",
  "lg:top-[-135px] top-[90px] lg:left-[85px] left-[-10px]",
  "lg:bottom-[-140px] bottom-[-85px] lg:right-[85px] right-[40px]",
  "lg:top-[-60px] top-[-75px] lg:left-[-85px] left-[-45px]",
];

const LINE_POSITION = [
  "lg:left-[60px] left-[142px] lg:top-[96px] top-[10px] lg:w-[72px] w-[100px] lg:h-[130px] h-[200px] border-r-2 lg:border-t-2 lg:border-b-0 border-b-2",
  "lg:left-[180px] left-[145px] lg:top-[-110px] top-[-10px] lg:w-[250px] w-[135px] lg:h-[180px] h-[60px] border-l-2 border-t-2",
  "lg:left-[-128px] left-[30px] lg:top-[180px] top-[5px] lg:w-[332px] w-[117px] lg:h-[1px] h-[140px] lg:border-r-2 lg:border-l-0 border-l-2 lg:border-t-2 lg:border-b-0 border-b-2",
  "lg:right-[-120px] right-[77px] lg:bottom-[190px] bottom-[140px] lg:w-[200px] w-[20px] lg:h-[2px] h-[280px] border-b-2 border-r-2",
  "lg:left-[110px] left-[12px] lg:bottom-[82px] bottom-[350px] lg:w-[120px] w-[48px] lg:h-[328px] h-[220px] border-l-2 border-b-2",
];

const MARKER_POSITION = [
  "lg:left-[100px] left-[80px] lg:top-56 top-44",
  "lg:right-[146px] right-[112px] lg:top-[70px] top-[50px]",
  "lg:right-24 right-20 lg:top-36 top-28",
  "lg:right-20 right-24 lg:bottom-40 bottom-28",
  "lg:left-[80px] left-[58px] lg:top-13 top-9",
];

export default async function Infographics() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Reconocimiento B.E.R.T.A."
  )?.content_rels;
  return (
    <Infographic
      section_fields={section_fields}
      elements={["b", "e", "r", "t", "a"]}
      card_position={CARD_POSITION}
      image_position={IMAGE_POSITION}
      line_position={LINE_POSITION}
      marker_position={MARKER_POSITION}
      base_image_size={[363, 527]}
      responsive_factor={0.8}
      containerClassName={"bg-primary-blue lg:h-[1242px] h-[980px]"}
      reversed_cards_index={[0]}
      imageBaseClassName="lg:h-[800px] h-[650px]"
      textClassName="first-letter:text-4xl lg:first-letter:text-5xl first-letter:font-clan-pro-black"
    />
  );
}
