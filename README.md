# club1999

An over-engineered, institutional-aesthetic parody web app that slices large UPI transactions into sub-₹2,000 chunks (specifically ₹1,999 each) to remain humorously "MDR immune" following the October 15, 2026 UPI MDR framework.

## Features

- **Bitnomial-Inspired Technical Aesthetic**: Architectural hairline grid, high-contrast palette, authentic `PP Neue Machina` and `PP Neue Montreal Mono` typography, and vibrant coral `#FA5438` accents.
- **Client-Side Greedy Chunking**: Splits any amount up to ₹1,99,900 into chunks capped at ₹1,999.
- **Scrollable QR Viewport**: Contained multi-QR window so long lists of QR codes don't break page layout.
- **Print & PDF Export**: Instant print stylesheet formatting that expands all QR codes cleanly across printable pages.
- **Zero Remote Storage / 100% On-Device**: All UPI strings and QR matrices are generated locally in your browser.
- **PostHog Analytics Integration**: Graceful optional telemetry for pageviews and chunk generation events.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. (Optional) Set up PostHog analytics in `.env.local`:
```env
NEXT_PUBLIC_POSTHOG_KEY=your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm run start
```

## Deployment

Deploy directly on [Vercel](https://vercel.com) or any Next.js-compatible host. Zero databases or backend servers required.
