import type { MetadataRoute } from "next";
import { livePages as integrationPages } from "@/components/integrations/data";
import { articles as helpArticles } from "@/components/help/docs";
import { absolute, sitePages } from "@/lib/site-pages";
import { getTemplates } from "@/lib/templates-api";
import { getPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [{ templates }, posts] = await Promise.all([getTemplates(), getPosts()]);

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
    ...posts.map((p) => ({
      url: absolute(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...templates.map((t) => ({
      url: absolute(`/designs/${t.slug}`),
      lastModified: new Date(t.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...integrationPages.map((i) => ({
      url: absolute(`/integrations/${i.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
