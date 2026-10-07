# Páginas, proyectos y consultas

## Dónde editar

Cada `page.tsx` declara metadatos, obtiene los datos necesarios y compone secciones del mismo directorio, siguiendo el patrón de `(landing)`. Los archivos de sección no crean rutas nuevas. Los nombres de las URLs se mantienen.

- `/nosotros`: `hero.tsx`, `overview.tsx`, `purpose.tsx`, `principles.tsx` y `call-to-action.tsx`. Misión, visión, principios e imágenes en `lib/company.ts`. El texto es una propuesta editorial basada en los servicios existentes; reemplázalo por la versión aprobada de la empresa. Las fotos actuales son ilustrativas.
- `/contactanos`: contacto directo y diagnóstico de cuatro pasos. `components/contact/inquiry-schema.ts` contiene preguntas, opciones, validación y recomendaciones. `inquiry-flow.tsx` reutiliza `ContactForm` y los controles existentes.
- `/proyectos`: `hero.tsx` y `catalog.tsx` componen el listado. `explorer.tsx` contiene la búsqueda por texto, solución y sector. Los filtros quedan en la URL y se pueden compartir; el texto de búsqueda no se envía a Analytics.
- `/proyectos/[slug]`: `hero.tsx`, `body.tsx`, `call-to-action.tsx` y `related.tsx`. El controlador conserva los parámetros asíncronos y la generación estática; metadatos y JSON-LD se construyen en `lib/seo.ts`.
- `/servicios`: índice de siete soluciones, bloques de imagen y contenido detallado, método de trabajo y contacto. `lib/services.ts` comparte los datos de la landing y contiene `SERVICE_DETAILS` con descripción, entregables y primer paso. `service-detail.tsx` reutiliza el diseño para cada solución. Sustituye las fotos ilustrativas por las imágenes aprobadas desde el campo `image`.
- `header.tsx` y la navegación de `lib/site.ts` enlazan las páginas. El header ocupa todo el ancho, sin borde ni contenedor limitado. Es fijo, transparente al inicio y crema al reaparecer sobre contenido. `components/layout/use-header-scroll.ts` usa el scroll de Motion: oculta al bajar y revela al subir, con un umbral de 16 px para evitar saltos y una zona superior de 96 px siempre visible. El CTA y el botón de menú permanecen accesibles en móvil.
- La navegación usa un Dialog de shadcn de pantalla completa con cinco enlaces grandes, correo y teléfono. No incluye imágenes de contenido ni Preguntas frecuentes. La cortina y la salida del texto viven en `app/globals.css`; el revelado reutiliza `WordReveal` con escalonado por enlace. Respeta movimiento reducido y permite scroll interno sin mover el fondo. El tamaño del texto se adapta también a la altura de escritorio.
- `page-intro.tsx` comparte imagen, título, descripción y breadcrumb. Recibe `image: {src, alt, position?}`, `variant="photo" | "split"` y `breadcrumbs` opcionales. Las migas por defecto son Inicio → nombre de sección; los proyectos incluyen el nivel Proyectos. Usa `data-header-tone="light"` para texto y logo claros sobre fotos o `"dark"` sobre fondos claros. El header resuelve el contraste con CSS, también durante navegación entre páginas.
- `brand-logo.tsx` usa las versiones naranja y beige originales de `public/images`. El recorte CSS elimina el margen transparente de los PNG sin modificar los archivos. Se reutiliza en header, navegación y footer.

## Una fuente para los proyectos

```text
content/
  projects/                 Archivos .mdx publicados y borradores
  project-template.mdx      Plantilla; fuera del catálogo
lib/
  project-content.ts        Validación del frontmatter y tipos
  project-filters.ts        Filtrado sin dependencias de servidor
  projects.ts               Descubrimiento/lectura, server-only
components/projects/
  project-card.tsx
  project-mdx.tsx            Renderizado y componentes editoriales
app/proyectos/
  explorer.tsx              Interacción y filtros del listado
  catalog.tsx               Suspense y presentación del listado
scripts/
  project-new.mjs
  project-import.mjs
```

Se leen archivos regulares del primer nivel de `content/projects`; sus nombres forman los slugs. Listado, filtros, detalles, sitemap y Results consumen la misma fuente. La carpeta es privada, fuera de `public`. No hay API, base de datos ni endpoint público de escritura.

## Crear o importar un MDX

Crear un borrador:

```sh
npm run project:new -- mi-proyecto
```

Importar un archivo escrito fuera del repositorio:

```sh
npm run project:import -- "C:/ruta/mi-proyecto.mdx"
```

También puedes colocar el archivo directamente en `content/projects`. Los comandos no sobrescriben archivos existentes. La importación comprueba nombre, metadatos, tamaño y presencia de la portada; la compilación comprueba el MDX publicado.

1. Copia las imágenes a `public/images`.
2. Edita el archivo. `mi-proyecto.mdx` crea `/proyectos/mi-proyecto`; usa minúsculas, números y guiones.
3. Usa `published: true` para publicar y `featured: true` para mostrarlo en Results. Se muestran hasta seis destacados, del más reciente al más antiguo.
4. Comprueba, compila y despliega. La producción recibe los archivos con el despliegue; no hay una subida desde el navegador.

```sh
node --experimental-strip-types --test tests/*.test.mjs
npm run build
```

Los archivos actuales son **conceptos de solución**, no casos de clientes ni resultados verificados. Usa `kind: "case-study"` cuando publiques un caso real autorizado.

## Metadatos

```yaml
title: "Nombre del proyecto"
summary: "Resumen claro del problema y la solución, entre 20 y 300 caracteres."
category: "Software a medida"
sector: "Distribución B2B"
cover: "/images/mi-portada.jpg"
coverAlt: "Descripción de la fotografía"
date: "2026-10-06"
updated: "2026-10-06" # Opcional; fecha de una actualización real
tags: ["ERP", "Integración"]
featured: true
published: false
kind: "concept"
```

Categorías y sectores alimentan los filtros automáticamente. `published` por defecto es `false`; los borradores no tienen rutas ni aparecen en listados. Los errores de metadatos indican el archivo afectado.

## Escribir el cuerpo

Admite encabezados, párrafos, listas, enlaces, citas, código y tablas de Markdown. También:

```mdx
<Callout title="Una decisión importante">
Contenido del recuadro.
</Callout>

<ProjectImage src="/images/mi-imagen.jpg" alt="Descripción de la imagen" caption="Pie de foto opcional." />
```

El renderizador reutiliza las tipografías de la web y admite solo componentes editoriales de su mapa, con atributos de texto. No admite imports, exports, expresiones JavaScript ni etiquetas arbitrarias. Los MDX deben provenir de autores confiables del repositorio; no se renderizan archivos anónimos.

## Consulta y embudo

Se pregunta objetivo, situación actual y plazo. Después se muestra una orientación y el formulario compartido con un interés sugerido que el usuario puede cambiar.

Zod valida los datos y se prepara un mensaje: **no se guarda ni envía una consulta a un servidor**. El usuario revisa y envía el mensaje en WhatsApp o correo. `inquiry-handoff.ts` y `inquiryMessage` centralizan la composición. No se almacenan respuestas personales en localStorage.

| Evento | Momento | Proveedores |
| --- | --- | --- |
| `qualification_start` | Primera respuesta | GA4 |
| `qualification_step` | Avanza una pregunta | GA4 |
| `qualification_complete` | Completa tres preguntas | GA4 |
| `form_start` | Entra al formulario | GA4 |
| `form_validated` | Consulta válida preparada | GA4 |
| `lead_handoff` | Abre WhatsApp/correo | GA4 y evento personalizado Meta/TikTok |
| `filter_projects` | Cambia solución o sector | GA4 |
| `select_project` | Abre una tarjeta | GA4 y ViewContent de Meta/TikTok |
| `view_project` | Visita un detalle | GA4 |

Se aplican las preferencias de consentimiento existentes. `generate_lead` se reserva para la confirmación real del futuro servidor/CRM: abrir WhatsApp no confirma un envío. Los eventos incluyen IDs controlados y excluyen contacto, texto libre y búsquedas.

En **Exploraciones → Exploración de embudos** de GA4, crea los pasos con `qualification_start`, `qualification_complete`, `form_start`, `form_validated` y `lead_handoff`; segmenta por `form_id = inquiry`. Registra dimensiones personalizadas de alcance evento para los parámetros que necesites en informes: `form_id`, `goal_id`, `step_id`, `timeline_id` y `project_id`. Desactiva la medición automática de formularios para evitar duplicados. Configura los IDs reales de `.env.example`; el código no crea ni verifica cuentas.

Referencias: [MDX](https://mdxjs.com/packages/mdx/), [eventos GA4](https://developers.google.com/analytics/devguides/collection/ga4/reference/events), [embudos GA4](https://support.google.com/analytics/answer/9327974).
