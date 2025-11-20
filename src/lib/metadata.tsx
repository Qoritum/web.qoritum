import type { Metadata } from "next/types";
import { MetadataUtilsSeo } from "./constants";

export const BASE_URL = "https://qoritum.com";

interface CreateMetadataOptions extends Metadata {
  service?: "fivem" | "web-development" | "ui-ux-design";
  structuredData?: object;
  canonical?: string;
}

export function createMetadata(override: CreateMetadataOptions): Metadata {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultRobots = {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };

  return {
    ...override,
    metadataBase: new URL(BASE_URL),

    keywords:
      override.keywords ??
      MetadataUtilsSeo.withKeywords([
        "consultoria it",
        "transformacion digital",
        "ingenieria industrial",
        "automatizacion de procesos",
        "optimizacion operativa",
        "tecnologia empresarial",
        "qoritum",
        "servicios ti",
        "consultoria para empresas",
        "integracion tecnologica",
      ]).keywords,

    verification: {
      google: "",
    },

    authors: MetadataUtilsSeo.withAuthors().authors,

    creator: "Neenbyss",
    publisher: "Neenbyss - Arquitectos Digitales",

    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    openGraph: {
      title: override.title ?? "Consultoría IT y Transformación Digital | Qoritum",
      description:
        override.description ??
        "Servicios de consultoría IT y soluciones de ingeniería industrial para micro y grandes empresas. Optimización de procesos, automatización, infraestructura tecnológica y modernización operativa para acelerar la transformación digital.",
      url: override.openGraph?.url ?? BASE_URL,
      siteName: "Qoritum",
      images: override.openGraph?.images ?? [
        {
          url: `${BASE_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "QORITUM",
        },
      ],
      locale: "es_PE",
      type: "website",
      ...override.openGraph,
    },

    twitter: {
      card: "summary_large_image",
      title: override.title ?? "Qoritum",
      description:
        override.description ??
        "Diseñamos software a medida que se adapta a tus necesidades actuales y evoluciona contigo.",
      images: override.twitter?.images ?? [`${BASE_URL}/og.png`],
      creator: "@neenbyss", // Agregar si tienes Twitter
      site: "@neenbyss",
      ...override.twitter,
    },

    alternates: {
      canonical:
        override.canonical ?? (override.openGraph?.url as string) ?? BASE_URL,
      languages: {
        "es-PE": BASE_URL,
        es: BASE_URL,
      },
      ...override.alternates,
    },

    category: "technology",

    applicationName: "Qoritum",
    referrer: "origin-when-cross-origin",

    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon.png", sizes: "192x192", type: "image/png" },
        {
          url: "/icon-dark.png",
          sizes: "192x192",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
  };
}

export function generateStructuredData(
  type: "Service" | "Organization" | "WebPage",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
) {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "Organization":
      return {
        ...baseStructure,
        name: "Neenbyss",
        url: "https://neenbyss.com",
        logo: "https://neenbyss.com/logo.png",
        description:
          "Especialistas en desarrollo de software personalizado, configuración de servidores FiveM y diseño UI/UX profesional.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "MX",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["Spanish", "English"],
        },
        sameAs: [
          "https://twitter.com/neenbyss",
          "https://linkedin.com/company/neenbyss",
        ],
        ...data,
      };

    case "Service":
      return {
        ...baseStructure,
        name: data.name,
        description: data.description,
        provider: {
          "@type": "Organization",
          name: "Qoritum",
          url: BASE_URL,
        },
        areaServed: "Perú",
        serviceType: data.serviceType,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceRange: data.priceRange || "$$$",
        },
        ...data,
      };

    case "WebPage":
      return {
        ...baseStructure,
        name: data.name,
        description: data.description,
        url: data.url,
        isPartOf: {
          "@type": "WebSite",
          name: "Qoritum",
          url: BASE_URL,
        },
        ...data,
      };

    default:
      return { ...baseStructure, ...data };
  }
}

