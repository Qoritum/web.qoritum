import { Mail, MessageCircle } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import { H2 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { site } from "@/lib/site"

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
        <ul className="mt-10 flex flex-col gap-7 lg:mt-14">
          <li>
            <a
              href={site.whatsapp}
              data-track="contact_click"
              data-channel="whatsapp"
              target="_blank"
              rel="noreferrer"
              className="group flex w-fit items-center gap-5 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary"
            >
              <MessageCircle
                strokeWidth={1.5}
                className="size-7 shrink-0 transition-colors group-hover:text-primary"
              />
              <div className="flex flex-col gap-2">
                <P className="font-mono">Escríbenos</P>
                <P className="transition-colors group-hover:text-primary">
                  {site.phoneDisplay}
                </P>
              </div>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              data-track="contact_click"
              data-channel="email"
              className="group flex w-fit items-center gap-5 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary"
            >
              <Mail
                strokeWidth={1.5}
                className="size-7 shrink-0 transition-colors group-hover:text-primary"
              />
              <div className="flex flex-col gap-2">
                <P className="font-mono">Correo corporativo</P>
                <P className="transition-colors group-hover:text-primary">
                  {site.email}
                </P>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <ContactForm />
    </section>
  )
}
