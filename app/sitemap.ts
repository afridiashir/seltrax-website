import type { MetadataRoute } from "next";
import { integrations } from "@/components/integrations/data";
import { articles as helpArticles } from "@/components/help/docs";
import { absolute, sitePages } from "@/lib/site-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...sitePages.map((p) => ({
      url: absolute(p.path),
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...helpArticles.map((a) => ({
      url: absolute(`/help/${a.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...integrations.map((i) => ({
      url: absolute(`/integrations/${i.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
