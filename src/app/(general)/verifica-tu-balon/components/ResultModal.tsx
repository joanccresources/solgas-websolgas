"use client";

import { Dialog } from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from "lucide-react";
import { useMemo } from "react";

interface Props {
  tipo: "original" | "no-original" | "revisado";
  onClose: () => void;
  onRegisterClick: () => void;
  onRetry?: () => void; //
}

const contentMap = {
  original: {
    titulo: "¡FELICIDADES!",
    subtitulo: (
      <>
        <p className="font-clan-pro-medium text-primary-blue">
          ¡Tu balón Solgas{" "}
          <span className="text-primary-orange font-clan-pro-bold-italic">
            es original!
          </span>
        </p>
      </>
    ),
    emojiUrl: "/verifica-tu-balon/emoji-balon-original.svg",
  },
  "no-original": {
    titulo: "VALIDACIÓN INCORRECTA",
    subtitulo: (
      <>
        <p className="font-clan-pro-medium text-primary-blue sm:w-[504px] mx-auto">
          Este código{" "}
          <span className="font-clan-pro-bold-italic">
            no se encuentra registrado en nuestras plantas.
          </span>
        </p>
      </>
    ),
    emojiUrl: "/verifica-tu-balon/emoji-validacion-incorrecta.svg",
  },
  revisado: {
    titulo: "CÓDIGO YA REVISADO",
    subtitulo: (
      <>
        <p className="font-clan-pro-medium text-primary-blue">
          ¡Este código ha sido{" "}
          <span className="font-clan-pro-bold-italic">
            registrado anteriormente!
          </span>
        </p>
      </>
    ),
    emojiUrl: "/verifica-tu-balon/emoji-codigo-ya-revisado.svg",
  },
};

export default function ResultModal({
  tipo,
  onClose,
  onRegisterClick,
  onRetry,
}: Props) {
  const content = contentMap[tipo];

  const parsedData = useMemo(() => {
    try {
      const raw = localStorage.getItem("solgas-verification");
      if (!raw) return null;
      const json = JSON.parse(raw);

      const fecha = json.fecha_envasado
        ? new Date(json.fecha_envasado).toLocaleString("es-PE", {
            timeZone: "America/Lima",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
          })
        : null;

      return {
        nombrePlanta: json.nombre_planta || null,
        fechaFormateada: fecha,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }, []);

  return (
    <Dialog open onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center px-4 overflow-y-auto backdrop-blur-[6px]">
        <div className="bg-white | w-[330px] sm:w-[800px] | max-w-full text-center relative flex flex-col rounded-[35px]">
          <div className="py-7 md:py-[32px]">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-500 hover:text-black cursor-pointer"
            >
              <X size={32} className="text-primary-orange font-bold" />
            </button>

            <Image
              src={content.emojiUrl}
              alt="Resultado"
              width={114}
              height={114}
              sizes="(max-width: 639px) 72px, 114px"
              className="mx-auto mb-4 w-[72px] md:w-[114px]"
            />
            <div className="mt-9 | px-5 sm:px-0">
              <h2 className="text-xl md:text-3xl | font-clan-pro-bold text-primary-blue leading-tight">
                {content.titulo}
              </h2>
              <div className="text-xl md:text-3xl ">{content.subtitulo}</div>
            </div>

            <div className="text-gray-700 leading-relaxed | px-2 sm:px-6 | mt-9">
              {(tipo === "original" || tipo === "revisado") && parsedData && (
                <>
                  <p className="text-primary-blue font-clan-pro-medium | text-[13px] md:text-lg">
                    <span className="font-clan-pro-bold">Envasado en:</span>{" "}
                    {parsedData.nombrePlanta}
                  </p>
                  <p className="text-primary-blue font-clan-pro-medium | text-[13px] md:text-lg">
                    <span className="font-clan-pro-bold">
                      Fecha de envasado:
                    </span>{" "}
                    {parsedData.fechaFormateada}
                  </p>
                </>
              )}
              {tipo === "revisado" && (
                <p className="mt-1 | text-xs md:text-sm | text-primary-blue font-clan-pro-regular">
                  Por favor comunícate al{" "}
                  <a href="tel:+51016133333" className="font-clan-pro-bold">
                    (01) 613 3333
                  </a>{" "}
                  o con tu distribuidor de gas para más información.
                </p>
              )}
              {tipo === "no-original" && (
                <>
                  {/* <p className="text-primary-blue text-center | text-[13px] md:text-lg | font-clan-pro-bold">
                    Este código no se encuentra registrado en nuestras plantas.
                  </p> */}
                  <p className="mt-1 | text-xs md:text-sm | text-primary-blue font-clan-pro-regular">
                    Por favor comunícate al{" "}
                    <a href="tel:+51016133333" className="font-clan-pro-bold">
                      (01) 613 3333
                    </a>{" "}
                    o con tu distribuidor de gas para más información.
                  </p>
                </>
              )}
            </div>

            {/* ✅ Botón de VALIDAR OTRO CÓDIGO si no es original y se pasó onRetry */}
            {tipo !== "original" && onRetry && (
              <button
                onClick={onRetry}
                className="bg-[#E5E5E5] px-10 py-2 rounded-md | text-xs md:text-[13px] | hover:bg-gray-300 transition cursor-pointer mt-6 text-primary-blue font-clan-pro-medium"
              >
                VALIDAR OTRO CÓDIGO
              </button>
            )}
          </div>
          <div className="bg-gradient-to-r from-[#FF7900] to-[#082265] text-white py-7 | px-5 sm:px-0 | mt-auto rounded-bl-[35px] rounded-br-[35px]">
            <h3 className="font-clan-pro-bold | text-base sm:text-[26px]">
              ¡Registra tus datos y participa!
            </h3>
            <div className="flex items-center gap-5 | max-w-[570px] mx-auto mt-2">
              <p className="font-clan-pro-medium | text-xs sm:text-[21px] | leading-tight text-right">
                Completa el formulario para participar en promociones exclusivas
              </p>
              <button
                onClick={onRegisterClick}
                className="bg-primary-orange | text-[15px] sm:text-[22px] | text-white cursor-pointer transition | h-8.5 sm:h-[59px] | w-[85px] sm:w-[145px] |  max-w-full | rounded-[50px] | font-clan-pro-black | inline-flex items-center justify-center flex-none | leading-none"
              >
                AQUÍ
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
