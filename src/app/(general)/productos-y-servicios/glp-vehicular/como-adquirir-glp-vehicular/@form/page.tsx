"use client";
import Input from "@/components/forms/hook-form/components/input";
import TextArea from "@/components/forms/hook-form/components/area";
import { Button, Divider } from "@/components";
import FormProvider from "@/components/forms/hook-form/provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPost } from "../actions";
import { generateErrorMessage } from "@/utils/error";
import { enqueueSnackbar } from "notistack";
import { getCaptchaToken } from "@/utils/recaptcha";

const defaultValues = {
  full_name: "",
  company: "",
  phone: "",
  ruc: "",
  email: "",
  region: "",
  message: "",
};

const RegisterSchema = z.object({
  full_name: z
    .string()
    .nonempty("El campo nombre y apellido es obligatorio")
    .max(255, "El campo nombre y apellido no debe exceder los 255 caracteres"),
  company: z
    .string()
    .nonempty("El campo empresa es obligatorio")
    .max(255, "El campo empresa debe exceder los 255 caracteres"),
  phone: z
    .string()
    .nonempty("El campo teléfono es obligatorio")
    .max(15, "El campo teléfono no debe exceder los 255 caracteres"),
  ruc: z
    .string()
    .nonempty("El campo RUC es obligatorio")
    .min(11, "El campo RUC debe tener 11 caracteres")
    .max(255, "El campo RUC no debe exceder los 255 caracteres"),
  email: z
    .string()
    .nonempty("El campo correo electrónico es obligatorio")
    .email("El campo correo electrónico debe ser un email valido")
    .max(255, "El campo correo electrónico no debe exceder los 255 caracteres"),
  region: z
    .string()
    .nonempty("El campo región es obligatorio")
    .max(255, "El campo región no debe exceder los 255 caracteres"),
  message: z
    .string()
    .nonempty("El campo mensaje es obligatorio")
    .max(1000, "El campo mensaje no debe exceder los 255 caracteres"),
});

export default function PageForm() {
  const methods = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        const token = await getCaptchaToken();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });
        if (token) {
          formData.append("q_recaptcha", token);
        }

        const response = await createPost(formData);
        if (response?.errors) {
          generateErrorMessage(response.errors, methods);
        } else {
          reset(defaultValues);
          enqueueSnackbar(response?.message, {
            variant: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "center" },
            autoHideDuration: 3000
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        enqueueSnackbar("Servicio no disponible", {
          variant: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "center" },
          autoHideDuration: 3000
        });
      }
    },
    (e) => console.log(e)
  );

  return (
    <div className="max-w-[1253px] w-full xl:px-0 px-6 py-6 sm:py-0">
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-12 gap-8">
          <div className="lg:col-span-6 col-span-12">
            <Input
              placeholder="Nombre y apellido"
              className="h-[60px]"
              name="full_name"
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <Input placeholder="Empresa" className="h-[60px]" name="company" />
          </div>

          <div className="lg:col-span-6 col-span-12">
            <Input
              placeholder="RUC"
              className="h-[60px]"
              name="ruc"
              type="number"
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <Input
              placeholder="Teléfono"
              className="h-[60px]"
              name="phone"
              type="number"
            />
          </div>

          <div className="lg:col-span-6 col-span-12">
            <Input
              placeholder="Correo electrónico"
              className="h-[60px]"
              name="email"
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <Input placeholder="Región" className="h-[60px]" name="region" />
          </div>
          <div className="col-span-12">
            <TextArea placeholder="Mensaje" rows={5} name="message" />
          </div>
        </div>

        <div className="flex justify-center lg:py-16 py-8">
          <Button
            type="submit"
            height="54px"
            bg={"primary"}
            border={"primary"}
            color={"white"}
            isLoading={isSubmitting}
            className="sm:text-sm text-[12px] font-clan-pro-bold lg:w-[145px] w-[130px] lg:h-[63px] h-[36px]"
          >
            ENVIAR
          </Button>
        </div>

        <Divider className="hidden sm:block" />
      </FormProvider>
    </div>
  );
}
