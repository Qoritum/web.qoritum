import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { H2 } from "@/components/typography/heading"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="container-screen-2xl flex flex-col items-start justify-between gap-8 border-t py-16 lg:flex-row lg:items-center">
      <H2 reveal className="max-w-3xl">
        Convirtamos tu siguiente reto en un proyecto.
      </H2>
      <Button asChild>
        <Link href="/proyectos">
          Explorar proyectos <ArrowUpRight />
        </Link>
      </Button>
    </section>
  )
}
