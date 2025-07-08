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
        "inline-flex items-center gap-2 bg-primary-blue text-white pl-10 lg:pl-12 | pr-6 py-1.5 rounded-full font-clan-pro-medium | text-[13px] lg:text-[17px] hover:opacity-90 transition relative",
        className
      )}
      {...props}
    >
      <Image
        src="/verifica-tu-balon/icon-seguridad.svg"
        alt="Icono de seguridad"
        width={46}
        height={50}
        className="w-[37px] h-[41px] lg:w-[46px] lg:h-[50px] absolute -left-0.5"
      />
      <span>
        Conoce más{" "}
        <span className="text-primary-orange font-clan-pro-bold">
          sobre seguridad
        </span>
      </span>
    </a>
  );
}
