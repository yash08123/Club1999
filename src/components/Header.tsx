'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-[var(--color-border)] bg-[#F4F4F2]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Left side: Bitnomial-style logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="club1999 home"
          >
            {/* Hexagon icon like Bitnomial */}
            <div className="relative flex h-9 w-9 items-center justify-center border border-[#111111] bg-white transition-colors group-hover:bg-[#111111]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#111111] transition-colors group-hover:text-[#FA5438]"
                aria-hidden="true"
              >
                {/* Clean geometric monogram */}
                <path
                  d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinejoin="miter"
                />
                <path
                  d="M9 10L12 8L15 10M12 8V16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-[#111111]">
                CLUB1999
              </span>
            </div>
          </Link>

          {/* Vertical divider */}
          <div className="hidden h-5 w-px bg-[var(--color-border)] sm:block" />

          {/* Monospace tagline */}
          <span className="hidden font-mono text-xs uppercase tracking-wider text-[#777777] md:block">
            ₹1,999 Chunk Splitter
          </span>
        </div>

        {/* Center / Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-6 lg:flex">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#555555]">
            <span className="text-[#FA5438]">01</span> {'//'} Max ₹1,999
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#555555]">
            <span className="text-[#FA5438]">02</span> {'//'} 100% Parody
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#555555]">
            <span className="text-[#FA5438]">03</span> {'//'} Client-Side
          </span>
        </nav>

        {/* Right side: Status Tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-[var(--color-border)] bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#333333]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>SYSTEM ACTIVE</span>
          </div>

          <div className="hidden sm:block">
            <span className="border border-[#111111] bg-[#111111] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#FA5438]">
              ₹1,999 MAX
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
