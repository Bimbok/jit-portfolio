import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bimbok.vercel.app";
  const bimbokPath = path.join(process.cwd(), "public", "bimbok");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  // Dynamically add images from the bimbok folder for indexing
  try {
    if (fs.existsSync(bimbokPath)) {
      const files = fs.readdirSync(bimbokPath);
      const images = files
        .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map((img) => ({
          url: `${baseUrl}/bimbok/${img}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.5,
        }));
      
      return [...staticRoutes, ...images];
    }
  } catch (error) {
    console.error("Error generating sitemap images:", error);
  }

  return staticRoutes;
}
