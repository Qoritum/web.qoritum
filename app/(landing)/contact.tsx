import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ContactLinks } from "@/components/contact/contact-links"
import { ContactForm } from "@/components/contact/contact-form"
import { H2 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="container-screen-2xl grid scroll-mt-8 gap-12 py-20 sm:py-28 lg:grid-cols-[.6fr_1fr] lg:gap-20 lg:py-36"
    >
      <div>
        <P className="mb-8 flex items-center gap-3 font-mono text-foreground/45">
          <span className="h-px w-6 bg-current" />
          01 · Contáctanos
        </P>
        <H2 reveal id="contact-heading" className="max-w-lg">
          Cuéntanos cómo funciona hoy.
        </H2>
        <P className="mt-5 max-w-sm">
          De esa conversación sale la primera oportunidad concreta. Tu próxima
          mejora puede empezar esta semana.
        </P>
        <div className="mt-10 lg:mt-14">
          <ContactLinks />
        </div>
        <Button asChild variant="outline" className="mt-10">
          <Link href="/contactanos">Ayúdame a definir mi proyecto</Link>
        </Button>
      </div>
      <ContactForm />
    </section>
  )
}
