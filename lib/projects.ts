import "server-only"

import { readdir, readFile, access } from "node:fs/promises"
import path from "node:path"
import { cache } from "react"
import { parseProjectFile, projectSlugPattern } from "./project-content"
import type { Project } from "./project-content"

const directory = path.join(process.cwd(), "content", "projects")

// Server-only discovery: no filesystem paths or MDX source reach the browser.
const getEntries = cache(async () => {
  const files = await readdir(directory, { withFileTypes: true })
  const entries = await Promise.all(
    files
      .filter((file) => file.isFile() && file.name.endsWith(".mdx"))
      .map(async (file) => {
        const entry = parseProjectFile(
          file.name,
          await readFile(path.join(directory, file.name), "utf8")
        )
        await access(path.join(process.cwd(), "public", entry.project.cover))
        return entry
      })
  )
  return entries
    .filter(({ project }) => project.published)
    .sort(
      (a, b) =>
        b.project.date.localeCompare(a.project.date) ||
        a.project.slug.localeCompare(b.project.slug)
    )
})

export const getProjects = cache(async () =>
  (await getEntries()).map(({ project }) => project)
)

export const getProject = cache(async (slug: string) => {
  if (!projectSlugPattern.test(slug)) return undefined
  return (await getEntries()).find(({ project }) => project.slug === slug)
})

export async function getFeaturedProjects() {
  const projects = await getProjects()
  return projects.filter((project) => project.featured).slice(0, 6)
}

export async function getRelatedProjects(project: Project, limit = 2) {
  return (await getProjects())
    .filter((item) => item.slug !== project.slug)
    .sort(
      (a, b) =>
        Number(b.category === project.category) -
        Number(a.category === project.category)
    )
    .slice(0, limit)
}
