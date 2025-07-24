// src/app/(general)/verifica-tu-balon/components/SuccessModal.tsx
"use client";

import { ReactNode } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import SecurityButton from "./SecurityButton";

type Props = {
  onClose: () => void;
  children: ReactNode;
};

export default function SuccessModal({ onClose, children }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center px-4 backdrop-blur-[6px]">
        {/* overflow-y-auto rounded-xl */}
        <div className="bg-white rounded-[22px] w-full max-w-md p-16 relative text-center max-h-screen scrollbar-custom">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          >
            <X size={24} className="text-primary-orange font-bold" />
          </button>

          <Image
            src="/verifica-tu-balon/check-form.svg"
            alt="Check"
            width={177}
            height={177}
            className="mx-auto mb-4"
          />

          <h2 className="text-2xl font-clan-pro-bold text-primary-orange mb-2">
            ¡Gracias!
          </h2>
          {children}
          <div className="absolute -bottom-3.5 w-full left-0 right-0">
            <SecurityButton />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
