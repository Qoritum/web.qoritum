import { cn } from "cn"
import type { ComponentProps } from "react"
import { WordReveal } from "./word-reveal"

export function P({
  className,
  children,
  reveal = false,
  ...props
}: ComponentProps<"p"> & { reveal?: boolean }) {
  return (
    <p
      className={cn(
        "text-sm text-foreground/80 group-data-[mode='dark']/dark:text-background-2-foreground/80 sm:text-base md:text-lg",
        className
      )}
      {...props}
    >
      {reveal ? <WordReveal>{children}</WordReveal> : children}
    </p>
  )
}
