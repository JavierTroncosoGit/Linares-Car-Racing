import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store";

export function useCart() {
  const [mounted, setMounted] = useState(false);
  
  const items = useCartStore((state) => state.items);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const setIsDrawerOpen = useCartStore((state) => state.setIsDrawerOpen);
  
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    items: mounted ? items : [],
    isDrawerOpen: mounted ? isDrawerOpen : false,
    openDrawer,
    closeDrawer,
    setIsDrawerOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: mounted ? totalItems : 0,
    totalPrice: mounted ? totalPrice : 0,
    isHydrated: mounted,
  };
}
export default useCart;
