import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';

export class CartItemDto {
  @IsInt()
  productId!: number;

  @IsInt()
  @Min(1)
  @Max(99)
  quantity!: number;
}

export class QuoteCartDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items!: CartItemDto[];

  @IsOptional()
  @IsString()
  couponCode?: string;
}
