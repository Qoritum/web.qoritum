export interface ServiceItem {
  id: string
  title: string
  tagline: string
  points: string[]
  image: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: "desarrollo-de-software",
    title: "Desarrollo de Software",
    tagline: "Software hecho a la medida de tu operación.",
    points: [
      "Un sistema que se parece a cómo trabajas.",
      "ERP, almacén y comercial hablando el mismo idioma.",
      "Los datos dejan de informar y empiezan a ayudarte.",
    ],
    image: "https://picsum.photos/seed/qoritum-software/1200/1600",
  },
  {
    id: "procesos-rpa",
    title: "Procesos RPA",
    tagline: "Robots de software que trabajan por tu equipo.",
    points: [
      "El trabajo de copiar y pegar deja de existir.",
      "Las tareas repetitivas empiezan a desaparecer.",
      "Tus procesos corren solos, sin errores ni pausas.",
    ],
    image: "https://picsum.photos/seed/qoritum-rpa/1200/1600",
  },
  {
    id: "inteligencia-artificial",
    title: "Inteligencia Artificial",
    tagline: "Datos que se convierten en decisiones.",
    points: [
      "Modelos que aprenden de tu operación.",
      "Decisiones con evidencia, no con intuición.",
      "La inteligencia artificial al servicio del negocio.",
    ],
    image: "https://picsum.photos/seed/qoritum-ia/1200/1600",
  },
  {
    id: "automatizacion",
    title: "Automatización",
    tagline: "Procesos que fluyen sin fricción.",
    points: [
      "Flujos que se ejecutan sin intervención.",
      "Menos pasos manuales, más resultados.",
      "Tu equipo enfocado en lo que importa.",
    ],
    image: "https://picsum.photos/seed/qoritum-automatizacion/1200/1600",
  },
  {
    id: "iot",
    title: "IoT",
    tagline: "Tu operación conectada, de punta a punta.",
    points: [
      "Visibilidad en campo, almacén y cadena de frío.",
      "Sensores conectados a tu operación en tiempo real.",
      "Cada dato del campo, disponible al instante.",
    ],
    image: "https://picsum.photos/seed/qoritum-iot/1200/1600",
  },
  {
    id: "agroexportaciones",
    title: "Agroexportaciones",
    tagline: "Del campo al mundo, con tecnología.",
    points: [
      "Trazabilidad completa de la cosecha al puerto.",
      "Cumplimiento de estándares internacionales.",
      "Tecnología que acompaña cada embarque.",
    ],
    image: "https://picsum.photos/seed/qoritum-agro/1200/1600",
  },
  {
    id: "consultoria-transformacion-digital",
    title: "Consultoría de Transformación Digital",
    tagline: "Transformación digital con rumbo claro.",
    points: [
      "Una hoja de ruta clara para tu transformación.",
      "Procesos, personas y tecnología alineados.",
      "Acompañamiento de la estrategia a la ejecución.",
    ],
    image: "https://picsum.photos/seed/qoritum-consultoria/1200/1600",
  },
]
