'use client';

import { useState } from 'react';
import { addToCart } from '@/lib/cart-storage';

export function AddToCartButton({ productId, disabled }: { productId: number; disabled?: boolean }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        addToCart(productId);
        setAdded(true);
      }}
    >
      {added ? 'Aggiunto ✓' : 'Aggiungi al carrello'}
    </button>
  );
}
