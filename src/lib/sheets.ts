import { Product } from "@/types/product";
import siteConfig from "./config";
import { PLACEHOLDERS } from "./placeholders";

/**
 * Parses a single line of CSV, respecting double quotes for fields containing commas.
 */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      // Toggle quote state
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Normalizes header names to standard product fields.
 */
function getHeaderMapping(headers: string[]): Record<string, number> {
  const mapping: Record<string, number> = {};

  headers.forEach((header, index) => {
    const normalized = header.toLowerCase().trim();

    if (normalized.includes("sku") || normalized === "id") {
      mapping.sku = index;
    } else if (normalized.includes("nombre") || normalized === "name" || normalized === "title" || normalized === "producto") {
      mapping.name = index;
    } else if (normalized.includes("descripcion") || normalized.includes("descripción") || normalized === "description") {
      mapping.description = index;
    } else if (normalized.includes("marca") || normalized === "brand") {
      mapping.brand = index;
    } else if (normalized.includes("precio") || normalized === "price" || normalized === "valor") {
      mapping.price = index;
    } else if (normalized.includes("categoria") || normalized.includes("categoría") || normalized === "category") {
      mapping.category = index;
    } else if (normalized.includes("imagen") || normalized === "image" || normalized === "url") {
      mapping.image = index;
    } else if (normalized.includes("featured") || normalized.includes("destacado")) {
      mapping.featured = index;
    }
  });

  return mapping;
}

/**
 * Converts a string slug out of a text.
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/[^\w\-]+/g, "") // remove all non-word chars
    .replace(/\-\-+/g, "-") // replace multiple - with single -
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text
}

/**
 * Fetches and parses the Google Sheets CSV.
 */
export async function fetchProducts(): Promise<Product[]> {
  const url = siteConfig.store.sheetsConfig.productsSheetUrl;
  
  if (!url || url.includes("XXXXX") || url.includes("XXXX")) {
    console.warn("Google Sheets URL is placeholder or empty. Returning empty product list.");
    return [];
  }

  try {
    const revalidate = siteConfig.store.sheetsConfig.revalidateSeconds || 3600;
    const response = await fetch(url, {
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);

    if (lines.length < 2) {
      return [];
    }

    const headers = parseCsvLine(lines[0]);
    const mapping = getHeaderMapping(headers);

    // Validate minimum required fields mapping
    if (mapping.sku === undefined || mapping.name === undefined || mapping.price === undefined) {
      console.error("CSV Headers missing mandatory fields (sku, name, price). Mapped headers:", mapping);
      return [];
    }

    const products: Product[] = [];

    for (let i = 1; i < lines.length; i++) {
      const fields = parseCsvLine(lines[i]);
      if (fields.length < Object.keys(mapping).length) continue;

      const sku = fields[mapping.sku] || `SKU-${i}`;
      const name = fields[mapping.name] || "";
      if (!name) continue; // Skip empty rows

      const description = mapping.description !== undefined ? fields[mapping.description] || "" : "";
      const brand = mapping.brand !== undefined ? fields[mapping.brand] || "" : "";
      
      // Parse price
      let rawPrice = mapping.price !== undefined ? fields[mapping.price] || "0" : "0";
      // Remove symbols like $, dots, spaces
      rawPrice = rawPrice.replace(/[$\.\s,]/g, "");
      const price = parseInt(rawPrice, 10) || 0;

      const category = mapping.category !== undefined ? fields[mapping.category] || "General" : "General";
      
      // Parse image, use fallback if empty
      let image = mapping.image !== undefined ? fields[mapping.image] || "" : "";
      if (!image) {
        image = PLACEHOLDERS.productPlaceholder.src || PLACEHOLDERS.productPlaceholder.fallback;
      }

      // Parse featured
      const rawFeatured = mapping.featured !== undefined ? fields[mapping.featured] || "" : "";
      const featured = rawFeatured.toLowerCase().trim() === "true" || 
                       rawFeatured.toLowerCase().trim() === "yes" || 
                       rawFeatured.trim() === "1" ||
                       rawFeatured.toLowerCase().trim() === "si" ||
                       rawFeatured.toLowerCase().trim() === "sí";

      const slug = `${slugify(name)}-${sku.toLowerCase()}`;

      products.push({
        sku,
        name,
        description,
        brand,
        price,
        category,
        image,
        featured,
        slug
      });
    }

    return products;
  } catch (error) {
    console.error("Error fetching or parsing products CSV:", error);
    return [];
  }
}
