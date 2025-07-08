import { Image, Text } from "@/components";
import Link from "next/link";
// import clsx from "clsx";
import React from "react";

export default function Category({
  items,
}: {
  items: {
    id: number;
    title: string;
    icon: string;
    icon_disabled: string;
    path: string;
  }[];
}) {
  return (
    <ul className="flex flex-wrap sm:gap-x-24 gap-x-8 justify-center ">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.path}
            className="flex-col items-center justify-center text-center group cursor-pointer"
          >
            <div className='lg:h-[190px] lg:w-[190px] w-[140px] h-[140px] group-hover:bg-gray-light rounded-full flex justify-center  items-center transition-all duration-700 ease-in-out"'>
              <div className='lg:h-[156px] lg:w-[156px] w-[110px] h-[110px] border border-gray  group-hover:bg-gray rounded-full flex justify-center  items-center transition-all duration-700 ease-in-out"'>
                <div className="lg:h-[132px] lg:w-[132px] w-[90px] h-[90px] bg-white border-gray rounded-full flex items-center justify-center transition-all duration-700 ease-in-out">
                  <Image
                    src={item.icon}
                    width={50}
                    height={50}
                    style={{ height: "auto", width: "auto" }}
                    alt={"icon"}
                    className="group-hover:block hidden"
                  />

                  <Image
                    src={item.icon_disabled}
                    width={50}
                    height={50}
                    style={{ height: "auto", width: "auto" }}
                    alt={"icon"}
                    className="group-hover:hidden"
                  />
                </div>
              </div>
            </div>

            <Text
              className="text-primary-blue mt-2 lg:text-2xl text-md"
              type="h4"
              font="bold"
            >
              {item.title}
            </Text>
          </Link>
        </li>
      ))}
    </ul>
  );
}
