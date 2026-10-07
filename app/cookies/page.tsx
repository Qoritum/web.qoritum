import { pageMetadata } from "@/lib/seo"
import { Hero } from "./hero"
import { Policy } from "./policy"

export const metadata = pageMetadata(
  "Cookies y preferencias",
  "Controla las cookies de analítica y publicidad de Qoritum y conoce qué herramientas pueden activarse.",
  "/cookies"
)

export default function CookiesPage() {
  return (
    <main id="main-content">
      <Hero />
      <Policy />
    </main>
  )
}
