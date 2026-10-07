import { H2 } from "@/components/typography/heading"
import { ProjectCard } from "@/components/projects/project-card"
import type { Project } from "@/lib/project-content"

export function Related({ related }: { related: Project[] }) {
  if (!related.length) return null
  return (
    <section className="container-screen-2xl py-20">
      <H2 reveal className="mb-12">
        Sigue explorando.
      </H2>
      <div className="grid gap-12 lg:grid-cols-2">
        {related.map((item) => (
          <ProjectCard key={item.slug} project={item} />
        ))}
      </div>
    </section>
  )
}
