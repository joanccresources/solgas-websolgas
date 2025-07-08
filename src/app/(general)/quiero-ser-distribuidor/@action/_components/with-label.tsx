import { Select, Text } from "@/components";
import { PropsItemSelect } from "@/components/select/type";

export default function SelectWithLabel({
  title,
  data,
  placeholder,
  value,
  onChange, 
  staticLabel,
  required = false,
}: {
  title: string;
  data: PropsItemSelect[];
  placeholder: string;
  value: PropsItemSelect;
  onChange: (item: PropsItemSelect) => void;
  className: string;
  staticLabel?: string;
  required?: boolean;
}) {
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
        <Select
          title={title}
          data={data}
          placeholder={placeholder}
          value={value}
          onChange={onChange} 
          buttonClassName={"h-10 lg:h-10 border-primary-blue w-full"}
          buttonTextClassName={
            "lg:text-md text-md text-gray-bold placeholder:text-gray-secondary"
          }
          popOverContentClassName={"z-105"}
          orangeIcon={false}
        />
      </div>
    </>
  );
}
