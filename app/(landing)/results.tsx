import { P } from "@/components/typography/description"
import { ResultsRoot } from "@/components/results/results-root"
import { RESULTS } from "@/components/results/results.data"
import { H2 } from "@/components/typography/heading"

export function Results() {
  return (
    <ResultsRoot results={RESULTS}>
      <div className="container-screen-2xl flex shrink-0 flex-col gap-4 pt-8 pb-8 sm:pt-12 md:flex-row md:items-end md:justify-between md:pt-20">
        <H2 reveal className="mb-0">
          <span
            id="results-heading"
            className="font-mono text-4xl leading-none text-nowrap text-primary sm:text-6xl md:text-8xl lg:text-[9rem]"
          >
            7 Días
          </span>
          <span className="mt-8 block text-xl md:text-3xl lg:text-5xl">
            Una primera mejora medible.
          </span>
        </H2>
        <P className="max-w-xs md:text-right lg:max-w-sm">
          No empezamos por un proyecto de un año, sino por algo que se pueda
          comprobar rápido. <br /> Lo que funciona, se escala.
        </P>
      </div>
    </ResultsRoot>
  )
}
