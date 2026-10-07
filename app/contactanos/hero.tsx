import { PageIntro } from "@/components/page-intro"

export function Hero() {
  return (
    <PageIntro
      image={{
        src: "/images/results-insight.jpg",
        alt: "Mesa de trabajo para explorar una nueva solución",
      }}
      eyebrow="Contáctanos"
      title="Tu próxima mejora empieza con una conversación."
      description="No necesitas llegar con una especificación técnica. Cuéntanos qué está pasando en tu operación y te ayudamos a definir un primer paso."
    />
  )
}
