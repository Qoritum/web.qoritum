import type { Project } from "./project-content"

export function filterProjects(
  projects: Project[],
  {
    query = "",
    category = "all",
    sector = "all",
  }: { query?: string; category?: string; sector?: string }
) {
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLocaleLowerCase("es")
  const search = normalize(query.trim())
  return projects.filter(
    (project) =>
      (category === "all" || project.category === category) &&
      (sector === "all" || project.sector === sector) &&
      (!search ||
        normalize(
          [
            project.title,
            project.summary,
            project.sector,
            ...project.tags,
          ].join(" ")
        ).includes(search))
  )
}
