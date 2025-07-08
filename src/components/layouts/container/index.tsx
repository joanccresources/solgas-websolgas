import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const classNameMerge = cn(
    "container mx-auto px-6 lg:px-12 w-full",
    className
  );
  return <div className={classNameMerge}>{children}</div>;
}
