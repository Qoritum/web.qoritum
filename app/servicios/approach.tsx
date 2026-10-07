import { SectionBackdrop } from "@/components/section-backdrop"
import { H2, H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"

const approach = [
  {
    title: "Entender.",
    text: "Escuchamos a tu equipo y observamos el proceso antes de elegir una tecnología.",
  },
  {
    title: "Diseñar.",
    text: "Definimos un alcance concreto, los usuarios y cómo evaluar la mejora.",
  },
  {
    title: "Probar.",
    text: "Construimos una primera versión y la contrastamos con la operación real.",
  },
  {
    title: "Evolucionar.",
    text: "Aprendemos del uso, ajustamos y ampliamos lo que aporta valor.",
  },
]
export function Approach() {
  return (
    <section className="relative isolate overflow-hidden border-t py-20 sm:py-28">
      <SectionBackdrop shape="stack" pattern="grid" className="left-1/2" />
      <div className="container-screen-2xl">
        <P className="mb-6 font-mono text-primary">
          El método, siempre cerca del negocio
        </P>
        <H2 reveal className="max-w-4xl">
          Construir contigo. Mejorar con evidencia.
        </H2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((step, index) => (
            <div key={step.title} className="border-t pt-6">
              <P className="mb-6 font-mono text-primary">0{index + 1}</P>
              <H3 reveal>{step.title}</H3>
              <P>{step.text}</P>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
