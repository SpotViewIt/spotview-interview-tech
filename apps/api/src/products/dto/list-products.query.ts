import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Category } from '../product.model';

export const CATEGORIES: Category[] = ['audio', 'computer', 'smartphone', 'casa', 'accessori'];

export class ListProductsQuery {
  @IsOptional()
  @IsIn(CATEGORIES)
  category?: Category;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(48)
  limit: number = 8;
}
