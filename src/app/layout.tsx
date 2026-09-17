import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, Space_Mono } from 'next/font/google';
import PostHogProvider from '@/components/PostHogProvider';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans-body',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono-fallback',
});

export const metadata: Metadata = {
  title: 'club1999 — Split UPI Payments into ₹1,999 Chunks',
  description:
    'Split large UPI invoices into clean ₹1,999 chunks. Institutional architectural precision with zero setup or transaction fees. Built for laughs.',
  keywords: ['club1999', 'UPI payment splitter', '1999 UPI', 'split payment', 'UPI QR generator'],
  openGraph: {
    title: 'club1999 — Split UPI Payments into ₹1,999 Chunks',
    description: 'Split large UPI payments into chunks of ₹1,999. Simple, fast, and 100% on-device.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#121212',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${spaceMono.variable}`}>
      <body className="antialiased bg-[#F4F4F2] text-[#111111] font-sans selection:bg-[#FA5438]/20 selection:text-[#111111]">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
