import Link from "next/link"
import { ArrowUpRight, ArrowUp, Mail, MessageCircle, Phone } from "lucide-react"
import { H2, H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { Button } from "@/components/ui/button"
import { SERVICES } from "@/components/services/services.data"
import { CookieSettingsButton } from "@/components/marketing/consent"
import { site, navigation, socialLinks } from "@/lib/site"
import { SectionBackdrop } from "@/components/section-backdrop"

const footerLink =
  "py-1 text-white/65 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"

export function Footer() {
  return (
    <footer
      data-mode="dark"
      className="group/dark relative isolate overflow-hidden bg-background-2 text-white"
    >
      <SectionBackdrop
        pattern="grid"
        shape="field"
        className="bottom-auto left-1/2 h-96 text-primary"
      />
      <div className="relative container-screen-2xl">
        <div className="grid items-end gap-8 border-b border-white/15 py-16 sm:py-20 lg:grid-cols-[1fr_auto]">
          <div>
            <P className="mb-5 font-mono text-primary group-data-[mode='dark']/dark:text-primary">
              El siguiente paso empieza aquí.
            </P>
            <H2 reveal className="mb-0 max-w-4xl">
              Hagamos que tu operación avance.
            </H2>
          </div>
          <Button asChild>
            <Link href="/#contacto">
              Conversemos <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-x-10 gap-y-12 py-14 sm:grid-cols-2 xl:grid-cols-[1.2fr_1.3fr_.8fr_1.1fr]">
          <div>
            <Link
              href="/"
              aria-label="Qoritum, inicio"
              className="inline-block focus-visible:outline-2 focus-visible:outline-primary"
            >
              <H3>
                qoritum<span className="text-primary">.</span>
              </H3>
            </Link>
            <P className="max-w-sm">
              Entendemos primero. Digitalizamos después. Software,
              automatización y datos al servicio de tu negocio.
            </P>
            <div className="mt-6 flex items-center gap-3">
              <span aria-hidden="true" className="size-2 bg-primary" />
              <P>Una primera mejora medible.</P>
            </div>
            {socialLinks.length > 0 && (
              <nav
                aria-label="Redes sociales"
                className="mt-6 flex flex-wrap gap-x-4 gap-y-2"
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={footerLink}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </nav>
            )}
          </div>
          <nav aria-label="Servicios en el footer">
            <P className="mb-5 font-mono text-white group-data-[mode='dark']/dark:text-white">
              Soluciones
            </P>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href="/#servicios" className={footerLink}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Navegación del footer">
            <P className="mb-5 font-mono text-white group-data-[mode='dark']/dark:text-white">
              Explora Qoritum
            </P>
            <ul className="space-y-2">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <P className="mb-5 font-mono text-white group-data-[mode='dark']/dark:text-white">
              Hablemos de tu proyecto
            </P>
            <ul className="space-y-5">
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  data-track="contact_click"
                  data-channel="whatsapp"
                  className={`${footerLink} flex items-center gap-3`}
                >
                  <MessageCircle className="size-5 shrink-0" />
                  Escríbenos por WhatsApp{" "}
                  <ArrowUpRight className="size-4 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  data-track="contact_click"
                  data-channel="phone"
                  className={`${footerLink} flex items-center gap-3`}
                >
                  <Phone className="size-5 shrink-0" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-track="contact_click"
                  data-channel="email"
                  className={`${footerLink} flex items-center gap-3 break-all`}
                >
                  <Mail className="size-5 shrink-0" />
                  {site.email}
                </a>
              </li>
            </ul>
            <P className="mt-6">
              Cuéntanos cómo funciona hoy. Encontraremos juntos el primer paso.
            </P>
          </div>
        </div>
        <div className="flex flex-col gap-5 border-t border-white/15 py-6 lg:flex-row lg:items-center lg:justify-between">
          <P>
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </P>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy" className={footerLink}>
              Privacidad
            </Link>
            <Link href="/cookies" className={footerLink}>
              Cookies
            </Link>
            <CookieSettingsButton />
            <Link
              href="/#inicio"
              className={`${footerLink} inline-flex items-center gap-2`}
            >
              Volver al inicio <ArrowUp className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
