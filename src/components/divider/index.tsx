import clsx from "clsx";


export default function Divider({className}: {className ?: string}){
   return  <hr className={clsx([className, 'border border-b  border-gray '])}></hr>
}