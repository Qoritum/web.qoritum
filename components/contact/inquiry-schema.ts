import { z } from "zod"
import type { ContactValues } from "./contact-schema"

export const inquiryQuestions = [
  {
    id: "goal",
    label: "Objetivo",
    title: "¿Qué quieres mejorar primero?",
    help: "Elige lo que más se parece a tu necesidad. Puedes empezar aunque todavía no tengas una solución definida.",
    options: [
      {
        id: "software",
        label: "Ordenar la operación",
        detail: "Necesito un sistema que se adapte a cómo trabajamos.",
      },
      {
        id: "automation",
        label: "Reducir tareas manuales",
        detail:
          "Repetimos pasos, copiamos datos o dependemos de recordatorios.",
      },
      {
        id: "data",
        label: "Decidir con mejores datos",
        detail: "Quiero indicadores, información confiable o evaluar IA.",
      },
      {
        id: "traceability",
        label: "Conectar y dar trazabilidad",
        detail: "Necesito integrar sistemas o seguir procesos y lotes.",
      },
      {
        id: "guidance",
        label: "Quiero orientación",
        detail:
          "Sé que podemos mejorar, pero quiero identificar dónde empezar.",
      },
    ],
  },
  {
    id: "situation",
    label: "Situación",
    title: "¿Cómo trabajan hoy?",
    help: "Esto nos ayuda a entender desde dónde partimos.",
    options: [
      {
        id: "manual",
        label: "Hojas de cálculo y tareas manuales",
        detail: "La información depende de archivos, mensajes y personas.",
      },
      {
        id: "disconnected",
        label: "Tenemos sistemas separados",
        detail: "Usamos herramientas que no comparten toda la información.",
      },
      {
        id: "existing",
        label: "Queremos mejorar un sistema existente",
        detail: "Ya hay una base y queremos integrar o ampliar capacidades.",
      },
      {
        id: "new",
        label: "Estamos creando una nueva operación",
        detail:
          "Necesitamos definir el proceso y las herramientas desde el inicio.",
      },
    ],
  },
  {
    id: "timeline",
    label: "Plazo",
    title: "¿Cuándo te gustaría empezar?",
    help: "No es un compromiso. Nos ayuda a preparar una conversación acorde a tu momento.",
    options: [
      {
        id: "soon",
        label: "Lo antes posible",
        detail: "Hay una necesidad concreta que quiero revisar pronto.",
      },
      {
        id: "quarter",
        label: "En los próximos tres meses",
        detail: "Estamos preparando el siguiente paso.",
      },
      {
        id: "exploring",
        label: "Estoy explorando posibilidades",
        detail: "Quiero conocer opciones y entender el alcance.",
      },
    ],
  },
] as const

export const inquirySchema = z.object({
  goal: z.enum(["software", "automation", "data", "traceability", "guidance"]),
  situation: z.enum(["manual", "disconnected", "existing", "new"]),
  timeline: z.enum(["soon", "quarter", "exploring"]),
})
export type InquiryAnswers = z.output<typeof inquirySchema>

const recommendations = {
  software: {
    improvement: "Desarrollo de software",
    title: "Un sistema que sigue tu operación.",
    text: "Revisemos un flujo importante y definamos qué información y acciones necesita reunir una primera versión.",
  },
  automation: {
    improvement: "Automatización de procesos",
    title: "Empecemos por una tarea repetitiva.",
    text: "Identifiquemos un proceso con reglas claras, sus excepciones y el tiempo que consume hoy.",
  },
  data: {
    improvement: "Inteligencia artificial",
    title: "Primero la pregunta, después los datos.",
    text: "Acordemos qué necesitas decidir y revisemos la calidad de las fuentes antes de elegir un tablero o un modelo.",
  },
  traceability: {
    improvement: "Integración de sistemas",
    title: "Conectemos los puntos del proceso.",
    text: "Mapeemos sistemas, registros y etapas para localizar dónde falta información o trazabilidad.",
  },
  guidance: {
    improvement: "Quiero orientación",
    title: "Encontraremos juntos un punto de partida.",
    text: "Una conversación sobre tu operación puede ayudarnos a identificar una mejora concreta y definir su alcance.",
  },
} as const

export function inquiryRecommendation(answers: InquiryAnswers) {
  return recommendations[answers.goal]
}
export function inquiryLabel(key: keyof InquiryAnswers, value: string) {
  return (
    inquiryQuestions
      .find((question) => question.id === key)
      ?.options.find((option) => option.id === value)?.label ?? value
  )
}

export function inquiryMessage(
  contact: ContactValues,
  answers?: InquiryAnswers
) {
  return [
    `Hola Qoritum, soy ${contact.fullName} de ${contact.company}.`,
    `Correo: ${contact.email}`,
    ...(contact.phone ? [`Teléfono: ${contact.phone}`] : []),
    `Sector: ${contact.sector}`,
    `Interés: ${contact.improvement}`,
    ...(answers
      ? [
          `Objetivo: ${inquiryLabel("goal", answers.goal)}`,
          `Situación: ${inquiryLabel("situation", answers.situation)}`,
          `Plazo: ${inquiryLabel("timeline", answers.timeline)}`,
        ]
      : []),
    "",
    contact.details,
  ].join("\n")
}
