import { cn } from "@/lib/utils";

export default function Line({ line_position }: { line_position: string }) {
  const classNameMerge = cn(
    "absolute z-30 border-primary-orange",
    line_position
  );
  return <div className={classNameMerge}></div>;
}
