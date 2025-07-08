import { Text  } from "@/components";
import { getData } from "../actions"; 
import { headers } from "next/headers";

export default async function Title() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname');
  const slug = pathname ? pathname.split('/').pop() : ''; 
  const { data } = slug ? await getData(slug) : { data: null }; 
  
  return (

    <> 
    <div className="w-full max-w-[1200px] "> 
      <Text className="lg:text-[43px] text-3xl text-primary-blue leading-[3rem]" font="bold">
                   <div
                     dangerouslySetInnerHTML={{
                       __html: data?.title,
                     }}
                   />
     </Text>
     <Text className="lg:text-[29px] text-3xl text-primary-blue mt-8" >
                   <div
                     dangerouslySetInnerHTML={{
                       __html: data?.short_description,
                     }}
                   />
     </Text>
    </div> 
    </>
  );
}
