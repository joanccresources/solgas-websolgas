import { Button } from "@/components";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type CategoryRel = {
  name: string;
  slug: string;
  background_color: string;
  point_color: string;
};

export type CategoryPostRel = {
  category_rel: CategoryRel;
};

export type PostType = {
  title: string;
  slug: string;
  short_description: string;
  content: string;
  image: string;
  image_format: string;
  thumbnail: string;
  thumbnail_format: string;
  category_posts_rel: CategoryPostRel[];
  comments: string[];
  publication_at: string;
  publication_at_format: string;
  publication_at_format_2: string;
  publication_at_format_3: string;
};

const Svg = () => {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      <svg className="w-[500px] h-[700px]" viewBox="0 0 500 700">
        <defs>
          <linearGradient id="customGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="30%" stopColor="#004996" stopOpacity="0.29" />
            <stop offset="73%" stopColor="#0B2265" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect className="w-[500px] h-[700px]" fill="url(#customGradient)" />
      </svg>
    </div>
  );
};

export const NewCard = ({
  item,
  containerClassName,
}: {
  item: PostType;
  containerClassName: string;
}) => {
  const containerMergeClassName = cn(
    "rounded-[33px] h-full border border-select aspect-[362/393] bg-cover bg-center bg-no-repeat overflow-hidden max-w-[400px] sm:max-w-none mx-auto",
    "relative",
    containerClassName
  );

  return (
    <div
      className={containerMergeClassName}
      style={{ backgroundImage: `url(${item?.thumbnail_format})` }}
    >
      <Svg />
      <div className="text-white h-full sm:p-8 p-6 rounded-[30px] flex flex-col sm:gap-4 gap-3 justify-end relative z-[2]">
        {item.category_posts_rel.map((category, index) => (
          <div
            key={index}
            className={
              "p-1 px-3 w-fit rounded-full flex gap-2 items-center bg-primary-blue"
            }
            style={{
              backgroundColor: category?.category_rel?.background_color,
            }}
          >
            <div
              className={"w-2 h-2 rounded-full bg-primary-orange"}
              style={{ backgroundColor: category?.category_rel?.point_color }}
            ></div>
            {category?.category_rel?.name}
          </div>
        ))}
        <p className="sm:text-[23px] text-[21px] text-left font-clan-pro-bold leading-[1.1] line-clamp-2">
          {item?.title}
        </p>
        <p className="sm:text-[12px] text-[11px] text-left font-clan-pro-medium leading-[1.1]">
          {item?.publication_at_format_3}
        </p>
        <Link href={`/noticia/${item?.slug}`}>
          <Button
            className="sm:text-[11px] text-[10px] font-clan-pro-bold sm:w-[104px] w-[98px] sm:h-[31px] h-[28px]"
            bg={"primary"}
            border={"primary"}
            color={"white"}
          >
            VER MÁS
          </Button>
        </Link>
      </div>
    </div>
  );
};
