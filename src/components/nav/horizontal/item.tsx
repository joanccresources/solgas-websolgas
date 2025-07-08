'use client'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import Link from 'next/link'

const ButtonAnimatedGradient = ({title, children, className, path }: {title: string, children?: React.ReactNode, className?: string, path: string}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }
  
  const classMerge = cn(`relative inline-flex   h-12 items-center justify-center overflow-hidden 
        rounded-[7px]   bg-linear-to-b from-[#0C1332] to-[#243A98]
       text-white  shadow-2xl transition-colors focus:outline-hidden focus:ring-2
       focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 font-clan-pro-thin font-thin text-xs text-center px-1 w-[145px] pl-1 cursor-pointer`,
      className)
  return (
    <>
    <Link href={path}>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classMerge}
      >
       <div>
       <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, #656fe288, #00000026)`,
          }}
        />
        <span className="relative z-20">{title}</span>
        <div> 
        </div>
       </div>
      </div>
      </Link>
      {
        children ? 
           children 
         : null
      }
    </>
  )
}

export default ButtonAnimatedGradient
