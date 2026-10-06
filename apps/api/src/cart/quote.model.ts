import { Cents } from '../common/money';

export interface QuoteLine {
  productId: number;
  name: string;
  quantity: number;
  unitPriceCents: Cents;
  totalCents: Cents;
}

export interface QuoteDiscount {
  code: string;
  label: string;
  amountCents: Cents;
}

export interface CartQuote {
  currency: 'EUR';
  lines: QuoteLine[];
  subtotalCents: Cents;
  discounts: QuoteDiscount[];
  shippingCents: Cents;
  totalCents: Cents;
}
