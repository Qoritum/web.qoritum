import { getProjects } from "@/lib/projects"
import { pageMetadata } from "@/lib/seo"
import { Hero } from "./hero"
import { Catalog } from "./catalog"

export const metadata = pageMetadata(
  "Proyectos",
  "Explora soluciones de software, automatización, datos e IoT por tecnología y sector.",
  "/proyectos"
)

export default async function ProjectsPage() {
  const projects = await getProjects()
  return (
    <main id="main-content">
      <Hero />
      <Catalog projects={projects} />
    </main>
  )
}
