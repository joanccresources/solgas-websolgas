import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  id: string;
  label: string;
  register: UseFormRegister<T>;
  registerId: Path<T>;
  error?: string;
  required?: boolean;
  className?: string;
};

export function InputField<T extends FieldValues>({
  id,
  label,
  register,
  registerId,
  error,
  required = false,
  className = "",
}: Props<T>) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block | text-sm md:text-[17px] | text-primary-blue font-clan-pro-bold"
      >
        {required ? (
          <>
            {label} <span className="text-primary-orange">*</span>
          </>
        ) : (
          label
        )}
      </label>
      <div className="mx-4 mt-3">
        <input
          {...register(registerId)}
          id={id}
          placeholder="Escriba aquí..."
          className="text-xs md:text-base | w-full border py-2 px-4 rounded-[45px] font-clan-pro-regular text-primary-blue border-select placeholder:text-[#A8A8A8] focus:outline-1 focus:outline-primary-blue/70 transition duration-300"
        />
        {error && <p className="text-red-600 text-xs ml-2">{error}</p>}
      </div>
    </div>
  );
}
