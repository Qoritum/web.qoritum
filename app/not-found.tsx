import Link from "next/link"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="404"
        title="Busquemos otro camino."
        description="Esta página no está disponible. Puedes explorar nuestras soluciones o volver al inicio."
        image={{
          src: "/images/results-operation.jpg",
          alt: "Espacio de trabajo colaborativo",
        }}
      >
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/servicios">Explorar servicios</Link>
          </Button>
        </div>
      </PageIntro>
    </main>
  )
}
