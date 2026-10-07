import Image from "next/image"
import { H2 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { company } from "@/lib/company"

export function Overview() {
  return (
    <section className="container-screen-2xl grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20">
      <figure>
        <Image
          src={company.images[0].src}
          alt={company.images[0].alt}
          width={900}
          height={1000}
          className="aspect-4/5 w-full object-cover"
        />
        <figcaption className="mt-4">
          <P className="text-foreground/50">
            {company.images[0].caption} Imagen ilustrativa.
          </P>
        </figcaption>
      </figure>
      <div>
        <P className="mb-6 font-mono text-primary">Tecnología con propósito</P>
        <H2 reveal>El punto de partida es tu operación.</H2>
        <P reveal>
          Nos enfocamos en los momentos donde se pierde tiempo, se repiten
          tareas o falta información para decidir. Desde ahí, definimos una
          solución y una forma de comprobar si mejora el trabajo.
        </P>
        <P className="mt-6">
          Nuestros servicios incluyen sistemas a medida, integración de
          herramientas, automatización, inteligencia artificial y trazabilidad.
          El alcance se construye contigo, según tus necesidades.
        </P>
      </div>
    </section>
  )
}
