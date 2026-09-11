# SEO y medición de Qoritum

## Estado y configuración

El código está preparado; registrar propiedades y verificar cuentas requiere el dominio definitivo y los identificadores del propietario. No se crean cuentas ni se envía automáticamente el sitemap a Google.

Copia `.env.example` a `.env.local` para desarrollo y configura las mismas variables en el alojamiento. No publiques credenciales privadas. Los IDs de GA4 y píxeles son públicos; los tokens de Conversions API o Events API no deben llevar `NEXT_PUBLIC_`.

| Variable | Valor esperado |
| --- | --- |
| SITE_URL | Origen HTTPS definitivo, sin rutas, query ni fragmento |
| SITE_INDEXABLE | `true` solo cuando la web pública esté lista |
| GOOGLE_SITE_VERIFICATION | Solo el atributo `content` de la etiqueta de Search Console |
| BING_SITE_VERIFICATION | Verificación opcional de Bing |
| META_DOMAIN_VERIFICATION | Solo el `content` de facebook-domain-verification |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | ID de flujo web GA4, formato G-… |
| NEXT_PUBLIC_META_PIXEL_ID | ID numérico del píxel |
| NEXT_PUBLIC_TIKTOK_PIXEL_ID | ID del píxel web de TikTok |
| SOCIAL_*_URL | URLs HTTPS reales de la empresa; vacías si no existen |

`SITE_URL=https://qoritum.com` en el ejemplo es una referencia basada en el correo existente: confirma el dominio antes de usarlo. Las variables se aplican al compilar; vuelve a ejecutar `npm run build` y despliega tras modificarlas.

Sin dominio o sin `SITE_INDEXABLE=true`, se genera `noindex`, robots bloqueado y sitemap vacío. Es una protección para desarrollo y versiones no terminadas. Para publicar, configura las dos variables y confirma el HTML y `robots.txt` del dominio real.

## SEO implementado

- Títulos y descripciones específicos para inicio, privacidad y cookies.
- Canonical por página, sin parámetros de campañas.
- Open Graph y Twitter Card con imagen propia de 1200 × 630 en `/opengraph-image`.
- Identidad, idioma español, favicon propio y atributos de rastreo.
- `/robots.txt` y `/sitemap.xml` con URLs reales; no se incluyen anchors como si fueran páginas independientes.
- JSON-LD en inicio: Organization, WebSite, WebPage y catálogo de servicios. No se inventan dirección, reseñas, puntuaciones ni perfiles sociales.
- FAQ con contenido visible real, sin Lorem ipsum. No se promete un resultado enriquecido en Google.
- Enlaces internos funcionales, salto al contenido y footer compartido.
- Configuración central en `lib/site.ts`; construcción común de metadatos en `lib/seo.ts`.

No se han creado páginas falsas de servicios, hreflang para traducciones inexistentes ni etiquetas que prometan posicionamiento.

## Google Search Console

1. Crea la propiedad para el dominio real.
2. Para una propiedad de dominio, utiliza la verificación DNS que Google indique. Para una propiedad de prefijo de URL, puedes usar la etiqueta HTML e introducir su contenido en `GOOGLE_SITE_VERIFICATION`.
3. Despliega; comprueba `google-site-verification` en el HTML de inicio y completa la verificación en Search Console.
4. Envía `https://TU-DOMINIO/sitemap.xml`.
5. Inspecciona inicio, privacidad y cookies. Revisa canonical, indexabilidad y rastreo.

Los métodos de verificación y la propiedad deben corresponder al sitio registrado. [Documentación de Google](https://support.google.com/webmasters/answer/9008080).

## Google Analytics 4

1. Crea o selecciona el flujo web e introduce su ID G-… en `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
2. En Medición mejorada, desactiva los eventos de páginas basados en cambios del historial y las interacciones automáticas de formularios: aquí se gestionan manualmente.
3. Autoriza Analítica desde las preferencias de cookies.
4. Comprueba la visita en Tiempo real y los eventos con Tag Assistant/DebugView.
5. Marca `generate_lead` como evento clave solamente cuando exista un envío real confirmado por la API.

`send_page_view:false` evita el envío inicial automático; las páginas se registran una vez por navegación desde el router. Google advierte que la medición mejorada por historial puede duplicar eventos aunque se use esa opción. [Documentación de pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views).

Se usa consentimiento básico: no se descarga GA antes de autorizar Analítica. Las opciones de publicidad y Google Signals quedan desactivadas en GA. [Documentación de consentimiento](https://developers.google.com/tag-platform/security/guides/consent).

## Meta y TikTok

- Configura los IDs de píxel y verifica el dominio en el administrador correspondiente.
- Meta admite la etiqueta `facebook-domain-verification` preparada en los metadatos.
- Los píxeles se cargan únicamente al autorizar Publicidad; no hay píxeles noscript que eviten esta elección.
- En Meta se desactiva autoConfig desde el código. Revisa también que la coincidencia avanzada automática y las reglas de eventos automáticos no recopilen campos del formulario.
- En TikTok usa instalación por código personalizado. Revisa sus opciones automáticas en Events Manager y evita reglas del Event Builder que dupliquen los eventos del sitio.
- Verifica con Meta Pixel Helper, TikTok Pixel Helper y las herramientas de eventos de prueba de cada cuenta.
- No se han añadido tokens privados, llamadas a Conversions API o TikTok Events API: eso corresponde al backend futuro.

TikTok define eventos como ViewContent y SubmitForm; este último se reserva para una confirmación real. [Eventos oficiales de TikTok](https://ads.tiktok.com/resources/help/article/standard-events-parameters?lang=en).

## Contrato de eventos

| Acción | GA4 | Meta | TikTok |
| --- | --- | --- | --- |
| Visita/navegación | page_view | PageView | page |
| Selección de servicio | select_service | ViewContent | ViewContent |
| Clic en WhatsApp, email o teléfono | contact_click | ContactLinkClick, personalizado | ContactLinkClick, personalizado |
| Primer foco en el formulario | form_start | No se envía | No se envía |
| Formulario validado localmente | form_validated | No se envía | No se envía |
| Futuro envío confirmado por API | generate_lead | Lead | SubmitForm |

Los clics de contacto expresan intención; no prueban que se haya enviado un mensaje. El formulario actual nunca dispara `generate_lead`.

Los parámetros propios se limitan a canal, ID de servicio, ID de formulario y un ID de evento. No se envían nombres, correos, teléfonos ni texto libre. GA recibe URLs sin query o fragmento y solo admite los parámetros UTM previstos con formato limitado. Los SDKs publicitarios pueden recopilar información técnica de la visita según su propia configuración; evita introducir datos personales en URLs o campañas.

Para el backend futuro:

```ts
// SOLO después de recibir confirmación del servidor.
// Usa el mismo ID en el evento de servidor para evitar duplicados.
trackEvent("generate_lead", { form_id: "contact", event_id: confirmedEventId })
```

## Consentimiento

Las categorías Analítica y Publicidad son independientes y están apagadas inicialmente. La preferencia se guarda por hasta 180 días. Al retirarla se limpian identificadores accesibles y se recarga la página para descargar los SDKs activos. Las otras pestañas reciben el cambio.

No se pueden borrar cookies de dominios de terceros desde este sitio; el navegador permite gestionarlas. La información de privacidad describe el funcionamiento actual y debe actualizarse cuando se conecte el backend o cambien los proveedores.

## Antes de publicar

Comprueba el dominio y correo definitivos, perfiles sociales, metadatos, image OG, sitemap, robots, preferencias y eventos con las cuentas reales. Sustituye las imágenes de referencia de servicios por material definitivo. Este trabajo prepara el SEO técnico y la medición; no confirma propiedad de cuentas, recepción de eventos externos ni indexación.

