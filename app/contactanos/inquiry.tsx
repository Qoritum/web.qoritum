import { ContactLinks } from "@/components/contact/contact-links"
import { InquiryFlow } from "@/components/contact/inquiry-flow"
import { H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { SectionBackdrop } from "@/components/section-backdrop"

export function Inquiry() {
  return (
    <section className="container-screen-2xl grid items-start gap-14 py-16 sm:py-24 lg:grid-cols-[.65fr_1fr] lg:gap-20">
      <aside className="relative isolate overflow-hidden border p-6 sm:p-10">
        <SectionBackdrop pattern="dots" shape="bridge" />
        <H3 reveal>Hablemos de tu empresa.</H3>
        <P className="mb-10">
          Puedes escribirnos directamente o responder las preguntas para
          compartir una consulta más clara.
        </P>
        <ContactLinks showPhone />
        <div className="mt-12 border-t pt-8">
          <P className="font-mono text-primary">¿Qué sigue?</P>
          <ol className="mt-5 space-y-4">
            {[
              "Entender tu objetivo y el proceso actual.",
              "Definir una mejora y un alcance inicial.",
              "Acordar cómo comprobar el resultado.",
            ].map((text, index) => (
              <li key={text} className="flex gap-4">
                <span className="font-mono text-primary">0{index + 1}</span>
                <P>{text}</P>
              </li>
            ))}
          </ol>
        </div>
      </aside>
      <InquiryFlow />
    </section>
  )
}
