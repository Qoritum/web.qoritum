import type { MetadataRoute } from "next"
import { getProjects } from "@/lib/projects"
import { site, isIndexable } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!site.url || !isIndexable) return []
  const projects = await getProjects()
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...["nosotros", "servicios", "contactanos", "proyectos"].map((path) => ({
      url: `${site.url}/${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/proyectos/${project.slug}`,
      lastModified: project.updated ?? project.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ]
}
