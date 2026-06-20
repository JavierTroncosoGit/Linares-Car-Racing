export interface Product {
  sku: string;
  name: string;
  description: string;
  descriptionLong?: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  stock?: number;
  rating?: number;
  reviewCount?: number;
  specs?: string;
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
