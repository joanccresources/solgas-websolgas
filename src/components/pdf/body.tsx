"use client";

import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useMediaQuery } from "react-responsive";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { cn } from "@/lib/utils";
import { Iconify } from "@/components/iconify";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { LogoLoading } from "../loading/layout";

GlobalWorkerOptions.workerSrc = "pdfjs/pdf.worker.min.mjs";
type PDFFile = string | File | null;

export default function PDFBody({
  fileDoc,
  fileName,
}: {
  fileDoc: string;
  fileName: string;
}) {
  const [file, setFile] = useState<PDFFile>(fileDoc);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfInstance, setPdfInstance] = useState<PDFDocumentProxy | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    { pageIndex: number; snippet: string }[]
  >([]);
  const [currentResultIndex, setCurrentResultIndex] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(
    window.innerWidth
  );
  const min640 = useMediaQuery({ minWidth: 640 });
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const min1536 = useMediaQuery({ minWidth: 1536 });

  useEffect(() => {
    setFile(fileDoc);
  }, [fileDoc]);

  useEffect(() => {
    function handleResize() {
      const newWidth = min1536
        ? 1504
        : min1024
        ? Math.min(window.innerWidth, 1504) * 0.85
        : min640
        ? window.innerWidth * 0.75
        : window.innerWidth * 0.85;
      setContainerWidth(newWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [min640, min1024, min1536]);

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy): void => {
    setNumPages(pdf.numPages);
    setPdfInstance(pdf);
  };

  const searchInPDF = async (term: string) => {
    if (!pdfInstance || !term) return;

    const results: { pageIndex: number; snippet: string }[] = [];
    for (let pageIndex = 1; pageIndex <= pdfInstance.numPages; pageIndex++) {
      const page: PDFPageProxy = await pdfInstance.getPage(pageIndex);
      const textContent = await page.getTextContent();
      const textItems = textContent.items
        .map((item) => {
          if ("str" in item) {
            return item.str;
          }
          return "";
        })
        .join(" ");

      const termIndex = textItems.toLowerCase().indexOf(term.toLowerCase());
      if (termIndex !== -1) {
        const snippetStart = Math.max(termIndex - 30, 0);
        const snippetEnd = Math.min(
          termIndex + 30 + term.length,
          textItems.length
        );
        const snippet = textItems.substring(snippetStart, snippetEnd);

        results.push({ pageIndex, snippet });
      }
    }
    setSearchResults(results);
    setCurrentResultIndex(0);
    if (results.length > 0) setPageNumber(results[0].pageIndex);
  };

  const downloadPDF = async () => {
    if (!pdfInstance) {
      console.error("No se ha cargado el documento PDF.");
      return;
    }

    try {
      const pdfData = await pdfInstance.getData(); // Obtiene los datos binarios del PDF
      const blob = new Blob([pdfData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.pdf`; // Cambia el nombre según sea necesario
      document.body.appendChild(link);
      link.click();
      // Limpia el DOM y la URL del blob
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      setLoading(false);
      console.error("Error al descargar el PDF:", error);
    }
  };

  const btClassNamePrev = cn(
    "absolute top-0 bottom-0 my-auto left-3 w-[42px] h-[39px] rounded-full justify-center items-center rotate-180 flex bg-primary-blue/27 border border-white z-10 cursor-pointer"
  );

  const btClassNameNext = cn(
    "absolute top-0 bottom-0 my-auto right-3 w-[42px] h-[39px]  rounded-full justify-center items-center flex bg-primary-blue/27 border border-white z-10 cursor-pointer"
  );

  return (
    <div className="w-fit mx-auto">
      <div className="flex justify-center relative w-fit mx-auto min-h-[160px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[450px] xl:min-h-[560px]">
        <div className="z-[1]">
          {loading ? (
            <div
              className="animate-pulse relative"
              style={{ height: 690, width: containerWidth }}
            >
              <div className="bg-gray-200 h-full w-full flex justify-center items-center">
                <LogoLoading />
              </div>
            </div>
          ) : null}
          <Document
            loading={""}
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              height={630}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              renderMode="canvas"
              onLoadSuccess={() => {
                setLoading(false);
              }}
              onLoadError={() => {
                setLoading(false);
              }}
            />
            <Page
              pageNumber={Math.min(pageNumber + 1, numPages)}
              width={0}
              height={0}
              className="hidden"
            />
          </Document>
        </div>
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          className={btClassNamePrev}
        >
          <Iconify
            icon={"weui:arrow-outlined"}
            color={"#FFFFFF"}
            height={24}
            width={24}
          />
        </button>
        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
          className={btClassNameNext}
        >
          <Iconify
            icon={"weui:arrow-outlined"}
            color={"#FFFFFF"}
            height={24}
            width={24}
          />
        </button>
      </div>
      {!loading ? (
        <div className="flex sm:gap-x-4 gap-x-2 py-2 sm:px-4 px-2 h-[60px] bg-primary-blue justify-between items-center">
          <p className="text-white font-clan-pro-regular sm:text-[20px] text-[16px] text-left">
            {pageNumber}/{numPages}
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar texto..."
              className="px-2 py-1 border-b w-full sm:text-[16px] text-[14px] text-white font-clan-pro-regular bg-primary-blue focus-visible:outline-none focus-visible:border-transparent focus-visible:border-b-white"
            />
            <button
              onClick={() => searchInPDF(searchTerm)}
              className="p-2 text-white cursor-pointer"
            >
              <Iconify
                icon={"weui:search-outlined"}
                color={"#FF7900"}
                height={24}
                width={24}
              />
            </button>
            <button
              onClick={downloadPDF}
              className="p-2 text-white cursor-pointer"
            >
              <Iconify
                icon={"weui:download-outlined"}
                color={"#FF7900"}
                height={24}
                width={24}
              />
            </button>
          </div>
        </div>
      ) : null}

      {searchResults.length > 0 && (
        <div className="flex flex-col items-center gap-4 justify-between mt-4">
          <p className="sm:text-[16px] text-[14px] font-clan-pro-regular text-primary-blue leading-snug">
            <strong className="font-clan-pro-bold">Fragmento:</strong>{" "}
            {searchResults[currentResultIndex]?.snippet}
          </p>

          <div className="flex items-center gap-4 min-w-[135px]">
            <button
              onClick={() =>
                setCurrentResultIndex((prev) =>
                  prev === 0 ? searchResults.length - 1 : prev - 1
                )
              }
              className="w-[30px] h-[30px] rounded-full justify-center items-center rotate-180 cursor-pointer z-50"
            >
              <Iconify
                icon={"weui:arrow-outlined"}
                color={"#FF7900"}
                height={24}
                width={24}
              />
            </button>
            <p className="sm:text-[13px] text-[12px] font-clan-pro-regular text-primary-blue">
              {currentResultIndex + 1} de {searchResults.length}
            </p>
            <button
              onClick={() =>
                setCurrentResultIndex((prev) =>
                  prev === searchResults.length - 1 ? 0 : prev + 1
                )
              }
              className="w-[30px] h-[30px] rounded-full justify-center items-center cursor-pointer z-50"
            >
              <Iconify
                icon={"weui:arrow-outlined"}
                color={"#FF7900"}
                height={24}
                width={24}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
