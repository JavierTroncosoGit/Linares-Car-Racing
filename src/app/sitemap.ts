import { MetadataRoute } from "next";
import { fetchProducts } from "@/lib/sheets";
import siteConfig from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.seo.canonicalUrl || "https://racingcarslinares.cl";
  
  // Standard routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/carrito`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic product routes
  try {
    const products = await fetchProducts();
    
    products.forEach((product) => {
      routes.push({
        url: `${baseUrl}/catalogo/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
  }

  return routes;
}
