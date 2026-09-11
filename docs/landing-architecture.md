# Arquitectura

La estructura usa una carpeta por funcionalidad, sin subcarpetas para separar artificialmente componentes y hooks.

```text
app/
  (landing)/         Página y secciones de presentación
  privacy/page.tsx   Información de privacidad
  cookies/page.tsx   Información de cookies
  layout.tsx        Fuentes, metadatos, footer y medición
  robots.ts
  sitemap.ts
  opengraph-image.tsx
  icon.svg
components/
  services/         Datos/tipos, lista, showcase, contexto y hooks juntos
  results/          Datos/tipos, imágenes, panel y hook de scroll juntos
  contact/          Formulario, campo compartido, esquema y hook juntos
  marketing/        Consentimiento y carga/medición de proveedores
  typography/       H1, H2, H3 y P: escala tipográfica compartida
  ui/               Componentes shadcn del proyecto
  footer.tsx        Footer compartido entre todas las páginas
hooks/              Solo hooks reutilizados entre funcionalidades
lib/
  site.ts           Identidad, contacto, dominio y navegación
  seo.ts            Constructor de metadatos y datos estructurados
  marketing.ts      IDs públicos, consentimiento y contrato de eventos
  utils.ts
public/images/      Fotografías de Results
tests/              Validación y pruebas de configuración
docs/               Guías de arquitectura y activación
```

## Dónde editar

- **Datos de Qoritum:** `lib/site.ts`. Contacto, footer y SEO consumen la misma fuente.
- **Servicios:** `components/services/services.data.ts` contiene datos y tipo. `SCROLL_STEP` en `services-root.tsx` controla el recorrido; `use-service-list-scroll.ts`, la animación de la lista. La medición y la selección se gestionan por separado.
- **Results:** `components/results/results.data.ts` contiene imágenes, textos y enlaces. `use-results-scroll.ts` contiene `SCROLL_PACE` y `EDGE_PAUSE`. El panel ocupa la pantalla y la franja no tiene un ancho máximo. No usa un carrusel.
- **Formulario:** `contact-schema.ts` contiene Zod y opciones. `use-contact-form.ts` gestiona estado, foco y validación. `contact-field.tsx` evita repetir etiquetas y errores. La API sigue pendiente.
- **Teléfono reutilizable:** `components/ui/phone-input.tsx`, con shadcn, banderas SVG, buscador y formato internacional. No modifica los tamaños base de los controles.
- **Footer:** `components/footer.tsx`. Servicios y navegación se obtienen de sus datos existentes. Las redes se muestran solo cuando sus URLs están configuradas.
- **Marketing:** `consent.tsx` contiene el proveedor y las preferencias. `tracking.tsx` contiene carga de SDKs, páginas vistas y eventos. No se repite código de seguimiento en cada sección: los enlaces usan atributos `data-track`.

## Comprobaciones

```sh
npm run build
npm run typecheck
node --experimental-strip-types --test tests/*.test.mjs
```

La guía de activación está en [seo-and-marketing.md](./seo-and-marketing.md).


## Movimiento y recursos gr?ficos

- `components/typography/word-reveal.tsx` es la ?nica implementaci?n del revelado por palabras. Act?valo con `<H2 reveal>Texto</H2>` o `<P reveal>Texto</P>`; tambi?n funciona con H1/H3, saltos `<br />` y spans de color. No cambia la escala tipogr?fica. Usa m?scaras y desplazamiento vertical, sin opacidad ni desenfoque. Se ejecuta una vez al entrar en pantalla; conserva el texto renderizado en servidor y legible sin JavaScript. No lo apliques a etiquetas del formulario ni a componentes interactivos dentro del texto.
- Ajusta duraci?n (820 ms), escalonado (42 ms, m?ximo acumulado 420 ms) y curva en `word-reveal.tsx`. Los m?rgenes de las m?scaras en `app/globals.css` conservan acentos y descendentes.
- `components/smooth-scroll.tsx` monta una sola instancia de `ReactLenis` desde `lenis/react`. Comparte el reloj de Motion, mantiene el gesto t?ctil nativo y permite scroll anidado. `lerp` controla la suavidad. No a?adas `scroll-behavior: smooth` global ni otro bucle requestAnimationFrame.
- `hooks/use-page-scroll.ts` centraliza los saltos program?ticos para Services y Results. Los enlaces de ancla los gestiona Lenis. Los di?logos de Radix conservan el bloqueo del scroll de fondo.
- `components/isometric-art.tsx` contiene geometr?as SVG originales, inspiradas en el lenguaje visual de [Book of Shapes](https://bookofshapes.com/?tag=isometric), sin descargar sus recursos. Variantes `stack`, `bridge` y `field`; edita `structures` para las coordenadas y `className` para color/tama?o. Se reutilizan en Hero, About y footer. El desplazamiento depende del scroll, sin animaciones infinitas ni v?deos.
- Con `prefers-reduced-motion`, el texto aparece directamente, los gr?ficos quedan est?ticos y el desplazamiento es nativo. Results mantiene su alternativa de scroll horizontal manual.

Referencia de integraci?n: [Lenis para React](https://github.com/darkroomengineering/lenis/tree/main/packages/react).

## M?tricas y fondos parciales

- `app/(landing)/metrics.tsx`: secci?n inmediatamente despu?s de Results. El arreglo `METRICS` contiene los tres valores y textos proporcionados en el dise?o; revisar estas afirmaciones comerciales antes de publicar si cambian los resultados del negocio.
- `components/animated-number.tsx`: contador con Motion, activado una sola vez al entrar en pantalla. Conserva el valor final en servidor y para lectores de pantalla, reserva el ancho y respeta movimiento reducido.
- `components/section-backdrop.tsx`: fondo decorativo compartido, con `pattern="grid" | "dots"` y `shape="stack" | "bridge" | "field"`. Reutiliza IsometricArt; las m?scaras, opacidad y recorte delimitan el dibujo. El padre requiere `relative isolate`; los fondos no interceptan eventos. Se usa en las tarjetas About, m?tricas y parte superior del footer.
- Los patrones CSS viven en `app/globals.css`; los colores y la posici?n se ajustan con `className`. No hay nuevas librer?as ni im?genes externas.
