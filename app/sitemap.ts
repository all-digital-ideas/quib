import type { MetadataRoute } from "next";
import { articles } from "@/data/journal";
import { helpPages } from "@/data/help";
import { categoryRoutes, getAllProducts, getCollectionSlugs } from "@/lib/catalog";
import { abs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly", lastModified?: string) => ({
    url: abs(path),
    priority,
    changeFrequency,
    ...(lastModified ? { lastModified } : {}),
  });
  return [
    entry("/", 1, "daily"),
    ...categoryRoutes.map((c) => entry(`/${c}`, 0.9, "daily")),
    ...getCollectionSlugs()
      .filter((s) => !categoryRoutes.includes(s))
      .map((s) => entry(`/collection/${s}`, 0.8, "daily")),
    ...getAllProducts().map((p) => entry(`/product/${p.slug}`, 0.7, "weekly", p.createdAt)),
    entry("/journal", 0.6, "weekly"),
    ...articles.map((a) => entry(`/journal/${a.slug}`, 0.5, "monthly", a.date)),
    entry("/gallery", 0.6, "weekly"),
    entry("/about", 0.5, "monthly"),
    entry("/contact", 0.5, "monthly"),
    ...helpPages.map((h) => entry(`/help/${h.slug}`, 0.3, "monthly")),
  ];
}
