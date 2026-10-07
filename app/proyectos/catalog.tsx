import { Suspense } from "react"
import { ProjectExplorer } from "./explorer"
import { ProjectCard } from "@/components/projects/project-card"
import type { Project } from "@/lib/project-content"

export function Catalog({ projects }: { projects: Project[] }) {
  return (
    <section
      aria-label="Explorar proyectos"
      className="container-screen-2xl py-16 sm:py-24"
    >
      <Suspense
        fallback={
          <div className="grid gap-12 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        }
      >
        <ProjectExplorer projects={projects} />
      </Suspense>
    </section>
  )
}
