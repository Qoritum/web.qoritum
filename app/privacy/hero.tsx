import { PageIntro } from "@/components/page-intro"

export function Hero() {
  return (
    <PageIntro
      eyebrow="Privacidad"
      title="Tu información, con claridad."
      description="Conoce cómo funciona el sitio y qué puedes controlar sobre tus datos y preferencias."
      image={{
        src: "/images/results-measure.jpg",
        alt: "Espacio de trabajo y planificación",
      }}
    />
  )
}
