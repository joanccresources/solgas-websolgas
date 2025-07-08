"use client";
import { Input } from "@/components/forms/input";
import { Text, UserCommentIcon } from "@/components"; 
import { useAtom } from "jotai";
import { noticeAtom, Comment } from "@/store";
import { useEffect } from "react";

export default function ListComments({ data }: { data: Comment[] }) {
  const [notice, setNotice] = useAtom(noticeAtom);  
  
  useEffect(()=> {
    const onInitial = ()=> {
      setNotice({ comments: data })
    }

    if(data) onInitial()
  }, [data, setNotice])

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[922px] grid md:gap-y-16 gap-y-12">
        {notice.comments.map((item) => (
          <div key={item.id}>
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex gap-x-4 items-center pb-4">
                <div className="rounded-full bg-user-comment w-[51px] h-[51px] flex items-center justify-center">
                  <UserCommentIcon />
                </div>
                <Input
                  placeholder="Escribe tu nombre"
                  className="md:h-[54px] h-[39px] placeholder:text-[16px] px-6 bg-gray-input placeholder:text-primary-blue placeholder:font-clan-pro-regular border-select"
                  name="name"
                  type="text"
                  value={item.user.name}
                  readOnly
                />
              </div>
              <div className="md:block hidden">
                <Text className="text-primary-blue/70 underline">
                  {item.created_at_format2}
                </Text>
              </div>
            </div>
            <Input
              placeholder="Agregar comentario"
              className="h-[76px] placeholder:text-[19px] md:text-[15px] text-[13px] px-8 placeholder:text-primary-blue/20"
              name="comment"
              type="text"
              fullWidth
              value={item.comment}
              readOnly
            />
            <div className="md:hidden flex justify-end mt-4 mr-4">
                <Text className="text-primary-blue/70 underline text-[10px]">
                  {item.created_at_format2}
                </Text>
              </div>
          </div>
        ))} 
      </div>
    </div>
  );
}
