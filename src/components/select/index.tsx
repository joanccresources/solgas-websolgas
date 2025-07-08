import { Text } from "@/components";
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
import { PropsItemSelect } from "./type";
import { cn } from "@/lib/utils";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];
const gray = tailwindConfig.theme.extend.colors["gray-card"];

export default function Select({
  title,
  data,
  placeholder,
  value,
  onChange,
  buttonClassName,
  buttonTextClassName,
  popOverContentClassName,
  orangeIcon = true,
  hasSearchField = true,
  itemSelectedTextClassName = "text-white",
}: {
  title: string;
  data: PropsItemSelect[];
  placeholder: string;
  value: PropsItemSelect;
  onChange: (item: PropsItemSelect) => void;
  buttonClassName?: string;
  buttonTextClassName?: string;
  popOverContentClassName?: string;
  orangeIcon?: boolean;
  hasSearchField?: boolean;
  itemSelectedTextClassName?: string;
}) {
  const classNameItem = (item: PropsItemSelect) => {
    return cn(
      "cursor-pointer  inset-0 ",
      item?.id === value.id
        ? "bg-linear-to-r from-primary-orange to-secondary-blue"
        : ""
    );
  };

  const classNameItemText = (item: PropsItemSelect) => {
    return cn(
      "truncate  ",
      item?.id === value.id ? itemSelectedTextClassName : ""
    );
  };

  const classNameButton = cn(
    "w-auto lg:h-[63px] h-[50px] rounded-full border border-select flex items-center lg:gap-x-2 gap-x-2 lg:px-4 px-3 justify-between font-clan-pro-regular",
    buttonClassName
  );

  const classNameButtonText = cn(
    "text-primary-blue truncate lg:text-[19px] text-sm",
    buttonTextClassName
  );

  const classNamePopOverContent = cn(
    "w-full p-0 md:w-80",
    popOverContentClassName
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={classNameButton}>
          <Text className={classNameButtonText}>
            {value?.name ? value?.name : title}
          </Text>
          <button onClick={() => onChange({ id: "", name: "" })}>
            <Iconify
              icon={
                value?.id && value?.name
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
          {hasSearchField ? <CommandInput placeholder={placeholder} /> : null}
          <CommandEmpty>
            <Text className="truncate" font="bold" type="span">
              No se encontraron resultados
            </Text>
          </CommandEmpty>
          <CommandList>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {data?.map((item) => (
                <a
                  key={item.id}
                  onClick={() => {
                    if (item.id !== value.id) {
                      onChange(item);
                    } else {
                      onChange({ id: "", name: "" } as PropsItemSelect);
                    }
                  }}
                >
                  <CommandItem className={classNameItem(item)}>
                    <Text className={classNameItemText(item)} type="p">
                      {item.name}
                    </Text>
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
