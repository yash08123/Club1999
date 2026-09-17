export default function Footer() {
  return (
    <footer className="no-print mt-20 border-t border-[#262626] bg-[#121212] text-[#A0A0A0]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="max-w-3xl space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center border border-[#333333] bg-black text-[#FA5438]">
              <span className="font-mono text-xs font-bold">19</span>
            </div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              CLUB1999
            </span>
            <span className="border border-[#262626] bg-[#181818] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#FA5438]">
              PARODY PROJECT
            </span>
          </div>

          {/* Sarcastic MDR Parody Explanation & Disclaimer */}
          <div className="border-l-2 border-[#FA5438] bg-[#181818] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#FA5438] font-bold">
                [ WHY ₹1,999? // THE SUB-₹2,000 MDR LOOPHOLE ]
              </p>
              <span className="font-mono text-[9px] text-[#777777] uppercase">
                OCT 15, 2026 FRAMEWORK
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
              From October 15, 2026, merchant UPI payments above ₹2,000 face up to 0.4% MDR. But payments up to ₹2,000 remain completely free! The government reassured everyone that 96% of transactions are untouched, and MDR is merely &ldquo;absorbed within the ecosystem.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed">
              Naturally, club1999 exists solely to solve this monumental crisis: why pay a single paisa above ₹2,000 when you can aggressively split your bill into chunks of ₹1,999 and make your cashier scan 15 QR codes in a row?
            </p>
            <div className="pt-2 border-t border-[#262626] text-[11px] text-[#888888] leading-relaxed">
              <strong className="text-[#FA5438]">Reality Check:</strong> P2P transfers are already free anyway, and this whole site is an elaborate joke. We are not tax lawyers, RBI officials, or responsible adults. If you actually try to settle a ₹2,00,000 car purchase in ₹1,999 slices, please seek professional help.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] text-[#555555]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© 2026 CLUB1999 · 100% SATIRE</span>
            <span>·</span>
            <span>
              Made by{' '}
              <a
                href="https://www.linkedin.com/in/yashn108"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FA5438] underline underline-offset-2 hover:text-white transition-colors font-medium"
              >
                Yash
              </a>
            </span>
          </div>
          <span className="text-[#FA5438]">ALL CHUNKS ≤ ₹1,999.00 (MDR IMMUNE)</span>
        </div>
      </div>
    </footer>
  );
}
