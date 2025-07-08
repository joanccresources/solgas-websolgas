import React from "react";
import { getHeaders } from "@/app/actions";
import { headers } from "next/headers";
import Header from "@/components/layouts/general/header";
import HeaderTwo from "@/components/layouts/general/header/header-two";
import { formatHeader } from "@/utils/format";

export default async function PDFViewer() {
  const header = await getHeaders();
  const header_two = formatHeader(header?.data?.headers?.[0]);
  const header_one = formatHeader(header?.data?.headers?.[1]);
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") as string;
  const logo_principal =
    header?.data?.general_information?.logo_principal_format;
  const phone = header?.data?.general_information?.phone;
  const newUrl = pathname.replace("/pdf/", "");
  const file = `https://solgas.s3.amazonaws.com/public/documentos/${newUrl}`;
  console.log(file, 'file')
  return (
    <>
      <Header navItems={header_one} />
      <HeaderTwo
        logo_principal={logo_principal}
        phone={phone}
        navItems={header_two}
      />
      <div style={{ width: "100vw", height: "calc(100vh - 7.4rem)" }}>
        <iframe
          src={file || undefined}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </>
  );
}
