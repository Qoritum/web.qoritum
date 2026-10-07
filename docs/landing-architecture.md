# Arquitectura

La web sigue el mismo patrón que `(landing)`: `page.tsx` compone las secciones, y cada sección vive a su lado. No hay carpetas `sections/`, `hooks/` o `utils/` dentro de cada ruta.

Los componentes reutilizables y las funcionalidades con varios componentes y hooks propios viven en `components`. Sus hooks específicos se mantienen junto a ellos. Los datos y funciones compartidos viven en `lib`; los hooks generales, en `hooks`.

```text
app/
  (landing)/        page, hero, about, services, results, metrics, faq, contact
  nosotros/         page, hero, overview, purpose, principles, call-to-action
  servicios/        page, hero, solutions, catalog, service-detail, approach, call-to-action
  contactanos/      page, hero, inquiry
  proyectos/        page, hero, catalog, explorer (client)
    [slug]/         page, hero, body, call-to-action, related
  privacy/          page, hero, policy
  cookies/          page, hero, policy
  layout.tsx        Fuentes, metadatos y composición global
  robots.ts
  sitemap.ts
  opengraph-image.tsx
  favicon.ico
components/
  layout/           Header, navegación, barra compartida, footer, logo y Lenis
                    use-header-scroll junto al header
  services/         Lista interactiva, showcase, contexto y hook de scroll
  results/          Tipos, imágenes, panel y hook de scroll juntos
  contact/          Formulario, campo compartido, esquema y hook juntos
  projects/         Tarjetas compartidas y renderizador MDX del servidor
  marketing/        Consentimiento y carga/medición de proveedores
  typography/       H1, H2, H3 y P: escala tipográfica compartida
  ui/               Componentes shadcn del proyecto
  page-intro.tsx    Imagen, título y breadcrumb compartidos
  structured-data.tsx Serializador JSON-LD compartido
  section-backdrop.tsx, isometric-art.tsx, animated-number.tsx
hooks/              Solo hooks reutilizados entre funcionalidades
lib/
  site.ts           Identidad, contacto, dominio y navegación
  company.ts        Misión, visión, principios e imágenes
  services.ts       Catálogo, tipos y contenido detallado de servicios
  projects.ts       Lectura y selección de MDX; server-only
  project-content.ts Validación y tipos del contenido
  project-filters.ts Filtrado sin acceso al servidor
  seo.ts            Constructor de metadatos y datos estructurados
  marketing.ts      IDs públicos, consentimiento y contrato de eventos
  utils.ts
content/projects/   Proyectos MDX y borradores, fuera de public
public/images/      Logos y fotografías
tests/              Validación y pruebas de configuración
docs/               Guías de arquitectura y activación
```

## Dónde editar

- **Datos de Qoritum:** `lib/site.ts`. Contacto, footer y SEO consumen la misma fuente.
- **Páginas:** edita el bloque correspondiente junto a su `page.tsx`. Ese archivo conserva metadatos, carga de datos del servidor y el orden de las secciones. Las secciones son componentes de servidor salvo las interacciones que ya requerían cliente.
- **Servicios:** `lib/services.ts` es la fuente única para landing, página de servicios, footer y SEO. `app/servicios/service-detail.tsx` pertenece al catálogo de esa página. `SCROLL_STEP` en `components/services/services-root.tsx` controla el recorrido de la landing; `use-service-list-scroll.ts`, la animación de la lista.
- **Results:** obtiene imágenes, textos y enlaces de los destacados en `content/projects` mediante `lib/projects.ts`. `results.data.ts` contiene solo el tipo del panel. `use-results-scroll.ts` contiene `SCROLL_PACE` y `EDGE_PAUSE`. El panel ocupa la pantalla y la franja no tiene un ancho máximo. No usa un carrusel.
- **Formulario:** `contact-schema.ts` contiene Zod y opciones. `use-contact-form.ts` gestiona estado, foco y validación. `contact-field.tsx` evita repetir etiquetas y errores. La API sigue pendiente.
- **Teléfono reutilizable:** `components/ui/phone-input.tsx`, con shadcn, banderas SVG, buscador y formato internacional. No modifica los tamaños base de los controles.
- **Footer:** `components/layout/footer.tsx`. Servicios y navegación se obtienen de sus datos existentes. Las redes se muestran solo cuando sus URLs están configuradas.
- **Header y menú:** `components/layout/header.tsx` compone la marca, CTA y `navigation.tsx`. `header-bar.tsx` comparte ancho y espaciado entre header y menú. `use-header-scroll.ts` contiene los umbrales y la dirección del movimiento; permanece junto al componente que lo usa.
- **Proyectos:** `app/proyectos/explorer.tsx` contiene los filtros de esa página y se monta dentro del Suspense de `catalog.tsx`. Las tarjetas y el MDX siguen compartidos en `components/projects`. `getRelatedProjects` y `getFeaturedProjects` en `lib/projects.ts` centralizan la selección.
- **SEO:** `lib/seo.ts` construye metadatos y datos estructurados de web y proyectos. `components/structured-data.tsx` conserva un único serializador JSON-LD con escape de HTML.
- **Marketing:** `consent.tsx` contiene el proveedor y las preferencias. `tracking.tsx` contiene carga de SDKs, páginas vistas y eventos. No se repite código de seguimiento en cada sección: los enlaces usan atributos `data-track`.

## Comprobaciones

```sh
npm run build
npm run typecheck
node --experimental-strip-types --test tests/*.test.mjs
```

La guía de activación está en [seo-and-marketing.md](./seo-and-marketing.md).

Las nuevas páginas, el diagnóstico y la publicación de MDX se explican en [projects-and-pages.md](./projects-and-pages.md).


## Movimiento y recursos gráficos

- `components/typography/word-reveal.tsx` contiene el revelado por palabras. Actívalo con `<H2 reveal>Texto</H2>` o `<P reveal>Texto</P>`; también funciona con H1/H3, `<br />` y spans de color. Usa máscaras y desplazamiento vertical, conserva el texto del servidor y respeta movimiento reducido.
- Ajusta duración (820 ms), escalonado (42 ms, máximo acumulado 420 ms) y curva en `word-reveal.tsx`. Los márgenes de las máscaras conservan acentos y descendentes.
- `components/layout/smooth-scroll.tsx` monta una sola instancia de `ReactLenis`. Comparte el reloj de Motion, conserva el gesto táctil nativo y permite scroll anidado. `lerp` controla la suavidad; evita otro bucle requestAnimationFrame.
- `hooks/use-page-scroll.ts` centraliza los saltos de Services y Results. Lenis gestiona anclas; los diálogos de Radix conservan el bloqueo del fondo.
- `components/isometric-art.tsx` contiene geometrías SVG originales inspiradas en [Book of Shapes](https://bookofshapes.com/?tag=isometric). Variantes `stack`, `bridge` y `field`; `structures` define las coordenadas y `className` el color/tamaño. El movimiento depende del scroll.
- Con movimiento reducido, texto y gráficos quedan estáticos y el scroll es nativo. Results permite desplazamiento horizontal manual.

Referencia de integración: [Lenis para React](https://github.com/darkroomengineering/lenis/tree/main/packages/react).

## Métricas y fondos parciales

- `app/(landing)/metrics.tsx`: sección después de Results. `METRICS` contiene los valores y textos del diseño.
- `components/animated-number.tsx`: contador con Motion, activado una sola vez al entrar en pantalla. Conserva el valor final en servidor y para lectores de pantalla, reserva el ancho y respeta movimiento reducido.
- `components/section-backdrop.tsx`: fondo decorativo compartido, con `pattern="grid" | "dots"` y `shape="stack" | "bridge" | "field"`. Reutiliza IsometricArt; máscaras y recorte delimitan el dibujo. El padre requiere `relative isolate`; el fondo no intercepta eventos.
- Los patrones CSS viven en `app/globals.css`; colores y posición se ajustan con `className`.
