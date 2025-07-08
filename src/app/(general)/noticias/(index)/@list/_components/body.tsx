"use client";
import { useEffect, useState } from "react";
import { Button, Iconify, Select } from "@/components";
import { PropsItemSelect } from "@/components/select/type";
import { Input } from "@/components/forms/input";
import { NewCard, PostType } from "@/components/card/new";
import DatePicker from "@/components/forms/date-picker";
import { getElements } from "../../actions";
import { format } from "date-fns";
import tailwindConfig from "@root/tailwind.config";
import { ServerDataType } from "@/utils/format";
import Container from "@/components/layouts/container";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];

export const Body = ({
  data,
  elements,
  categories = [],
}: {
  data: ServerDataType;
  elements: PostType[];
  categories: { id: number; name: string }[];
}) => {
  const section_fields = data?.page?.section_rels?.find(
    (item: { name: string }) => item?.name === "Filtros"
  )?.content_rels;

  const [selectedTopic, setSelectedTopic] = useState<PropsItemSelect>({
    id: "",
    name: "",
  });

  const [topics, setTopics] = useState<PropsItemSelect[]>([]);
  const [keyWords, setKeyWords] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [items, setItems] = useState<PostType[]>(elements);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (categories) {
      setTopics(
        categories.map((item) => {
          return {
            id: `${item.id}`,
            name: item.name,
          };
        })
      );
    }
  }, [categories]);

  const getNews = async (page: number, resetKeyWords?: boolean) => {
    let queryParams = `page=${page}&per_page=12&sort_by=publication_at&descending=DESC`;
    if (selectedDate) {
      const formattedDate = format(selectedDate, "dd-MM-yyyy");
      queryParams += `&publication_at=${formattedDate}`;
    }
    if (selectedTopic.id) {
      queryParams += `&category_id=${selectedTopic.id}`;
    }
    if (keyWords && !resetKeyWords) {
      queryParams += `&q=${encodeURIComponent(keyWords)}`;
    }
    const { data } = await getElements(queryParams);
    return data;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMore = async (resetKeyWords?: boolean) => {
    if (items.length < 6) return;
    setIsLoading(true);
    const newElements = await getNews(page + 1, resetKeyWords);
    setPage(page + 1);
    setItems([...items, ...newElements]);
    setIsLoading(false);
  };

  const loadQuery = async ({ resetKeyWords }: { resetKeyWords?: boolean }) => {
    setIsLoading(true);
    const newElements = await getNews(page, resetKeyWords);
    setPage(1);
    setItems(newElements);
    setIsLoading(false);
  };

  const reset = async () => {
    setKeyWords("");
    await loadQuery({ resetKeyWords: true });
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (window.scrollY >= 300) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          loadMore(false);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [loadMore]);

  useEffect(() => {
    loadQuery({ resetKeyWords: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedTopic]);

  return (
    <div>
      <div className="border-border-history shadow-[0px_20px_59px_rgba(0,0,0,0.07)]">
        <Container className="lg:py-16 md:py-12 py-8 flex flex-col">
          <div
            id="noticias-solgas"
            dangerouslySetInnerHTML={{
              __html: section_fields?.titulo?.value || "",
            }}
            className={
              "text-primary-blue md:text-[38px] text-2xl text-center lg:mb-8 lg:mt-0 mt-9 font-clan-pro-regular order-2 lg:order-1"
            }
          />
          <div className="flex flex-col lg:flex-row sm:justify-center justify-end w-full sm:gap-6 gap-4 order-1 lg:order-2">
            <div className="flex flex-col sm:flex-row w-full lg:w-fit sm:gap-6 gap-4">
              <div className="w-full lg:w-fit">
                <h6 className="text-primary-blue font-clan-pro-new md:text-[19px] text-lg lg:mb-4 md:mb-3 mb-1 lg:px-4 px-3">
                  {section_fields?.sub_titulo_fecha?.value}
                </h6>
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  buttonClassName="w-full lg:w-[346px]"
                  title="Seleccionar"
                />
              </div>
              <div className="w-full lg:w-fit">
                <h6 className="text-primary-blue font-clan-pro-new md:text-[19px] text-lg lg:mb-4 md:mb-3 mb-1 lg:px-4 px-3">
                  {section_fields?.sub_titulo_tema?.value}
                </h6>
                <Select
                  title={section_fields?.texto_tema?.value || "Seleccionar"}
                  data={topics}
                  placeholder="Buscar"
                  value={selectedTopic}
                  onChange={setSelectedTopic}
                  buttonClassName="w-full lg:w-[292px]"
                />
              </div>
            </div>
            <div className="flex items-end flex-1 pt-4">
              <div className="border rounded-full border-select w-full flex items-center gap-2 pr-2">
                <Input
                  placeholder={
                    section_fields?.texto_palabra_clave?.value ||
                    "Escribir palabra clave"
                  }
                  className="lg:h-[63px] h-[50px] text-primary-blue lg:text-[19px] text-sm placeholder:text-primary-blue/20 w-full border-none shadow-none"
                  fullWidth
                  value={keyWords}
                  onChange={(e) => setKeyWords(e.target.value)}
                />
                {!!keyWords ? (
                  <Button
                    bg="transparent"
                    color="blue"
                    className="w-[48px] h-[48px]"
                    border="transparent"
                    onClick={reset}
                  >
                    <Iconify
                      icon={"material-symbols:close-rounded"}
                      color={primaryOrange}
                      height={32}
                      width={32}
                    />
                  </Button>
                ) : null}
                <div className="w-[1.5px] lg:h-[40px] h-[30px] bg-select" />
                <Button
                  bg="transparent"
                  color="blue"
                  className="w-[48px] h-[48px]"
                  border="transparent"
                  onClick={() => loadQuery({ resetKeyWords: false })}
                >
                  <Iconify
                    icon={"weui:search-filled"}
                    color={primaryOrange}
                    height={32}
                    width={32}
                  />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container className="grid grid-cols-12 lg:py-16 md:py-12 py-8 2xl:gap-12 xl:gap-10 md:gap-8 gap-6">
        {items?.length > 0 ? (
          items.map((item, index) => {
            return (
              <NewCard
                key={index}
                item={item}
                containerClassName={"col-span-12 sm:col-span-6 xl:col-span-4"}
              />
            );
          })
        ) : (
          <div className="col-span-12">
            <div className="text-primary-blue text-center text-lg">
              No se encontraron resultados
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="col-span-12">
            <div
              className={`animate-spin rounded-full border-4 border-solid border-gray-300 border-t-primary-blue mx-auto`}
              style={{ width: 24, height: 24 }}
            />
          </div>
        ) : null}
      </Container>
    </div>
  );
};
