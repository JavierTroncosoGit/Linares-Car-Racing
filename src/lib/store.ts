import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  setIsDrawerOpen: (open: boolean) => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productSku: string) => void;
  updateQuantity: (productSku: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      setIsDrawerOpen: (open) => set({ isDrawerOpen: open }),

      addItem: (product: Product, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.product.sku === product.sku
        );

        if (existingItemIndex > -1) {
          // Item exists, update quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems, isDrawerOpen: true });
        } else {
          // Add new item
          set({ items: [...currentItems, { product, quantity }], isDrawerOpen: true });
        }
      },

      removeItem: (productSku: string) => {
        const currentItems = get().items;
        const filteredItems = currentItems.filter(
          (item) => item.product.sku !== productSku
        );
        set({ items: filteredItems });
      },

      updateQuantity: (productSku: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productSku);
          return;
        }

        const currentItems = get().items;
        const updatedItems = currentItems.map((item) =>
          item.product.sku === productSku ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "linares-cart", // Key updated as requested
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI open/close state
    }
  )
);

export interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    // Auto-remove after 4 seconds
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
