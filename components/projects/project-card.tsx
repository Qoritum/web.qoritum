import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import type { Project } from "@/lib/project-content"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group min-w-0">
      <Link
        href={`/proyectos/${project.slug}`}
        data-track="select_project"
        data-project={project.slug}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-foreground/5">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 95vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
          />
          <span
            aria-hidden="true"
            className="absolute right-5 bottom-5 flex size-11 items-center justify-center border border-white/60 bg-background text-foreground transition-colors group-hover:bg-primary"
          >
            <ArrowUpRight />
          </span>
        </div>
        <P className="mt-5 font-mono text-primary">
          {project.category}{" "}
          <span className="text-foreground/35">/ {project.sector}</span>
        </P>
        <H3 className="mt-3 transition-colors group-hover:text-primary">
          {project.title}
        </H3>
        <P className="max-w-xl">{project.summary}</P>
        <P className="mt-4 font-mono text-foreground/50">
          {project.kind === "concept"
            ? "Concepto de solución"
            : "Caso de proyecto"}{" "}
          · {project.readingMinutes} min de lectura
        </P>
      </Link>
    </article>
  )
}
