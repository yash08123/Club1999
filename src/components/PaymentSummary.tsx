'use client';

import {
  CHUNK_AMOUNT,
  type PaymentFormData,
  type PaymentResult,
} from '@/types/payment';
import { formatINR } from '@/lib/formatting';
import { parseAmount } from '@/lib/validation';
import { splitAmount } from '@/lib/payment';
import { trackEvent } from '@/lib/analytics';
import RecipientSummary from './RecipientSummary';
import QRGrid from './QRGrid';
import Disclaimer from './Disclaimer';
import EmptyQRState from './EmptyQRState';

interface PaymentSummaryProps {
  formData: PaymentFormData;
  result: PaymentResult | null;
}

export default function PaymentSummary({
  formData,
  result,
}: PaymentSummaryProps) {
  const handlePrint = () => {
    trackEvent('print_clicked');
    window.print();
  };

  // Compute live preview from form data
  const parsedAmount = parseAmount(formData.amount);
  const hasValidAmount = !isNaN(parsedAmount) && parsedAmount > 0;
  const liveChunks = hasValidAmount ? splitAmount(parsedAmount) : [];
  const hasRecipient =
    formData.accountHolder.trim().length > 0 &&
    formData.upiId.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Header with Bitnomial tag and Print button */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#FA5438] font-semibold">
            [ 02 // SETTLEMENT LEDGER ]
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mt-1">
            Payment Summary
          </h2>
        </div>

        {result && (
          <button
            type="button"
            onClick={handlePrint}
            className="no-print flex items-center gap-2 border border-[#111111] bg-white px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-[#111111] transition-all hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>PRINT ALL QRS</span>
          </button>
        )}
      </div>

      {/* Live summary card — updates in real-time as user types in the form */}
      {hasValidAmount && (
        <div className="border border-[var(--color-border)] bg-white p-5 sm:p-6">
          {/* Header pill */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#777777]">
              LIVE TRANSACTION SPECIFICATION
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#FA5438] font-bold">
              ● REAL-TIME SYNC
            </span>
          </div>

          {/* Big display total */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#666666]">
              Total Invoiced Amount
            </p>
            <p className="font-display mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
              {formatINR(parsedAmount)}
            </p>
          </div>

          {/* Stats grid */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="border border-[var(--color-border)] bg-[#F4F4F2] p-3.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#777777]">
                Total QR Codes
              </p>
              <p className="font-display mt-1 text-xl font-bold text-[#111111]">
                {liveChunks.length}
              </p>
            </div>
            <div className="border border-[var(--color-border)] bg-[#F4F4F2] p-3.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#777777]">
                Chunk Cap
              </p>
              <p className="font-display mt-1 text-xl font-bold text-[#111111]">
                {formatINR(CHUNK_AMOUNT)}
              </p>
            </div>
          </div>

          {/* Recipient preview */}
          {hasRecipient && (
            <div className="mt-4">
              <RecipientSummary
                accountHolder={formData.accountHolder.trim()}
                upiId={formData.upiId.trim()}
              />
            </div>
          )}
        </div>
      )}

      {/* QR Cards or Empty State */}
      {result ? (
        <div className="space-y-6">
          <QRGrid
            chunks={result.chunks}
            upiId={result.upiId}
            accountHolder={result.accountHolder}
            paymentNote={result.paymentNote}
          />
          <Disclaimer />
        </div>
      ) : (
        <EmptyQRState
          hasAmount={hasValidAmount}
          amount={hasValidAmount ? parsedAmount : 0}
        />
      )}
    </div>
  );
}
