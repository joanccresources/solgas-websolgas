import { Text } from "@/components";

export default function SectionTitle({
  title_orange,
  title_white,
  sub_title_orange,
  sub_title_white,
}: {
  title_orange: string;
  title_white: string;
  sub_title_orange?: string;
  sub_title_white?: string;
}) {
  return (
    <div className="sm:w-9/12 w-11/12 mx-auto animate-fade animate-once animate-duration-700 animate-ease-linear">
      <Text
        className="text-white xl:text-[50px] lg:text-4xl md:text-3xl text-2xl leading-normal text-center italic"
        font="bold"
        type="h1"
      >
        <span className="bg-primary-orange md:px-3 px-2 inline-block mr-3 leading-normal">
          {title_orange}
        </span>

        <span className="leading-normal">{title_white}</span>
      </Text>
      {sub_title_white || sub_title_orange ? (
        <Text
          className="text-white xl:text-3xl lg:text-2xl md:text-xl text-lg leading-normal text-center mt-3"
          font="new"
          type="h6"
        >
          {sub_title_white ? (
            <span className="leading-normal">{sub_title_white}</span>
          ) : null}
          {sub_title_orange ? (
            <span className="text-primary-orange inline-block ml-3 leading-normal">
              {sub_title_orange}
            </span>
          ) : null}
        </Text>
      ) : null}
    </div>
  );
}
