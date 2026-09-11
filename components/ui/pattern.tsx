import { cn } from "cn"
import { ComponentProps } from "react"

export function Pattern({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[linear-gradient(45deg,currentColor_25%,transparent_25%,transparent_50%,currentColor_50%,currentColor_75%,transparent_75%,transparent)] bg-size-[6px_6px] text-background-2-foreground/5",
        className
      )}
      {...props}
    />
  )
}
