const formatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

export function formatPrice(cents: number): string {
  return formatter.format(cents / 100);
}
