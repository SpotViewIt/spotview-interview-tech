import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/AddToCartButton';
import { getProduct } from '@/lib/api';
import { formatPrice } from '@/lib/format';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(Number(id)).catch(() => null);
  if (!product) notFound();

  return (
    <>
      <p>
        <Link href="/">← Torna ai prodotti</Link>
      </p>
      <div className="detail">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl} alt={product.name} />
        <div>
          <span className="badge">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="price">{formatPrice(product.priceCents)}</p>
          <p className="muted">{product.stock > 0 ? `Disponibili: ${product.stock}` : 'Esaurito'}</p>
          <AddToCartButton productId={product.id} disabled={product.stock === 0} />
        </div>
      </div>
    </>
  );
}
