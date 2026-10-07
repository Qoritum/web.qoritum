import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <PageIntro
      eyebrow="Servicios"
      title="Tu operación. Su siguiente versión."
      description="Desde un proceso que consume horas hasta un sistema que necesita crecer. Conectamos software, automatización y datos alrededor de lo que tu negocio necesita resolver."
      image={{
        src: "/images/results-measure.jpg",
        alt: "Espacio de trabajo para diseñar nuevas soluciones digitales",
      }}
    >
      <Button asChild>
        <Link href="#soluciones">
          Explorar soluciones <ArrowDown />
        </Link>
      </Button>
    </PageIntro>
  )
}
