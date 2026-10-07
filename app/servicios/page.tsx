import { pageMetadata } from "@/lib/seo"
import { Hero } from "./hero"
import { Solutions } from "./solutions"
import { Catalog } from "./catalog"
import { Approach } from "./approach"
import { CallToAction } from "./call-to-action"

export const metadata = pageMetadata(
  "Servicios",
  "Software a medida, RPA, inteligencia artificial, automatización, IoT y soluciones para agroexportación. Explora cómo podemos mejorar tu operación.",
  "/servicios"
)

export default function ServicesPage() {
  return (
    <main id="main-content">
      <Hero />
      <Solutions />
      <Catalog />
      <Approach />
      <CallToAction />
    </main>
  )
}
