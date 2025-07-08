"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { chunk } from "lodash";
import {
  getDepartments,
  getProvinces,
  getDistricts,
  getMapDistributor,
} from "@/app/actions";
import { PropsItemSelect } from "../select/type";
import { cn } from "@/lib/utils";
import { TitleAndFilters } from "./filters";

const ComponentList = dynamic(() => import("./list"), { ssr: false });

interface PropsJobs {
  title: string;
  subTitle: string;
  text_departament: string;
  text_province: string;
  text_district: string;
  text_btn: string;
}

export interface PropsDistributor {
  name: string;
  address: string;
  schedule: string;
  phone: string;
  latitude: string;
  longitude: string;
  code_department: string;
  code_province: string;
  code_district: string;
  coverage_area: string;
  coverage_area_format: string;
}

export const Body = ({
  title,
  subTitle,
  text_departament,
  text_province,
  text_district,
  text_btn,
}: PropsJobs) => {
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

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(false);

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

  const min640 = useMediaQuery({ minWidth: 640 });
  const [items, setItems] = useState<PropsDistributor[]>([]);

  const getData = async (page = 1) => {
    let queryParams = `?page=${page}&per_page=9`;
    if (selectDepartment.id) {
      queryParams += `&code_department=${selectDepartment.id}`;
    }
    if (selectProvince.id) {
      queryParams += `&code_province=${selectProvince.id}`;
    }
    if (selectDistrict.id) {
      queryParams += `&code_district=${selectDistrict.id}`;
    }
    const data = await getMapDistributor(queryParams);
    return data;
  };

  const onSearch = async () => {
    setLoading(true);
    setPage(1);
    const { data, meta } = await getData(1);
    setItems([...data]);
    setPage(2);
    setLastPage(meta.last_page);
    setLoading(false);
    if (!firstRender) {
      setFirstRender(true);
    }
  };

  const loadMoreItems = useCallback(async () => {
    if (loading) return;
    if (page === lastPage) return;
    setLoading(true);
    const { data, meta } = await getData(page);
    setPage(page + 1);
    setLastPage(meta.last_page);
    setItems((prevItems) => [...prevItems, ...data]);
    setLoading(false);
    if (!firstRender) {
      setFirstRender(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, lastPage]);

  const handleEndReached = useCallback(() => {
    if (page > 0) {
      loadMoreItems();
    }
  }, [page]);

  const chunks = chunk(items, min640 ? 3 : 1);

  return (
    <div className="lg:grid lg:gap-y-12 gap-y-6 relative mb-14 sm:mb-8 md:mb-0">
      <TitleAndFilters
        {...{
          title,
          subTitle,
          text_departament,
          text_province,
          text_district,
          text_btn,
          departments,
          provinces,
          districts,
          selectDepartment,
          setSelectDepartment,
          selectProvince,
          setSelectProvince,
          selectDistrict,
          setSelectDistrict,
          onSearch,
        }}
      />

      <div className=" w-full">
        <div
          className={cn(
            "lg:flex flex-col justify-center xl:container xl:mx-auto",
            chunks.length > 1 ? "mr-5 sm:mr-6" : ""
          )}
        > 
          {firstRender ? (
            <div className="w-full">
              <ComponentList
                distributors={chunks}
                onSearch={handleEndReached}
                firstRender={firstRender}
              />
            </div>
          ) : null}

          {loading ? (
            <div className="w-full">
              <div
                className={`animate-spin rounded-full border-4 border-solid border-gray-300 border-t-primary-blue mx-auto`}
                style={{ width: 24, height: 24 }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
