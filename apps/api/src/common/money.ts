/**
 * All monetary values are handled as integer cents to avoid floating point issues.
 */
export type Cents = number;

export function percentOf(amount: Cents, percent: number): Cents {
  return Math.round((amount * percent) / 100);
}

export function sum(values: Cents[]): Cents {
  return values.reduce((acc, value) => acc + value, 0);
}
