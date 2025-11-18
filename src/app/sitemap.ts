import { getAllNews } from "@/lib/get-new";
import { BASE_URL } from "@/lib/metadata";
import type { MetadataRoute } from "next";

// URLs estáticas con prioridades y frecuencias optimizadas
const staticRoutes = [
  { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "weekly" as const },
  {
    url: `${BASE_URL}#contact/`,
    priority: 0.9,
    changeFrequency: "yearly" as const,
  },

  {
    url: `${BASE_URL}/politicas-de-privacidad/`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  },
  {
    url: `${BASE_URL}/terminos-y-condiciones/`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  },

  {
    url: `https://neenbyss.com`,
    priority: 0.3,
    changeFrequency: "weekly" as const,
  },
  {
    url: `https://zeew.space`,
    priority: 0.2,
    changeFrequency: "weekly" as const,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages = staticRoutes.map((route) => ({
    url: route.url,
    lastModified: now,
    priority: route.priority,
    changeFrequency: route.changeFrequency,
  }));

  const { data: news } = await getAllNews();

  const projectPages = news.map((project) => ({
    url: `${BASE_URL}/novedades/${project.slug}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...projectPages];
}

