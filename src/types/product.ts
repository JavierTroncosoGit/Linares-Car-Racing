export interface Product {
  sku: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
