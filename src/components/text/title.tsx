import { Divider, Text } from "@/components";
import { cn } from "@/lib/utils";
export default function GraySectionTitle({
  children,
  text_align = "center",
  line = false,
  marginBottomClassName = "lg:mb-20 md:mb-16 mb-10",
}: {
  children: string | React.ReactNode;
  text_align?: string;
  line?: boolean;
  marginBottomClassName?: string;
}) {
  const textClassNameMerge = cn(
    "sm:text-select text-mobile md:text-[54px] text-xl text-center leading-[1.1]",
    text_align === "center" ? "text-center" : "sm:text-left",
    line ? "w-fit-content" : ""
  );
  return (
    <div className={cn("text-center", marginBottomClassName)}>
      {!line ? (
        <>
          {typeof children === "string" ? (
            <Text className={textClassNameMerge} type="h1" font="regular">
              {children}
            </Text>
          ) : (
            children
          )}
        </>
      ) : (
        <div
          className={cn(
            "flex items-center flex-nowrap gap-10",
            text_align === "center"
              ? "justify-center"
              : "justify-center sm:justify-start"
          )}
        >
          <Text className={textClassNameMerge} type="h1" font="regular">
            {children}
          </Text>
          <Divider className="w-full border-select hidden sm:block" />
        </div>
      )}
    </div>
  );
}
