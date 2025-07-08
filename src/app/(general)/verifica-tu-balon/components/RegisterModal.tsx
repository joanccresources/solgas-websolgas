// src/app/(general)/verifica-tu-balon/components/RegisterModal.tsx
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
import { getParsedDevice } from "../utils/getParsedDevice";
import { getPublicIP } from "../utils/getPublicIP";

const schema = z.object({
  nombre: z.string().min(4, "Campo requerido"),
  dni: z.string().min(8, "DNI inválido"),
  telefono: z.string().min(9, "Teléfono inválido"),
  email: z.string().email("Correo inválido"),
  direccion: z.string().min(4, "Campo requerido"),
  ciudad: z.string().min(4, "Campo requerido"),
  acepto: z.literal(true, {
    errorMap: () => ({
      message: "Debes aceptar las políticas",
    }),
  }),
});

type FormData = z.infer<typeof schema>;

export default function RegisterModal({ onClose }: { onClose: () => void }) {
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
      const payload = {
        nombres_apellidos: data.nombre,
        documento_identidad: data.dni,
        telefono: data.telefono,
        correo_electronico: data.email,
        direccion: data.direccion,
        ciudad: data.ciudad,
        acepto_politicas: true,
        dispositivo: getParsedDevice(),
        codigo_alfanumerico: verification.codigo_alfanumerico,
        status_validacion: verification.status,
        id_log: verification.id_log,
        ip_origen: ipOrigen,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API}/clients/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-SOLGAS-TOKEN": process.env.NEXT_PUBLIC_SOLGAS_TOKEN || "",
          },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      // if (!res.ok) throw new Error(json.message || "Error en el registro");
      if (!json.success) {
        const firstError =
          json.errors && typeof json.errors === "object"
            ? Object.values(json.errors).flat()[0]
            : json.message || "Error en el registro";
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
      />
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
        <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative max-h-screen overflow-y-auto scrollbar-custom">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          >
            <X size={24} className="text-primary-orange font-bold" />
          </button>

          <h2 className="text-base md:text-xl | text-center mb-6 text-primary-blue font-clan-pro-bold">
            ¡Regístrate y descubre más beneficios con Solgas!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[300px] md:h-[380px] | space-y-3 overflow-y-auto">
              <div>
                <label
                  htmlFor="registro-nombre"
                  className="block | text-sm md:text-[17px] | text-primary-blue font-clan-pro-bold"
                >
                  1. Nombres y Apellidos{" "}
                  <span className="text-primary-orange">*</span>
                </label>
                <div className="mx-4 mt-3">
                  <input
                    {...register("nombre")}
                    id="registro-nombre"
                    placeholder="Escriba aquí..."
                    className="text-xs md:text-base | w-full border py-2 px-4 rounded-[45px] font-clan-pro-regular text-primary-blue border-select placeholder:text-[#A8A8A8] focus:outline-1 focus:outline-primary-blue/70 transition duration-300"
                  />
                  {errors.nombre && (
                    <p className="text-red-600 text-xs ml-2">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="registro-dni"
                  className="block | text-sm md:text-[17px] | text-primary-blue font-clan-pro-bold"
                >
                  2. DNI/RUC (según corresponda){" "}
                  <span className="text-primary-orange">*</span>
                </label>
                <div className="mx-4 mt-3">
                  <input
                    {...register("dni")}
                    id="registro-dni"
                    placeholder="El valor debe ser numérico"
                    className="text-xs md:text-base | w-full border py-2 px-4 rounded-[45px] font-clan-pro-regular text-primary-blue border-select placeholder:text-[#A8A8A8] focus:outline-1 focus:outline-primary-blue/70 transition duration-300"
                  />
                  {errors.dni && (
                    <p className="text-red-600 text-xs ml-2">
                      {errors.dni.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="registro-telefono"
                  className="block | text-sm md:text-[17px] | text-primary-blue font-clan-pro-bold"
                >
                  3. Teléfono <span className="text-primary-orange">*</span>
                </label>
                <div className="mx-4 mt-3">
                  <input
                    {...register("telefono")}
                    id="registro-telefono"
                    placeholder="El valor debe ser numérico"
                    className="text-xs md:text-base | w-full border py-2 px-4 rounded-[45px] font-clan-pro-regular text-primary-blue border-select placeholder:text-[#A8A8A8] focus:outline-1 focus:outline-primary-blue/70 transition duration-300"
                  />
                  {errors.telefono && (
                    <p className="text-red-600 text-xs ml-2">
                      {errors.telefono.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="registro-email"
                  className="block | text-sm md:text-[17px] | text-primary-blue font-clan-pro-bold"
                >
                  4. Correo Electrónico{" "}
                  <span className="text-primary-orange">*</span>
                </label>
                <div className="mx-4 mt-3">
                  <input
                    {...register("email")}
                    id="registro-email"
                    placeholder="Escriba aquí..."
                    className="text-xs md:text-base | w-full border py-2 px-4 rounded-[45px] font-clan-pro-regular text-primary-blue border-select placeholder:text-[#A8A8A8] focus:outline-1 focus:outline-primary-blue/70 transition duration-300"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs ml-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="registro-direccion"
                  className="block | text-sm md:text-[17px] | text-primary-blue font-clan-pro-bold"
                >
                  5. Dirección <span className="text-primary-orange">*</span>
                </label>
                <div className="mx-4 mt-3">
                  <input
                    {...register("direccion")}
                    id="registro-direccion"
                    placeholder="Escriba aquí..."
                    className="text-xs md:text-base | w-full border py-2 px-4 rounded-[45px] font-clan-pro-regular text-primary-blue border-select placeholder:text-[#A8A8A8] focus:outline-1 focus:outline-primary-blue/70 transition duration-300"
                  />
                  {errors.direccion && (
                    <p className="text-red-600 text-xs ml-2">
                      {errors.direccion.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="registro-ciudad"
                  className="block | text-sm md:text-[17px] | text-primary-blue font-clan-pro-bold"
                >
                  6. Ciudad <span className="text-primary-orange">*</span>
                </label>
                <div className="mx-4 mt-3">
                  <input
                    {...register("ciudad")}
                    placeholder="Escriba aquí..."
                    id="registro-ciudad"
                    className="text-xs md:text-base | w-full border py-2 px-4 rounded-[45px] font-clan-pro-regular text-primary-blue border-select placeholder:text-[#A8A8A8] focus:outline-1 focus:outline-primary-blue/70 transition duration-300"
                  />
                  {errors.ciudad && (
                    <p className="text-red-600 text-xs ml-2">
                      {errors.ciudad.message}
                    </p>
                  )}
                </div>
              </div>
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
