import { ServicesNav } from "@/components/services/services-nav"
import { ServicesShowcase } from "@/components/services/services-showcase"
import { ServicesRoot } from "@/components/services/services-root"
import { SERVICES } from "@/lib/services"
import { P } from "@/components/typography/description"

export function Services() {
  return (
    <ServicesRoot services={SERVICES}>
      <div className="pointer-events-none relative z-40 container-screen-2xl grid h-full min-h-0 grid-cols-1 pb-[36svh] lg:grid-cols-2 lg:pb-10">
        <div className="pointer-events-auto flex min-h-0 flex-col lg:pr-10 xl:pr-16">
          <P className="mb-4 flex shrink-0 items-center gap-3 pt-6 opacity-40 sm:pt-10 lg:mb-6">
            <span className="h-0.5 w-9 bg-background-2-foreground" />
            Servicios
          </P>
          <ServicesNav />
        </div>
      </div>
      <ServicesShowcase />
    </ServicesRoot>
  )
}
