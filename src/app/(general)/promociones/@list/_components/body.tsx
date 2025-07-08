"use client";
import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  ElementType,
  formatMultipleElements,
  ServerDataType,
} from "@/utils/format";
import { Select, Text, Button } from "@/components";
import { getDepartments, getProvinces, getDistricts } from "@/app/actions";
import { PropsItemSelect } from "@/components/select/type";
import { Item } from "./item";
import Container from "@/components/layouts/container";
import { useMediaQuery } from "react-responsive";

export const Body = ({ data }: { data: ServerDataType }) => {
  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Promociones"
  )?.content_rels;

  const elements = formatMultipleElements({
    data,
    section_name: "Promociones",
    multiple_element_name: "Promociones",
  });

  const [selectDepartment, setSelectDepartment] = useState<PropsItemSelect>({
    id: "",
    name: "",
  });
  const [selectProvince, setSelectProvince] = useState<PropsItemSelect>({
    id: "",
    name: "",
  });
  const [selectDistrict, setSelectDistrict] = useState<PropsItemSelect>({
    id: "",
    name: "",
  });

  const [departments, setDepartments] = useState<PropsItemSelect[]>([]);
  const [provinces, setProvinces] = useState<PropsItemSelect[]>([]);
  const [districts, setDistricts] = useState<PropsItemSelect[]>([]);
  const [items, setItems] = useState<
    {
      [key: string]: ElementType;
    }[]
  >(elements);

  const min640 = useMediaQuery({ minWidth: 640 });
  const min1024 = useMediaQuery({ minWidth: 1024 });
  const [height, setHeight] = useState("calc( 100vh - 6rem )");

  useEffect(() => {
    if (min640 && min1024) setHeight("calc( 100vh - 6rem )");
    else if (min640) setHeight("calc( 100vh - 4rem )");
    else setHeight("calc( 100vh - 2rem )");
  }, [min640, min1024]);

  useEffect(() => {
    const onInitial = async () => {
      const dataDepartments = await getDepartments();
      if (dataDepartments?.data)
        setDepartments(
          dataDepartments?.data?.map(
            (item: { code_department: string; department: string }) => ({
              id: item.code_department,
              name: item.department,
            })
          )
        );
    };

    onInitial();
  }, []);

  useEffect(() => {
    const onInitial = async () => {
      setSelectProvince({ id: "", name: "" });
      setProvinces([]);

      setSelectDistrict({ id: "", name: "" });
      setDistricts([]);

      const dataProvinces = await getProvinces(selectDepartment?.id);
      if (dataProvinces?.data)
        setProvinces(
          dataProvinces?.data?.map(
            (item: { code_province: string; province: string }) => ({
              id: item.code_province,
              name: item.province,
            })
          )
        );
    };

    if (selectDepartment?.id) {
      onInitial();
    } else {
      setSelectProvince({ id: "", name: "" });
      setSelectDistrict({ id: "", name: "" });
      setProvinces([]);
      setDistricts([]);
    }
  }, [selectDepartment]);

  useEffect(() => {
    const onInitial = async () => {
      if (selectProvince.id) {
        setSelectDistrict({ id: "", name: "" });
        setDistricts([]);
      }

      const dataDistricts = await getDistricts(
        selectDepartment?.id,
        selectProvince?.id
      );
      if (dataDistricts?.data)
        setDistricts(
          dataDistricts?.data?.map(
            (item: { code_district: string; district: string }) => ({
              id: item.code_district,
              name: item.district,
            })
          )
        );
    };

    if (selectDepartment?.id && selectProvince?.id) {
      onInitial();
    } else {
      setSelectDistrict({ id: "", name: "" });
      setDistricts([]);
    }
  }, [selectDepartment, selectProvince]);

  const searchPromotions = () => {
    setItems(
      elements.filter((item: { [key: string]: ElementType }) => {
        const ubigeo = item?.codigo_ubigeo?.value || "";

        if (
          selectDepartment?.id &&
          !selectProvince?.id &&
          !selectDistrict?.id
        ) {
          return ubigeo.startsWith(selectDepartment.id);
        }

        if (selectDepartment?.id && selectProvince?.id && !selectDistrict?.id) {
          return ubigeo.startsWith(
            `${selectDepartment.id}${selectProvince.id}`
          );
        }

        if (selectDepartment?.id && selectProvince?.id && selectDistrict?.id) {
          return (
            ubigeo ===
            `${selectDepartment.id}${selectProvince.id}${selectDistrict.id}`
          );
        }

        return true;
      })
    );
  };

  return (
    <div>
      <div className="lg:py-16 md:py-12 py-8 border-border-history shadow-xl">
        <Container>
          <Text
            className="text-primary-blue md:text-[28px] text-xl text-center lg:mb-16 md:mb-12 mb-8"
            type="h1"
            font="regular"
          >
            {section_fields?.titulo?.value}
          </Text>
          <div className="flex flex-wrap sm:justify-center justify-end sm:gap-6 gap-4 w-full">
            <Select
              title={section_fields?.texto_departamento?.value || "Selecciona"}
              data={departments}
              placeholder="Buscar departamento"
              value={selectDepartment}
              onChange={setSelectDepartment}
              buttonClassName="w-full sm:w-[346px]"
            />
            <Select
              title={section_fields?.texto_provincia?.value || "Selecciona"}
              data={provinces}
              placeholder="Buscar provincia"
              value={selectProvince}
              onChange={setSelectProvince}
              buttonClassName="w-full sm:w-[292px]"
            />
            <Select
              title={section_fields?.texto_distrito?.value || "Selecciona"}
              data={districts}
              placeholder="Buscar distrito"
              value={selectDistrict}
              onChange={setSelectDistrict}
              buttonClassName="w-full sm:w-[276px]"
            />
            <Button
              bg={"primary"}
              border={"primary"}
              color={"white"}
              className="font-clan-pro-bold sm:text-sm text-[12px] w-[141px] lg:h-[63px] h-[36px]"
              onClick={searchPromotions}
            >
              {section_fields?.texto_boton?.value}
            </Button>
          </div>
        </Container>
      </div>
      <Scrollbars
        className="w-full"
        style={{
          height,
          position: "relative",
        }}
        autoHideTimeout={1000}
        autoHideDuration={200}
        thumbMinSize={40}
        universal={true}
      >
        <Container className="max-w-[1212px] flex flex-wrap lg:py-16 md:py-12 py-8 lg:gap-12 md:gap-10 gap-6">
          {items.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Container>
      </Scrollbars>
    </div>
  );
};
