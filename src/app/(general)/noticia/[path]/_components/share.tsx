"use client";
import { FacebookIcon, LikedinIcon, ShareIcon } from "@/components";
import { FacebookShareButton, LinkedinShareButton } from "react-share";

import tailwindConfig from "@root/tailwind.config";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { noticeSharedAtom } from "@/store";
import { sharedPost } from "../actions";
const select = tailwindConfig.theme.extend.colors["select"];

export default function Share({ url, count, slug }: { url: string; count: number; slug: string }) {
  const [notice, setNotice] = useAtom(noticeSharedAtom);
  useEffect(() => {
    const onInitial = () => { 
        setNotice({ 
          share: count,
        });
    };

     onInitial();
  }, [count, setNotice]);

    const onShared = () => {
      if (slug) {
        sharedPost(slug);
        setNotice({ 
          share: notice.share + 1,
        });
      }
    };
  
  return (
    <div className="flex border border-select divide-x-2 justify-center items-center rounded-full  h-[64px]  w-[160px]">
      <div className="flex items-center justify-center px-2 text-primary-blue-light font-clan-pro-news text-[25px] gap-x-2">
        {notice.share} <ShareIcon />
      </div>
      <div className="flex items-center justify-between px-2 gap-x-2">
        <FacebookShareButton url={url} onClick={onShared}>
          <div className="p-1 rounded-full flex justify-center items-center bg-white cursor-pointer hover:bg-gray-200 text-primary-blue-light font-clan-pro-news text-[25px]">
            <FacebookIcon color={select} height={"20"} width={"20"} />
          </div>
        </FacebookShareButton>
        <LinkedinShareButton url={url} onClick={onShared}>
          <div className="p-1 rounded-full flex justify-center items-center bg-white cursor-pointer hover:bg-gray-200 text-primary-blue-light font-clan-pro-news text-[20px]">
            <LikedinIcon color={select} height={"20"} width={"20"} />
          </div>
        </LinkedinShareButton>
      </div>
    </div>
  );
}
