'use client'

import { noticeLikesAtom } from "@/store";
import { useAtom } from "jotai";

export default function CounterLikesLabel(){
    const [notice] = useAtom(noticeLikesAtom); 
 
    return notice?.like
}