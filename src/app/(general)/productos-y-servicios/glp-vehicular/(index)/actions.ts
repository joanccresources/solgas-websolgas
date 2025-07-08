import { get } from "@/utils/fetch";

export const getData = async () => {
  const data = await get({
    path: "/page/productos-y-servicios-glp-vehicular",
  });
  return data;
};

export const getDataMap = async ({
  type_map = "1,2,3",
  page = 1 ,
  per_page = 10,
}: {
  type_map: string;
  page?: number;
  per_page?: number;
}) => {
  const data = await get({
    path: `/json/get-map-service-station?type_map=${type_map}&page=${page}&per_page=${per_page}`,
  });
  return data;
};
