import { PageIntro } from "@/components/page-intro"

export function Hero() {
  return (
    <PageIntro
      image={{
        src: "/images/results-build.jpg",
        alt: "Equipo colaborando en el desarrollo de un proyecto",
      }}
      eyebrow="Proyectos"
      title="Ideas que se convierten en soluciones."
      description="Explora cómo abordamos retos de operación, integración y datos. Los conceptos de solución ilustran posibilidades; cada implementación comienza entendiendo tu negocio."
    />
  )
}
