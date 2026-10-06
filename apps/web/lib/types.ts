export type Category = 'audio' | 'computer' | 'smartphone' | 'casa' | 'accessori';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  priceCents: number;
  stock: number;
  createdAt: string;
  imageUrl: string;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartQuote {
  currency: 'EUR';
  lines: { productId: number; name: string; quantity: number; unitPriceCents: number; totalCents: number }[];
  subtotalCents: number;
  discounts: { code: string; label: string; amountCents: number }[];
  shippingCents: number;
  totalCents: number;
}
