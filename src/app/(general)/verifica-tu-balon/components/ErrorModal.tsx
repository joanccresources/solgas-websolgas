"use client";

import { Dialog } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function ErrorModal({
  onClose,
  message,
}: {
  onClose: () => void;
  message?: string;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center px-4 backdrop-blur-[6px]">
        <div className="bg-white rounded-xl w-full max-w-md p-16 relative text-center max-h-screen overflow-y-auto scrollbar-custom">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          >
            <X size={24} className="text-primary-orange font-bold" />
          </button>
          {/* <h2 className="text-2xl font-clan-pro-bold text-red-600 mb-2">
            ¡Ups! Algo salió mal
          </h2>
          <hr className="mb-5" /> */}
          <p className="text-base lg:text-lg |  text-primary-blue font-clan-pro-regular">
            {message ||
              "No se pudo enviar tu información. Por favor, intenta de nuevo en unos minutos."}
          </p>
        </div>
      </div>
    </Dialog>
  );
}
