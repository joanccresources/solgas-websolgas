"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface TextProps {
  /**
   * Text to display
   */
  children: React.ReactNode;

  className?: string;

  borderClassName?: string
}
  
export default function TextBorderAnimation({ children, className, borderClassName }: TextProps) {
  const [isHoveredIn, setIsHoveredIn] = useState(false); 

  const onInit = ()=> {
    setTimeout(() => {
        setIsHoveredIn(true); 
    }, 600);
  }

  useEffect(()=> {
    onInit()
  }, [])
 
  const border = cn("relative mt-6 h-1 w-full", borderClassName)
  return (
    <div className="overflow-hidden">
      <div className={cn("open-sans-bold text-foreground", className)}> 
        {children}
     </div>
      <div className={border}>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-[82px] bg-primary-orange transition-transform duration-700",
            isHoveredIn
              ? "translate-x-0 transform opacity-100"
              : "-translate-x-full transform opacity-0",
          )}
        ></div>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full translate-x-0 transform bg-primary-orange opacity-0 transition-transform duration-700"
          )}
        ></div>
      </div>
    </div>
  );
}
