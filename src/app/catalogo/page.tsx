import { Metadata } from "next";
import { Suspense } from "react";
import { fetchProducts } from "@/lib/sheets";
import { getBrandsWithCount } from "@/lib/products";
import siteConfig from "@/lib/config";
import CatalogoClient from "@/components/store/CatalogoClient";

export const revalidate = 3600; // Revalidate page cache every hour

export const metadata: Metadata = {
  title: siteConfig.pages.catalogo.seo?.title || "Catálogo — Racing Cars",
  description: siteConfig.pages.catalogo.seo?.description || "Insumos y repuestos automotrices",
  openGraph: {
    title: siteConfig.pages.catalogo.seo?.title || "Catálogo — Racing Cars",
    description: siteConfig.pages.catalogo.seo?.description || "Insumos y repuestos automotrices",
  },
};

export default async function CatalogoPage() {
  const products = await fetchProducts();
  const brands = getBrandsWithCount(products);

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-text-primary">
          Catálogo de Productos
        </h1>
        <p className="text-text-secondary mt-2">
          Explora los accesorios, aceites e insumos automotrices disponibles.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-text-secondary">Cargando catálogo...</div>}>
        <CatalogoClient products={products} brands={brands} />
      </Suspense>
    </div>
  );
}
