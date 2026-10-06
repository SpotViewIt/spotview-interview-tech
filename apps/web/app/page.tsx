import { CategoryFilter } from '@/components/CategoryFilter';
import { Pagination } from '@/components/Pagination';
import { ProductCard } from '@/components/ProductCard';
import { getCategories, getProducts } from '@/lib/api';
import type { Category } from '@/lib/types';

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category as Category | undefined;
  const page = Number(params.page ?? 1) || 1;

  const [categories, products] = await Promise.all([getCategories(), getProducts({ category, page })]);

  return (
    <>
      <h1>Prodotti</h1>
      <div className="toolbar">
        <CategoryFilter categories={categories} />
        <span className="muted">{products.total} prodotti</span>
      </div>
      <div className="grid">
        {products.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination page={products.page} totalPages={products.totalPages} />
    </>
  );
}
