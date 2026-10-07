import { PageIntro } from "@/components/page-intro"

export function Hero() {
  return (
    <PageIntro
      eyebrow="Cookies y preferencias"
      title="Tú eliges cómo medir."
      description="Controla las herramientas opcionales de analítica y publicidad. Tu elección no impide explorar nuestras soluciones."
      image={{
        src: "/images/results-measure.jpg",
        alt: "Espacio de trabajo y planificación",
      }}
    />
  )
}
