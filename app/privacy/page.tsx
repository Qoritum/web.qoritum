import Link from "next/link"
import { H1, H2 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"
import { CookieSettingsButton } from "@/components/marketing/consent"

export const metadata = pageMetadata(
  "Privacidad",
  "Información sobre el uso de datos de contacto, medición y preferencias de privacidad en Qoritum.",
  "/privacy"
)

export default function PrivacyPage() {
  return (
    <main
      id="main-content"
      className="container-screen-lg space-y-12 py-20 sm:py-28"
    >
      <div>
        <Link
          href="/"
          className="mb-8 inline-block text-primary underline underline-offset-4"
        >
          ← Volver a Qoritum
        </Link>
        <H1>Privacidad</H1>
        <P>
          Esta página describe cómo funciona actualmente el sitio de {site.name}{" "}
          y qué puedes controlar.
        </P>
      </div>
      <section>
        <H2>Contacto y consultas</H2>
        <P>
          Los datos que escribes en el formulario se validan en tu navegador.
          Actualmente el formulario no los envía a un servidor ni los guarda
          para una visita posterior. Si eliges contactarnos por correo, teléfono
          o WhatsApp, compartes tu consulta a través del servicio
          correspondiente.
        </P>
        <P className="mt-4">
          Utilizamos las consultas que recibimos para responderte y conversar
          sobre los servicios solicitados. Evita incluir contraseñas, datos de
          pago o información sensible en tu mensaje.
        </P>
      </section>
      <section>
        <H2>Medición opcional</H2>
        <P>
          Con tu autorización, el sitio puede cargar Google Analytics para medir
          visitas e interacciones, y los píxeles de Meta y TikTok para medir
          campañas publicitarias. Estas herramientas pueden tratar información
          del navegador, identificadores, dirección IP y páginas visitadas según
          sus políticas.
        </P>
        <P className="mt-4">
          Nuestros eventos personalizados no incluyen nombres, correos, números
          de teléfono ni el texto del formulario. La validación local del
          formulario no se registra como una consulta enviada.
        </P>
      </section>
      <section>
        <H2>Tus preferencias</H2>
        <P>
          Puedes rechazar la medición opcional y continuar navegando. Guardamos
          tu elección en este navegador durante un máximo de 180 días. Puedes
          revisarla o retirarla aquí; al desactivar una categoría recargamos la
          página para detener sus scripts.
        </P>
        <CookieSettingsButton />
      </section>
      <section>
        <H2>Servicios externos</H2>
        <P>
          Los enlaces externos y los proveedores de medición tienen sus propias
          condiciones y políticas. Algunas imágenes de servicios se cargan desde
          un proveedor externo; al solicitarlas, ese proveedor recibe los datos
          técnicos necesarios para entregar la imagen.
        </P>
        <ul className="mt-4 space-y-3">
          {[
            { name: "Google", url: "https://policies.google.com/privacy" },
            { name: "Meta", url: "https://www.facebook.com/privacy/policy/" },
            {
              name: "TikTok",
              url: "https://www.tiktok.com/legal/page/row/privacy-policy/es",
            },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Política de privacidad de {item.name} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <H2>Escríbenos</H2>
        <P>
          Para consultar por el tratamiento de una comunicación que nos hayas
          enviado o solicitar su actualización o eliminación, escribe a{" "}
          <a href={`mailto:${site.email}`} className="text-primary underline">
            {site.email}
          </a>
          .
        </P>
      </section>
    </main>
  )
}
