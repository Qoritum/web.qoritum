import type { MetadataRoute } from "next"
import { site, isIndexable } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexable
      ? { userAgent: "*", allow: "/", disallow: ["/api/"] }
      : { userAgent: "*", disallow: "/" },
    ...(isIndexable && site.url
      ? { sitemap: `${site.url}/sitemap.xml`, host: site.url }
      : {}),
  }
}
