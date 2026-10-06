import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  it('returns the first page with the default limit', () => {
    const result = service.list({ page: 1, limit: 8 });
    expect(result.items).toHaveLength(8);
    expect(result.page).toBe(1);
    expect(result.total).toBe(25);
    expect(result.totalPages).toBe(4);
  });

  it('returns the remaining items on the last page', () => {
    const result = service.list({ page: 4, limit: 8 });
    expect(result.items).toHaveLength(1);
  });

  it('filters by category', () => {
    const result = service.list({ category: 'audio', page: 1, limit: 48 });
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((p) => p.category === 'audio')).toBe(true);
    expect(result.total).toBe(result.items.length);
  });

  it('finds a product by id', () => {
    expect(service.findById(1).id).toBe(1);
  });

  it('throws when the product does not exist', () => {
    expect(() => service.findById(9999)).toThrow(NotFoundException);
  });
});
