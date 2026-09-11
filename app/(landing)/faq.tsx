import { P } from "@/components/typography/description"
import { H2 } from "@/components/typography/heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const questions = [
  {
    question: "¿Por dónde empezamos?",
    answer:
      "Primero conversamos sobre cómo funciona tu operación, qué tareas consumen tiempo y dónde aparecen los problemas. Con ese contexto definimos una oportunidad concreta y el alcance del primer paso.",
  },
  {
    question: "¿Qué significa una primera mejora en 7 días?",
    answer:
      "Es una propuesta para empezar por una mejora acotada y medible. El alcance, los accesos necesarios y el plazo se acuerdan al conocer tu operación; no supone reemplazar todos tus sistemas en una semana.",
  },
  {
    question: "¿Tengo que cambiar los sistemas que ya utilizo?",
    answer:
      "No necesariamente. Evaluamos qué conviene conservar, integrar o automatizar. El objetivo es que las herramientas acompañen tu forma de trabajar y compartan la información que tu equipo necesita.",
  },
  {
    question: "¿Qué soluciones puede desarrollar Qoritum?",
    answer:
      "Trabajamos con software a medida, automatización RPA, inteligencia artificial, integración de procesos, IoT y consultoría de transformación digital, con foco en operaciones B2B y agroexportación.",
  },
  {
    question: "¿Cómo se define el costo de un proyecto?",
    answer:
      "Depende del problema, las integraciones y el alcance acordado. Después de la conversación inicial podemos definir prioridades y preparar una propuesta acorde a lo que necesitas.",
  },
]

export function FAQ() {
  return (
    <section
      id="preguntas-frecuentes"
      data-mode="dark"
      className="group/dark relative bg-background-2"
    >
      <div className="absolute inset-0 bg-linear-to-l from-background-2 via-[#3B2E1F]/50 to-background-2" />
      <div className="relative container-screen-2xl grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-[.6fr_1fr] lg:gap-25 lg:py-48">
        <div>
          <H2 reveal>Preguntas frecuentes</H2>
          <P className="max-w-md sm:mt-8 md:mt-16">
            Antes de dar el siguiente paso, resolvamos lo esencial sobre nuestra
            forma de trabajar.
          </P>
        </div>
        <Accordion type="single" collapsible defaultValue="0" className="gap-6">
          {questions.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={String(index)}
              className="border-b-transparent bg-card px-3.5 md:px-6"
            >
              <AccordionTrigger className="font-heading text-base font-medium sm:text-lg md:text-2xl">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <P className="group-data-[mode='dark']/dark:text-foreground/80">
                  {item.answer}
                </P>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
