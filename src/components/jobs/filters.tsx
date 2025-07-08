import { Text } from "@components/text";
import Container from "@components/layouts/container";
import Select from "@components/select";
import Button from "@components/button";
import { PropsItemSelect } from "../select/type";

export const TitleAndFilters = ({
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
}: {
  title: string;
  subTitle: string;
  text_departament: string;
  text_province: string;
  text_district: string;
  text_btn: string;
  departments: PropsItemSelect[];
  provinces: PropsItemSelect[];
  districts: PropsItemSelect[];
  selectDepartment: PropsItemSelect;
  setSelectDepartment: (e: PropsItemSelect) => void;
  selectProvince: PropsItemSelect;
  setSelectProvince: (e: PropsItemSelect) => void;
  selectDistrict: PropsItemSelect;
  setSelectDistrict: (e: PropsItemSelect) => void;
  onSearch: () => void;
}) => {
  return (
    <>
      <div className="lg:flex justify-center gap-x-2 py-8">
        <Text
          className="text-primary-blue md:text-[28px] text-xl text-center"
          type="h1"
          font="thin"
        >
          {title}
        </Text>
        <Text
          className="text-primary-blue md:text-[28px] text-xl text-center lg:mt-0 mt-1"
          type="h1"
          font="bold"
        >
          {subTitle}
        </Text>
      </div>

      <Container className="flex flex-wrap xl:justify-center justify-end sm:gap-6 gap-4 w-full">
        <Select
          title={text_departament}
          data={departments}
          placeholder="Buscar departamento"
          value={selectDepartment}
          onChange={setSelectDepartment}
          buttonClassName="w-full xl:w-[346px]"
        />
        <Select
          title={text_province}
          data={provinces}
          placeholder="Buscar provincia"
          value={selectProvince}
          onChange={setSelectProvince}
          buttonClassName="w-full xl:w-[292px]"
        />
        <Select
          title={text_district}
          data={districts}
          placeholder="Buscar distrito"
          value={selectDistrict}
          onChange={setSelectDistrict}
          buttonClassName="w-full xl:w-[276px]"
        />
        <Button
          bg={"primary"}
          border={"primary"}
          color={"white"}
          className="font-clan-pro-bold sm:text-sm text-[10px] lg:w-[141px] w-[66px] lg:h-[63px] h-[29px]"
          onClick={onSearch}
        >
          {text_btn}
        </Button>
      </Container>
    </>
  );
};
