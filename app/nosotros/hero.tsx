import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { company } from "@/lib/company"

export function Hero() {
  return (
    <PageIntro
      variant="split"
      image={company.images[0]}
      eyebrow="Nosotros"
      title="Entendemos primero. Digitalizamos después."
      description="En Qoritum conectamos el conocimiento de tu negocio con software, automatización, datos e IoT. Trabajamos desde el proceso real para construir soluciones que tengan sentido para quienes las usan."
    >
      <Button asChild>
        <Link href="/contactanos">
          Conoce cómo podemos ayudarte <ArrowUpRight />
        </Link>
      </Button>
    </PageIntro>
  )
}
