import type { PaymentChunk } from '@/types/payment';
import QRCard from './QRCard';

interface QRGridProps {
  chunks: PaymentChunk[];
  upiId: string;
  accountHolder: string;
  paymentNote: string;
}

export default function QRGrid({
  chunks,
  upiId,
  accountHolder,
  paymentNote,
}: QRGridProps) {
  return (
    <div className="border border-[var(--color-border)] bg-[#ECECE9]/30 p-3 sm:p-4">
      {/* Scrollable window top bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#FA5438] font-bold">[</span>
          <span className="font-bold text-[#111111] uppercase tracking-wider">
            QR CHUNKS ({String(chunks.length).padStart(2, '0')})
          </span>
          <span className="text-[#FA5438] font-bold">]</span>
        </div>
        <span className="text-[11px] text-[#777777] hidden sm:inline font-mono">
          Scroll window to view all · Print for full export
        </span>
      </div>

      {/* Scrollable Viewport Window */}
      <div className="qr-scroll-window max-h-[560px] overflow-y-auto pr-1 sm:pr-1.5">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {chunks.map((chunk) => (
            <QRCard
              key={chunk.index}
              chunk={chunk}
              upiId={upiId}
              accountHolder={accountHolder}
              paymentNote={paymentNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
