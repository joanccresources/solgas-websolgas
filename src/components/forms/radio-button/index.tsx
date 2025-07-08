import { Text } from "@/components";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

export default function RadioGroup({
  options = [],
  staticLabel,
  required = false,
  radioGroupName = "",
  name,
  defaultValue = "",
  description,
  withBg = false,
  divider = false,
}: {
  options: { id: string; name: string }[];
  staticLabel?: string | React.ReactNode;
  required?: boolean;
  radioGroupName?: string;
  name: string;
  defaultValue?: string;
  description?: string | React.ReactNode;
  withBg?: boolean;
  divider?: boolean;
}) {
  const { control } = useFormContext();

  return (
    <div>
      {staticLabel ? (
        <>
          {typeof staticLabel === "string" ? (
            <Text
              className="text-primary-blue md:text-[17px] text-sm mb-3"
              font="bold"
            >
              {staticLabel}
              {required ? (
                <span className="text-primary-orange ml-1">*</span>
              ) : null}
            </Text>
          ) : (
            staticLabel
          )}
        </>
      ) : null}
      {typeof description === "string" ? (
        <Text
          className="text-black md:text-[15px] text-[14px] mb-3 md:pl-8 pl-6"
          font="regular"
        >
          {description}
        </Text>
      ) : !!description ? (
        <div className="text-black md:text-[15px] text-[14px] mb-3 md:pl-8 pl-6 font-clan-pro-regular">
          {description}
        </div>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className={staticLabel ? "md:pl-8 pl-4" : "pl-0"}>
            <div
              className={cn(
                "radio-buttons-container items-center grid auto-cols-max grid-flow-col",
                withBg ? "bg-gray py-3 px-8 rounded-3xl" : "",
                divider ? "divide-x-2 divide-primary-blue" : ""
              )}
            >
              {options.map((option) => (
                <div
                  key={option.id}
                  className="radio-button group flex items-center px-4"
                >
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      className="sr-only peer"
                      name={`${radioGroupName}`}
                      type="radio"
                      checked={field.value === option.id}
                      onChange={() => field.onChange(option.id)}
                    />
                    <div className="w-4 h-4 bg-white border-2 border-primary-orange rounded-full peer-checked:bg-primary-orange peer-checked:border-primary-orange peer-hover:shadow-lg peer-hover:shadow-primary-orange/50 peer-checked:shadow-lg peer-checked:shadow-primary-orange/50 transition duration-300 ease-in-out"></div>
                    <span className="ml-3 font-clan-pro-bold text-primary-blue md:text-[17px]">
                      {option.name}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            {error?.message ? (
              <Text className="pl-4 text-red-500 text-sm mt-2" font="regular">
                {error?.message}
              </Text>
            ) : null}
          </div>
        )}
        defaultValue={defaultValue}
      />
    </div>
  );
}
