import Link from "next/link"
import { H2 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { CookieSettingsButton } from "@/components/marketing/consent"

export function Policy() {
  return (
    <div className="container-screen-lg space-y-12 py-20 sm:py-28">
      <section>
        <H2>Lo necesario</H2>
        <P>
          Conservamos tu elección en el almacenamiento local del navegador bajo
          la clave qoritum:consent:v1, por hasta 180 días. No contiene los datos
          que escribes en el formulario. Otras funciones del alojamiento pueden
          utilizar recursos técnicos necesarios para entregar la web.
        </P>
      </section>
      <section>
        <H2>Analítica</H2>
        <P>
          Si la autorizas, Google Analytics puede medir páginas visitadas,
          interacciones y el origen de campañas. Puede utilizar identificadores
          como _ga. La duración y los identificadores concretos dependen de la
          configuración del proveedor.
        </P>
      </section>
      <section>
        <H2>Publicidad</H2>
        <P>
          Si la autorizas, Meta Pixel y TikTok Pixel pueden medir visitas e
          interacciones para atribuir campañas y crear audiencias. Entre sus
          identificadores pueden aparecer _fbp, _fbc, _ttp o ttcsid. Los
          detalles y la duración dependen de cada proveedor.
        </P>
      </section>
      <section>
        <H2>Cambiar tu elección</H2>
        <P>
          No cargamos estos scripts antes de tu autorización. Al retirar una
          categoría eliminamos los identificadores propios accesibles de
          medición y recargamos el sitio para descargar los scripts que ya
          estaban activos. También puedes borrar cookies y almacenamiento desde
          tu navegador.
        </P>
        <CookieSettingsButton />
      </section>
      <P>
        Consulta también nuestra{" "}
        <Link
          href="/privacy"
          className="text-primary underline underline-offset-4"
        >
          información de privacidad
        </Link>
        .
      </P>
    </div>
  )
}
