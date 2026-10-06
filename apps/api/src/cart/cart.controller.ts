import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { QuoteCartDto } from './dto/quote-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('quote')
  @HttpCode(200)
  quote(@Body() dto: QuoteCartDto) {
    return this.cartService.quote(dto);
  }
}
