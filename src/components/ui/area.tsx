import * as React from "react"
import { cn } from "@/lib/utils"

const TextArea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea 
        ref={ref}
        className={cn(
         `flex h-9 w-full rounded-full bg-transparent px-3 py-1 text-base shadow-sm transition-colors  file:bg-transparent file:text-sm file:font-medium 
         file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className
        )} 
        {...props}
      />
    )
  }
)
TextArea.displayName = "TextArea"

export { TextArea }
