"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import CustomCodeInput from "../_components/CustomCodeInput";
import ResultModal from "../_components/ResultModal";
import RegisterModal from "../_components/RegisterModal";
import FullScreenLoader from "../_components/FullScreenLoader";
import ErrorModal from "../_components/ErrorModal";
import { getParsedDevice } from "../_utils/getParsedDevice";
import SecurityButton from "../_components/SecurityButton";
import { getPublicIP } from "../_utils/getPublicIP";
import { getCaptchaToken } from "@/utils/recaptcha";
import ReportCaseModal from "../_components/ReportCaseModal";

const schema = z.object({
  codigo: z
    .string({ required_error: "El código es obligatorio." })
    .length(6, "El código debe tener exactamente 6 caracteres."),
});

type FormData = z.infer<typeof schema>;

type Resultado = "original" | "no-original" | "revisado";

export default function VerificaTuBalon() {
  const inputRef = useRef<HTMLInputElement>(null); // ← nuevo

  // Estado para manejar el loading
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showReport, setShowReport] = useState(false); // Para manejar el modal de reporte de caso
  // Error
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const modalAbierto = resultado !== null || showRegister || showReport;

    if (modalAbierto) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      // Por si acaso, limpia la clase al desmontar
      document.body.classList.remove("overflow-hidden");
    };
  }, [resultado, showRegister, showReport]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true); // ⬅️ Activamos loader
    // BEGIN TEST
    // setTimeout(() => {
    //   setResultado("no-original");
    //   setIsLoading(false);
    // }, 1000);
    // return;
    // END TEST
    try {
      const ipOrigen = await getPublicIP();
      const token = await getCaptchaToken();
      const payload = {
        code: data.codigo,
        dispositivo: getParsedDevice(),
        ip_origen: ipOrigen,
        q_recaptcha: token,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API}/seal/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();

      // if (!json.success) throw new Error(json.message || "Error desconocido");
      if (!json.success) {
        const firstError =
          json.errors && typeof json.errors === "object"
            ? Object.values(json.errors).flat()[0]
            : json.message || "Error desconocido";
        throw new Error(firstError);
      }

      setResultado(json.data.status as Resultado);
      localStorage.setItem(
        "solgas-verification",
        JSON.stringify({
          ...json.data,
          code: data.codigo,
        })
      );
    } catch (err) {
      console.log({ err });
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Error desconocido";
      // setResultado("no-original");
      setResultado(null);
      setErrorMessage(msg);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setResultado(null);
    reset();
    inputRef.current?.focus();
  };
  const handleOpenRegister = () => {
    setResultado(null);
    setShowRegister(true);
    //
    reset();
    inputRef.current?.focus();
  };
  const handleCloseRegister = () => {
    setShowRegister(false);
    //
    reset();
    inputRef.current?.focus();
  };
  const handleRetryValidation = () => {
    console.log("Limpiando formulario y cerrando modal");
    reset();
    setResultado(null);
    inputRef.current?.focus();
  };

  const handleOpenReport = () => {
    setResultado(null);
    setShowReport(true);
    //
    reset();
    inputRef.current?.focus();
  };
  const handleCloseReport = () => {
    setShowReport(false);
    //
    reset();
    inputRef.current?.focus();
  };

  if (showError)
    return (
      <ErrorModal
        onClose={() => {
          setShowError(false);
          handleCloseRegister();
        }}
        message={errorMessage ?? undefined}
      />
    );

  return (
    <div className="pt-12 lg:pt-16">
      <div className="pt-[130px] pb-[45px] sm:py-[90px] overflow-hidden">
        <section className="w-full lg:max-w-[1296px] mx-auto lg:h-[543px]">
          <div className="flex flex-col | lg:flex-row | items-center h-full">
            {/*  */}
            <div className="w-[312px] sm:w-sm md:w-md lg:w-1/2 | h-[185px] sm:h-[350px] lg:h-full | bg-gradient-to-r from-[#FF7900] to-[#082265] | rounded-tl-[35px] rounded-tr-[35px] lg:rounded-bl-[35px] lg:rounded-tr-none | relative">
              <Image
                src="/verifica-tu-balon/verifica-tu-balon-main@2x.webp"
                alt="Verifica tu balón"
                width={513}
                height={553}
                className="absolute bottom-0 lg:-bottom-[90px] | min-w-[255px] sm:min-w-[312px] md:min-w-[366px] lg:min-w-[424px] xl:min-w-[513px] | w-[255px] sm:w-[312px] md:w-[366px] lg:w-[424px] xl:w-[513px] | left-0 | z-40 | hidden sm:block"
              />
              <Image
                src="/verifica-tu-balon/verifica-tu-balon-main-mobile@2x.webp"
                alt="Verifica tu balón"
                width={237}
                height={230}
                className="absolute bottom-0 | w-[237px] | left-0 | z-40 | sm:hidden"
              />
            </div>
            {/* Formulario */}
            <div className="w-[312px] sm:w-sm md:w-md lg:w-1/2 h-full bg-gray text-center lg:text-left | py-9 lg:py-0 | px-[30px] md:px-[45px] xl:px-[90px] | rounded-tr-none rounded-br-[35px] rounded-bl-[35px] lg:rounded-tr-[35px] lg:rounded-bl-none | relative">
              <div className="h-full flex flex-wrap items-center">
                <div className="w-full">
                  <h2 className="font-clan-pro-bold text-primary-blue text-2xl | text-[26px] sm:text-[32px] lg:text-[47px] | mb-2 leading-tight">
                    ¡Descubre si tu
                    <br />
                    balón es original!
                  </h2>
                  <p className="font-clan-pro-medium text-primary-blue | text-[13px] sm:text-[18px] lg:text-[24px] | leading-tight">
                    Ingresa el código impreso en el interior del precinto de tu
                    balón Solgas.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                    <div>
                      <CustomCodeInput
                        ref={inputRef}
                        value={watch("codigo") || ""}
                        onChange={(val) => setValue("codigo", val)}
                      />
                      {errors.codigo && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.codigo.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="bg-primary-orange | text-[13px] sm:text-base | text-white cursor-pointer transition | h-[34px] sm:h-[42px] | w-[157px] sm:w-[186px] max-w-full | rounded-[50px] | font-clan-pro-medium | inline-flex items-center justify-center | leading-none"
                      >
                        VALIDAR AHORA
                      </button>
                    </div>
                  </form>
                  <div className="mt-5">
                    <p className="text-primary-blue | text-[10px] sm:text-xs | font-clan-pro-medium">
                      *Disponible para los departamentos de Lima e Ica.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3.5 w-full | left-0 md:left-[45px] xl:left-[90px] | right-0">
                <SecurityButton />
              </div>
            </div>
          </div>
        </section>
      </div>

      {resultado && (
        <ResultModal
          tipo={resultado}
          onClose={handleCloseModal}
          onRegisterClick={handleOpenRegister}
          onRetry={handleRetryValidation}
          onReport={handleOpenReport}
        />
      )}

      {showRegister && <RegisterModal onClose={handleCloseRegister} />}
      {showReport && <ReportCaseModal onClose={handleCloseReport} />}
      {isLoading && <FullScreenLoader />}
    </div>
  );
}
