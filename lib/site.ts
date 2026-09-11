// Shared by the footer, contact section, metadata and structured data.
const configuredUrl = process.env.SITE_URL?.trim()
function resolvePublicUrl(value?: string) {
  if (!value) return undefined
  const url = new URL(value)
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SITE_URL must be an HTTPS origin, without credentials, path, query or hash."
    )
  }
  return url.origin
}

export const site = {
  name: "Qoritum",
  title: "Qoritum | Software, automatización e IA para empresas",
  description:
    "Transformamos tu operación con software a medida, automatización, inteligencia artificial e IoT. Soluciones para distribución B2B y agroexportación.",
  url: resolvePublicUrl(configuredUrl),
  locale: "es_PE",
  language: "es",
  email: "loquitas@qoritum.com",
  phone: "+51964228584",
  phoneDisplay: "+51 964 228 584",
  whatsapp: "https://wa.me/51964228584",
} as const

export const isIndexable =
  Boolean(site.url) && process.env.SITE_INDEXABLE === "true"

export const navigation = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Resultados", href: "/#results" },
  { label: "Preguntas frecuentes", href: "/#preguntas-frecuentes" },
  { label: "Contacto", href: "/#contacto" },
]

export const socialLinks = [
  { label: "LinkedIn", url: process.env.SOCIAL_LINKEDIN_URL },
  { label: "Instagram", url: process.env.SOCIAL_INSTAGRAM_URL },
  { label: "Facebook", url: process.env.SOCIAL_FACEBOOK_URL },
  { label: "TikTok", url: process.env.SOCIAL_TIKTOK_URL },
].filter((link): link is { label: string; url: string } =>
  Boolean(link.url?.startsWith("https://"))
)
