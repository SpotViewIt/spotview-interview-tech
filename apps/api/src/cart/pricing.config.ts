import { Cents } from '../common/money';

export interface PricingOptions {
  currency: 'EUR';
  shippingCents: Cents;
  freeShippingThresholdCents: Cents;
  /** Coupon codes (already validated) to apply to the quote. */
  coupons: string[];
}

export const DEFAULT_PRICING_OPTIONS: PricingOptions = {
  currency: 'EUR',
  shippingCents: 590,
  freeShippingThresholdCents: 5000,
  coupons: [],
};
