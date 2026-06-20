"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search, MessageSquare, ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { formatCLP } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";

interface BrandInfo {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface CatalogoClientProps {
  products: Product[];
  brands: BrandInfo[];
}

export default function CatalogoClient({ products, brands }: CatalogoClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  // Sync brand state with search query param
  useEffect(() => {
    const brandSlug = searchParams.get("brand");
    if (brandSlug) {
      const foundBrand = brands.find((b) => b.slug === brandSlug || b.id === brandSlug);
      if (foundBrand) {
        setSelectedBrandId(foundBrand.id);
      } else {
        setSelectedBrandId(null);
      }
    } else {
      setSelectedBrandId(null);
    }
  }, [searchParams, brands]);

  const handleBrandChange = (brandId: string | null) => {
    setSelectedBrandId(brandId);
    
    const params = new URLSearchParams(searchParams.toString());
    if (brandId) {
      const brand = brands.find((b) => b.id === brandId);
      if (brand) {
        params.set("brand", brand.slug);
      }
    } else {
      params.delete("brand");
    }
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Brand Filter
      if (selectedBrandId) {
        const brand = brands.find((b) => b.id === selectedBrandId);
        if (brand && product.brand.toLowerCase().trim() !== brand.name.toLowerCase().trim()) {
          return false;
        }
      }

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        return (
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [products, brands, selectedBrandId, searchQuery]);

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-primary/20 text-primary font-bold px-0.5 rounded select-all">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Marcas */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-heading text-primary border-b border-border pb-2 uppercase tracking-wider">
          Marcas
        </h2>
        {brands.length === 0 ? (
          <p className="text-sm text-text-secondary">No hay marcas disponibles.</p>
        ) : (
          <ul className="space-y-1.5 text-sm select-none">
            <li>
              <button
                onClick={() => handleBrandChange(null)}
                className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedBrandId === null
                    ? "font-bold text-primary bg-primary/10 border border-primary/20"
                    : "text-text-secondary hover:text-text-primary hover:bg-border/20 border border-transparent"
                }`}
              >
                Todas ({products.length})
              </button>
            </li>
            {brands.map((brand) => (
              <li key={brand.id}>
                <button
                  onClick={() => handleBrandChange(brand.id)}
                  className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer flex justify-between items-center ${
                    selectedBrandId === brand.id
                      ? "font-bold text-primary bg-primary/10 border border-primary/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-border/20 border border-transparent"
                  }`}
                >
                  <span className="truncate pr-2">{brand.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    selectedBrandId === brand.id ? "bg-primary/20 text-primary" : "bg-bg-primary text-text-secondary"
                  }`}>
                    {brand.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Productos Grid */}
      <div className="lg:col-span-3 space-y-6">
        {/* Search input bar */}
        <div className="relative group w-full">
          <input
            type="text"
            placeholder="Buscar por nombre, marca o SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-secondary border border-border p-3.5 pl-11 pr-16 rounded-xl text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 shadow-sm text-base"
          />
          <Search className="w-5 h-5 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-text-secondary hover:text-primary absolute right-4 top-1/2 -translate-y-1/2 font-bold font-heading uppercase cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="border border-dashed border-border p-12 text-center rounded-xl space-y-4 max-w-xl mx-auto">
            <h3 className="font-extrabold text-text-primary text-lg font-heading uppercase tracking-wide">
              No encontramos productos
            </h3>
            <p className="text-sm text-text-secondary font-light">
              ¿Buscas algún repuesto o accesorio especial? Contáctanos directamente por WhatsApp y lo cotizamos de inmediato.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/56949340772?text=${encodeURIComponent(
                  `Hola Racing Cars, busco un producto/repuesto que no encontré en el catálogo: "${searchQuery}"`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-primary text-bg-primary font-bold rounded hover:bg-primary-dark transition-colors font-heading tracking-wide flex items-center gap-2 cursor-pointer text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                Consultar por WhatsApp
              </a>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBrandId(null);
                }}
                className="px-5 py-2.5 border border-border text-text-primary font-bold rounded hover:bg-border/20 transition-colors font-heading tracking-wide text-xs cursor-pointer"
              >
                Ver catálogo completo
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.sku}
                className="border border-border bg-bg-secondary p-4 rounded-xl flex flex-col justify-between hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                <Link href={`/catalogo/${product.slug}`} className="block flex-grow">
                  <div className="aspect-square bg-bg-primary border border-border/50 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden group-hover:border-primary/50 transition-colors">
                    <Image
                      src={product.image || 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&h=600&fit=crop'}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary font-heading uppercase tracking-widest">
                      {highlightText(product.brand, searchQuery)}
                    </span>
                    <h3 className="font-extrabold text-text-primary text-base mt-1 line-clamp-2 uppercase font-heading min-h-[44px]">
                      {highlightText(product.name, searchQuery)}
                    </h3>
                    <p className="text-[10px] text-text-secondary font-mono mt-0.5">
                      SKU: {highlightText(product.sku, searchQuery)}
                    </p>
                    <p className="text-sm text-text-secondary mt-2.5 line-clamp-2 font-light leading-relaxed">
                      {highlightText(product.description, searchQuery)}
                    </p>
                  </div>
                </Link>
                <div className="mt-5 pt-4 border-t border-border/50 flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <span className="font-black text-primary font-heading text-base sm:text-lg">
                      {formatCLP(product.price)}
                    </span>
                    <Link
                      href={`/catalogo/${product.slug}`}
                      className="text-[10px] font-bold text-text-secondary hover:text-primary transition-colors font-heading uppercase tracking-wider flex items-center gap-0.5 mt-0.5"
                    >
                      Detalle
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <AddToCartButton product={product} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
