import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { H2 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section
      data-mode="dark"
      className="group/dark bg-background-2 py-16 text-white sm:py-24"
    >
      <div className="container-screen-2xl grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <P className="mb-6 font-mono text-primary group-data-[mode='dark']/dark:text-primary">
            Empecemos por una pregunta
          </P>
          <H2 reveal>¿Qué te gustaría que funcionara mejor?</H2>
        </div>
        <div className="lg:pt-10">
          <P>
            Te ayudamos a ordenar la idea. Nuestro recorrido de contacto reúne
            las preguntas iniciales para entender tu objetivo y preparar la
            conversación.
          </P>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/contactanos">
                Cuéntanos tu reto <ArrowUpRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/proyectos">Explorar proyectos</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
