"use client";
import { useFormContext, Controller } from "react-hook-form";
import TextArea from "@/components/forms/area";

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
};

export default function RHFTextField({ name, type, rows, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextArea
          error={error?.message}
          type={type}
          value={field?.value}
          onChange={field.onChange}
          rows={rows}
          {...other}
        />
      )}
    />
  );
}
