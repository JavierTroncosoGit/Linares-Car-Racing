import { Product } from "@/types/product";
import siteConfig from "./config";

/**
 * Filters a list of products to return featured products only.
 */
export function getFeaturedProducts(products: Product[], limit?: number): Product[] {
  const featured = products.filter(p => p.featured);
  const max = limit || siteConfig.store.featuredSection.maxProducts || 8;
  return featured.slice(0, max);
}

/**
 * Filters products by brand. Maps brand slug/id safely.
 */
export function getProductsByBrand(products: Product[], brandSlugOrId: string): Product[] {
  if (!brandSlugOrId || brandSlugOrId === "all") return products;
  
  return products.filter(p => {
    const pBrandNormalized = (p.brand || "").toLowerCase().trim();
    const slug = pBrandNormalized.replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
    return pBrandNormalized === brandSlugOrId.toLowerCase().trim() || slug === brandSlugOrId.toLowerCase().trim();
  });
}

/**
 * Searches products by name, brand, SKU or description.
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query) return products;
  const term = query.toLowerCase().trim();
  
  return products.filter(p => 
    p.name.toLowerCase().includes(term) ||
    p.brand.toLowerCase().includes(term) ||
    p.sku.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term) ||
    p.category.toLowerCase().includes(term)
  );
}

/**
 * Finds a product by its unique slug.
 */
export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

/**
 * Returns dynamic list of brands with product count based on current catalog.
 */
export function getBrandsWithCount(products: Product[]): { id: string; name: string; slug: string; count: number }[] {
  const counts: Record<string, number> = {};
  
  products.forEach(p => {
    const brand = (p.brand || "Genérico").trim();
    counts[brand] = (counts[brand] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, count]) => {
      const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
      return {
        id: slug,
        name,
        slug,
        count
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Returns a list of 2 to 4 recommended products from the same brand (excluding current product).
 */
export function getComplementaryProducts(products: Product[], currentProduct: Product, limit = 4): Product[] {
  return products
    .filter(p => p.brand.toLowerCase().trim() === currentProduct.brand.toLowerCase().trim() && p.sku !== currentProduct.sku)
    .slice(0, limit);
}
