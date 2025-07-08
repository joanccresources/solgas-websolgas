"use client";
import { useFormContext, Controller } from "react-hook-form"; 
import SliderCustom from "@/components/forms/slider";

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  max?: number; 
  min?: number
  step?: number
};

export default function RHFSlider({ name, className, max, min, step }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SliderCustom 
         onChange={e => field.onChange((e.target as HTMLInputElement).value)}
         className={className}
         max={max}
         step={step}
         min={min}
         value={field.value}
        />
      )}
    />
  );
}
