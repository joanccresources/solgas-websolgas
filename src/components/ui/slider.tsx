"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[14px] w-full grow overflow-hidden rounded-full bg-[#EFF1F8] border border-select">
      <SliderPrimitive.Range className="absolute h-full bg-linear-to-r from-primary-blue via-[#004996] to-primary-orange" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
    className="bg-primary-blue block rounded-full border border-primary-blue shadow transition-colors 
    focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none h-[22px] w-[22px] " />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
