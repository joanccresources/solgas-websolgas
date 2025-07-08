'use client'
import { cn } from "@/lib/utils"; 
import { useEffect, useState } from "react";
import { TextProps, Text } from '@/components'

export default function HoverableText( props: TextProps) { 
  const [isHoveredIn, setIsHoveredIn] = useState(false);
  const [isHoveredOut, setIsHoveredOut] = useState(false);
 
  const handleHover = () => {
    setIsHoveredIn(true);
  };
 
  const handleHoverExit = () => {
    setIsHoveredIn(false);
    setIsHoveredOut(true);
  };
 
  useEffect(() => {
    if (isHoveredOut) {
      const timer = setTimeout(() => {
        setIsHoveredOut(false);
      }, 300);
 
      return () => clearTimeout(timer);
    }
  }, [isHoveredOut]);
  
  return (
    <div onMouseEnter={handleHover} onMouseLeave={handleHoverExit} className="overflow-hidden">
      <Text {...props}>{props.children}</Text>  
      <div className="relative mt-1 h-1 w-auto">
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full bg-yellow-500 transition-transform duration-300",
            isHoveredIn
              ? "translate-x-0 transform opacity-100"
              : "-translate-x-full transform opacity-0",
          )}
        ></div>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full translate-x-0 transform bg-yellow-500 opacity-0 transition-transform duration-300",
            isHoveredOut && "translate-x-full opacity-100",
          )}
        ></div>
      </div>
    </div>
   
  );
}
