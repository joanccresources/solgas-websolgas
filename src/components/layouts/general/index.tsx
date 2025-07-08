import { getHeaders } from "@/app/actions";
import Footer from "./footer";
import Header from "./header";
import HeaderTwo from "./header/header-two";
import { formatHeader } from "@/utils/format";
import Cookies from "@/components/layouts/cookies";

export default async function LayoutGeneral({
  children,
  notFound = false,
}: {
  children: React.ReactNode;
  notFound?: boolean;
}) {
  const header = await getHeaders();
  const header_two = formatHeader(header?.data?.headers?.[0]);
  const header_one = formatHeader(header?.data?.headers?.[1]); 

  const logo_footer = header?.data?.general_information?.logo_footer_format;
  const logo_principal = header?.data?.general_information?.logo_principal_format;
  const phone = header?.data?.general_information?.phone;
  const data_cookie = {
    description_cookie: header?.data?.general_information?.description_cookie,
    more_information_cookie: header?.data?.general_information?.more_information_cookie,
    more_information_cookie_format: header?.data?.general_information?.more_information_cookie_format,
    text_button_allow_cookie: header?.data?.general_information?.text_button_allow_cookie,
    text_button_necessary_cookie: header?.data?.general_information?.text_button_necessary_cookie,
    title_cookie: header?.data?.general_information?.title_cookie,
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header navItems={header_one} />
      <HeaderTwo
        logo_principal={logo_principal}
        phone={phone}
        navItems={header_two}
        notFound={notFound}
      />
       <main className="flex-1">
       <div className="grid grid-cols-12 ">
        <div className="lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
          <div className="layout-general flex w-full  min-w-[350px]">
            <div className={`w-full h-full`}>{children}</div>
          </div>
        </div>
      </div>
       </main>
      
     
     <Cookies data_cookie={data_cookie} />
     <Footer logo={logo_footer} />
     
    </div>
  );
}
