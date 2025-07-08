import { FeatherIcon, Text } from "@/components";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import tailwindConfig from "@root/tailwind.config";
import { Iconify } from "@/components";
import { cn } from "@/lib/utils";
import { PropsItemSelect } from "@/components/select/type";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];
const primaryBlue = tailwindConfig.theme.extend.colors["primary-blue"];
const gray = tailwindConfig.theme.extend.colors["gray-card"];

export default function Select({
  title,
  data,
  placeholder,
  value,
  onChange,
  orangeIcon = true,
  hasSearchField = true,
}: {
  title: string;
  data: PropsItemSelect[];
  placeholder: string;
  value: PropsItemSelect;
  onChange: (item: PropsItemSelect) => void;
  orangeIcon?: boolean;
  hasSearchField?: boolean;
}) {
  const classNameItem = (item: PropsItemSelect) => {
    return cn(
      "cursor-pointer inset-0 px-4 py-2 bg-[#F2F4F9] h-[58px] sm:h-[69px] border border-select rounded-lg",
      item?.id === value.id ? "" : ""
    );
  };

  const classNameItemText = (item: PropsItemSelect) => {
    return cn(
      "truncate w-full flex justify-between items-center text-primary-blue lg:text-[19px] text-base",
      item?.id === value.id ? "" : ""
    );
  };

  const classNameButton = cn(
    "rounded-full border border-select flex items-center lg:gap-x-2 gap-x-2 justify-between font-clan-pro-regular",
    "h-[50px] lg:h-[63px] w-full border-select bg-white lg:px-6 px-4"
  );

  const classNamePopOver = cn(
    "w-[var(--radix-popper-anchor-width)] p-0 max-w-none",
    data.length > 0 ? "bg-transparent !important border-none shadow-none" : ""
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={classNameButton}>
          <Text
            className={
              "lg:text-md text-md text-primary-blue placeholder:text-gray-secondary truncate"
            }
          >
            {value?.name ? value?.name : title}
          </Text>
          <Iconify
            icon="solar:alt-arrow-down-outline"
            width={26}
            height={26}
            color={orangeIcon ? primaryOrange : gray}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className={classNamePopOver}>
        <Command style={{ backgroundColor: "transparent" }}>
          {hasSearchField ? <CommandInput placeholder={placeholder} /> : null}
          <CommandEmpty>
            <Text className="truncate" font="bold" type="span">
              No se encontraron resultados
            </Text>
          </CommandEmpty>
          <CommandList>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {data?.map((item) => (
                <a key={item.id} onClick={() => onChange(item)}>
                  <CommandItem className={classNameItem(item)}>
                    <Text
                      className={classNameItemText(item)}
                      type="p"
                      font="medium"
                    >
                      {item.name}
                    </Text>
                    <div>
                      <FeatherIcon color={primaryBlue} />
                    </div>
                  </CommandItem>
                </a>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
