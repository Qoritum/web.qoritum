import { readFile, writeFile, mkdir } from "node:fs/promises"
import path from "node:path"

const slug = process.argv[2]
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
  throw new Error("Uso: npm run project:new -- nombre-del-proyecto")
const directory = path.join(process.cwd(), "content", "projects")
await mkdir(directory, { recursive: true })
const template = await readFile(
  path.join(process.cwd(), "content", "project-template.mdx"),
  "utf8"
)
const destination = path.join(directory, `${slug}.mdx`)
await writeFile(
  destination,
  template.replace(
    'date: "2026-10-06"',
    `date: "${new Date().toISOString().slice(0, 10)}"`
  ),
  { flag: "wx" }
)
console.log(
  `Borrador creado: content/projects/${slug}.mdx. Edita el contenido y usa published: true para publicarlo en la siguiente compilación.`
)
