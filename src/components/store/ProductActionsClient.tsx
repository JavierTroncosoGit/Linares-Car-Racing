"use client";

import { useState } from "react";
import { MessageSquare, Plus, Minus } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import { Product } from "@/types/product";

interface ProductActionsClientProps {
  product: Product;
}

export default function ProductActionsClient({ product }: ProductActionsClientProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 99) {
      setQuantity(val);
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector de cantidad */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-wider text-text-secondary select-none">
          Cantidad:
        </span>
        <div className="flex items-center border border-border rounded bg-bg-primary h-11 overflow-hidden">
          <button
            onClick={decrement}
            type="button"
            className="w-11 h-full text-text-secondary hover:text-text-primary hover:bg-border/20 transition-colors flex items-center justify-center font-bold cursor-pointer"
            aria-label="Disminuir cantidad"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center text-sm font-semibold text-text-primary bg-transparent focus:outline-none border-x border-border h-full select-none"
            aria-label="Cantidad seleccionada"
          />
          <button
            onClick={increment}
            type="button"
            className="w-11 h-full text-text-secondary hover:text-text-primary hover:bg-border/20 transition-colors flex items-center justify-center font-bold cursor-pointer"
            aria-label="Incrementar cantidad"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <AddToCartButton
          product={product}
          quantity={quantity}
          className="flex-1 py-3.5 text-sm uppercase tracking-wider"
        />
        <a
          href={`https://wa.me/56949340772?text=${encodeURIComponent(
            `Hola Racing Cars, me interesa cotizar el producto: ${product.name} (SKU: ${product.sku}) - Cantidad: ${quantity}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 text-center rounded-md border border-border bg-bg-secondary hover:bg-border/20 text-text-primary font-extrabold font-heading text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] uppercase"
        >
          <MessageSquare className="w-4 h-4" />
          Consultar
        </a>
      </div>
    </div>
  );
}
