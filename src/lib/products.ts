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
 * Filters products by category. Maps category slug/id safely.
 */
export function getProductsByCategory(products: Product[], categorySlugOrId: string): Product[] {
  if (!categorySlugOrId || categorySlugOrId === "all") return products;
  
  // Find category config to match either id or slug
  const catConfig = siteConfig.store.categories.find(
    c => c.id === categorySlugOrId || c.slug === categorySlugOrId
  );
  
  return products.filter(p => {
    const pCategoryNormalized = p.category.toLowerCase().trim();
    if (catConfig) {
      return pCategoryNormalized === catConfig.name.toLowerCase().trim() ||
             pCategoryNormalized === catConfig.id.toLowerCase().trim() ||
             pCategoryNormalized === catConfig.slug.toLowerCase().trim();
    }
    return pCategoryNormalized === categorySlugOrId.toLowerCase().trim();
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
 * Returns dynamic list of categories with product count based on current catalog.
 */
export function getCategoriesWithCount(products: Product[]): { id: string; name: string; slug: string; count: number }[] {
  const counts: Record<string, number> = {};
  
  products.forEach(p => {
    const cat = p.category.trim();
    counts[cat] = (counts[cat] || 0) + 1;
  });

  // Map configuration categories first
  const configCategories = siteConfig.store.categories.map(c => {
    // Find matching count by name
    const countKey = Object.keys(counts).find(
      key => key.toLowerCase() === c.name.toLowerCase() || key.toLowerCase() === c.id.toLowerCase()
    );
    const count = countKey ? counts[countKey] : 0;
    
    return {
      id: c.id,
      name: c.name,
      slug: c.slug,
      count
    };
  }).filter(c => c.count > 0); // Only keep configured categories that have products in the sheet

  // Add any extra categories found in the sheet that are not in the config
  const handledNames = new Set(siteConfig.store.categories.map(c => c.name.toLowerCase()));
  
  Object.entries(counts).forEach(([name, count]) => {
    if (!handledNames.has(name.toLowerCase())) {
      const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
      configCategories.push({
        id: slug,
        name,
        slug,
        count
      });
    }
  });

  return configCategories;
}

/**
 * Returns a list of 2 to 4 recommended products from the same category (excluding current product).
 */
export function getComplementaryProducts(products: Product[], currentProduct: Product, limit = 4): Product[] {
  return products
    .filter(p => p.category.toLowerCase().trim() === currentProduct.category.toLowerCase().trim() && p.sku !== currentProduct.sku)
    .slice(0, limit);
}
