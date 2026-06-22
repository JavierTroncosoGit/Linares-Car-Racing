"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, FileText, MessageSquare } from "lucide-react";
import { Product } from "@/types/product";

interface ProductTabsProps {
  product: Product;
}

type TabType = "description" | "specs" | "reviews";

export default function ProductTabs({ product }: ProductTabsProps) {
  // Parse specifications
  const specsList = product.specs
    ? product.specs
        .split("|")
        .map((spec) => {
          const parts = spec.split(":");
          if (parts.length >= 2) {
            return {
              key: parts[0].trim(),
              value: parts.slice(1).join(":").trim(),
            };
          }
          return null;
        })
        .filter((item): item is { key: string; value: string } => item !== null)
    : [];

  const hasSpecs = specsList.length > 0;
  const hasReviews = typeof product.rating === "number" && product.rating > 0;

  // Determine available tabs
  const tabs: { id: TabType; label: string }[] = [{ id: "description", label: "Descripción" }];
  if (hasSpecs) {
    tabs.push({ id: "specs", label: "Ficha Técnica" });
  }
  tabs.push({ id: "reviews", label: "Opiniones" });

  const [activeTab, setActiveTab] = useState<TabType>("description");

  // Render stars helper
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="relative inline-flex items-center justify-center">
            {/* Empty background star */}
            <Star className="w-4 h-4 text-neutral-600 fill-neutral-800/40" />
            {/* Half filled star overlay */}
            <span className="absolute top-0 left-0 w-1/2 h-full overflow-hidden pointer-events-none">
              <Star className="w-4 h-4 fill-primary text-primary max-w-none" />
            </span>
          </span>
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-neutral-600 fill-neutral-800/40" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="mt-12 border border-border bg-bg-secondary rounded-lg overflow-hidden">
      {/* Navigation tabs */}
      <div className="flex border-b border-border bg-neutral-900/60 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-4 text-sm font-bold font-heading uppercase tracking-wider cursor-pointer whitespace-nowrap focus:outline-none transition-colors ${
                isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content panel */}
      <div className="p-6 sm:p-8 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "description" && (
              <div className="prose prose-invert max-w-none text-base text-text-secondary font-light leading-relaxed whitespace-pre-line">
                {product.descriptionLong || product.description || "Sin descripción disponible."}
              </div>
            )}

            {activeTab === "specs" && hasSpecs && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border/80">
                      <th className="py-3 px-4 font-bold font-heading uppercase text-text-primary bg-bg-primary/45 w-1/3">
                        Especificación
                      </th>
                      <th className="py-3 px-4 font-bold font-heading uppercase text-text-primary bg-bg-primary/45">
                        Detalle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specsList.map((spec, index) => (
                      <tr
                        key={index}
                        className={`border-b border-border/40 transition-colors hover:bg-neutral-900/20 ${
                          index % 2 === 0 ? "bg-bg-primary/20" : "bg-transparent"
                        }`}
                      >
                        <td className="py-3 px-4 font-semibold text-text-primary capitalize">
                          {spec.key}
                        </td>
                        <td className="py-3 px-4 text-text-secondary font-light">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {hasReviews ? (
                  <div className="flex flex-col md:flex-row items-center gap-8 bg-bg-primary/30 p-6 rounded-xl border border-border/40">
                    <div className="text-center md:border-r md:border-border/60 md:pr-10">
                      <div className="text-5xl font-black font-heading text-text-primary mb-1">
                        {product.rating?.toFixed(1)}
                      </div>
                      <div className="flex justify-center gap-1 mb-2">
                        {renderStars(product.rating || 0)}
                      </div>
                      <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold">
                        Basado en {product.reviewCount || 0} valoraciones
                      </div>
                    </div>
                    <div className="flex-1 space-y-4 text-center md:text-left">
                      <h4 className="text-lg font-bold font-heading text-text-primary uppercase tracking-wide">
                        Calidad de material y acabados comprobada
                      </h4>
                      <p className="text-sm text-text-secondary font-light max-w-xl">
                        Nuestros clientes valoran excelentemente este producto en cuanto a precisión y durabilidad. Racing Cars Linares garantiza la legitimidad y calidad original de todos sus repuestos e insumos.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-8 space-y-4 max-w-md mx-auto">
                    <div className="p-4 bg-bg-primary/50 border border-border rounded-full text-text-secondary">
                      <Star className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-text-primary text-base font-heading uppercase tracking-wide">
                        Aún no hay opiniones de este producto
                      </h4>
                      <p className="text-sm text-text-secondary font-light mt-1.5 leading-relaxed">
                        ¿Tienes dudas sobre la compatibilidad o calidad de esta herramienta? Consúltanos directamente.
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/56949340772?text=${encodeURIComponent(
                        `Hola Racing Cars, tengo una consulta sobre el producto: ${product.name} (SKU: ${product.sku}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-primary/10 border border-primary/20 text-primary font-bold rounded-lg hover:bg-primary/20 transition-all font-heading tracking-wide flex items-center gap-2 cursor-pointer text-xs uppercase"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Preguntar por WhatsApp
                    </a>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
