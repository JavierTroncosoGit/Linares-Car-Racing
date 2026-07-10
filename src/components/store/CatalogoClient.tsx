"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { 
  Search, 
  MessageSquare, 
  ArrowRight, 
  X, 
  Sliders, 
  Check, 
  ChevronDown
} from "lucide-react";
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

// Accent-insensitive and SEO-friendly slug generator
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

// Normalizes product names for unified [Tipo de producto] + [Marca] + [Modelo] structure
function formatProductName(name: string, brand: string): string {
  const brandUpper = brand.toUpperCase().trim();
  const nameUpper = name.toUpperCase().trim();
  let cleanName = name.trim();

  // Overrides for specific catalog inconsistencies to look extremely neat and structured
  if (nameUpper === "SATA ECONOLINE 1.8 P/PRIMER") {
    return "PISTOLA SATA ECONOLINE 1.8 P/PRIMER";
  }
  if (nameUpper === "SATA MASCARA PINTURA S.CAJA") {
    return "SEMIMASCARA DE PINTURA SATA S.CAJA";
  }
  if (nameUpper === "SUNMATCH 4") {
    return "LUZ DE TRABAJO SCANGRIP SUNMATCH 4";
  }
  if (nameUpper === "COLORMATCH SET 4") {
    return "KIT DE ILUMINACION SCANGRIP COLORMATCH SET 4";
  }
  if (nameUpper === "THINKCAR GDI 200") {
    return "BANCO DE PRUEBAS THINKCAR GDI 200";
  }
  if (nameUpper === "WHEEL BEAST") {
    return "LIMPIADOR DE LLANTAS SONAX WHEEL BEAST";
  }
  if (nameUpper === "SX90 PLUS 400 ML") {
    return "LUBRICANTE MULTIUSO SONAX SX90 PLUS 400 ML";
  }
  if (nameUpper === "VISION CLARA 250 ML") {
    return "LIMPIA PARABRISAS SONAX VISION CLARA 250 ML";
  }

  // Prepend product type "PISTOLA" for SATA guns if not present
  if (brandUpper === "SATA" && !nameUpper.startsWith("PISTOLA") && !nameUpper.startsWith("SEMIMASCARA") && !nameUpper.startsWith("MASCARA")) {
    if (cleanName.toUpperCase().startsWith("SATA")) {
      cleanName = cleanName.substring(4).trim();
    }
    return `PISTOLA SATA ${cleanName}`;
  }

  return name;
}

export default function CatalogoClient({ products }: CatalogoClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAreaSlug, setSelectedAreaSlug] = useState<string | null>(null);
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string | null>(null);
  
  // Mobile filter drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Brand search state inside filter menu
  const [brandSearch, setBrandSearch] = useState("");

  // Sort state
  const [sortBy, setSortBy] = useState("default");

  // Sync state with URL search params
  useEffect(() => {
    const areaParam = searchParams.get("area");
    const brandParam = searchParams.get("brand");
    
    setSelectedAreaSlug(areaParam || null);
    setSelectedBrandSlug(brandParam || null);
  }, [searchParams]);

  // 1. Calculate all unique areas from actual products list
  const areas = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      const areaName = (p.category || "General").trim();
      counts[areaName] = (counts[areaName] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        slug: slugify(name),
        count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // 2. Calculate dynamic available brands inside the selected area
  const availableBrands = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Filter products by selected area to count brands correctly
    const productsInArea = selectedAreaSlug
      ? products.filter((p) => slugify(p.category || "General") === selectedAreaSlug)
      : products;

    productsInArea.forEach((p) => {
      const brandName = (p.brand || "Genérico").trim();
      counts[brandName] = (counts[brandName] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        slug: slugify(name),
        count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, selectedAreaSlug]);

  // 3. Count products for the selected area
  const totalProductsInArea = useMemo(() => {
    if (!selectedAreaSlug) return products.length;
    return products.filter((p) => slugify(p.category || "General") === selectedAreaSlug).length;
  }, [products, selectedAreaSlug]);

  // 4. Filter brands based on the brand search input
  const searchedBrands = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    const query = brandSearch.toLowerCase().trim();
    return availableBrands.filter((b) => b.name.toLowerCase().includes(query));
  }, [availableBrands, brandSearch]);

  const handleAreaChange = (areaSlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (areaSlug) {
      params.set("area", areaSlug);
    } else {
      params.delete("area");
    }

    // Clean up brand filter if it is not available in the newly selected area
    const currentBrandSlug = params.get("brand");
    if (currentBrandSlug && areaSlug) {
      const productsInNewArea = products.filter(
        (p) => slugify(p.category || "General") === areaSlug
      );
      const brandExists = productsInNewArea.some(
        (p) => slugify(p.brand || "Genérico") === currentBrandSlug
      );
      if (!brandExists) {
        params.delete("brand");
      }
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBrandChange = (brandSlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (brandSlug) {
      params.set("brand", brandSlug);
    } else {
      params.delete("brand");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Area Filter
      if (selectedAreaSlug) {
        if (slugify(product.category || "General") !== selectedAreaSlug) {
          return false;
        }
      }

      // 2. Brand Filter
      if (selectedBrandSlug) {
        if (slugify(product.brand || "Genérico") !== selectedBrandSlug) {
          return false;
        }
      }

      // 3. Search Query Filter
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
  }, [products, selectedAreaSlug, selectedBrandSlug, searchQuery]);

  // 5. Sorted Products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "name-asc") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredProducts, sortBy]);

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

  const renderStars = (rating: number = 5) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <div className="flex items-center gap-0.5 text-[9px] sm:text-xs text-primary">
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  // Reusable Checklist filters rendering
  const renderFilterContent = (isMobile = false) => {
    return (
      <div className="space-y-6">
        {/* Areas Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary/70 border-b border-border pb-1.5 flex justify-between items-center">
            <span>Áreas</span>
            <span className="text-[10px] font-mono lowercase font-normal">({areas.length} áreas)</span>
          </h3>
          <ul className="space-y-1.5 text-sm select-none">
            <li>
              <button
                onClick={() => {
                  handleAreaChange(null);
                  if (isMobile) setIsDrawerOpen(false);
                }}
                className="w-full text-left py-2 px-1 flex items-center justify-between group transition-colors duration-200 cursor-pointer text-text-secondary hover:text-text-primary"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    selectedAreaSlug === null
                      ? "bg-primary border-primary text-bg-primary"
                      : "border-border group-hover:border-primary/50"
                  }`}>
                    {selectedAreaSlug === null && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-xs transition-colors duration-150 ${
                    selectedAreaSlug === null ? "font-extrabold text-primary" : "text-zinc-200 group-hover:text-white"
                  }`}>
                    Todas las áreas
                  </span>
                </div>
                <span className="text-[10px] font-mono text-text-secondary/80 bg-bg-primary/40 px-1.5 py-0.5 rounded font-bold">
                  {products.length}
                </span>
              </button>
            </li>
            {areas.map((area) => {
              const isSelected = selectedAreaSlug === area.slug;
              return (
                <li key={area.slug}>
                  <button
                    onClick={() => {
                      handleAreaChange(isSelected ? null : area.slug);
                      if (isMobile) setIsDrawerOpen(false);
                    }}
                    className="w-full text-left py-2 px-1 flex items-center justify-between group transition-colors duration-200 cursor-pointer text-text-secondary hover:text-text-primary"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-primary border-primary text-bg-primary"
                          : "border-border group-hover:border-primary/50"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`text-xs transition-colors duration-150 ${
                        isSelected ? "font-extrabold text-primary" : "text-zinc-200 group-hover:text-white"
                      }`}>
                        {area.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-text-secondary/80 bg-bg-primary/40 px-1.5 py-0.5 rounded font-bold">
                      {area.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Brands Checklist */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary/70 border-b border-border pb-1.5 flex justify-between items-center">
            <span>Marcas</span>
            <span className="text-[10px] font-mono lowercase font-normal">({availableBrands.length} disp.)</span>
          </h3>
          
          {/* Brand Search Input */}
          <div className="relative group w-full my-2">
            <input
              type="text"
              placeholder="Buscar marca..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full bg-bg-primary/50 border border-border p-2 pl-8 pr-8 rounded-lg text-xs text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary transition-all duration-300"
            />
            <Search className="w-3.5 h-3.5 text-text-secondary/60 absolute left-2.5 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
            {brandSearch && (
              <button
                onClick={() => setBrandSearch("")}
                className="text-xs text-text-secondary hover:text-primary absolute right-2.5 top-1/2 -translate-y-1/2 font-bold cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {searchedBrands.length === 0 ? (
            <p className="text-xs text-text-secondary/60 italic p-1">No hay marcas coincidentes</p>
          ) : (
            <ul className="space-y-1.5 text-sm select-none max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <li>
                <button
                  onClick={() => {
                    handleBrandChange(null);
                    if (isMobile) setIsDrawerOpen(false);
                  }}
                  className="w-full text-left py-2 px-1 flex items-center justify-between group transition-colors duration-200 cursor-pointer text-text-secondary hover:text-text-primary"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      selectedBrandSlug === null
                        ? "bg-primary border-primary text-bg-primary"
                        : "border-border group-hover:border-primary/50"
                    }`}>
                      {selectedBrandSlug === null && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={`text-xs transition-colors duration-150 ${
                      selectedBrandSlug === null ? "font-extrabold text-primary" : "text-zinc-200 group-hover:text-white"
                    }`}>
                      Todas las marcas
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-text-secondary/80 bg-bg-primary/40 px-1.5 py-0.5 rounded font-bold">
                    {totalProductsInArea}
                  </span>
                </button>
              </li>
              {searchedBrands.map((brand) => {
                const isSelected = selectedBrandSlug === brand.slug;
                return (
                  <li key={brand.slug}>
                    <button
                      onClick={() => {
                        handleBrandChange(isSelected ? null : brand.slug);
                        if (isMobile) setIsDrawerOpen(false);
                      }}
                      className="w-full text-left py-2 px-1 flex items-center justify-between group transition-colors duration-200 cursor-pointer text-text-secondary hover:text-text-primary"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-primary border-primary text-bg-primary"
                            : "border-border group-hover:border-primary/50"
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-xs transition-colors duration-150 ${
                          isSelected ? "font-extrabold text-primary" : "text-zinc-200 group-hover:text-white"
                        }`}>
                          {brand.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-text-secondary/80 bg-bg-primary/40 px-1.5 py-0.5 rounded font-bold">
                        {brand.count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Search and Filter trigger Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search Input */}
        <div className="relative group w-full flex-1">
          <input
            type="text"
            placeholder="Buscar por nombre, SKU o descripción"
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

        {/* Buttons: Filter (mobile only) & Sort (all screens) */}
        <div className="flex w-full md:w-auto gap-3 items-center">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-4 bg-bg-secondary border border-border rounded-xl text-sm font-bold text-text-primary hover:bg-border/20 transition-all cursor-pointer min-h-[50px]"
          >
            <Sliders className="w-4 h-4 text-primary" />
            <span>Filtrar</span>
          </button>

          {/* Sort Selector */}
          <div className="relative flex-1 md:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-3 pl-4 pr-10 bg-bg-secondary border border-border rounded-xl text-sm font-bold text-text-primary focus:outline-none focus:border-primary cursor-pointer appearance-none min-h-[50px]"
            >
              <option value="default">Recomendados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre: A-Z</option>
            </select>
            <ChevronDown className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        
        {/* 1. Mobile Filter Slider Panel (Drawer sliding from left) */}
        {isDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsDrawerOpen(false)}
            />
            
            {/* Drawer panel */}
            <div className="fixed inset-y-0 left-0 w-[310px] max-w-[85vw] bg-bg-secondary border-r border-border z-50 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out shadow-2xl">
              <div className="space-y-6 overflow-y-auto pb-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    <span className="font-heading font-black text-sm uppercase tracking-wider text-text-primary">
                      Catálogo
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-text-secondary hover:text-text-primary p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Filters Content */}
                {renderFilterContent(true)}
              </div>

              {/* Apply button */}
              <div className="pt-4 border-t border-border/80 mt-auto">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3 bg-primary text-bg-primary font-black uppercase text-xs tracking-wider rounded-xl hover:bg-primary-dark transition-all cursor-pointer shadow-lg shadow-primary/10"
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Desktop Sidebar Filters (Static left sidebar, no sticky/scroll-follow) */}
        <div className="hidden lg:block w-[280px] shrink-0">
          <div className="bg-bg-secondary border border-border/80 rounded-2xl p-5 space-y-6 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/60">
              <div className="w-1.5 h-5 bg-primary rounded-full" />
              <h2 className="text-sm font-extrabold font-heading text-text-primary uppercase tracking-wider">
                Filtros
              </h2>
            </div>
            {renderFilterContent(false)}
          </div>
        </div>

        {/* 3. Products Grid */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
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
                    router.push(pathname, { scroll: false });
                  }}
                  className="px-5 py-2.5 border border-border text-text-primary font-bold rounded hover:bg-border/20 transition-colors font-heading tracking-wide text-xs cursor-pointer"
                >
                  Ver catálogo completo
                </button>
              </div>
            </div>
          ) : (
            /* grid-cols-2 on mobile and small tablets, grid-cols-3 on medium, grid-cols-4 on xl desktops */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {sortedProducts.map((product, index) => {
                const hasDiscount = product.originalPrice && product.originalPrice > product.price;
                const discountPct = hasDiscount 
                  ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
                  : 0;

                return (
                  <div
                    key={product.sku}
                    className="border border-border/80 bg-bg-secondary p-3 sm:p-4 rounded-xl flex flex-col justify-between hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative group animate-fade-in"
                  >
                    <Link href={`/catalogo/${product.slug}`} className="block flex-grow">
                      
                      {/* Image Container with contain scale */}
                      <div className="aspect-square bg-bg-primary/30 border border-border/40 rounded-xl flex items-center justify-center p-2 relative overflow-hidden mb-3 group-hover:border-primary/30 transition-colors">
                        <Image
                          src={product.image || 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&h=600&fit=crop'}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          priority={index < 2}
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <div>
                        {/* Featured or Offer badge */}
                        {hasDiscount ? (
                          <span className="text-[9px] font-black tracking-wider uppercase bg-danger/20 text-danger border border-danger/35 px-2 py-0.5 rounded-md w-fit inline-block">
                            DESCUENTO -{discountPct}%
                          </span>
                        ) : product.featured ? (
                          <span className="text-[9px] font-black tracking-wider uppercase bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-md w-fit inline-block">
                            Destacado
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold tracking-wider uppercase text-text-secondary/40 px-2 py-0.5 border border-border/40 rounded-md w-fit inline-block font-mono">
                            Producto
                          </span>
                        )}

                        {/* Brand */}
                        <div className="text-[10px] font-black text-text-secondary/70 tracking-wider uppercase mt-2.5">
                          {highlightText(product.brand, searchQuery)}
                        </div>

                        {/* Title */}
                        <h3 className="font-extrabold text-text-primary text-xs sm:text-sm mt-1 line-clamp-2 uppercase font-heading min-h-[38px] leading-snug">
                          {highlightText(formatProductName(product.name, product.brand), searchQuery)}
                        </h3>

                        {/* SKU */}
                        <p className="text-[9px] sm:text-[10px] text-text-secondary/80 font-mono mt-0.5">
                          SKU: {highlightText(product.sku, searchQuery)}
                        </p>

                        {/* Stars Rating */}
                        <div className="flex items-center gap-1 mt-2">
                          {renderStars(product.rating || 5)}
                          <span className="text-[9px] sm:text-[10px] text-text-secondary/85 font-mono font-bold">
                            ({product.reviewCount || 10})
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Pricing and Cart button at the bottom - fixed height to align all buttons */}
                    <div className="mt-4 pt-3 border-t border-border/50 flex justify-between items-end gap-2 h-[52px] relative">
                      <div className="flex flex-col justify-end h-full min-w-0">
                        {hasDiscount && (
                          <span className="text-[10px] sm:text-xs text-zinc-400/90 font-semibold line-through font-mono leading-none">
                            {formatCLP(product.originalPrice!)}
                          </span>
                        )}
                        <div className="flex items-center flex-wrap gap-1.5 mt-0.5">
                          <span className="font-black text-primary font-heading text-sm sm:text-base whitespace-nowrap">
                            {formatCLP(product.price)}
                          </span>
                        </div>
                      </div>
                      <AddToCartButton 
                        product={product} 
                        iconOnly 
                        className="rounded-full w-9 h-9 sm:w-10 sm:h-10 p-0 flex items-center justify-center shrink-0 min-h-0 hover:scale-105 active:scale-95 z-10 cursor-pointer shadow-lg shadow-primary/5" 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
