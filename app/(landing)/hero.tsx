import { P } from "@/components/typography/description"
import { H1 } from "@/components/typography/heading"
import { Button } from "@/components/ui/button"
import { Fragment } from "react/jsx-runtime"

const TAGS = ["IoT", "Automatización", "Integración", "IA/BI"]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-1 size-full bg-linear-to-l from-[#121123]/90 via-[#3B2E1F]/70 to-[#131313]/85" />
      <img
        alt=""
        src="https://images.unsplash.com/photo-1786556025217-666148165a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODgzNzIzNzB8&ixlib=rb-4.1.0&q=80&w=1080"
        width={1500}
        height={1500}
        className="absolute inset-0 size-full object-cover"
      />

      <div
        data-mode="dark"
        className="group/dark relative z-2 container-screen-2xl pt-38 pb-18 sm:pt-46 md:pt-64 md:pb-22 lg:pt-74"
      >
        <H1 reveal className="max-w-5xl md:mb-12">
          Transformación Digital para Empresas que Quieren Avanzar
        </H1>
        <P reveal className="max-w-xl text-balance">
          Digitalizamos distribución B2B y agroexportación. Primero entendemos
          tu operación; después integramos IoT, software, RPA e IA donde
          realmente ahorran horas.
        </P>

        <div className="flex flex-col gap-4 border-b border-muted-foreground py-8 md:flex-row">
          <Button asChild>
            <a href="#contacto">Hablemos de tu operación</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#servicios">Explorar Soluciones</a>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 pt-8 opacity-40 sm:gap-x-4">
          {TAGS.map((t, i) => {
            return (
              <Fragment key={t}>
                <span className="font-mono text-base text-background-2-foreground sm:text-xl md:text-2xl">
                  {t}
                </span>
                {i + 1 !== TAGS.length && (
                  <div className="size-1.5 shrink-0 rounded-full bg-background-2-foreground" />
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
