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
 * Uses includes() for flexible matching with the actual Google Sheets headers.
 */
function getHeaderMapping(headers: string[]): Record<string, number> {
  const mapping: Record<string, number> = {};

  headers.forEach((header, index) => {
    const normalized = header.toLowerCase().trim();

    // SKU / ID — must be checked first to avoid false matches
    if (normalized === "sku" || normalized === "id" || normalized === "codigo" || normalized === "código") {
      mapping.sku = index;
    }
    // Name — product name, checked before description to avoid "nombre" matching "description"
    else if (normalized === "name" || normalized === "nombre" || normalized === "title" || normalized === "producto") {
      mapping.name = index;
    }
    // Description — uses includes() for variants like "description", "description_long", "descripcion"
    else if (
      (normalized.includes("descripcion") || normalized.includes("descripción") || normalized.includes("description")) &&
      !mapping.description // only map the first description column found
    ) {
      mapping.description = index;
    }
    // Brand
    else if (normalized.includes("marca") || normalized === "brand") {
      mapping.brand = index;
    }
    // Price
    else if (normalized.includes("precio") || normalized === "price" || normalized === "valor") {
      mapping.price = index;
    }
    // Category
    else if (normalized.includes("categoria") || normalized.includes("categoría") || normalized === "category") {
      mapping.category = index;
    }
    // Image — uses includes("image") to match "image", "image_main", "imagen", "imagen_principal", etc.
    else if (
      (normalized.includes("imagen") || normalized.includes("image") || normalized === "url" || normalized === "foto") &&
      !mapping.image // only map the first image column found
    ) {
      mapping.image = index;
    }
    // Featured / Destacado
    else if (normalized.includes("featured") || normalized.includes("destacado")) {
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
 * Safely gets a field value from a parsed CSV row, returning empty string if index is out of bounds.
 */
function safeGet(fields: string[], index: number | undefined): string {
  if (index === undefined || index < 0 || index >= fields.length) return "";
  return fields[index] || "";
}

/**
 * Fetches and parses the Google Sheets CSV.
 */
export async function fetchProducts(): Promise<Product[]> {
  let url = siteConfig.store.sheetsConfig.productsSheetUrl;

  if (!url || url.includes("XXXXX") || url.includes("XXXX")) {
    console.warn("[Sheets] URL is placeholder or empty. Returning empty product list.");
    return [];
  }

  // En entorno de desarrollo, agregamos un timestamp para evitar cache y ver los cambios al instante
  if (process.env.NODE_ENV === "development") {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}_t=${Date.now()}`;
  }

  try {
    const revalidate = process.env.NODE_ENV === "development" ? 0 : (siteConfig.store.sheetsConfig.revalidateSeconds || 3600);
    const response = await fetch(url, {
      next: { revalidate },
      // Prevent any HTTP-level caching in development
      ...(process.env.NODE_ENV === "development" && { cache: "no-store" as RequestCache }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);

    if (lines.length < 2) {
      console.warn("[Sheets] CSV has less than 2 lines (header + data). Returning empty list.");
      return [];
    }

    const headers = parseCsvLine(lines[0]);
    const mapping = getHeaderMapping(headers);

    console.log("[Sheets] Headers found:", headers);
    console.log("[Sheets] Column mapping:", mapping);
    console.log("[Sheets] Total data rows:", lines.length - 1);

    // Validate minimum required fields mapping
    if (mapping.sku === undefined || mapping.name === undefined || mapping.price === undefined) {
      console.error(
        "[Sheets] CSV Headers missing mandatory fields. Need: sku, name, price.",
        "\n  Mapped so far:", JSON.stringify(mapping),
        "\n  Raw headers:", headers
      );
      return [];
    }

    const products: Product[] = [];
    let skippedEmpty = 0;

    for (let i = 1; i < lines.length; i++) {
      const fields = parseCsvLine(lines[i]);

      // Use safeGet to avoid index out-of-bounds issues
      const sku = safeGet(fields, mapping.sku) || `SKU-${i}`;
      const name = safeGet(fields, mapping.name);
      if (!name) {
        skippedEmpty++;
        continue; // Skip rows without a product name
      }

      const description = safeGet(fields, mapping.description);
      const brand = safeGet(fields, mapping.brand);

      // Parse price — remove currency symbols, dots (thousands separator in CLP), spaces, commas
      let rawPrice = safeGet(fields, mapping.price) || "0";
      rawPrice = rawPrice.replace(/[$.\s,]/g, "");
      const price = parseInt(rawPrice, 10) || 0;

      const category = safeGet(fields, mapping.category) || "General";

      // Parse image, use fallback if empty
      let image = safeGet(fields, mapping.image);
      if (!image) {
        image = PLACEHOLDERS.productPlaceholder.src || PLACEHOLDERS.productPlaceholder.fallback;
      }

      // Parse featured
      const rawFeatured = safeGet(fields, mapping.featured).toLowerCase().trim();
      const featured = rawFeatured === "true" ||
                       rawFeatured === "yes" ||
                       rawFeatured === "1" ||
                       rawFeatured === "si" ||
                       rawFeatured === "sí";

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

    console.log(`[Sheets] Parsed ${products.length} products (${skippedEmpty} empty rows skipped)`);
    return products;
  } catch (error) {
    console.error("[Sheets] Error fetching or parsing products CSV:", error);
    return [];
  }
}
