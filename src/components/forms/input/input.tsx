"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input as InputBase } from "@/components/ui/input";
import { Text } from "@/components";

interface InputProps extends React.ComponentProps<"input"> {
  staticLabel?: string;
  required?: boolean;
  type?: string;
  className?: string;
  error?: string;
  onlyNumbers?: boolean;
  fullWidth?: boolean;
}

export default function Input({
  name,
  staticLabel,
  required = false,
  type = "text",
  className,
  error,
  onlyNumbers = false,
  fullWidth = false,
  ...props
}: InputProps) {
  const [value, setValue] = useState("");
  const classInput = cn([
    `font-clan-pro-regular h-[45px] px-4 w-full rounded-full border border-select text-md text-gray-bold placeholder:text-gray-secondary focus:outline-hidden`,
    className,
    error ? "border-red-500" : "",
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (onlyNumbers && !/^\d*$/.test(newValue)) {
      return;
    }

    setValue(newValue);
  };

  return (
    <div className={fullWidth ? "w-full" : ""}>
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
        <InputBase
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          className={classInput}
          {...props}
        />
        {error ? (
          <Text className="pl-4 text-red-500 text-sm mt-2" font="regular">
            {error}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
