import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, CartModule],
})
export class AppModule {}
