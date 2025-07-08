import { Select, Text } from "@/components";
import { PropsItemSelect } from "@/components/select/type";
import { Controller, useFormContext } from "react-hook-form";

export default function SelectWithLabel({
  name,
  title,
  data,
  placeholder,
  staticLabel,
  required = false,
  defaultValue = { id: "", name: "" },
}: {
  name: string;
  title: string;
  data: PropsItemSelect[];
  placeholder: string;
  className: string;
  staticLabel?: string;
  required?: boolean;
  defaultValue?: PropsItemSelect;
}) {
  const { control } = useFormContext();

  return (
    <>
      {staticLabel ? (
        <Text
          className="text-primary-blue md:text-[17px] text-sm mb-3"
          font="bold"
        >
          {staticLabel}
          {required ? (
            <span className="text-primary-orange ml-1">*</span>
          ) : null}
        </Text>
      ) : null}
      <div className={staticLabel ? "md:pl-5 pl-4" : "pl-0"}>
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select
                title={title}
                data={data}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                buttonClassName={`h-10 lg:h-10 w-full ${
                  error?.message ? "border-red-500" : "border-select"
                }`}
                buttonTextClassName={
                  "lg:text-md text-md text-gray-bold placeholder:text-gray-secondary"
                }
                popOverContentClassName={"z-[105]"}
                orangeIcon={false}
              />
              {error?.message ? (
                <Text className="pl-4 text-red-500 text-sm mt-2" font="regular">
                  {error?.message}
                </Text>
              ) : null}
            </>
          )}
          name={name}
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
}
