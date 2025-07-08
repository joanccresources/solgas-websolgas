"use client";
import { useEffect, useState } from "react";
import PDF from "@/components/pdf";
import Select from "./select";
import { PropsItemSelect } from "@/components/select/type";
import { ReportType } from "../page";
import { Milestones } from "./milestones/body";
import { ItemCarousel } from "./milestones/carousel";

export const Body = ({ elements = [] }: { elements: ReportType[] }) => {
  const [selected, setSelected] = useState<PropsItemSelect>({
    id: "",
    name: "",
  });
  const [data, setData] = useState<PropsItemSelect[]>([]);

  useEffect(() => {
    const initial = () => {
      const formattedData = elements.map((item, index) => {
        return {
          ...item,
          id: index.toString(),
          name: item?.title,
        };
      });
      setData(formattedData);
      setSelected(formattedData[0]);
    };
    initial();
  }, [elements]);

  return (
    <div className="sm:mt-[-31px] mt-6 w-full max-w-svw">
      <div className="flex flex-col lg:gap-y-12 md:gap-y-10 gap-y-8 w-full">
        <div className="w-full sm:w-[80%] mx-auto z-20">
          <Select
            title={""}
            data={data}
            placeholder={""}
            value={selected}
            onChange={setSelected}
            orangeIcon={true}
            hasSearchField={false}
          />
        </div>
        <PDF file={selected?.pdf_format as string} fileName={selected?.name} />
      </div>
      {selected?.sustainability_report_objects_rels ? (
        <Milestones
          title={selected?.title_milestones as string}
          elements={
            selected?.sustainability_report_objects_rels as ItemCarousel[]
          }
        />
      ) : null}
    </div>
  );
};
