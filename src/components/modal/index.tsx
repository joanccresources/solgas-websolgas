"use client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Iconify } from "@/components";
import tailwindConfig from "@root/tailwind.config";
import { headerAtom } from "@/store";
import { useAtom } from "jotai";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];

export default function Modal({
  isOpen,
  setIsOpen,
  persists = false,
  className,
  children,
  closeButton = false,
}: {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  persists?: boolean;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  closeButton?: boolean;
}) {
  const classNameMerge = cn([
    `bg-white border-gray-secondary py-16 px-16 rounded-3xl  w-full max-w-[1158px] shadow-xl cursor-default relative overflow-hidden`,
    className,
  ]);
  const [, setHeader] = useAtom(headerAtom);

  useEffect(() => {
    const bodyElement = document.body;
    if (isOpen) {
      setHeader({ view: false });
      bodyElement.classList.add("overflow-hidden");
    } else {
      setHeader({ view: true });
      bodyElement.classList.remove("overflow-hidden");
    }
    return () => {
      bodyElement.classList.remove("overflow-hidden");
    };
  }, [isOpen, setHeader]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!persists) setIsOpen(false);
          }}
          className="bg-slate-900/20 backdrop-blur-xs p-8 fixed inset-0 z-100 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className={"bg-transparent w-full flex justify-center"}
          >
            <div
              className={classNameMerge}
              style={{ height: "calc( 100vh - 8rem)" }}
            >
              <div className="relative z-10 w-[98%] mx-auto h-full">
                {closeButton ? (
                  <div className="absolute -right-12 -top-12">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="hover:opacity-80"
                    >
                      <Iconify
                        icon="fe:close"
                        width={39}
                        height={39}
                        color={primaryOrange}
                      />
                    </button>
                  </div>
                ) : null}

                <div className="h-full w-full">{children}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
