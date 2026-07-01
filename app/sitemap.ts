import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE = "https://www.mustafa.software";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({
        url: `${BASE}/projects/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
