import type { MetadataRoute } from "next"
import { site, isIndexable } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url || !isIndexable) return []
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ]
}
