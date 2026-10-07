import type { Metadata } from "next"
import type { Project } from "./project-content"
import { site, isIndexable, socialLinks } from "./site"
import { SERVICES } from "@/lib/services"

export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url ?? "http://localhost:3000"),
  title: { default: site.title, template: "%s | Qoritum" },
  description: site.description,
  applicationName: site.name,
  creator: site.name,
  publisher: site.name,
  authors: [{ name: site.name, ...(site.url ? { url: site.url } : {}) }],
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: isIndexable,
    follow: isIndexable,
    googleBot: {
      index: isIndexable,
      follow: isIndexable,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Qoritum — Tecnología que mejora tu operación",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
  other: {
    ...(process.env.META_DOMAIN_VERIFICATION
      ? { "facebook-domain-verification": process.env.META_DOMAIN_VERIFICATION }
      : {}),
  },
}

export function pageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    title,
    description,
    ...(site.url
      ? { alternates: { canonical: new URL(path, site.url).href } }
      : {}),
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | Qoritum`,
      description,
      ...(site.url ? { url: new URL(path, site.url).href } : {}),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | Qoritum`,
      description,
    },
  }
}

export function websiteStructuredData() {
  if (!site.url) return null
  const organizationId = `${site.url}/#organization`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: site.url,
        description: site.description,
        email: site.email,
        telephone: site.phone,
        ...(socialLinks.length
          ? { sameAs: socialLinks.map((link) => link.url) }
          : {}),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone,
          email: site.email,
          contactType: "sales",
          availableLanguage: ["Spanish"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de transformación digital",
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${site.url}/#service-${service.id}`,
              name: service.title,
              description: [service.tagline, ...service.points].join(" "),
              provider: { "@id": organizationId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: site.language,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: site.language,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": organizationId },
      },
    ],
  }
}

export function projectMetadata(project: Project): Metadata {
  const metadata = pageMetadata(
    project.title,
    project.summary,
    `/proyectos/${project.slug}`
  )
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: project.date,
      modifiedTime: project.updated ?? project.date,
      images: [{ url: project.cover, alt: project.coverAlt }],
    },
    twitter: { ...metadata.twitter, images: [project.cover] },
  }
}

export function projectStructuredData(project: Project) {
  if (!site.url) return null
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    image: new URL(project.cover, site.url).href,
    datePublished: project.date,
    dateModified: project.updated ?? project.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/proyectos/${project.slug}`,
  }
}
