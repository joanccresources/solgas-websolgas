'use client'

import { noticeAtom } from "@/store";
import { useAtom } from "jotai";

export default function CounterLabel(){
    const [notice] = useAtom(noticeAtom); 
    
    return notice?.comments?.length
}