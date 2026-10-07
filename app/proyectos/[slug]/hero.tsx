import { PageIntro } from "@/components/page-intro"
import { P } from "@/components/typography/description"
import type { Project } from "@/lib/project-content"

export function Hero({ project }: { project: Project }) {
  return (
    <PageIntro
      eyebrow={project.category}
      title={project.title}
      description={project.summary}
      image={{ src: project.cover, alt: project.coverAlt }}
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Proyectos", href: "/proyectos" },
        { label: project.title },
      ]}
    >
      <P className="font-mono text-white/60">
        {project.sector} ·{" "}
        {project.kind === "concept"
          ? "Concepto de solución · Imagen ilustrativa"
          : "Caso de proyecto"}{" "}
        · {project.readingMinutes} min de lectura
      </P>
    </PageIntro>
  )
}
