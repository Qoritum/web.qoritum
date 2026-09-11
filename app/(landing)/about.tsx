import { P } from "@/components/typography/description"
import { H2, H3 } from "@/components/typography/heading"
import { SectionBackdrop } from "@/components/section-backdrop"
import { Pattern } from "@/components/ui/pattern"

const cards = [
  {
    num: "01",
    title: "Sistemas a medida",
    desc: "ERP, CRM, cotizadores, facturación electrónica y seguimiento de clientes, importaciones o proyectos.",
  },
  {
    num: "02",
    title: "Integraciones y automatización",
    desc: "WhatsApp, APIs y RPA para conectar tareas, reducir reprocesos y acelerar la operación.",
    active: true,
  },
  {
    num: "03",
    title: "Datos, IA e IoT",
    desc: "Agentes, visión por computadora, sensores y análisis predictivo solo donde generan valor.",
  },
]

export function About() {
  return (
    <section id="nosotros" className="container-screen-2xl py-40">
      <div className="justify-between gap-8 lg:flex">
        <H2 reveal>
          Entendemos primero. <br />
          Digitalizamos después.
        </H2>
        <P reveal className="mt-8 max-w-sm lg:mt-0 lg:text-end">
          Entendemos tu operación, detectamos oportunidades y diseñamos
          soluciones a partir de cómo realmente trabajas.
        </P>
      </div>

      <div className="my-25" />

      <div className="relative">
        <Pattern className="absolute top-0 left-1/2 z-1 h-1 w-[calc(100%+4rem)] -translate-x-1/2 text-border" />
        <Pattern className="absolute bottom-0 left-1/2 z-1 h-1 w-[calc(100%+4rem)] -translate-x-1/2 text-border" />

        <Pattern className="absolute top-1/2 left-0 z-1 h-[calc(100%+4rem)] w-1 -translate-y-1/2 text-border" />
        <Pattern className="absolute top-1/2 right-0 z-1 h-[calc(100%+4rem)] w-1 -translate-y-1/2 text-border" />

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {cards.map(({ title, desc, num, active }, i) => {
            return (
              <div
                data-active={active}
                key={i}
                className="group/card relative isolate bg-card px-6 py-12 data-[active=true]:bg-background-2/5"
              >
                <span className="flex justify-between gap-4 font-mono text-xl font-bold text-primary group-data-[active=true]/card:text-indigo-400">
                  {num}
                </span>
                <SectionBackdrop
                  shape={(["stack", "bridge", "field"] as const)[i]}
                  pattern={active ? "dots" : "grid"}
                  className="text-primary group-data-[active=true]/card:text-indigo-400"
                />
                <H3 reveal className="my-3 text-2xl sm:text-2xl md:text-2xl">
                  {title}
                </H3>
                <P>{desc}</P>
                {i + 1 !== cards.length && (
                  <Pattern className="absolute -bottom-px left-1/2 z-1 h-1 w-[calc(100%+4rem)] -translate-x-1/2 text-border lg:top-1/2 lg:-right-px lg:left-auto lg:h-[calc(100%+4rem)] lg:w-1 lg:translate-x-0 lg:-translate-y-1/2" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
