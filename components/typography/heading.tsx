import { cn } from "cn"
import type { ComponentProps } from "react"
import { WordReveal } from "./word-reveal"

export function H1({
  className,
  children,
  reveal = false,
  ...props
}: ComponentProps<"h1"> & { reveal?: boolean }) {
  return (
    <h1
      className={cn(
        "mb-6 font-heading text-4xl group-data-[mode='dark']/dark:text-background-2-foreground sm:text-6xl md:text-7xl",
        className
      )}
      {...props}
    >
      {reveal ? <WordReveal>{children}</WordReveal> : children}
    </h1>
  )
}

export function H2({
  className,
  children,
  reveal = false,
  ...props
}: ComponentProps<"h2"> & { reveal?: boolean }) {
  return (
    <h2
      className={cn(
        "mb-4 font-heading text-3xl group-data-[mode='dark']/dark:text-background-2-foreground sm:text-5xl md:text-6xl",
        className
      )}
      {...props}
    >
      {reveal ? <WordReveal>{children}</WordReveal> : children}
    </h2>
  )
}

export function H3({
  className,
  as: Tag = "h3",
  children,
  reveal = false,
  ...props
}: ComponentProps<"h3"> & { as?: "h3" | "span"; reveal?: boolean }) {
  return (
    <Tag
      className={cn(
        "mb-4 font-heading text-2xl group-data-[mode='dark']/dark:text-background-2-foreground sm:text-3xl md:text-4xl",
        className
      )}
      {...props}
    >
      {reveal ? <WordReveal>{children}</WordReveal> : children}
    </Tag>
  )
}
