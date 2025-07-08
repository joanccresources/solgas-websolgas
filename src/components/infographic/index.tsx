import { ContentRelsType, formatInphographicFields } from "@/utils/format";
import SectionTitle from "./title";
import SectionContainer from "./container";
import { cn } from "@/lib/utils";
import Container from "@/components/layouts/container";

const BgWhite = () => {
  return (
    <div
      className="
        bg-contain
        bg-no-repeat
        bg-bottom 
        absolute top-0 left-0 bottom-0 right-0 m-auto z-15"
      style={{ width: "95%", height: "45%" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 900 590"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="450"
          cy="295"
          rx="450"
          ry="295"
          fill="url(#paint0_radial_ellipse)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_ellipse"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(450 295) scale(450 295)"
          >
            <stop stopColor="#004996" stopOpacity="0.8" />
            <stop offset="1" stopColor="#004996" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

type InfographicType = {
  section_fields: ContentRelsType;
  elements: string[];
  card_position: string[];
  image_position: string[];
  line_position: string[];
  marker_position: string[];
  base_image_size: [number, number];
  responsive_factor: number;
  containerClassName: string;
  hasWhiteBg?: boolean;
  reversed_cards_index?: number[];
  textClassName?: string;
  imageBaseClassName: string;
  card_type?: "default" | "blue";
  display_index?: boolean;
};

export default async function Infographic({
  section_fields,
  elements,
  card_position,
  image_position,
  line_position,
  marker_position,
  base_image_size,
  responsive_factor,
  containerClassName,
  hasWhiteBg = true,
  reversed_cards_index = [],
  textClassName,
  imageBaseClassName,
  card_type,
  display_index = false,
}: InfographicType) {
  const items = formatInphographicFields({ section_fields });
  const classNameMerge = cn(
    "text-center lg:pt-24 md:pt-20 pt-16 relative",
    containerClassName
  );
  return (
    <div className={classNameMerge}>
      <Container>
        <SectionTitle
          title_orange={section_fields?.titulo_naranja?.value}
          title_white={section_fields?.titulo_blanco?.value}
          sub_title_white={section_fields?.sub_titulo?.value}
          sub_title_orange={section_fields?.sub_titulo_naranja?.value}
        />
        <div className="lg:mt-20 md:mt-16 mt-10 flex flex-wrap justify-center lg:mx-[70px] relative z-20 h-full">
          <SectionContainer
            items={items}
            background_image={section_fields?.imagen_fondo?.value_format}
            elements={elements}
            card_position={card_position}
            image_position={image_position}
            line_position={line_position}
            marker_position={marker_position}
            base_image_size={base_image_size}
            responsive_factor={responsive_factor}
            reversed_cards_index={reversed_cards_index}
            textClassName={textClassName}
            imageBaseClassName={imageBaseClassName}
            card_type={card_type}
            display_index={display_index}
          />
        </div>
      </Container>
      {hasWhiteBg ? <BgWhite /> : null}
    </div>
  );
}
