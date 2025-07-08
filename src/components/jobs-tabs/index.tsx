"use client";
import { Text, MapGoogle } from "@/components";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { TabsMap } from "./tab";

const ComponentList = dynamic(() => import("./list"), { ssr: false }); 


export interface PropsJobs {
  readonly title: string;
  readonly description: string;
  readonly token_map: string;
}
export default function Jobs({ token_map }: PropsJobs) {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 }); 

  return (
    <div className="grid lg:gap-y-12 gap-y-4 relative">
      <div className="flex-col justify-center space-y-4 px-6">
        <Text
          className="text-primary-blue md:text-[38px] text-xl text-center"
          type="h1"
          font="medium"
        >
          Cobertura GLP Vehicular Solgas
        </Text>
        <Text
          className="text-primary-blue md:text-[22px] text-[15px] text-center"
          type="h2"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: "Descubre las EESS con GLP Solgas y conoce cuáles son nuestras concesionarias y talleres aliados.",
            }}
          />
        </Text>
      </div>
      
      <div className="w-full">
        <TabsMap />
        <div className=" lg:flex  justify-center  xl:container xl:mx-auto ">
          <div className="lg:w-1/2 w-full">
            <MapGoogle token_map={token_map} />
          </div>
          <div className="lg:w-1/2 w-full">
             <ComponentList horizontal={!isDesktopOrLaptop} />
          </div>
        </div>
      </div>
    </div>
  );
}
