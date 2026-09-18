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
  metadataBase: new URL('https://club1999.vercel.app'),
  title: 'club1999 — Split UPI Payments into ₹1,999 Chunks',
  description:
    'Split large UPI invoices into clean ₹1,999 chunks. Same bill. Smaller payments. Bigger laughs. 100% client-side parody project.',
  keywords: ['club1999', 'UPI payment splitter', '1999 UPI', 'split payment', 'UPI QR generator', 'MDR parody'],
  openGraph: {
    title: 'club1999 — Split UPI Payments into ₹1,999 Chunks',
    description: 'Same bill. Smaller payments. Bigger laughs. Deliberately breaks payments into sub-₹2,000 chunks.',
    url: 'https://club1999.vercel.app',
    siteName: 'club1999',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://club1999.vercel.app/og-image.png',
        secureUrl: 'https://club1999.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'club1999 — Split UPI Payments into ₹1,999 Chunks',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'club1999 — Split UPI Payments into ₹1,999 Chunks',
    description: 'Same bill. Smaller payments. Bigger laughs. Deliberately breaks payments into sub-₹2,000 chunks.',
    images: ['https://club1999.vercel.app/og-image.png'],
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
