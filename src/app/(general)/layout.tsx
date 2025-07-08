import { LayoutGeneral } from "@/components/layouts";
import "core-js/full/promise/with-resolvers";
import Recaptcha from "./_components/scripts/recaptcha";
import TagManager from "./_components/scripts/tagManager";
import { getHeaders  } from "../actions";  

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await getHeaders();
  const GTM_ID = header?.data?.general_information?.google_tag_manager_id; 
  return (
    <>
      <Recaptcha />
      <TagManager GTM_ID={GTM_ID} /> 
      <LayoutGeneral>
      
        {children}
      </LayoutGeneral>
    </>
  );
}
