import { pageMetadata } from "@/lib/seo"
import { Hero } from "./hero"
import { Inquiry } from "./inquiry"

export const metadata = pageMetadata(
  "Contáctanos",
  "Cuéntanos tu objetivo, cómo trabaja tu empresa y cuándo quieres empezar. Preparemos juntos una primera mejora.",
  "/contactanos"
)

export default function ContactPage() {
  return (
    <main id="main-content">
      <Hero />
      <Inquiry />
    </main>
  )
}
