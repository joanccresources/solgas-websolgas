import {
  Text,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LikedinIcon,
  TiktokIcon,
  TwitterIcon,
} from "@/components";
import { cn } from "@/lib/utils";
import tailwindConfig from "@root/tailwind.config";
import Link from "next/link";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];

export type Icons = Record<
  "facebook" | "instagram" | "youtube" | "linkedin" | "tiktok" | "twitter",
  React.ReactNode
>;

interface PropsSocial {
  elements: {
    url: string;
    master_social_network_rel: { name: string; icon: keyof Icons };
  }[];
  withTitle?: boolean;
  orangeIcons?: boolean;
  iconClassName?: string;
  iconSize?: string;
  triangleColor?: string;
}

export default function Social({
  elements,
  withTitle = true,
  orangeIcons = true,
  iconClassName,
  iconSize,
  triangleColor = "white",
}: PropsSocial) {
  const Icons = {
    facebook: (
      <FacebookIcon
        color={orangeIcons ? primaryOrange : "white"}
        height={iconSize}
        width={iconSize}
      />
    ),
    instagram: (
      <InstagramIcon
        color={orangeIcons ? primaryOrange : "white"}
        height={iconSize}
        width={iconSize}
      />
    ),
    youtube: (
      <YoutubeIcon
        color={orangeIcons ? primaryOrange : "white"}
        height={iconSize}
        width={iconSize}
        triangleColor={triangleColor}
      />
    ),
    linkedin: (
      <LikedinIcon
        color={orangeIcons ? primaryOrange : "white"}
        height={iconSize}
        width={iconSize}
      />
    ),
    tiktok: (
      <TiktokIcon
        color={orangeIcons ? primaryOrange : "white"}
        height={iconSize}
        width={iconSize}
      />
    ),
    twitter: (
      <TwitterIcon
        color={orangeIcons ? primaryOrange : "white"}
        height={iconSize}
        width={iconSize}
      />
    ),
  };

  const classNameMerge = cn(
    "h-[28.47px] w-[28.47px] rounded-full flex justify-center items-center bg-white cursor-pointer",
    iconClassName
  );

  const classNameTitle = cn(
    "flex flex-wrap items-center justify-center gap-4 flex-row"
  );

  return (
    <div className={classNameTitle}>
      {withTitle ? (
        <Text type="h6" font="bold" className="text-primary-blue text-[14px]">
          Síguenos en
        </Text>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {elements?.map((element) => {
          const Icon =
            Icons[element.master_social_network_rel.icon as keyof typeof Icons];
          return (
            <Link
              href={element.url}
              key={element.master_social_network_rel.icon}
              target="_blank"
            >
              <div className={classNameMerge}>{Icon}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
