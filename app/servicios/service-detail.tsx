import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { H2, H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { Button } from "@/components/ui/button"
import { SectionBackdrop } from "@/components/section-backdrop"
import { cn } from "@/lib/utils"
import { SERVICE_DETAILS, type ServiceItem } from "@/lib/services"

export function ServiceDetail({
  service,
  index,
}: {
  service: ServiceItem
  index: number
}) {
  const detail = SERVICE_DETAILS[service.id]
  const dark = index % 3 === 1
  return (
    <section
      id={service.id}
      data-mode={dark ? "dark" : "light"}
      className={cn(
        "group/dark relative isolate scroll-mt-8 overflow-hidden border-t py-16 sm:py-24",
        dark && "border-white/15 bg-background-2 text-white"
      )}
    >
      <SectionBackdrop
        shape={index % 2 ? "bridge" : "field"}
        pattern="dots"
        className="left-1/2"
      />
      <div className="container-screen-2xl grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <figure className={cn("relative", index % 2 === 1 && "lg:order-2")}>
          <div className="group relative overflow-hidden">
            <Image
              src={service.image}
              alt={detail.imageAlt}
              width={1000}
              height={1200}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none lg:aspect-[4/5]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background-2/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <P className="mb-3 font-mono text-primary group-data-[mode='dark']/dark:text-primary">
                Solución / {String(index + 1).padStart(2, "0")}
              </P>
              <P className="max-w-md text-white group-data-[mode='dark']/dark:text-white">
                {service.tagline}
              </P>
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-xs opacity-50">
            Imagen ilustrativa del trabajo y la colaboración.
          </figcaption>
        </figure>
        <div className="lg:py-6">
          <P className="mb-6 font-mono text-primary group-data-[mode='dark']/dark:text-primary">
            De la necesidad a la solución
          </P>
          <H2 reveal>{service.title}</H2>
          <P reveal>{detail.description}</P>
          <div className="mt-10 border-t border-current/15 pt-8">
            <H3 reveal>Qué podemos construir.</H3>
            <ul className="mt-6 space-y-5">
              {detail.deliverables.map((item) => (
                <li key={item} className="flex gap-4">
                  <Check
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-primary"
                  />
                  <P>{item}</P>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 border-l-2 border-primary pl-6">
            <P className="mb-3 font-mono text-primary group-data-[mode='dark']/dark:text-primary">
              Un primer paso
            </P>
            <P>{detail.firstStep}</P>
          </div>
          <Button asChild className="mt-10">
            <Link
              href="/contactanos"
              data-track="select_service"
              data-service={service.id}
            >
              Hablemos de esta solución <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
