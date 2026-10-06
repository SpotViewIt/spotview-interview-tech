'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Category } from '@/lib/types';

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get('category') ?? '';

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    params.delete('page'); // a new filter always starts from the first page
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label>
      Categoria{' '}
      <select value={current} onChange={(e) => onChange(e.target.value)}>
        <option value="">Tutte</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  );
}
