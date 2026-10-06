import type { Metadata } from 'next';
import Link from 'next/link';
import { CartLink } from '@/components/CartLink';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Demo e-commerce',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <header className="site">
          <Link href="/">Shop</Link>
          <CartLink />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
