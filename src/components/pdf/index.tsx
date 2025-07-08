"use client";

import dynamic from "next/dynamic";

const PdfViewerComponent = dynamic(() => import("./body"), { ssr: false });

export default function MainComponent({
  file,
  fileName,
}: {
  file: string;
  fileName: string;
}) {
  return <PdfViewerComponent fileDoc={file} fileName={fileName} />;
}
