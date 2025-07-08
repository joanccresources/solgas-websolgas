"use client";
import { HeartIcon } from "@/components/icon";
import HeartCheckIcon from '@/components/icon/heartCheck'
import { dislikePost, likePost } from "../actions";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { noticeLikesAtom } from "@/store";
import Cookies from "js-cookie";
import CounterLikesLabel from "./count-likes";

export default function Like({
  slug,
  count,
}: {
  slug?: string;
  count: number;
}) {
  const [notice, setNotice] = useAtom(noticeLikesAtom);
  const [check, setCheck] = useState<boolean>(false);

  const onLike = () => {
    const likes = Cookies.get("data_likes"); 
    if (slug && !check) {
      likePost(slug);
      const data = likes
        ? JSON.stringify([...JSON.parse(likes), slug])
        : JSON.stringify([slug]);
      Cookies.set("data_likes", data);
      console.log(notice.like + 1)
      setNotice({ 
        like: notice.like + 1, 
      });
      setCheck(true)
    } else {
      if(slug) { 
        setNotice({ 
          like: notice.like - 1, 
        });
        dislikePost(slug);
        const data = likes ? JSON.parse(likes) : []
        const dataFilter = data.filter((item: string) => item !== slug)  
        Cookies.set("data_likes", dataFilter);
        setCheck(false)
      }
    }
  };

  useEffect(() => {
    const onInitial = () => {  
        setNotice({ 
          like: count, 
        }); 
    };

    const onCheck = () => {
      const likes = Cookies.get("data_likes");
      const data_likes = likes ? JSON.parse(likes) : [];
      const status = data_likes.includes(slug); 
      setCheck(status);
    };

    onInitial();
    if(slug)  onCheck();
    return () => {
      setCheck(false);
    };
   
  }, [
    count,   
    setNotice,
    slug,
  ]);

  return (
    <div
      onClick={onLike}
      className="p-1 rounded-full flex justify-center items-center bg-white cursor-pointer hover:bg-gray-200 text-primary-blue-light font-clan-pro-news text-[25px] gap-x-2"
    >
      <CounterLikesLabel />
      {check ? <HeartCheckIcon /> : <HeartIcon />}
    </div>
  );
}
