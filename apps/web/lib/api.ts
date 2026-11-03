import type { CartItem, CartQuote, Category, Paginated, Product } from './types';

// Server side we call the API directly; in the browser we go through the Next.js proxy (/api, see next.config.mjs).
const API_URL = typeof window === 'undefined' ? (process.env.API_URL ?? 'http://localhost:3001') : '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Request failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface ProductListParams {
  category?: Category;
  page?: number;
}

export function getProducts(params: ProductListParams): Promise<Paginated<Product>> {
  const search = new URLSearchParams();
  if (params.category) search.set('category', params.category);
  if (params.page) search.set('page', String(params.page));
  return request(`/products?${search.toString()}`);
}

export function getCategories(): Promise<Category[]> {
  return request('/products/categories');
}

export function getProduct(id: number): Promise<Product> {
  return request(`/products/${id}`);
}

export function quoteCart(items: CartItem[], couponCode?: string): Promise<CartQuote> {
  return request('/cart/quote', { method: 'POST', body: JSON.stringify({ items, couponCode }) });
}
