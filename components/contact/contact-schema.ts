import { z } from "zod"
import {
  getCountryCallingCode,
  isSupportedCountry,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js"
export const SECTORS = [
  "Agroexportación",
  "Industria y manufactura",
  "Comercio y retail",
  "Logística",
  "Servicios",
  "Otro",
] as const

export const IMPROVEMENTS = [
  "Desarrollo de software",
  "Automatización de procesos",
  "Inteligencia artificial",
  "Integración de sistemas",
  "IoT y trazabilidad",
  "Consultoría digital",
  "Quiero orientación",
] as const

export const contactSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Escribe tus nombres y apellidos.")
      .max(100, "Usa un máximo de 100 caracteres."),
    company: z
      .string()
      .trim()
      .min(2, "Escribe la razón social.")
      .max(150, "Usa un máximo de 150 caracteres."),
    email: z
      .string()
      .trim()
      .email("Escribe un correo electrónico válido.")
      .max(254, "El correo es demasiado largo."),
    country: z.custom<CountryCode>(
      (value) => typeof value === "string" && isSupportedCountry(value),
      "Selecciona un país."
    ),
    phone: z.string().trim().max(40, "El teléfono es demasiado largo."),
    sector: z.enum(SECTORS, { error: "Selecciona tu sector." }),
    improvement: z.enum(IMPROVEMENTS, {
      error: "Selecciona qué te gustaría mejorar.",
    }),
    details: z
      .string()
      .trim()
      .min(20, "Cuéntanos un poco más (mínimo 20 caracteres).")
      .max(2000, "Usa un máximo de 2000 caracteres."),
    consent: z
      .boolean()
      .refine(
        (value) => value,
        "Necesitamos tu autorización para contactarte."
      ),
  })
  .superRefine((data, ctx) => {
    if (!data.phone) return
    const phone = parsePhoneNumberFromString(data.phone, data.country)
    if (!/^\+?[\d\s()-]+$/.test(data.phone) || !phone?.isPossible()) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Escribe un teléfono válido para el país seleccionado.",
      })
    } else if (
      isSupportedCountry(data.country) &&
      phone.countryCallingCode !== getCountryCallingCode(data.country)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message:
          "El prefijo del teléfono no coincide con el país seleccionado.",
      })
    }
  })
  .transform((data) => ({
    ...data,
    // Ready for the future API: always E.164, never a display-format string.
    phone: data.phone
      ? parsePhoneNumberFromString(data.phone, data.country)!.number
      : "",
  }))

export type ContactValues = z.output<typeof contactSchema>
export type ContactField = keyof z.input<typeof contactSchema>
