import { Injectable, NotFoundException } from '@nestjs/common';
import { PRODUCTS } from './data/products.data';
import { ListProductsQuery } from './dto/list-products.query';
import { Product } from './product.model';

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

@Injectable()
export class ProductsService {
  private readonly products: Product[] = PRODUCTS;

  list(query: ListProductsQuery): Paginated<Product> {
    const { category, page = 1, limit = 8 } = query;

    let result = this.products;
    if (category) {
      result = result.filter((product) => product.category === category);
    }

    const total = result.length;
    const start = (page - 1) * limit;

    return {
      items: result.slice(start, start + limit),
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  }

  findById(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  findManyByIds(ids: number[]): Map<number, Product> {
    return new Map(this.products.filter((p) => ids.includes(p.id)).map((p) => [p.id, p]));
  }
}
