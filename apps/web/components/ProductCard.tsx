import Link from 'next/link';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.imageUrl} alt={product.name} />
      <div className="body">
        <h3>{product.name}</h3>
        <span className="price">{formatPrice(product.priceCents)}</span>{' '}
        {product.stock === 0 ? <span className="badge out">Esaurito</span> : <span className="badge">{product.category}</span>}
      </div>
    </Link>
  );
}
