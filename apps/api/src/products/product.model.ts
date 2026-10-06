export type Category = 'audio' | 'computer' | 'smartphone' | 'casa' | 'accessori';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  priceCents: number;
  stock: number;
  createdAt: string; // ISO date
  imageUrl: string;
}
