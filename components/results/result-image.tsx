import Image from "next/image"
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
    <a
      href={result.href}
      aria-label={`${result.title} Conversemos sobre tu proyecto`}
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
        className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full border border-white/50 text-white transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-foreground group-focus-visible:bg-primary group-focus-visible:text-foreground"
      >
        <ArrowUpRight className="size-5" />
      </span>
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transform-none sm:p-10 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
        <H3 className="text-white">{result.title}</H3>
        <P className="max-w-md text-white/80">{result.detail}</P>
      </div>
      <span className="pointer-events-none absolute inset-0 border-2 border-transparent group-focus-visible:border-primary" />
    </a>
  )
}
