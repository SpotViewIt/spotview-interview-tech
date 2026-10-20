import { BadRequestException, Injectable } from '@nestjs/common';
import { percentOf, sum } from '../common/money';
import { ProductsService } from '../products/products.service';
import { COUPONS, normalizeCouponCode } from './coupons';
import { QuoteCartDto } from './dto/quote-cart.dto';
import { DEFAULT_PRICING_OPTIONS, PricingOptions } from './pricing.config';
import { CartQuote, QuoteDiscount, QuoteLine } from './quote.model';

@Injectable()
export class CartService {
  constructor(private readonly productsService: ProductsService) {}

  quote(dto: QuoteCartDto): CartQuote {
    const options = this.buildPricingOptions(dto);
    const lines = this.buildLines(dto);
    const subtotalCents = sum(lines.map((line) => line.totalCents));

    const discounts: QuoteDiscount[] = [];
    let shippingCents = subtotalCents >= options.freeShippingThresholdCents ? 0 : options.shippingCents;

    for (const code of options.coupons) {
      const coupon = COUPONS[code];
      if (!coupon || subtotalCents < coupon.minSubtotalCents) {
        continue;
      }
      if (coupon.effect.type === 'percent') {
        discounts.push({
          code: coupon.code,
          label: coupon.label,
          amountCents: percentOf(subtotalCents, coupon.effect.percent),
        });
      } else if (coupon.effect.type === 'free-shipping' && shippingCents > 0) {
        discounts.push({ code: coupon.code, label: coupon.label, amountCents: shippingCents });
        shippingCents = 0;
      }
    }

    const percentDiscounts = sum(
      discounts.filter((d) => COUPONS[d.code].effect.type === 'percent').map((d) => d.amountCents),
    );

    return {
      currency: options.currency,
      lines,
      subtotalCents,
      discounts,
      shippingCents,
      totalCents: Math.max(0, subtotalCents - percentDiscounts) + shippingCents,
    };
  }

  private buildPricingOptions(dto: QuoteCartDto): PricingOptions {
    const options: PricingOptions = { ...DEFAULT_PRICING_OPTIONS };

    if (dto.couponCode) {
      const code = normalizeCouponCode(dto.couponCode);
      if (!COUPONS[code]) {
        throw new BadRequestException(`Coupon ${code} non valido`);
      }
      if (!options.coupons.includes(code)) {
        options.coupons.push(code);
      }
    }

    return options;
  }

  private buildLines(dto: QuoteCartDto): QuoteLine[] {
    const products = this.productsService.findManyByIds(dto.items.map((item) => item.productId));

    return dto.items.map((item) => {
      const product = products.get(item.productId);
      if (!product) {
        throw new BadRequestException(`Prodotto ${item.productId} non trovato`);
      }
      if (item.quantity > product.stock) {
        throw new BadRequestException(`Disponibilità insufficiente per ${product.name}`);
      }
      return {
        productId: product.id,
        name: product.name,
        quantity: item.quantity,
        unitPriceCents: product.priceCents,
        totalCents: product.priceCents * item.quantity,
      };
    });
  }
}
