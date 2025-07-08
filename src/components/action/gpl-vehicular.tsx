"use client";
import ActionSection from ".";
import { Text, Button } from "@/components";
import Link from "next/link";

export default function GLPVehicular({
  title,
  btn_text,
  href = "/",
}: {
  title: string;
  btn_text: string;
  href: string;
}) {
  return (
    <div>
      <ActionSection heightClassName="h-[119px]">
        <div className="h-full flex flex-row justify-center items-center gap-16">
          <Text
            className="text-white lg:text-[40px] text-xl text-center"
            type="h1"
            font="bold"
          >
            {title}
          </Text>
          <Link href={href}>
            <Button
              height="50px"
              bg={"primary"}
              border={"primary"}
              color={"white"}
              className="lg:text-sm md:text-xs  text-[10px] font-clan-pro-bold lg:w-[180px] w-[130px] lg:h-[50px] h-[36px]"
            >
              {btn_text}
            </Button>
          </Link>
        </div>
      </ActionSection>
    </div>
  );
}
