 
import { isEmpty, isNull } from "lodash";
import Image from "next/image";

// const shimmer = (w: number, h: number) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#333" offset="20%" />
//       <stop stop-color="#222" offset="50%" />
//       <stop stop-color="#333" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#333" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`;

// const toBase64 = (str: unknown) =>
//   typeof window === "undefined"
//     ? Buffer.from(str as string).toString("base64")
//     : window.btoa(str as string);
interface InterfaceProps {
  src: unknown;
  className?: string;
  alt: string;
  width: number;
  height: number;
  onClick?: () => void;
  fill?: boolean;
  sizes?: string;
  loading?: boolean
  objectFit?: 'contain' | 'cover'
  style?: object
}
const Shimmer = ({
  src,
  className,
  alt,
  width,
  height,
  onClick,
  fill,
  sizes,
  loading = false,
  objectFit ='cover',
  style = {}
}: InterfaceProps) => {
  const srcFormat = isNull(src) || isEmpty(src) ? "" : (src as string);

  return (
    <Image
      src={srcFormat}
      className={className}
      alt={alt}
      // placeholder={loading ? 'blur-sm' : 'empty'}
      // blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      width={width}
      decoding={loading ? "async" : "auto" }
      height={height}
      onClick={onClick}
      style={{ ...style, objectFit  }}
      fill={fill}
      loading="lazy"
      sizes={sizes}
      unoptimized 
    />
  );
};

export default Shimmer;
