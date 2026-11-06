import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/common/BackToTop';

export const metadata: Metadata = {
  title: {
    template: '%s | Grier House Museum & Library',
    default: 'Grier House Museum & Library',
  },
  description:
    'Home of the Grier House Museum & Library, custodian of the history and traditions of Grier House, Government College Ibadan.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
