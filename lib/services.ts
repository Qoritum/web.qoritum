export interface ServiceItem {
  id: string
  title: string
  tagline: string
  points: string[]
  image: string
}

export type ServiceDetail = {
  description: string
  deliverables: string[]
  firstStep: string
  imageAlt: string
}

// Shared editorial content for the service page. The landing uses SERVICES.
export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "desarrollo-de-software": {
    description:
      "Tu operación no tiene por qué acomodarse a una herramienta que le queda pequeña. Diseñamos aplicaciones que conectan áreas, ordenan información y acompañan la forma en que trabaja tu equipo.",
    deliverables: [
      "Sistemas internos y portales para clientes o proveedores.",
      "Integración de ERP, inventario, ventas y herramientas existentes.",
      "Paneles de gestión, permisos y flujos de aprobación.",
    ],
    firstStep:
      "Elegir un proceso concreto, mapear sus usuarios y diseñar un primer flujo que podamos probar juntos.",
    imageAlt: "Equipo colaborando en el diseño de una solución de software",
  },
  "procesos-rpa": {
    description:
      "Hay tareas que consumen horas sin necesitar una decisión humana. Identificamos actividades repetitivas y construimos robots de software que las ejecutan con reglas claras, trazabilidad y control de excepciones.",
    deliverables: [
      "Procesamiento de documentos y carga de información.",
      "Conciliaciones y reportes entre sistemas.",
      "Registro de ejecuciones y alertas para revisión humana.",
    ],
    firstStep:
      "Revisar una tarea frecuente, su volumen y sus excepciones para evaluar si automatizarla aporta valor.",
    imageAlt: "Herramientas de trabajo para organizar procesos operativos",
  },
  "inteligencia-artificial": {
    description:
      "La IA tiene sentido cuando resuelve una necesidad real. Partimos de tus datos y definimos una aplicación concreta, con criterios de calidad y supervisión para que el resultado sea útil para el negocio.",
    deliverables: [
      "Asistentes conectados a información autorizada del negocio.",
      "Clasificación y extracción de datos de documentos.",
      "Análisis predictivo y apoyo a decisiones con revisión humana.",
    ],
    firstStep:
      "Seleccionar una pregunta del negocio y evaluar los datos disponibles antes de proponer un modelo.",
    imageAlt: "Análisis de información durante una sesión de trabajo",
  },
  automatizacion: {
    description:
      "Cuando tus herramientas se conectan, el trabajo puede avanzar sin tantos pasos manuales. Diseñamos flujos entre aplicaciones que mantienen la información sincronizada y avisan al equipo cuando necesita intervenir.",
    deliverables: [
      "Integraciones mediante API y eventos entre aplicaciones.",
      "Notificaciones, aprobaciones y sincronización de registros.",
      "Monitoreo de flujos y recuperación ante fallos.",
    ],
    firstStep:
      "Dibujar el recorrido de una solicitud y localizar el paso donde se pierde más tiempo o información.",
    imageAlt: "Espacio de trabajo para coordinar herramientas y procesos",
  },
  iot: {
    description:
      "Conectamos lo que ocurre en la operación física con información que puedes consultar. Sensores, dispositivos y plataformas se integran para observar condiciones, identificar cambios y actuar con contexto.",
    deliverables: [
      "Captura de temperatura, ubicación u otras variables operativas.",
      "Tableros, históricos y alertas según umbrales definidos.",
      "Integración de dispositivos con los sistemas de gestión.",
    ],
    firstStep:
      "Definir qué variable necesitas observar, dónde medirla y qué decisión tomarás con esa información.",
    imageAlt: "Planificación de una operación conectada y su información",
  },
  agroexportaciones: {
    description:
      "La información también necesita viajar del campo al embarque. Construimos soluciones para registrar etapas, conectar equipos y consultar la trazabilidad sin depender de archivos dispersos.",
    deliverables: [
      "Registro y seguimiento de lotes, cosecha y despacho.",
      "Integración de datos de campo, packing y logística.",
      "Reportes de trazabilidad y controles según el alcance acordado.",
    ],
    firstStep:
      "Seguir el recorrido de un lote y encontrar los puntos donde falta continuidad en sus registros.",
    imageAlt:
      "Trabajo de planificación para conectar las etapas de una operación",
  },
  "consultoria-transformacion-digital": {
    description:
      "No todo empieza desarrollando un sistema. Te ayudamos a entender dónde estás, ordenar oportunidades y construir una hoja de ruta que considere a las personas, los procesos y la tecnología que ya tienes.",
    deliverables: [
      "Diagnóstico de procesos, herramientas y necesidades.",
      "Priorización de oportunidades por impacto y viabilidad.",
      "Hoja de ruta, alcance inicial y criterios para medir avances.",
    ],
    firstStep:
      "Conversar con las personas que realizan el proceso y acordar qué mejora vale la pena probar primero.",
    imageAlt: "Conversación colaborativa para definir una hoja de ruta",
  },
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
    image: "/images/results-build.jpg",
  },
  {
    id: "procesos-rpa",
    title: "Procesos RPA",
    tagline: "Robots de software que trabajan por tu equipo.",
    points: [
      "El trabajo de copiar y pegar deja de existir.",
      "Las tareas repetitivas empiezan a desaparecer.",
      "Ejecuciones con seguimiento y control de excepciones.",
    ],
    image: "/images/results-operation.jpg",
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
    image: "/images/results-insight.jpg",
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
    image: "/images/results-operation.jpg",
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
    image: "/images/results-measure.jpg",
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
    image: "/images/results-operation.jpg",
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
    image: "/images/results-build.jpg",
  },
]
