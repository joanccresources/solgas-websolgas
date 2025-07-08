import { cn } from "@/lib/utils";

export default function ImageMarker({
  marker_position,
  isHovered,
}: {
  marker_position: string;
  isHovered: boolean;
}) {
  const classNameMerge = cn("absolute z-30", marker_position);
  const markerClassName = cn(
    "w-5 h-5 rounded-full border-2 border-transparent bg-primary-orange group-hover:w-16 group-hover:h-16 group-hover:bg-transparent group-hover:border-primary-orange transition-all duration-300 ease-in-out",
    isHovered ? "w-16 h-16 bg-transparent border-primary-orange" : ""
  );
  return (
    <div className={classNameMerge}>
      <div className="w-16 h-16 flex justify-center items-center">
        <div className={markerClassName}></div>
      </div>
    </div>
  );
}
