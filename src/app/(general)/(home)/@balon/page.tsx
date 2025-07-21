import { Button } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function BannerBalon() {
  return (
    <>      
      <div className="lg:mt-16 md:-mt-4 -mt-12 | mb-16 | relative | flex justify-center | md:mx-32 mx-4 | 2xl:h-[340px] lg:h-[331px] h-[142px] | overflow-x-hidden | md:rounded-[50px] rounded-[24px]">
        <div className="absolute lg:relative | right-0 bottom-0 | 2xl:h-[340px] lg:h-[331px] h-[142px] | 2xl:w-[522px] lg:w-[508px] w-[164px]">
          {/* Desktop */}
          <Image
            src="/home/home-main-image-verifica-tu-balon.webp"
            alt="Banner"
            sizes="(min-width: 1536px) 522px, (min-width: 1024px) 508px, (min-width: 768px) 350px, 300px"
            fill
            priority
            className="lg:block hidden | object-contain object-bottom | 2xl:ml-[15rem] xl:ml-[18rem] lg:ml-[16rem] md:ml-[5rem] ml-[5rem] | top-0 absolute z-40"
            quality={100}
          />
          {/* Mobile */}
          <Image
            src="/home/home-main-image-verifica-tu-balon-mobile.webp"
            alt="Banner"
            sizes="164px"
            fill
            priority
            className="lg:hidden | object-contain object-bottom | top-0 absolute z-40"
            quality={100}
          />
        </div>

        <div
          className="bg-cover lg:bg-contain |  bg-no-repeat z-30 absolute bottom-0 | lg:h-[317px] md:h-[143px] | w-full max-w-[1300px] md:rounded-[50px] rounded-[24px] | md:overflow-auto overflow-hidden"
          style={{
            backgroundImage: `url(/home/home-bg-verifica-tu-balon.webp)`,
            // backgroundSize: "contain",
            backgroundColor: "#0B2265",
            backgroundPosition: "calc(50% + 110px) 0px",
          }}
        >
          {/* DESKTOP */}
          <div className="hidden lg:block | static | xl:pt-[52px] pt-[35px] | bottom-1/4 xl:left-[6rem] left-[4rem] z-50 flex-col">
            <div className="2xl:pl-[120px] pl-11.5">
              <div className="xl:text-[50px] lg:text-[28px] md:text-xl text-sm | text-white | font-clan-pro-new | leading-tight | mb-3.5">
                <span
                  className="text-primary-orange font-clan-pro-black inline-block"
                  style={{ transform: "skew(-8deg)" }}
                >
                  ¡Verifica que
                </span>{" "}
                tu <br />
                balón es seguro!
              </div>
              <div className="flex xl:items-center | xl:gap-7.5 gap-3.5 | xl:flex-row flex-col">
                <p className="font-clan-pro-new text-white text-[23px] [&_br]:hidden xl:[&_br]:inline | leading-tight | xl:max-w-full max-w-sm">
                  Ingresando el código de tu <br />
                  precinto de seguridad
                </p>
                <Link href={"/verifica-tu-balon"}>
                  <Button
                    bg={"primary"}
                    border={"primary"}
                    color={"white"}
                    className="xl:text-xl lg:text-base md:text-xs text-[10px] font-clan-pro-bold | xl:w-[131px] md:w-[120px] w-[90px] | xl:h-[63px] lg:h-[53px] h-[22px]"
                  >
                    AQUÍ
                  </Button>
                </Link>
              </div>
            </div>
            <p className="font-clan-pro-new text-xs text-white mt-6 ml-11.5">
              *Disponible para los departamentos Lima e Ica
            </p>
          </div>
          {/* MOBILE */}
          <div className="lg:hidden | static | pt-[32px] pb-7.5">
            <div className="pl-6.5">
              <div className="text-[17px] | text-white | font-clan-pro-new | leading-tight | mb-1.5">
                ¡Descubre
                <br />
                si tu balón{" "}
                <span
                  className="text-primary-orange font-clan-pro-black block"
                  style={{ transform: "skew(-8deg)" }}
                >
                  es original!
                </span>
              </div>
              <Link href={"/verifica-tu-balon"} className="inline-flex">
                <Button
                  bg={"primary"}
                  border={"primary"}
                  color={"white"}
                  className="text-[8px] | font-clan-pro-bold | w-[73px] | h-[21px]"
                >
                  CONOCE MÁS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
