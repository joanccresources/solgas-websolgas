import Image from "next/image";
import clsx from "clsx";

interface SecurityButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

export default function SecurityButton({
  className,
  href = "https://www.expertasolgas.com.pe/",
  ...props
}: SecurityButtonProps) {
  return (
    <a
      target="_blank"
      href={href}
      className={clsx(
        "inline-flex items-center gap-2 bg-primary-blue text-white p-10 lg:pr-12 | pl-6 py-1.5 rounded-full font-clan-pro-medium | text-[13px] lg:text-[17px] hover:opacity-90 transition relative",
        className
      )}
      {...props}
    >
      <span>
        Conoce más{" "}
        <span className="text-primary-orange font-clan-pro-bold">
          sobre seguridad
        </span>
      </span>
      {/* h-[41px] lg:h-[39px]*/}
      <Image
        src="/verifica-tu-balon/icon-click.svg"
        alt="Icono de seguridad"
        width={39}
        height={39}
        className="w-[28px] lg:w-[39px] absolute -right-0.5 -bottom-2"
      />
    </a>
  );
}
