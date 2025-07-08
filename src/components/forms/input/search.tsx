"use client";
import { Iconify } from "@/components/iconify";
import tailwindConfig from "@root/tailwind.config";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];
const primaryBlue= tailwindConfig.theme.extend.colors["primary-blue"];
import { useDebounce } from "@uidotdev/usehooks";
import { getPages } from "@/app/actions";
import { Text } from "@/components/text";
import { FeatherIcon } from "@/components/icon";
import Scrollbars from "react-custom-scrollbars-2";
import Link from "next/link";
import { isNull } from "lodash";
import { useMediaQuery } from "react-responsive";
interface FilterItem {
  segment: string;
  _pageName: string;
  _pagePath: string;
  _type_page: string;
  _children?: FilterItem[];
}

const RenderData = ({
  data,
  bg = "bg-white-select",
  handleRoute
}: {
  data: FilterItem[];
  bg?: string;
  handleRoute: ()=> void
}) => {
  const container = cn(
    "p-4 flex justify-between items-center gap-x-2 lg:w-[320px] w-full backdrop-blur-md border border-transparent border-b-black cursor-pointer hover:bg-primary-blue hover:text-white",
    bg
  );

  const generatePath = (value: string, _type_page: string)=> {
    if(_type_page === 'posts') return `/noticia/${value}`
    if(isNull(value)) return ''
    return value
  }
 
  return (
    <>
      {data.map((item) => (
        <div key={item.segment}>
          <div className=" rounded-sm w-auto flex flex-col-reverse divide-y-1 divide-y-reverse ">
            <Link href={generatePath(item._pagePath, item._type_page)} onClick={handleRoute} className={container}>
              <Text>{item._pageName}</Text>
              <div>
                <FeatherIcon  color={primaryBlue} />
              </div>
            </Link>
          </div>
          {item?._children ? (
            <div className="lg:ml-6 lg:w-[300px] w-full">
              <RenderData handleRoute={handleRoute} data={item._children} bg="bg-white" />
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default function Search() {
  const [search, setSearch] = useState("");
  // Removed duplicate FilterItem interface
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1310 });
  const [filterData, setFilterData] = useState<FilterItem[]>([]);
  const debouncedSearchTerm = useDebounce(search, 300);
  const classLabel = cn([
    `absolute left-0 top-1 cursor-text transition-all  font-clan-pro-regular text-thin text-sm pl-4 text-white `,
    search
      ? "-top-[0.7rem] text-xs"
      : "peer-focus:text-xs peer-focus:-top-[.7rem]",
  ]);

  const find = useCallback(async (value: string) => {
    const response = await getPages({ q: value }); 
    setFilterData(response?.data?.pages);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) find(debouncedSearchTerm);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleRoute = ()=> {
    setFilterData([])
    setSearch('')
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <input
          id="search"
          name="search"
          type="text"
          className={
            "max-w-[199px] border-b border-primary-orange py-1 pr-8 focus:border-b-1 focus:border-primary-orange transition-colors focus:outline-hidden peer bg-inherit text-white"
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off" 
        />
        <label htmlFor="search" className={classLabel}>
          Buscar...
        </label>
        { search ?
        <a className="absolute right-0 bottom-1 cursor-pointer" onClick={handleRoute}>
          <Iconify
            icon="famicons:close"
            width={26}
            height={26}
            color={primaryOrange}
          />
        </a>
      :
      <div className="absolute right-0 bottom-1 cursor-pointer">
      <Iconify
        icon="mynaui:search"
        width={26}
        height={26}
        color={primaryOrange}
      />
    </div>
        }
        {search ? ( 
            <Scrollbars
            style={{
              height: "410px",
              position: "absolute",
              marginTop: "1rem", 
              width: isDesktopOrLaptop ? 350 : '100%'
            }}
            thumbMinSize={40}
            universal={true} 
          >
            { filterData.length > 0 ?<RenderData handleRoute={handleRoute} data={filterData} /> : <Text className="p-3 bg-white w-auto">No se encontraron resultados.</Text>}
          </Scrollbars>  
        ) : null
         }
      </div>
    </div>
  );
}
