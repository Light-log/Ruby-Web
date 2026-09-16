import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/lib/services-catalog";
import { spainServiceSlugs } from "@/lib/spain-campaign";
import { usServiceSlugs } from "@/lib/us-campaign";
import { SITE_URL } from "@/lib/seo";
import { blogPosts, blogUpdatedAt } from "@/lib/blog";

/**
 * Fecha de publicación del contenido, no del build. Con `new Date()` cada deploy
 * marcaba las 26 URLs como «modificadas ahora», y Google acaba ignorando el
 * `lastmod` de un sitio que siempre dice lo mismo. Súbela al tocar el contenido.
 */
const CONTENT_UPDATED = new Date("2026-08-03");

type Entry = MetadataRoute.Sitemap[number];

const entry = (
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"] = "monthly"
): Entry => ({
  url: `${SITE_URL}${path}`,
  lastModified: CONTENT_UPDATED,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("", 1, "weekly"),
    entry("/servicios", 0.9),
    ...serviceSlugs.map((slug) => entry(`/servicios/${slug}`, 0.8)),
    entry("/proyectos", 0.9, "weekly"),
    entry("/proceso", 0.8),
    entry("/nosotros", 0.7),
    entry("/agenda", 0.9),
    entry("/contacto", 0.8),

    entry("/espana", 0.9),
    ...spainServiceSlugs.map((slug) => entry(`/espana/${slug}`, 0.8)),

    entry("/us", 0.9),
    ...usServiceSlugs.map((slug) => entry(`/us/${slug}`, 0.8)),

    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(blogUpdatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map<Entry>((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    })),

    entry("/privacidad", 0.3, "yearly"),
  ];
}
