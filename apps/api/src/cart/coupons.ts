import { Cents } from '../common/money';

export type CouponEffect =
  | { type: 'percent'; percent: number }
  | { type: 'free-shipping' };

export interface Coupon {
  code: string;
  label: string;
  effect: CouponEffect;
  minSubtotalCents: Cents;
}

export const COUPONS: Record<string, Coupon> = {
  WELCOME10: {
    code: 'WELCOME10',
    label: 'Benvenuto -10%',
    effect: { type: 'percent', percent: 10 },
    minSubtotalCents: 0,
  },
  FREESHIP: {
    code: 'FREESHIP',
    label: 'Spedizione gratuita',
    effect: { type: 'free-shipping' },
    minSubtotalCents: 2000,
  },
  BLACK20: {
    code: 'BLACK20',
    label: 'Black Week -20%',
    effect: { type: 'percent', percent: 20 },
    minSubtotalCents: 10000,
  },
};

export function normalizeCouponCode(code: string): string {
  return code.trim().toUpperCase();
}
