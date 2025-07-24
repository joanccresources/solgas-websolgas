"use client";

import { Dialog } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import FullScreenLoader from "./FullScreenLoader";
import { getParsedDevice } from "../_utils/getParsedDevice";
import { getPublicIP } from "../_utils/getPublicIP";
import { getCaptchaToken } from "@/utils/recaptcha";
import { InputField } from "./InputField";

const schema = z.object({
  nombre: z.string().min(4, "Campo requerido"),
  ciudad: z.string().min(2, "Campo requerido"),
  contacto: z.string().min(6, "Dato requerido"),
  negocio_nombre: z.string().optional(),
  negocio_razon_social: z.string().optional(),
  negocio_direccion: z.string().optional(),
  negocio_distrito: z.string().optional(),
  acepto: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar las políticas" }),
  }),
});

type FormData = z.infer<typeof schema>;

export default function ReportCaseModal({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // Error
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true); // ⬅️ Mostramos loader
    setErrorMessage(null); // Reseteamos mensaje
    console.log("Envío...");
    /* ORIGINAL */
    try {
      const verification = JSON.parse(
        localStorage.getItem("solgas-verification") || "null"
      );
      if (!verification) {
        setErrorMessage("Primero valida tu precinto antes de registrarte.");
        setShowError(true);
        setIsLoading(false);
        return;
      }      
      const ipOrigen = await getPublicIP();
      const token = await getCaptchaToken();
      const payload = {
        // Datos del usuario
        nombres_apellidos: data.nombre,
        ciudad: data.ciudad || "",
        contacto: data.contacto,
        // Datos del negocio
        nombre_negocio: data.negocio_nombre || "",
        razon_social: data.negocio_razon_social || "",
        direccion_negocio: data.negocio_direccion || "",
        distrito: data.negocio_distrito || "",
        acepto_politicas: true,
        // Datos de validación
        codigo_alfanumerico: verification.codigo_alfanumerico,
        q_recaptcha: token,
        dispositivo: getParsedDevice(),
        // 'fecha_registro': Laravel,
        ip_origen: ipOrigen,
        status_validacion: verification.status,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API}/case/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();
      if (!json.success) {
        const firstError =
          json.errors && typeof json.errors === "object"
            ? Object.values(json.errors).flat()[0]
            : json.message || "Error al registrar el caso";
        throw new Error(firstError);
      }
      localStorage.removeItem("solgas-verification");
      setShowSuccess(true);
    } catch (err) {
      console.log({ err });
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Error desconocido";
      setErrorMessage(msg);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (showSuccess)
    return (
      <SuccessModal
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
      >
        <p className="text-base text-primary-blue font-clan-pro-regular">
          Tomaremos acciones a <br />
          <strong className="text-primary-blue">tu caso registrado.</strong>
        </p>
      </SuccessModal>
    );

  if (showError)
    return (
      <ErrorModal
        onClose={() => {
          setShowError(false);
          onClose();
        }}
        message={errorMessage ?? undefined}
      />
    );

  return (
    <Dialog open onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center px-4 backdrop-blur-[6px]">
        <div className="bg-white rounded-[22px] w-full max-w-2xl p-6 relative max-h-screen overflow-y-auto scrollbar-custom">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          >
            <X size={24} className="text-primary-orange font-bold" />
          </button>

          <h2 className="text-base md:text-xl | text-center mb-6 text-primary-blue font-clan-pro-bold">
            ¡Registra tu caso!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[300px] md:h-[380px] | space-y-3 overflow-y-auto">
              {/* Datos del usuario */}
              <InputField<FormData>
                id="report-nombre"
                label="1. Nombres y Apellidos"
                register={register}
                registerId="nombre"
                error={errors.nombre?.message}
                required
              />
              <InputField<FormData>
                id="report-ciudad"
                label="2. Ciudad de residencia"
                register={register}
                registerId="ciudad"
                error={errors.ciudad?.message}
              />
              <InputField<FormData>
                id="report-contacto"
                label="3. Correo electrónico o teléfono"
                register={register}
                registerId="contacto"
                error={errors.contacto?.message}
                required
              />
              {/* Datos del negocio */}
              <p className="lg:mt-5 lg:mb-5 mt-4 mb-3 | text-primary-orange font-clan-pro-bold | lg:text-lg text-base | ">
                Datos del negocio donde compró su balón:
              </p>
              <InputField<FormData>
                id="report-negocio_nombre"
                label="1. Nombres del negocio"
                register={register}
                registerId="negocio_nombre"
                error={errors.negocio_nombre?.message}
              />
              <InputField<FormData>
                id="report-negocio_razon_social"
                label="2. Razón social"
                register={register}
                registerId="negocio_razon_social"
                error={errors.negocio_razon_social?.message}
              />
              <InputField<FormData>
                id="report-negocio_direccion"
                label="3. Dirección o teléfono"
                register={register}
                registerId="negocio_direccion"
                error={errors.negocio_direccion?.message}
              />
              <InputField<FormData>
                id="report-negocio_distrito"
                label="4. Distrito"
                register={register}
                registerId="negocio_distrito"
                error={errors.negocio_distrito?.message}
                className="mb-3"
              />
            </div>

            <div className="flex items-center gap-6 mt-3 | flex-col md:flex-row">
              <div className="flex items-center gap-1 flex-col md:order-2 | mr-auto md:mr-0">
                <input
                  type="checkbox"
                  id="checkbox"
                  {...register("acepto")}
                  className="peer hidden"
                />
                <label
                  htmlFor="checkbox"
                  className="flex items-center gap-2 cursor-pointer peer-checked:[&_.circle]:bg-primary-orange"
                >
                  <span className="w-4 h-4 rounded-full border-2 border-primary-orange flex items-center justify-center transition-colors duration-200 circle">
                    <span className="w-1.5 h-1.5 rounded-full bg-white circle-inter"></span>
                  </span>
                  <span className="text-xs md:text-sm | text-primary-blue font-clan-pro-new">
                    Acepto las{" "}
                    <a
                      href="/pdf/menu/politicas.pdf"
                      target="_blank"
                      className="text-primary-orange underline"
                    >
                      Políticas de datos personales
                    </a>
                  </span>
                </label>
                {errors.acepto && (
                  <p className="text-red-600 text-xs ml-2 w-full flex-none">
                    {errors.acepto.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-primary-orange | text-[13px] md:text-base | text-white cursor-pointer transition | h-[34px] md:h-[42px] | w-[157px] md:w-[186px] | max-w-full rounded-[50px] font-clan-pro-medium inline-flex items-center justify-center leading-none md:order-1"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
