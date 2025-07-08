import { Body } from "./body";

export interface PropsJobs {
  title: string;
  subTitle: string;
  text_departament: string;
  text_province: string;
  text_district: string;
  text_btn: string;
}

export default async function Jobs({
  title,
  subTitle,
  text_departament,
  text_province,
  text_district,
  text_btn,
}: PropsJobs) {
  return (
    <Body
      {...{
        title,
        subTitle,
        text_departament,
        text_province,
        text_district,
        text_btn,
      }}
    />
  );
}
