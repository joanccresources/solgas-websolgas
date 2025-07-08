"use client";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/forms/input";

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  staticLabel?: string;
  required?: boolean;
  onlyNumbers?: boolean;
  fullWidth?: boolean;
};

export default function RHFTextField({
  name,
  type,
  onlyNumbers,
  ...other
}: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          error={error?.message}
          type={type} 
          value={field?.value || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            if (onlyNumbers && !/^\d*$/.test(newValue)) {
              return;
            }
            field.onChange(e);
          }}
          onlyNumbers={onlyNumbers}
          name={name}
          {...other}
        />
      )}
    />
  );
}
