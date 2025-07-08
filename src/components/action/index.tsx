import { cn } from "@/lib/utils";
import Container from "@/components/layouts/container";

const BgOrangeGradient = () => {
  return (
    <div
      className="
        absolute top-0 right-0 w-full h-full
        bg-contain bg-no-repeat z-1"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 645 590"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <rect width="645" height="590" fill="url(#orangeGradient)" />
        <defs>
          <radialGradient
            id="orangeGradient"
            cx="1.25"
            cy="0.5"
            r="1"
            gradientUnits="objectBoundingBox"
            gradientTransform="scale(1 1.5)"
          >
            <stop offset="0" stopColor="#FF7900" />
            <stop offset="0.5" stopColor="#FF7900" stopOpacity="0.5" />
            <stop offset="1" stopColor="#FF7900" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function ActionSection({
  children,
  heightClassName,
  hasGradient = true,
}: {
  children: React.ReactNode;
  heightClassName?: string;
  hasGradient?: boolean;
}) {
  const containerClassName = cn("h-[110px]", heightClassName);
  const classNameMerge = cn(
    "absolute w-full left-0 h-[110px] bg-primary-blue",
    heightClassName
  );
  return (
    <div className={containerClassName}>
      <div className={classNameMerge}>
        {hasGradient ? <BgOrangeGradient /> : null}
        <Container className="relative h-full px-4 z-2">{children}</Container>
      </div>
    </div>
  );
}
