import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SERVICES } from "@/lib/services"
import { H2 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"

export function Solutions() {
  return (
    <section
      id="soluciones"
      className="container-screen-2xl scroll-mt-8 py-16 sm:py-24"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <P className="mb-5 font-mono text-primary">Siete formas de avanzar</P>
          <H2 reveal>El reto marca el camino.</H2>
        </div>
        <P reveal className="max-w-xl lg:pt-12">
          No tienes que elegir una tecnología de antemano. Explora las
          posibilidades y conversemos sobre dónde se pierde tiempo, qué
          información falta o qué necesita conectar tu empresa.
        </P>
      </div>
      <nav
        aria-label="Explorar soluciones"
        className="mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service, index) => (
          <Link
            key={service.id}
            href={`#${service.id}`}
            data-track="select_service"
            data-service={service.id}
            className="group flex items-center gap-4 border-b py-6 pr-6 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
          >
            <span className="font-mono text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <P className="text-inherit">{service.title}</P>
            <ArrowUpRight
              aria-hidden
              className="ml-auto size-5 shrink-0 transition-transform group-hover:-translate-y-1 motion-reduce:transform-none"
            />
          </Link>
        ))}
      </nav>
    </section>
  )
}
