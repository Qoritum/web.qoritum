import { parse } from "yaml"
import { z } from "zod"

export const projectSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const localImage = z
  .string()
  .regex(
    /^\/images\/[a-zA-Z0-9/_ .-]+\.(?:jpg|jpeg|png|webp|avif|svg)$/,
    "Usa una imagen local en /images/."
  )
  .refine((value) => !value.includes(".."))
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`)
    return (
      !Number.isNaN(parsed.valueOf()) &&
      parsed.toISOString().slice(0, 10) === value
    )
  }, "Usa una fecha válida YYYY-MM-DD.")

export const projectSchema = z
  .object({
    title: z.string().trim().min(3).max(120),
    summary: z.string().trim().min(20).max(300),
    category: z.string().trim().min(2).max(60),
    sector: z.string().trim().min(2).max(60),
    cover: localImage,
    coverAlt: z.string().trim().min(5).max(200),
    date,
    updated: date.optional(),
    tags: z.array(z.string().trim().min(1).max(35)).max(10).default([]),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
    kind: z.enum(["concept", "case-study"]).default("concept"),
  })
  .strict()

export type Project = z.output<typeof projectSchema> & {
  slug: string
  readingMinutes: number
}

export function parseProjectFile(filename: string, source: string) {
  const slug = filename.replace(/\.mdx$/, "")
  if (!filename.endsWith(".mdx") || !projectSlugPattern.test(slug))
    throw new Error(`Nombre de proyecto inválido: ${filename}`)
  if (Buffer.byteLength(source, "utf8") > 1024 * 1024)
    throw new Error(`Proyecto demasiado grande: ${filename}`)
  const match = source
    .replace(/^\uFEFF/, "")
    .match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/)
  if (!match) throw new Error(`Falta el frontmatter YAML en ${filename}.`)
  const data: unknown = parse(match[1], { maxAliasCount: 50, uniqueKeys: true })
  const content = match[2]
  const result = projectSchema.safeParse(data)
  if (!result.success)
    throw new Error(
      `Metadatos inválidos en ${filename}: ${result.error.message}`
    )
  if (!content.trim())
    throw new Error(`El proyecto ${filename} no tiene contenido.`)
  const project: Project = {
    ...result.data,
    slug,
    readingMinutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
  }
  return { project, content }
}
