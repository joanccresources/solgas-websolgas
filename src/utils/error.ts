import { UseFormReturn } from "react-hook-form";

export const generateErrorMessage = (
  errors: unknown[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<any>
) => {
  const { setError } = methods;

  for (const key in errors) {
    if (errors[key]) {
      if (Array.isArray(errors[key])) {
        for (const iterator of errors[key]) {
          if (iterator) {
            setError(key, { type: "custom", message: iterator });
          }
        }
      }
    }
  }
};
