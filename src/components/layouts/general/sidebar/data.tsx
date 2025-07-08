import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

export function AccordionContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-1", className)}>{children}</div>
  );
}

export function Accordion({
  children,
  multiple,
  defaultValue,
}: {
  children: ReactNode;
  multiple?: boolean;
  defaultValue?: string | undefined | string[];
}) {
  const [activeIndex, setActiveIndex] = React.useState(
    multiple ? (defaultValue ? [defaultValue] : []) : [defaultValue]
  );

  function onChangeIndex(
    value: string | (string | string[] | undefined)[] | undefined
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setActiveIndex((currentActiveIndex) => {
      if (!multiple) {
        return value === currentActiveIndex ? null : value;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (currentActiveIndex.includes(value)) {
        return currentActiveIndex.filter((i) => i !== value);
      }

      return [...currentActiveIndex, value];
    });
  }

  return React.Children.map(children, (child) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const value = child.props.value;
    const isActive = multiple
      ? Array.isArray(activeIndex) && activeIndex.includes(value)
      : Array.isArray(activeIndex)
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        activeIndex[0].includes(value)
      : activeIndex === value;

    return (
      <AccordionContext.Provider value={{ isActive, value, onChangeIndex }}>
        <div>{child}</div>
      </AccordionContext.Provider>
    );
  });
}

export function AccordionItem({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { isActive } = useAccordion();

  return (
    <div
      className={`overflow-hidden ${isActive ? "active" : "bg-transparent"}
    `}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      value={value}
    >
      {children}
    </div>
  );
}

export function AccordionHeader({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { isActive, value, onChangeIndex } = useAccordion();

  return (
    <motion.div
      className={`p-4 mx-2 cursor-pointer transition-all  font-clan-pro-regular text-sm  
         hover:bg-primary-orange  rounded-lg hover:text-white flex justify-between items-center ${
           isActive
             ? "active bg-primary-blue text-white"
             : 'dark:bg-[#11112b] bg-primary-blue"'
         }
      `}
      onClick={() => (icon ? onChangeIndex(value) : null)}
    >
      {children}
      {icon ? (
        <div
          className={`${
            isActive ? "rotate-90 " : "rotate-0 "
          } transition-transform`}
        >
          {icon}
        </div>
      ) : null}
    </motion.div>
  );
}

export function AccordionPanel({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { isActive } = useAccordion();

  return (
    <AnimatePresence initial={true}>
      {isActive && (
        <motion.div
          initial={{ height: 0, overflow: "hidden" }}
          animate={{ height: "auto", overflow: "hidden" }}
          exit={{ height: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className={`bg-primary-blue
          `}
        >
          <motion.article
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            exit={{
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            }}
            transition={{
              type: "spring",
              duration: 0.4,
              bounce: 0,
            }}
            className={`p-3 bg-primary-blue text-black `}
          >
            {children}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
