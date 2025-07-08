"use client";
import Input from "@/components/forms/hook-form/components/input"; 
import { Button, UserCommentIcon } from "@/components";
import FormProvider from "@/components/forms/hook-form/provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; 
import { enqueueSnackbar } from "notistack";
import { getCaptchaToken } from "@/utils/recaptcha";
import { createComment } from "../actions";
import { generateErrorMessage } from "@/utils/error";
import { useAtom } from "jotai";
import { noticeAtom } from "@/store";

const defaultValues = {
  name: "",
  comment: "",
};

const RegisterSchema = z.object({
  name: z
  .string()
  .nonempty("El campo nombre es obligatorio")
  .max(1000, "El campo nombre no debe exceder los 255 caracteres"),
  comment: z
    .string()
    .nonempty("El campo mensaje es obligatorio")
    .max(1000, "El campo mensaje no debe exceder los 255 caracteres"),
});

export default function FormComment({slug}: {slug: string}) {
  const [notice, setNotice] = useAtom(noticeAtom); 
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

          const response = await createComment(formData, slug); 
          setNotice({
            ...notice,
            comments: [ ...notice.comments, response.data ]
          })
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
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="flex justify-center">
        <div className="w-full max-w-[922px]">
          <div className="flex gap-x-4 items-center pb-4">
            <div className="rounded-full bg-user-comment w-[51px] h-[51px] flex items-center justify-center">
              <UserCommentIcon />
            </div>
            <Input
              placeholder="Escribe tu nombre"
              className="md:h-[54px] h-[39px] placeholder:md:text-[16px]  placeholder:text-[15px] px-6 bg-gray-input placeholder:text-primary-blue placeholder:font-clan-pro-regular border-select"
              name="name"
              type="text"
            />
          </div>

          <Input
            placeholder="Agregar comentario"
            className="h-[76px] placeholder:text-[19px] px-8 placeholder:text-primary-blue/20"
            name="comment"
            type="text"
            fullWidth />
          <div className="flex justify-end py-4">
            <Button
              type="submit"
              height="44px"
              color={"white"}
              isLoading={isSubmitting}
              className="bg-gray text-primary-blue sm:text-sm text-[15px] font-clan-pro-new lg:w-[112px] w-[112px] lg:h-[44px] h-[36px]">Comentar</Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
