import clsx from "clsx";
import { CSSProperties } from "react"; 
type ColorsTypes = "primary" | "blue" | "secondaryblue" | "gray";

const colors = {
    primary: 'primary-orange',
    blue: 'primary-blue',
    secondaryblue: 'secondary-blue',
    gray: 'gray'
}
export default function Card({ color ='primary', children, className , style }: {color?: ColorsTypes, children: React.ReactNode, className?: string, style?: CSSProperties }){
    const classNameMerge = clsx([
        'border  rounded-[48px] w-auto h-auto lg:p-12 p-6',
        `border-${colors[color]}`,
        className, 
    ]);

    return (
        <div className={classNameMerge} style={style}>
            {children}
        </div>
    )
}