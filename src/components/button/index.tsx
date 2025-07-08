"use client";
import { useRef } from "react";
import { TextProps } from "@/components";
import { cn } from "@/lib/utils";

interface ButtonCustomProps {
  width?: string;
  height?: string;
}

interface ButtonProps extends ButtonCustomProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  bg?: ColorsTypes;
  border?: ColorsTypes;
  color?: ColorsTypes;
  text?: TextProps;
  onClick?: () => void;
  isLoading?: boolean;
}
type ColorsTypes =
  | "primary"
  | "blue"
  | "secondaryblue"
  | "transparent"
  | "white"
  | "gray-secondary";

const backgrounds = {
  primary: "bg-primary-orange",
  blue: "bg-primary-blue",
  secondaryblue: "bg-secondary-blue",
  transparent: "bg-transparent",
  white: "bg-white",
  "gray-secondary": "bg-gray-secondary",
};

const colors = {
  primary: "text-primary-orange",
  blue: "text-primary-blue",
  secondaryblue: "text-secondary-blue",
  transparent: "text-transparent",
  white: "text-white",
  "gray-secondary": "text-gray-secondary",
};

const borders = {
  primary: "border border-primary-orange",
  blue: "border border-primary-blue",
  secondaryblue: "border border-secondary-blue",
  transparent: "border border-transparent",
  white: "border border-white",
  "gray-secondary": "border border-gray-secondary",
};

const Button = ({
  type = 'button',
  children,
  className,
  bg = "primary",
  border,
  color = "primary",
  onClick = () => {},
  isLoading = false,
}: ButtonProps) => {
  const classNameMerge = cn([
    `relative inline-flex  items-center justify-center overflow-hidden cursor-pointer
        rounded-full border  bg-linear-to-r 
        from-[#9ba3fdfd] to-[#white] px-1  text-white text-xs transition-colors
         font-clan-pro-thin font-thin  `,
          backgrounds[bg],
          colors[color],
          border ? borders[border] : '',
          className,
  ]);
  const divRef = useRef<HTMLButtonElement>(null);  

  return (
    <>
      <button
        ref={divRef} 
        className={classNameMerge}
        onClick={onClick}
        type={type}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300" 
        />
        {isLoading ? 
        <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin h-5 w-5 mr-3 text-white"
            >
              <circle
                strokeWidth="4"
                stroke="currentColor"
                r="10"
                cy="12"
                cx="12"
                className="opacity-25"
              ></circle>
              <path
                d="M4 12a8 8 0 018-8v8H4z"
                fill="currentColor"
                className="opacity-75"
              ></path>
            </svg>
            Loading...
        </div>
        : children} 
      </button>
    </>
  );
};

export default Button;
