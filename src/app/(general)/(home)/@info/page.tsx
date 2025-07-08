import { Button } from "@/components";
import { getData } from "../actions";
import Image from "next/image";
import Link from "next/link";
export default async function MoreInfo() {
  const { data } = await getData();

  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Experta solgas"
  )?.content_rels;

  const img = section_fields?.imagen?.value_format;
  const img_background = section_fields?.imagen_background?.value_format;
  const text_boton = section_fields?.texto_boton?.value_format;
  const text_sobre_imagen = section_fields?.texto_sobre_imagen?.value_format;
  const link_boton = section_fields?.enlace_boton?.value_format;

  return (
    <>
      <div className="-mt-16 mb-16 relative flex justify-center lg:h-[550px] md:h-[350px] sm:h-[200px] h-[144px] lg:mx-32 md:mx-16 mx-4">
        <div className="lg:h-[547px] md:h-[350px] sm:h-[205px] h-[180px] relative lg:w-[550px] md:w-[350px] sm:w-[205px] w-[180px]">
          <Image
            src={img}
            alt="Banner"
            sizes="100px"
            fill
            priority
            className="object-cover lg:ml-[11rem] md:ml-[5rem] ml-[5rem] top-0 md:mt-[3px] sm:mt-[-5px] mt-[-36px] absolute z-40"
            quality={100}
          />
        </div>
        <div
          className="bg-no-repeat z-30 absolute bottom-0 lg:h-[320px] md:h-[220px] sm:h-[150px] h-[120px]
       w-full max-w-[1300px] md:rounded-[50px] rounded-[24px]"
          style={{
            backgroundImage: `url(${img_background})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute bottom-1/4 xl:left-[6rem] left-[4rem] z-50 flex-col lg:space-y-8 space-y-4">
            <div className="xl:text-[46px] md:text-xl text-sm text-white font-clan-pro-italic">
              {text_sobre_imagen}
            </div>
            <Link href={link_boton || ""}>
              <Button
                bg={"primary"}
                border={"primary"}
                color={"white"}
                className="lg:text-base md:text-xs  text-[10px] 
         font-clan-pro-bold lg:w-[180px] md:w-[120px] w-[90px] lg:h-[50px] h-[22px]"
              >
                {text_boton}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
