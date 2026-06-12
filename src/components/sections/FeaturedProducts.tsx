import Link from "next/link";
import siteConfig from "@/lib/config";
import { fetchProducts } from "@/lib/sheets";
import { getFeaturedProducts } from "@/lib/products";
import FeaturedProductsClient from "./FeaturedProductsClient";

export const revalidate = 60;

export default async function FeaturedProducts() {
  const section = siteConfig.pages.landing.sections.find((s) => s.type === "featured-products");
  if (!section) return null;

  const products = await fetchProducts();
  const featured = getFeaturedProducts(products, section.ctaCatalog ? 8 : 4);

  return (
    <section id="productos-destacados" className="w-full bg-bg-secondary py-20 lg:py-28 border-b border-border/50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            {section.sectionLabel && (
              <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading border-b border-primary/20 pb-1">
                {section.sectionLabel}
              </span>
            )}
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-text-primary mt-4 tracking-tight uppercase">
              {section.headline}
            </h2>
            {section.subheadline && (
              <p className="text-text-secondary mt-3 text-sm sm:text-base font-light">
                {section.subheadline}
              </p>
            )}
          </div>
          {section.ctaCatalog && (
            <Link
              href={section.ctaCatalog.href}
              className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-bg-primary rounded-md font-bold font-heading text-sm tracking-wider transition-all duration-300 flex-shrink-0 cursor-pointer self-start md:self-auto text-center"
            >
              {section.ctaCatalog.text.toUpperCase()}
            </Link>
          )}
        </div>

        {/* Featured Products Grid Wrapper */}
        {featured.length === 0 ? (
          <div className="border border-dashed border-border p-12 text-center rounded-lg">
            <h3 className="font-bold text-text-primary">Vitrina sin productos</h3>
            <p className="text-sm text-text-secondary mt-1">
              No hay productos destacados habilitados actualmente. Visita el catálogo para ver todos los productos.
            </p>
          </div>
        ) : (
          <FeaturedProductsClient products={featured} />
        )}
      </div>
    </section>
  );
}
