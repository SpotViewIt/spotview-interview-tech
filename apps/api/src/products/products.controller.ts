import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CATEGORIES, ListProductsQuery } from './dto/list-products.query';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  list(@Query() query: ListProductsQuery) {
    return this.productsService.list(query);
  }

  @Get('categories')
  categories() {
    return CATEGORIES;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }
}
