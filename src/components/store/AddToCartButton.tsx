"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore, useToastStore } from "@/lib/store";
import { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);
  const items = useCartStore((state) => state.items);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const exists = items.some((item) => item.product.sku === product.sku);
    
    addItem(product, quantity);
    setAdded(true);
    
    if (exists) {
      addToast(`Cantidad actualizada: ${product.name}`, "success");
    } else {
      addToast(`✓ ${product.name} agregado al carrito`, "success");
    }
    
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`min-h-[44px] py-2 px-4 rounded-md font-bold font-heading text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
        added
          ? "bg-success text-bg-primary"
          : "bg-primary text-bg-primary hover:bg-primary-dark shadow hover:shadow-primary/20"
      } ${className || ""}`}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5" />
          ¡AGREGADO!
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5" />
          AÑADIR
        </>
      )}
    </button>
  );
}
