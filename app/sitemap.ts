import type { MetadataRoute } from "next";

const siteUrl = "https://seltrax.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/health`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.3,
    },
  ];
}
