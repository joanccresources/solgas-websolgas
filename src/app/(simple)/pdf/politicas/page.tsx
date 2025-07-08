import React from "react";
import { getHeaders } from "@/app/actions";
import Header from "@/components/layouts/general/header";
import HeaderTwo from "@/components/layouts/general/header/header-two";
import { formatHeader } from "@/utils/format";

export default async function PDFViewer() {
  const header = await getHeaders();
  const logo_principal =
    header?.data?.general_information?.logo_principal_format;
  const phone = header?.data?.general_information?.phone;
  const file = "/politicas.pdf";
  const header_one = formatHeader(header?.data?.headers?.[1]);
  const header_two = formatHeader(header?.data?.headers?.[0]);

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
