import type { CartItem } from './types';

const KEY = 'shop.cart';

export function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? '[]') as CartItem[];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]): void {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('cart-change'));
}

export function addToCart(productId: number, quantity = 1): void {
  const items = readCart();
  const existing = items.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, quantity });
  }
  writeCart(items);
}

export function removeFromCart(productId: number): void {
  writeCart(readCart().filter((item) => item.productId !== productId));
}
