import { pageMetadata } from "@/lib/seo"
import { Hero } from "./hero"
import { Policy } from "./policy"

export const metadata = pageMetadata(
  "Privacidad",
  "Información sobre el uso de datos de contacto, medición y preferencias de privacidad en Qoritum.",
  "/privacy"
)

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <Hero />
      <Policy />
    </main>
  )
}
