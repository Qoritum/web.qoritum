import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import type { ResultItem } from "./results.data"

export function ResultImage({
  result,
  onFocus,
}: {
  result: ResultItem
  onFocus: () => void
}) {
  return (
    <Link
      href={result.href}
      data-track="select_project"
      data-project={result.id}
      aria-label={`${result.title} Ver proyecto`}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) onFocus()
      }}
      className="group relative block h-full w-[80vw] shrink-0 overflow-hidden bg-foreground/10 outline-none sm:w-[60vw] lg:w-[46vw]"
    >
      <Image
        src={result.image}
        alt={result.alt}
        fill
        sizes="(min-width: 1024px) 46vw, (min-width: 640px) 60vw, 80vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <span
        aria-hidden="true"
        className="absolute top-5 right-5 flex size-10 items-center justify-center border border-white/50 text-white duration-300 opacity-0 group-hover:opacity-100 group-hover:border-primary group-hover:bg-primary group-hover:text-foreground group-focus-visible:bg-primary group-focus-visible:text-foreground"
      >
        <ArrowUpRight className="size-5" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6 duration-500 sm:p-10">
        <H3 className="text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-200">{result.title}</H3>
        <P className="max-w-md text-white/80 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 delay-100 duration-200">{result.detail}</P>
      </div>
      <span className="pointer-events-none absolute inset-0 border-2 border-transparent group-focus-visible:border-primary" />
    </Link>
  )
}
