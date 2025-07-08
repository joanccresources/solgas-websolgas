import { Text } from "@/components"; 
import Link from "next/link";

export default function GeneralCard({
  image,
  text,
  title,
  slug
}: {
  image: string | null;
  text: string ; 
  slug: string;
  title?: string; 
}) { 
  return (
    <Link href={slug} className="w-auto flex justify-center bg-contain bg-no-repeat bg-top rounded-[33px]" style={{ backgroundImage: `url(${image})` }}>
      <div className="animate-fade animate-once animate-duration-700 animate-ease-linear h-[242px] md:w-[389px]  w-200 group">
        <div
          className={`flex flex-col items-start p-6 justify-end border border-select rounded-[33px]
             h-full w-auto relative  pt-24 bg-gradient-to-b from-[#004996]/20 via-primary-blue/95 to-primary-blue `}
        >
      
          {title ? (
            
              <Text
                font="bold"
                className="text-left text-white text-sm leading-snug select-none text-[24px]"
                line="1"
              >
                {title}
              </Text>
            
          ) : null}
        
             <Text
                font="medium"
                className="text-left text-white text-sm leading-snug select-none text-[19px]"
                line="1"
              >
                {text}
              </Text>
             
        </div>
      </div>
    </Link>
  );
}
