import assert from "node:assert/strict"
import test from "node:test"
import { readFile, readdir } from "node:fs/promises"
import { parseProjectFile } from "../lib/project-content.ts"
import { filterProjects } from "../lib/project-filters.ts"

const filenames = (await readdir(new URL("../content/projects/", import.meta.url))).filter(name => name.endsWith(".mdx"))
const entries = await Promise.all(filenames.map(async name => parseProjectFile(name, await readFile(new URL(`../content/projects/${name}`, import.meta.url), "utf8"))))
const projects = entries.map(entry => entry.project)
const source = await readFile(new URL("../content/project-template.mdx", import.meta.url), "utf8")

test("project files expose valid metadata and nonempty MDX", () => {
  assert.equal(new Set(projects.map(project=>project.slug)).size, projects.length)
  for (const entry of entries) { assert(entry.content.includes("##")); assert(entry.project.readingMinutes >= 1); assert.equal(entry.project.kind,"concept") }
})
test("template is a draft and missing publication flag remains private", () => {
  assert.equal(parseProjectFile("draft.mdx",source).project.published,false)
  assert.equal(parseProjectFile("draft.mdx",source.replace("published: false\n", "")).project.published,false)
})
test("rejects traversal, invalid dates, unsafe image paths and broken metadata", () => {
  for (const name of ["../secret.mdx","Upper.mdx","file.txt"]) assert.throws(()=>parseProjectFile(name,source))
  for (const bad of [source.replace('"2026-10-06"','"2026-02-31"'), source.replace('/images/results-build.jpg','/images/../secret.jpg'),source.replace('title: "Título del proyecto"','title: ""'),"no frontmatter"]) assert.throws(()=>parseProjectFile("example.mdx",bad))
})
test("filters combine category and sector and search ignores accents", () => {
  assert.equal(filterProjects(projects,{query:"automatizacion"}).length,1)
  assert.equal(filterProjects(projects,{category:"Datos e IA",sector:"Distribución B2B"}).length,1)
  assert.equal(filterProjects(projects,{category:"Datos e IA",sector:"Servicios"}).length,0)
  assert.equal(filterProjects(projects,{query:"does-not-exist"}).length,0)
})
