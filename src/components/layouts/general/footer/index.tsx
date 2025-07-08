import { Button, SizeOptions, Text, typesFons } from "@/components";
import Social from "./social";
import Image from "next/image";
import { getFooter } from "@/app/actions";
import Link from "next/link";
import Container from "@/components/layouts/container";
import ItemPDF from "./pdf";

type ChildMenuType = {
  name: string;
  content: string;
  content_format: string;
  childMenus: {
    name: string;
    content: string;
    content_format: string;
  }[];
};

type ColumnType = {
  name: string;
  content: string | null;
  content_format: string | null;
  childMenus: ChildMenuType[];
};
export interface PropsLabel {
  children: string;
  href?: string | null;
  border?: boolean;
  size?: SizeOptions;
  font?: typesFons;
  className?: string;
}
const Label = ({
  children,
  href,
  border = false,
  size = "xs",
  font = "regular",
  className,
}: PropsLabel) => {  
  return href ? (
    href.endsWith(".pdf") ? (
      <ItemPDF
      className={className}
      border={border}
      size={size} 
      href={href}
      font={font} >
        {children}
      </ItemPDF>
    ) : (
      <Link href={href}>
      <Text
        className={className}
        border={border}
        size={size}
        type="h4"
        font={font}
      >
        {children}
      </Text>
      </Link>
    )
  ) : (
    <Text
      className={className}
      border={border}
      size={size}
      type="h4"
      font={font}
    >
      {children}
    </Text>
  );
};

export default async function Footer({ logo }: { logo: string }) {
  const footer = await getFooter();
  const social_networks = footer?.data?.content_social_network;

  const columns = footer?.data?.footers[0]?.content_footer_menu_rels; 
  const home_links = columns?.find(
    (column: ColumnType) => column?.name === "Home"
  )?.childMenus;

  const complaints_book = columns?.find(
    (column: ColumnType) => column?.name === "Libro de reclamaciones"
  );

  const middle_columns = columns?.filter(
    (column: ColumnType) =>
      column?.name !== "Home" &&
      column?.name !== "Enlaces de interés" &&
      column?.name !== "Libro de reclamaciones"
  );

  const last_column = columns?.find(
    (column: ColumnType) => column?.name === "Enlaces de interés"
  );

  return (
    <div className="bg-gray" id="footer">
      <Container className="grid grid-cols-12 xl:gap-x-24 lg:gap-x-6 gap-x-8 py-12 sm:py-24">
        <div className="lg:col-span-10 col-span-12 text-left">
          <div className="grid grid-cols-12 lg:flex flex-wrap lg:space-y-3 space-y-8 sm:space-x-3 space-x-4 justify-items-start lg:justify-between items-start align-top">
            <div className="col-span-12 sm:col-span-6 flex-col sm:flex-row md:flex-col space-y-3 text-left w-[100%] sm:w-fit">
              <div className="flex justify-start">
                {logo ? (
                  <Image
                    src={logo}
                    alt="Logo"
                    height={33}
                    width={184}
                    className="mb-4 sm:mb-6 lg:mb-12"
                  />
                ) : null}
              </div>
              <div className="flex lg:flex-col sm:space-y-3 sm:space-x-3 space-x-4 text-left">
                {home_links?.map((item: ChildMenuType, index: number) => (
                  <div key={index}>
                    <Label
                      href={item.content}
                      className="text-primary-blue text-left cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300 max-w-[105px] lg:max-w-[150px]"
                      border
                    >
                      {item.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            {middle_columns?.map((column: ColumnType, index: number) => (
              <div
                key={index}
                className="col-span-4 sm:col-span-3 lg:flex flex-col space-y-3"
              >
                <Label
                  href={column.content}
                  className="mb-6 text-primary-blue max-w-[82px]"
                  size="sm"
                  font="bold"
                >
                  {column?.name}
                </Label>
                {column?.childMenus.map(
                  (item: ChildMenuType, index: number) => (
                    <div key={index}>
                      <Label
                        href={item.content}
                        className="text-primary-blue text-left cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300 max-w-[104px]"
                        border
                      >
                        {item.name}
                      </Label>
                    </div>
                  )
                )}
              </div>
            ))}
            <div className="col-span-12 space-y-3 w-full lg:hidden">
              <Label
                href={last_column.content}
                className="mb-6 text-primary-blue"
                size="sm"
                font="bold"
              >
                {last_column?.name}
              </Label>
              <div className="grid grid-cols-12 space-y-3">
                {last_column?.childMenus.map(
                  (item: ChildMenuType, index: number) => (
                    <div key={index} className="col-span-4 sm:col-span-3">
                      <Label
                        href={item.content}
                        className="text-primary-blue text-left cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300 max-w-[91px]"
                        border
                      >
                        {item?.name}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="my-8 flex flex-wrap space-y-8 space-x-8 lg:justify-between justify-center items-center">
            <Social elements={social_networks} />
            <Link href={complaints_book?.content || "/"} target="_blank">
              <Button
                bg={"gray-secondary"}
                border={"gray-secondary"}
                color={"primary"}
                className="rounded-[11px] w-[230px] h-[47px]"
              >
                <Text type="p" size="xs" className="text-gray-bold" font="bold">
                  Libro de reclamaciones
                </Text>
                <Image
                  src="/book.svg"
                  alt="Image Info"
                  height={38}
                  width={90}
                />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-col space-y-3 hidden lg:flex lg:col-span-2 lg:mt-0 mt-8 lg:text-left col-span-12">
          <Label
            href={last_column.content}
            className="mb-6 text-primary-blue"
            size="sm"
            font="bold"
          >
            {last_column?.name}
          </Label>
          {last_column?.childMenus.map((item: ChildMenuType, index: number) => (
            <div key={index}>
              <Label
                href={item.content}
                className="text-primary-blue text-left cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300 max-w-[150px]"
                size="xs"
                border
              >
                {item?.name}
              </Label>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
