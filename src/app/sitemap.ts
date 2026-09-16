import type { MetadataRoute } from "next";

import { orderedTerms, publishedCategories } from "@/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lableksion.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/a-aa`, priority: 0.6 },
    ...publishedCategories.map((category) => ({
      url: `${baseUrl}/kategori/${category.slug}`,
      priority: 0.7,
    })),
    ...orderedTerms.map((term) => ({
      url: `${baseUrl}/begrep/${term.slug}`,
      priority: 0.9,
    })),
  ];
}
