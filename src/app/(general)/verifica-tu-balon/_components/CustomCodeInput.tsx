"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";
interface Props {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

// export default function CustomCodeInput({
const CustomCodeInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, maxLength = 6 }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.toUpperCase().slice(0, maxLength);
      onChange(val);
    };

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div
        onClick={handleClick}
        // de 6:
        className="flex | gap-1 sm:gap-1.5 | justify-center items-center | px-2 py-3 bg-white rounded-[15px] border border-gray-300 | w-full lg:w-[334px] lg:min-w-[334px] max-w-full | h-[60px] sm:h-[75px] | font-clan-pro-medium | text-[32px] sm:text-[36px] lg:text-[46px] | relative"
        // de 7:
        // className="flex | gap-1 sm:gap-1.5 | justify-center items-center | px-2 py-3 bg-white rounded-[15px] border border-gray-300 | w-full lg:w-[334px] lg:min-w-[334px] max-w-full | h-[60px] sm:h-[75px] | font-clan-pro-medium | text-[32px] sm:text-[36px] lg:text-[46px] | relative"
        // de 8:
        // className="flex | gap-1 sm:gap-1.5 | justify-center items-center | px-2 py-3 bg-white rounded-[15px] border border-gray-300 | w-full lg:w-[382px] lg:min-w-[382px] max-w-full | h-[60px] sm:h-[75px] | font-clan-pro-medium | text-[32px] sm:text-[36px] lg:text-[46px] | relative"
      >
        {[...Array(maxLength)].map((_, i) => (
          <span key={i}>
            {/* mx-1 sm:mx-1.5 */}
            {/* text-transparent */}
            <span
              className={`h-[2px] min-w-[17px] inline-block | mx-1 sm:mr-[6px] lg:mr-3 | ${
                value[i] ? "text-transparent" : "text-[#D9D9D9]"
              }`}
            >
              _
            </span>
          </span>
        ))}
        <input
          type="text"
          ref={inputRef}
          value={value}
          onChange={handleChange}
          // En caso sean 6 caracteres:
          className="absolute w-full h-full | pl-[42px] sm:pl-[66px] md:pl-[83px] lg:pl-[42px] | tracking-[8px] lg:tracking-[10px] | focus:outline-primary-blue | rounded-[15px] | text-primary-blue"
          // En caso sean 7 caracteres:
          // className="absolute w-full h-full | pl-[26px] sm:pl-[47px] md:pl-[66px] lg:pl-[22px] | tracking-[8px] lg:tracking-[10px] | focus:outline-primary-blue | rounded-[15px] | text-primary-blue"
          // En caso  sean 8 caracteres:
          // className="absolute w-full h-full | pl-[12px] sm:pl-[32px] md:pl-[50px] lg:pl-[22px] | tracking-[8px] lg:tracking-[10px] | focus:outline-primary-blue | rounded-[15px] | text-primary-blue"
          inputMode="text"
          autoComplete="off"
        />
      </div>
    );
  }
);

CustomCodeInput.displayName = "CustomCodeInput";
export default CustomCodeInput;
