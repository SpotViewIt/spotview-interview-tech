'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readCart } from '@/lib/cart-storage';

export function CartLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(readCart().reduce((acc, item) => acc + item.quantity, 0));
    sync();
    window.addEventListener('cart-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('cart-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return <Link href="/cart">Carrello ({count})</Link>;
}
