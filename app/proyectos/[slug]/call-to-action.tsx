import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { H2 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section
      className="relative bg-background-2 py-16 text-white"
      data-mode="dark"
    >
      <div className="group/dark container-screen-2xl flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <H2 reveal>¿Un reto parecido en tu empresa?</H2>
          <P>Definamos una primera mejora para tu operación.</P>
        </div>
        <Button asChild>
          <Link href="/contactanos">
            Conversemos <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  )
}
