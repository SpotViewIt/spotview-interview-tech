import { BadRequestException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CartService } from './cart.service';

// Reference products (see products.data.ts)
const CAVO_USB_C = 8; // 9,90 €
const HUB_USB_C = 4; // 39,90 €
const MOUSE = 14; // 39,90 €
const WEBCAM = 9; // 119,90 €, stock 3

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService(new ProductsService());
  });

  describe('totals', () => {
    it('computes subtotal and adds shipping below the free shipping threshold', () => {
      const quote = service.quote({ items: [{ productId: CAVO_USB_C, quantity: 2 }] });

      expect(quote.subtotalCents).toBe(1980);
      expect(quote.shippingCents).toBe(590);
      expect(quote.discounts).toEqual([]);
      expect(quote.totalCents).toBe(2570);
    });

    it('offers free shipping above the threshold', () => {
      const quote = service.quote({ items: [{ productId: HUB_USB_C, quantity: 2 }] });

      expect(quote.subtotalCents).toBe(7980);
      expect(quote.shippingCents).toBe(0);
      expect(quote.totalCents).toBe(7980);
    });

    it('rejects quantities above the available stock', () => {
      expect(() => service.quote({ items: [{ productId: WEBCAM, quantity: 5 }] })).toThrow(
        BadRequestException,
      );
    });
  });

  describe('coupons', () => {
    it('rejects an unknown coupon', () => {
      expect(() =>
        service.quote({ items: [{ productId: MOUSE, quantity: 1 }], couponCode: 'NOPE' }),
      ).toThrow(BadRequestException);
    });

    it('applies WELCOME10 (case insensitive)', () => {
      const quote = service.quote({ items: [{ productId: MOUSE, quantity: 1 }], couponCode: ' welcome10 ' });

      expect(quote.discounts).toContainEqual({ code: 'WELCOME10', label: 'Benvenuto -10%', amountCents: 399 });
      expect(quote.totalCents).toBe(3990 - 399 + 590);
    });

    it('applies FREESHIP', () => {
      const quote = service.quote({ items: [{ productId: HUB_USB_C, quantity: 1 }], couponCode: 'FREESHIP' });

      expect(quote.shippingCents).toBe(0);
      expect(quote.discounts).toContainEqual({ code: 'FREESHIP', label: 'Spedizione gratuita', amountCents: 590 });
    });

    it('ignores BLACK20 below the minimum subtotal', () => {
      const quote = service.quote({ items: [{ productId: HUB_USB_C, quantity: 1 }], couponCode: 'BLACK20' });

      expect(quote.discounts.find((d) => d.code === 'BLACK20')).toBeUndefined();
    });
  });
});
