import { P } from "@/components/typography/description"
import { ResultsRoot } from "@/components/results/results-root"
import { getFeaturedProjects } from "@/lib/projects"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { H2 } from "@/components/typography/heading"

export async function Results() {
  const projects = await getFeaturedProjects()
  const results = projects.map((project) => ({
    id: project.slug,
    image: project.cover,
    alt: project.coverAlt,
    title: project.title,
    detail: `${project.kind === "concept" ? "Concepto de solución · " : ""}${project.summary}`,
    href: `/proyectos/${project.slug}`,
  }))
  if (!results.length) return null
  return (
    <ResultsRoot results={results}>
      <div className="container-screen-2xl flex shrink-0 flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
        <div className="flex flex-col items-start gap-4 md:items-end">
          <P className="md:text-right max-w-md mb-4">
            No empezamos por un proyecto de un año, sino por algo que se pueda
            comprobar rápido. <br /> Lo que funciona, se escala.
          </P>
          <Button variant="outline" asChild>
            <Link href="/proyectos">Ver todos los proyectos</Link>
          </Button>
        </div>
      </div>
    </ResultsRoot>
  )
}
