import Image from "next/image";

import { LayoutGeneral } from "@/components/layouts";
import { metadata } from "@/utils/metadata";

export async function generateMetadata() {
  const result = metadata();   
  return {
    ...result,
    title: "Página no encontrada", 
  };
}


export default async function Page404() {
  return (
    <LayoutGeneral notFound>
      <div
        className="mt-[0rem] bg-black relative lg:h-screen h-80 md:w-screen w-full" 
      >
        <Image
          src="/background/img_404.png"
          alt={""}
          fill
          className="object-cover"
          priority
        />
      </div>
    </LayoutGeneral>
  );
}
