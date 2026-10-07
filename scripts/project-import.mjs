import { readFile, writeFile, stat, access } from "node:fs/promises"
import path from "node:path"
import { parseProjectFile } from "../lib/project-content.ts"

const input = process.argv[2]
if (!input)
  throw new Error("Uso: npm run project:import -- ruta/al/proyecto.mdx")
const sourcePath = path.resolve(input)
const info = await stat(sourcePath)
if (!info.isFile() || info.size > 1024 * 1024)
  throw new Error("Importa un archivo MDX de hasta 1 MB.")
const filename = path.basename(sourcePath)
const source = await readFile(sourcePath, "utf8")
const { project } = parseProjectFile(filename, source)
await access(path.join(process.cwd(), "public", project.cover))
await writeFile(
  path.join(process.cwd(), "content", "projects", filename),
  source,
  { flag: "wx" }
)
console.log(
  `Importado: content/projects/${filename}. Revisa el contenido y ejecuta npm run build antes de publicar.`
)
