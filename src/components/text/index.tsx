import { cn } from "@/lib/utils";
import clsx from "clsx";
export type SizeOptions =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";
export type typesFons =
  | "regular"
  | "medium"
  | "bold"
  | "thin"
  | "italic"
  | "bold-italic"
  | "new"
  | "medium-italic"
  | "black";
// 48px
const TextH1 = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <h1 className={className || "text-5xl"}>{children}</h1>;

// 36px
const TextH2 = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <h2 className={className || "text-4xl"}>{children}</h2>;

// 30px
const TextH3 = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <h3 className={className || "text-3xl"}>{children}</h3>;

// 24px
const TextH4 = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <h4 className={className || "text-2xl"}>{children}</h4>;

// 20px
const TextH5 = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <h5 className={className || "text-xl"}>{children}</h5>;

// 18px
const TextH6 = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <h6 className={className || "text-lg"}>{children}</h6>;

// 14px
const TextP = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <p className={className || "text-sm"}>{children}</p>;

// 12px
const TextSpan = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => <span className={className || "text-sm"}>{children}</span>;

type TextTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

const TextComponentOption = {
  h1: TextH1,
  h2: TextH2,
  h3: TextH3,
  h4: TextH4,
  h5: TextH5,
  h6: TextH6,
  p: TextP,
  span: TextSpan,
};
export interface TextProps {
  size?: SizeOptions;
  font?: typesFons;
  children: React.ReactNode;
  type?: TextTypes;
  line?: string;
  className?: string;
  border?: boolean;
  border_active?: boolean;
}
export function Text({
  size,
  font = "regular",
  children,
  type = "h6",
  line,
  className,
  border = false,
  border_active = false,
}: TextProps) {
  const Component = TextComponentOption[type];
  const fonts = clsx({
    "font-clan-pro-regular": font === "regular",
    "font-clan-pro-medium": font === "medium",
    "font-clan-pro-bold": font === "bold",
    "font-clan-pro-thin": font === "thin",
    "font-clan-pro-italic": font === "italic",
    "font-clan-pro-bold-italic": font === "bold-italic",
    "font-clan-pro-new": font === "new",
    "font-clan-pro-medium-italic": font === "medium-italic",
    "font-clan-pro-black": font === "black",
  });

  const sizes = clsx({
    "text-xs": size === "xs",
    "text-sm": size === "sm",
    "text-base": size === "md",
    "text-lg": size === "lg",
    "text-xl": size === "xl",
    "text-2xl": size === "2xl",
    "text-3xl": size === "3xl",
    "text-4xl": size === "4xl",
    "text-5xl": size === "5xl",
    "text-6xl": size === "6xl",
    "text-7xl": size === "7xl",
    "text-8xl": size === "8xl",
    "text-9xl": size === "9xl",
  });

  const classNameBorder = cn(
    `relative after:absolute after:bg-primary-orange after:bottom-0 after:left-0 after:h-[2px] 
                    after:w-full after:origin-bottom-right
                     after:transition-transform after:ease-in-out after:duration-300`,
    border_active
      ? ""
      : " after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100"
  );
  return (
    <Component
      className={`line-clamp-${line} ${fonts} ${sizes} relative ${className} `}
    >
      {border ? (
        <div className="flex">
          <div>
            <div className={classNameBorder}> {children} </div>
          </div>
        </div>
      ) : (
        children
      )}
    </Component>
  );
}
