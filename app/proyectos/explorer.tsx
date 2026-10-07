"use client"

import { useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { P } from "@/components/typography/description"
import { ProjectCard } from "@/components/projects/project-card"
import type { Project } from "@/lib/project-content"
import { filterProjects } from "@/lib/project-filters"
import { trackEvent } from "@/lib/marketing"

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const params = useSearchParams()
  const categories = [...new Set(projects.map((project) => project.category))]
  const sectors = [...new Set(projects.map((project) => project.sector))]
  const query = params.get("q")?.slice(0, 100) ?? ""
  const category = categories.includes(params.get("categoria") ?? "")
    ? params.get("categoria")!
    : "all"
  const sector = sectors.includes(params.get("sector") ?? "")
    ? params.get("sector")!
    : "all"
  const filtered = filterProjects(projects, { query, category, sector })
  function update(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (!value || value === "all") next.delete(key)
    else next.set(key, value)
    window.history.replaceState(
      null,
      "",
      `/proyectos${next.size ? `?${next}` : ""}`
    )
    if (key !== "q") trackEvent("filter_projects", { filter_id: key })
  }
  return (
    <>
      <div className="mb-10 grid items-end gap-5 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
        <div>
          <Label htmlFor="project-search">Buscar un proyecto</Label>
          <div className="relative mt-3">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-foreground/40"
            />
            <Input
              id="project-search"
              value={query}
              onChange={(event) => update("q", event.target.value)}
              maxLength={100}
              placeholder="Tema, tecnología o necesidad"
              className="pl-7"
            />
          </div>
        </div>
        {[
          {
            key: "categoria",
            label: "Solución",
            value: category,
            options: categories,
          },
          { key: "sector", label: "Sector", value: sector, options: sectors },
        ].map((filter) => (
          <div key={filter.key}>
            <Label htmlFor={`filter-${filter.key}`}>{filter.label}</Label>
            <Select
              value={filter.value}
              onValueChange={(value) => update(filter.key, value)}
            >
              <SelectTrigger
                id={`filter-${filter.key}`}
                className="mt-3 w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem value={option} key={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
        <Button
          variant="ghost"
          disabled={!query && category === "all" && sector === "all"}
          onClick={() => window.history.replaceState(null, "", "/proyectos")}
        >
          <X />
          Limpiar
        </Button>
      </div>
      <P className="mb-8 font-mono text-foreground/50" role="status">
        {filtered.length} {filtered.length === 1 ? "proyecto" : "proyectos"}
      </P>
      {filtered.length ? (
        <div className="grid gap-x-10 gap-y-16 lg:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="border px-6 py-14 text-center">
          <P>No encontramos proyectos con estos filtros.</P>
          <Button
            className="mt-6"
            variant="outline"
            onClick={() => window.history.replaceState(null, "", "/proyectos")}
          >
            Ver todos los proyectos
          </Button>
        </div>
      )}
    </>
  )
}
