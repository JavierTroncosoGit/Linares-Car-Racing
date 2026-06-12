import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * API Route: POST /api/revalidate
 * 
 * Deploy hook para forzar la actualización del catálogo desde Google Sheets.
 * Invalida el cache de las páginas del catálogo para que Next.js
 * re-fetch los datos frescos desde el Google Sheet en la próxima visita.
 * 
 * Uso:
 *   POST /api/revalidate
 *   Header: x-revalidate-token: <REVALIDATE_SECRET>
 *   
 *   o con query param:
 *   POST /api/revalidate?secret=<REVALIDATE_SECRET>
 * 
 * Respuesta exitosa:
 *   { "revalidated": true, "timestamp": "..." }
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    console.error("[Revalidate] REVALIDATE_SECRET not set in environment variables.");
    return NextResponse.json(
      { error: "Server misconfiguration: revalidation secret not set." },
      { status: 500 }
    );
  }

  // Accept token from header or query parameter
  const tokenFromHeader = request.headers.get("x-revalidate-token");
  const tokenFromQuery = request.nextUrl.searchParams.get("secret");
  const providedToken = tokenFromHeader || tokenFromQuery;

  if (providedToken !== secret) {
    return NextResponse.json(
      { error: "Invalid revalidation token." },
      { status: 401 }
    );
  }

  try {
    // Revalidate the catalog listing page
    revalidatePath("/catalogo");
    // Revalidate all individual product pages
    revalidatePath("/catalogo/[slug]", "page");
    // Revalidate the landing page (featured products section)
    revalidatePath("/");

    console.log("[Revalidate] Successfully revalidated /catalogo, /catalogo/[slug], and / at", new Date().toISOString());

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths: ["/", "/catalogo", "/catalogo/[slug]"],
    });
  } catch (error) {
    console.error("[Revalidate] Error during revalidation:", error);
    return NextResponse.json(
      { error: "Failed to revalidate." },
      { status: 500 }
    );
  }
}

// Also support GET for easy testing from browser
export async function GET(request: NextRequest) {
  return POST(request);
}
