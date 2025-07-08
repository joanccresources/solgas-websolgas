"use client";
import { Text  } from "@/components";
import { PropsLabel } from ".";
import Link from "next/link";

export default function ItemPDF({
  children,
  href,
  border = false,
  size = "xs",
  font = "regular",
  className,
}: PropsLabel) { 
  return (
    <Link href={`/pdf/menu/${href}`}>
      <Text
        className={className}
        border={border}
        size={size}
        type="h4"
        font={font}
      >
        {children}
      </Text>
    </Link>
  );
}
