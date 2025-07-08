import { cn } from "@/lib/utils";

export default function Line({
  line_position,
  isHovered,
}: {
  line_position: string;
  isHovered: boolean;
}) {
  const classNameMerge = cn(
    "absolute z-30 border-primary-orange scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:delay-400",
    line_position,
    isHovered ? "scale-100 opacity-100" : ""
  );
  return <div className={classNameMerge}></div>;
}
