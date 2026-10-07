import Image from "next/image"
import { SectionBackdrop } from "@/components/section-backdrop"
import { H2, H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { company } from "@/lib/company"

export function Principles() {
  return (
    <section className="container-screen-2xl py-20 sm:py-28">
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <H2 reveal>Así trabajamos.</H2>
        <P className="max-w-md">
          Una relación cercana, decisiones claras y una primera mejora que se
          pueda comprobar.
        </P>
      </div>
      <div className="mt-12 grid divide-y border-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {company.principles.map((principle, index) => (
          <div key={principle.title} className="relative isolate p-6 py-12">
            <SectionBackdrop shape="field" />
            <P className="mb-6 font-mono text-primary">0{index + 1}</P>
            <H3 reveal>{principle.title}</H3>
            <P>{principle.description}</P>
          </div>
        ))}
      </div>
      <figure className="mt-16">
        <Image
          src={company.images[1].src}
          alt={company.images[1].alt}
          width={1600}
          height={700}
          className="aspect-video max-h-120 w-full object-cover"
        />
        <figcaption className="mt-4">
          <P className="text-foreground/50">
            {company.images[1].caption} Imagen ilustrativa.
          </P>
        </figcaption>
      </figure>
    </section>
  )
}
