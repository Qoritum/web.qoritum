import { pageMetadata } from "@/lib/seo"
import { Hero } from "./hero"
import { Overview } from "./overview"
import { Purpose } from "./purpose"
import { Principles } from "./principles"
import { CallToAction } from "./call-to-action"

export const metadata = pageMetadata(
  "Nosotros",
  "Conoce cómo Qoritum entiende tu operación y crea soluciones de software, automatización, datos e IoT.",
  "/nosotros"
)

export default function AboutPage() {
  return (
    <main id="main-content">
      <Hero />
      <Overview />
      <Purpose />
      <Principles />
      <CallToAction />
    </main>
  )
}
