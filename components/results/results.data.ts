export interface ResultItem {
  id: string
  image: string
  alt: string
  title: string
  detail: string
  href: string
}

// Replace the images in public/images and edit these captions/links freely.
export const RESULTS: ResultItem[] = [
  {
    id: "operacion",
    image: "/images/results-operation.jpg",
    alt: "Espacio de trabajo de un equipo",
    title: "Entender tu operación.",
    detail: "El punto de partida es cómo trabajas hoy.",
    href: "#contacto",
  },
  {
    id: "oportunidad",
    image: "/images/results-insight.jpg",
    alt: "Equipo analizando información en una laptop",
    title: "Encontrar la oportunidad.",
    detail: "Una mejora concreta, donde más importa.",
    href: "#contacto",
  },
  {
    id: "construir",
    image: "/images/results-build.jpg",
    alt: "Colaboración y trabajo en una mesa de proyecto",
    title: "Hacer que suceda.",
    detail: "Pasar de la conversación a la acción.",
    href: "#contacto",
  },
  {
    id: "medir",
    image: "/images/results-measure.jpg",
    alt: "Visualización de datos y resultados de una operación",
    title: "Medir. Aprender. Escalar.",
    detail: "Lo que funciona, se convierte en el siguiente paso.",
    href: "#contacto",
  },
]
