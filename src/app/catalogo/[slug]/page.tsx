import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProducts } from "@/lib/sheets";
import { getProductBySlug, getComplementaryProducts } from "@/lib/products";
import { formatCLP } from "@/lib/format";
import siteConfig from "@/lib/config";
import ProductActionsClient from "@/components/store/ProductActionsClient";
import ProductImageClient from "@/components/store/ProductImageClient";
import ProductTabs from "@/components/store/ProductTabs";
import { Star, StarHalf, AlertTriangle } from "lucide-react";

// Use revalidate seconds from configuration
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await fetchProducts();
  const product = getProductBySlug(products, slug);

  if (!product) {
    return {
      title: "Producto no encontrado — Racing Cars",
      description: "El producto que buscas no existe o no se encuentra disponible.",
    };
  }

  const title = `${product.name} — ${product.brand} | Racing Cars`;
  const description = product.description
    ? product.description.substring(0, 155)
    : `Compra ${product.name} en Racing Cars Linares. Calidad, repuestos y accesorios premium para tu vehículo.`;
  const canonicalUrl = `${siteConfig.seo.canonicalUrl || "https://racingcarslinares.cl"}/catalogo/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
      type: "website",
      locale: siteConfig.seo.locale || "es_CL",
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const products = await fetchProducts();
  const product = getProductBySlug(products, slug);

  if (!product) {
    notFound();
  }

  const recommendedProducts = getComplementaryProducts(products, product);

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-text-secondary mb-6 flex flex-wrap items-center gap-1.5 select-none font-light">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>&gt;</span>
        <Link href="/catalogo" className="hover:text-primary transition-colors">
          Catálogo
        </Link>
        <span>&gt;</span>
        <Link href={`/catalogo?brand=${product.brand.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "")}`} className="hover:text-primary transition-colors uppercase font-semibold">
          {product.brand}
        </Link>
        <span>&gt;</span>
        <span className="text-text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      <Link href="/catalogo" className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-1 mb-6">
        ← Volver al Catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-border bg-bg-secondary p-6 sm:p-8 rounded-lg">
        {/* Product Image container */}
        <ProductImageClient images={product.images || [product.image]} alt={product.name} />

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              {siteConfig.store.productDetail.showBrand && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary font-heading uppercase tracking-wider">
                  {product.brand}
                </span>
              )}
              {siteConfig.store.productDetail.showSku && (
                <span className="text-xs text-text-secondary font-mono">
                  SKU: {product.sku}
                </span>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-text-primary mt-3 uppercase tracking-wide">
              {product.name}
            </h1>
            
            {/* Stars Rating */}
            {product.rating && siteConfig.store.productDetail.showRating && (
              <div className="flex items-center gap-2 mt-2 select-none">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1;
                    const isHalf = product.rating! % 1 !== 0 && starValue === Math.ceil(product.rating!);
                    const isFull = starValue <= Math.floor(product.rating!);
                    return (
                      <span key={i} className="text-primary">
                        {isFull ? (
                          <Star className="w-4 h-4 fill-primary" />
                        ) : isHalf ? (
                          <StarHalf className="w-4 h-4 fill-primary" />
                        ) : (
                          <Star className="w-4 h-4 text-border" />
                        )}
                      </span>
                    );
                  })}
                </div>
                <span className="text-xs text-text-secondary font-medium">
                  {product.rating} / 5 ({product.reviewCount || 0} valoraciones)
                </span>
              </div>
            )}
            
            <p className="text-xs text-text-secondary mt-2">
              Marca: <span className="text-text-primary uppercase font-semibold">{product.brand}</span>
            </p>

            {/* Stock badge */}
            {typeof product.stock === "number" && siteConfig.store.productDetail.showStock && (
              <div className="mt-4">
                {product.stock === 0 ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-border text-text-secondary font-bold text-[10px] uppercase tracking-wider">
                    Sin Stock — Consultar Disponibilidad
                  </div>
                ) : product.stock <= 3 ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-danger/10 border border-danger/20 text-danger font-bold text-[10px] uppercase tracking-wider animate-pulse-stock">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    ¡Últimas {product.stock} unidades en stock!
                  </div>
                ) : product.stock <= 10 ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-wider">
                    {product.stock} unidades disponibles
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-success/10 border border-success/20 text-success font-bold text-[10px] uppercase tracking-wider">
                    En Stock
                  </div>
                )}
              </div>
            )}

            {/* Short introduction to keep clean top detail */}
            <p className="text-sm text-text-secondary mt-5 border-t border-border/30 pt-4 font-light leading-relaxed">
              {product.description
                ? product.description.length > 140
                  ? `${product.description.substring(0, 140)}...`
                  : product.description
                : "Sin descripción disponible."}
            </p>
          </div>

          <div className="mt-8 border-t border-border/50 pt-6">
            {/* Price section with discount anchoring */}
            <div className="flex flex-col gap-1.5 mb-4">
              {product.originalPrice && product.originalPrice > product.price && siteConfig.store.productDetail.showDiscount && (
                <div className="flex items-center gap-2 select-none">
                  <span className="text-sm text-text-secondary line-through font-mono">
                    {formatCLP(product.originalPrice)}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-danger text-text-primary text-[10px] font-bold tracking-wider font-heading">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-heading text-primary">
                  {formatCLP(product.price)}
                </span>
                <span className="text-xs text-text-secondary">PVP IVA Incl.</span>
              </div>
            </div>

            {/* Quantity Selector & Checkout Actions */}
            <ProductActionsClient product={product} />
          </div>
        </div>
      </div>

      {/* Interactive Tabs: Description, Technical Specs and Reviews */}
      {siteConfig.store.productDetail.showSpecs && (
        <ProductTabs product={product} />
      )}

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <div className="mt-16 border-t border-border/50 pt-12">
          <h2 className="text-xl sm:text-2xl font-black font-heading text-text-primary uppercase tracking-wider mb-6">
            Productos Recomendados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((p) => (
              <Link
                key={p.sku}
                href={`/catalogo/${p.slug}`}
                className="border border-border bg-bg-secondary p-4 rounded-xl flex flex-col justify-between hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                <div>
                  <span className="text-[10px] font-bold text-primary font-heading uppercase tracking-widest">
                    {p.brand}
                  </span>
                  <h3 className="font-extrabold text-sm text-text-primary mt-1 line-clamp-2 uppercase font-heading min-h-[40px]">
                    {p.name}
                  </h3>
                  <p className="text-[10px] text-text-secondary font-mono mt-0.5">
                    SKU: {p.sku}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50 flex justify-between items-center">
                  <span className="font-bold text-primary font-heading text-base">
                    {formatCLP(p.price)}
                  </span>
                  <span className="text-[10px] font-bold text-text-primary group-hover:text-primary transition-colors font-heading uppercase tracking-wider">
                    Ver más →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
