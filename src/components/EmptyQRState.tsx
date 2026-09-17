import { CHUNK_AMOUNT } from '@/types/payment';
import { formatINR } from '@/lib/formatting';

interface EmptyQRStateProps {
  hasAmount: boolean;
  amount: number;
}

export default function EmptyQRState({ hasAmount, amount }: EmptyQRStateProps) {
  return (
    <div className="relative border border-dashed border-[#C8C8C4] bg-white p-8 sm:p-10 text-center">
      {/* Corner crosshairs like Bitnomial architectural blueprints */}
      <span className="absolute top-2 left-2 font-mono text-xs text-[#999999] select-none">+</span>
      <span className="absolute top-2 right-2 font-mono text-xs text-[#999999] select-none">+</span>
      <span className="absolute bottom-2 left-2 font-mono text-xs text-[#999999] select-none">+</span>
      <span className="absolute bottom-2 right-2 font-mono text-xs text-[#999999] select-none">+</span>

      {/* Center icon / monogram */}
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-[#111111] bg-[#F4F4F2]">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[#111111]"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" strokeLinejoin="miter" />
          <rect x="14" y="3" width="7" height="7" strokeLinejoin="miter" />
          <rect x="3" y="14" width="7" height="7" strokeLinejoin="miter" />
          <rect x="14" y="14" width="3" height="3" />
          <rect x="18" y="14" width="3" height="3" />
          <rect x="14" y="18" width="3" height="3" />
          <rect x="18" y="18" width="3" height="3" />
        </svg>
      </div>

      <div className="font-mono text-[11px] uppercase tracking-widest text-[#FA5438] font-semibold">
        [ ENGINE READY ]
      </div>

      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#111111] mt-2">
        Awaiting Payment Input
      </h3>

      <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-[#666666] leading-relaxed">
        Fill in your payment details on the left. We&apos;ll split your total
        into chunks of {formatINR(CHUNK_AMOUNT)} or less just to prove a point.
      </p>

      {/* Steps */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[var(--color-border)] pt-6 text-left">
        <div className="border border-[var(--color-border)] bg-[#F4F4F2] p-3">
          <span className="font-mono text-[10px] font-bold text-[#FA5438]">01 // ENTER</span>
          <p className="mt-1 font-mono text-[11px] text-[#444444]">Specify amount &amp; payee UPI</p>
        </div>
        <div className="border border-[var(--color-border)] bg-[#F4F4F2] p-3">
          <span className="font-mono text-[10px] font-bold text-[#FA5438]">02 // CHUNK</span>
          <p className="mt-1 font-mono text-[11px] text-[#444444]">Auto-split into ₹1,999 chunks</p>
        </div>
        <div className="border border-[var(--color-border)] bg-[#F4F4F2] p-3">
          <span className="font-mono text-[10px] font-bold text-[#FA5438]">03 // COLLECT</span>
          <p className="mt-1 font-mono text-[11px] text-[#444444]">Make them scan every single one</p>
        </div>
      </div>

      {hasAmount && (
        <div className="mt-6 inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-4 py-2 font-mono text-xs uppercase tracking-widest text-white">
          <span className="text-[#FA5438]">READY TO SPLIT:</span>
          <span className="font-bold text-white">{formatINR(amount)}</span>
        </div>
      )}
    </div>
  );
}
