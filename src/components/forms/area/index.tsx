"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TextArea } from "@/components/ui/area";
import { Text } from "@/components";

interface AreaProps extends React.ComponentProps<"textarea"> {
  staticLabel?: string;
  required?: boolean;
  type?: string;
  className?: string; 
  error?: string
  rows?: number;
}

export default function TextAreaCustom({
  staticLabel,
  required = false, 
  className,
  error,
  rows,
  ...props
}: AreaProps) {
  const [value, setValue] = useState("");
  const classInput = cn([
    `font-clan-pro-regular h-full p-4 w-full rounded-3xl border border-select text-md text-gray-bold placeholder:text-gray-secondary focus:outline-hidden focus:border-primary-orange`,
    className,
    error ?  'border-red-500' : ''
  ]);

  return (
    <div>
      {staticLabel ? (
        <Text
          className="text-primary-blue md:text-[17px] text-sm mb-3"
          font="bold"
        >
          {staticLabel}
          {required ? (
            <span className="text-primary-orange ml-1">*</span>
          ) : null}
        </Text>
      ) : null}

      <div className={staticLabel ? "md:pl-5 pl-4" : "pl-0"}>
        <TextArea
          id="search"
          name="search" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={classInput}
          rows={rows}
          {...props}
        />
          {
          error ? 
            <Text className="pl-4 text-red-500 text-sm mt-2" font="regular">
              {error}
            </Text> 
          : null
        }
      </div>
    </div>
  );
}
