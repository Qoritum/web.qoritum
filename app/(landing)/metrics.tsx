import { H2, H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { AnimatedNumber } from "@/components/animated-number"
import { SectionBackdrop } from "@/components/section-backdrop"

// Content from the supplied design; keep values and labels together for editing.
const METRICS = [
  { value: 24, suffix: "/7", label: "Visibilidad de procesos" },
  { value: 1, suffix: "", label: "Fuente confiable de datos" },
  { value: 3, suffix: "×", label: "Más velocidad de respuesta" },
]

export function Metrics() {
  return (
    <section
      id="metricas"
      aria-labelledby="metrics-heading"
      className="relative isolate overflow-hidden py-20 sm:py-28 lg:py-32"
    >
      <SectionBackdrop
        pattern="dots"
        shape="bridge"
        className="left-1/3 text-primary"
      />
      <div className="container-screen-2xl grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <H2 reveal id="metrics-heading">
            Más control, velocidad y capacidad de escalar.
          </H2>
          <P reveal className="mt-6 max-w-xl">
            Centraliza la información, reduce tareas manuales y toma decisiones
            con datos confiables.
          </P>
        </div>
        <dl className="grid grid-cols-1 divide-y divide-foreground/15 border-y border-foreground/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {METRICS.map(({ value, suffix, label }, index) => (
            <div
              key={label}
              className="flex min-w-0 flex-col px-0 py-8 sm:px-5 sm:py-10 sm:first:pl-0 lg:px-6"
            >
              <dt className="order-2 mt-4">
                <P className="max-w-40 text-foreground/65">{label}</P>
              </dt>
              <dd className="order-1">
                <H3 as="span" className="mb-0 text-6xl! font-mono text-primary">
                  <AnimatedNumber
                    value={value}
                    suffix={suffix}
                    delay={index * 0.12}
                  />
                </H3>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
