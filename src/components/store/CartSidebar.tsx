"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { formatCLP } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingCart, ArrowRight, X } from "lucide-react";
import { useState } from "react";

export default function CartSidebar() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeItem,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();

  const [confirmClear, setConfirmClear] = useState(false);

  const handleClear = () => {
    if (confirmClear) {
      clearCart();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000); // Reset confirmation after 3s
    }
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-md bg-bg-secondary border-l border-border flex flex-col justify-between h-full p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <SheetTitle className="text-xl font-black font-heading text-text-primary uppercase tracking-wide">
              Tu Carrito ({totalItems})
            </SheetTitle>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-text-secondary hover:text-primary transition-colors cursor-pointer rounded-full hover:bg-border/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Cerrar Carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-border/20 flex items-center justify-center text-text-secondary">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-text-primary text-lg font-heading uppercase tracking-wide">
                  Tu carrito está vacío
                </h3>
                <p className="text-sm text-text-secondary mt-1 font-light max-w-[250px] mx-auto leading-relaxed">
                  Agrega productos del catálogo para cotizar tu compra de inmediato.
                </p>
              </div>
              <Link
                href="/catalogo"
                onClick={() => setIsDrawerOpen(false)}
                className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-bg-primary font-bold rounded hover:bg-primary-dark transition-colors font-heading text-xs tracking-wider uppercase cursor-pointer"
              >
                Explorar catálogo
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.sku}
                  className="flex gap-4 p-3 border border-border bg-bg-primary/50 rounded-xl relative group transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-neutral-900 border border-border rounded-lg overflow-hidden flex items-center justify-center relative flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Info details */}
                  <div className="flex-grow min-w-0 pr-4">
                    <span className="text-[10px] font-bold text-primary font-heading uppercase tracking-wider block">
                      {item.product.brand}
                    </span>
                    <h4 className="font-bold text-text-primary text-xs truncate uppercase tracking-wide">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-text-secondary font-mono">
                      SKU: {item.product.sku}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      {/* Quantity buttons (Touch target >= 44px for buttons) */}
                      <div className="flex items-center border border-border rounded bg-bg-primary h-8 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.sku, item.quantity - 1)}
                          className="w-8 h-full text-text-secondary hover:text-text-primary hover:bg-border/20 transition-colors flex items-center justify-center font-bold cursor-pointer"
                          aria-label="Restar uno"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-text-primary h-full flex items-center justify-center border-x border-border select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.sku, item.quantity + 1)}
                          className="w-8 h-full text-text-secondary hover:text-text-primary hover:bg-border/20 transition-colors flex items-center justify-center font-bold cursor-pointer"
                          aria-label="Sumar uno"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="font-bold text-text-primary text-xs font-heading">
                        {formatCLP(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Delete button (Touch target 44px) */}
                  <button
                    onClick={() => removeItem(item.product.sku)}
                    className="absolute top-2 right-2 text-text-secondary hover:text-danger p-1 rounded transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                    aria-label="Quitar producto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Clear cart button */}
              <div className="pt-2 text-right">
                <button
                  onClick={handleClear}
                  className={`text-xs font-semibold uppercase tracking-wider font-heading transition-colors cursor-pointer ${
                    confirmClear ? "text-danger underline font-bold" : "text-text-secondary hover:text-primary"
                  }`}
                >
                  {confirmClear ? "¿Estás seguro? Vaciar" : "Vaciar carrito"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border/50 bg-bg-primary space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                Total Estimado
              </span>
              <span className="text-2xl font-black text-primary font-heading tracking-wide">
                {formatCLP(totalPrice)}
              </span>
            </div>

            <div className="space-y-2">
              <Link
                href="/carrito"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-3.5 bg-primary text-bg-primary font-black font-heading text-xs tracking-widest rounded hover:bg-primary-dark transition-all flex items-center justify-center gap-1.5 uppercase shadow hover:shadow-primary/15 cursor-pointer min-h-[44px]"
              >
                Ver Carrito Completo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold font-heading text-text-secondary hover:text-text-primary transition-colors cursor-pointer uppercase tracking-wider min-h-[44px]"
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
