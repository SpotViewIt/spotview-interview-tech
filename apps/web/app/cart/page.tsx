'use client';

import { useCallback, useEffect, useState } from 'react';
import { quoteCart } from '@/lib/api';
import { readCart, removeFromCart } from '@/lib/cart-storage';
import { formatPrice } from '@/lib/format';
import type { CartItem, CartQuote } from '@/lib/types';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponInput, setCouponInput] = useState('');
  const [couponCode, setCouponCode] = useState<string | undefined>();
  const [quote, setQuote] = useState<CartQuote | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    window.addEventListener('cart-change', sync);
    return () => window.removeEventListener('cart-change', sync);
  }, []);

  const refreshQuote = useCallback(async () => {
    if (items.length === 0) {
      setQuote(null);
      return;
    }
    try {
      setError(null);
      setQuote(await quoteCart(items, couponCode));
    } catch (e) {
      setError((e as Error).message);
    }
  }, [items, couponCode]);

  useEffect(() => {
    refreshQuote();
  }, [refreshQuote]);

  if (items.length === 0) {
    return <p>Il carrello è vuoto.</p>;
  }

  return (
    <>
      <h1>Carrello</h1>
      {error && <p className="error">{error}</p>}
      {quote && (
        <>
          <table>
            <thead>
              <tr>
                <th>Prodotto</th>
                <th>Qtà</th>
                <th>Prezzo</th>
                <th>Totale</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {quote.lines.map((line) => (
                <tr key={line.productId}>
                  <td>{line.name}</td>
                  <td>{line.quantity}</td>
                  <td>{formatPrice(line.unitPriceCents)}</td>
                  <td>{formatPrice(line.totalCents)}</td>
                  <td>
                    <button className="secondary" onClick={() => removeFromCart(line.productId)}>
                      Rimuovi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary">
            <form
              className="toolbar"
              onSubmit={(e) => {
                e.preventDefault();
                setCouponCode(couponInput || undefined);
              }}
            >
              <input
                placeholder="Codice sconto"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button type="submit">Applica</button>
            </form>
            <div>
              <span>Subtotale</span>
              <span>{formatPrice(quote.subtotalCents)}</span>
            </div>
            {quote.discounts.map((discount) => (
              <div key={discount.code}>
                <span>{discount.label}</span>
                <span>-{formatPrice(discount.amountCents)}</span>
              </div>
            ))}
            <div>
              <span>Spedizione</span>
              <span>{quote.shippingCents === 0 ? 'Gratis' : formatPrice(quote.shippingCents)}</span>
            </div>
            <div className="total">
              <span>Totale</span>
              <span>{formatPrice(quote.totalCents)}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
