import { site } from "@/lib/site"
import type { ContactValues } from "./contact-schema"
import { inquiryMessage, type InquiryAnswers } from "./inquiry-schema"

export function inquiryHandoff(
  contact: ContactValues,
  answers?: InquiryAnswers
) {
  const message = inquiryMessage(contact, answers)
  return {
    whatsapp: `${site.whatsapp}?text=${encodeURIComponent(message)}`,
    email: `mailto:${site.email}?subject=${encodeURIComponent("Consulta sobre una mejora para mi empresa")}&body=${encodeURIComponent(message)}`,
  }
}
