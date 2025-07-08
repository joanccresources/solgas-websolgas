import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Text } from "@/components";
import { Command } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import tailwindConfig from "@root/tailwind.config";
import { Iconify } from "@/components";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MouseEventHandler } from "react";
import { es } from "date-fns/locale";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];
const gray = tailwindConfig.theme.extend.colors["gray-card"];

export default function DatePicker({
  title = "Seleccionar",
  value,
  onChange,
  buttonClassName,
  buttonTextClassName,
  popOverContentClassName,
  orangeIcon = true,
}: {
  title?: string;
  value: Date | undefined;
  onChange: (item: Date | undefined) => void;
  buttonClassName?: string;
  buttonTextClassName?: string;
  popOverContentClassName?: string;
  orangeIcon?: boolean;
}) {
  const classNameButton = cn(
    "w-auto lg:h-[63px] h-[50px] rounded-full border border-select flex items-center lg:gap-x-2 gap-x-2 lg:px-4 px-3 justify-between font-clan-pro-regular",
    buttonClassName
  );

  const classNameButtonText = cn(
    "text-primary-blue truncate lg:text-[19px] text-sm",
    buttonTextClassName
  );

  const classNamePopOverContent = cn(
    "w-full p-4 font-clan-pro-regular",
    popOverContentClassName
  );

  function CustomNav({
    onPreviousClick,
    onNextClick,
  }: {
    onPreviousClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    onNextClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  }) {
    return (
      <div className="flex justify-between items-center px-4 absolute right-0 top-2 gap-6">
        <button
          onClick={onPreviousClick}
          className="bg-transparent rounded-full cursor-pointer focus-visible:border-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNextClick}
          className="bg-transparent rounded-full cursor-pointer focus-visible:border-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={classNameButton}>
          <Text className={classNameButtonText}>
            {value ? format(value, "dd/MM/yyyy") : title}
          </Text>
          <button onClick={() => onChange(undefined)}>
            <Iconify
              icon={
                value
                  ? "material-symbols:close-rounded"
                  : "solar:alt-arrow-down-outline"
              }
              width={26}
              height={26}
              color={orangeIcon ? primaryOrange : gray}
            />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className={classNamePopOverContent}>
        <Command>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={onChange}
            required={true}
            role="dialog"
            locale={es}
            modifiersClassNames={{
              today: "text-primary-blue",
              selected: "bg-primary-blue text-white rounded-full",
            }}
            components={{
              Nav: CustomNav,
            }}
          />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
