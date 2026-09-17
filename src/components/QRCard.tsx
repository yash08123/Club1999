'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { generateQRDataUrl, downloadQRImage } from '@/lib/qr';
import { buildUpiUrl } from '@/lib/upi';
import { formatINR } from '@/lib/formatting';
import { trackEvent } from '@/lib/analytics';
import type { PaymentChunk } from '@/types/payment';

interface QRCardProps {
  chunk: PaymentChunk;
  upiId: string;
  accountHolder: string;
  paymentNote: string;
}

export default function QRCard({
  chunk,
  upiId,
  accountHolder,
  paymentNote,
}: QRCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const upiUrl = buildUpiUrl({
      payeeVpa: upiId,
      payeeName: accountHolder,
      amount: chunk.amount,
      transactionNote: paymentNote,
    });

    generateQRDataUrl(upiUrl)
      .then((url) => {
        if (mountedRef.current) {
          setQrDataUrl(url);
          setError(false);
        }
      })
      .catch(() => {
        if (mountedRef.current) {
          setError(true);
          trackEvent('qr_generation_failed', {
            payment_index: chunk.index,
            amount: chunk.amount,
          });
        }
      });
  }, [chunk.amount, chunk.index, upiId, accountHolder, paymentNote]);

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return;

    const filename = `club1999-chunk-${chunk.index}-${chunk.amount}.png`;
    downloadQRImage(qrDataUrl, filename);
    trackEvent('qr_downloaded', {
      payment_index: chunk.index,
      amount: chunk.amount,
    });
  }, [qrDataUrl, chunk.index, chunk.amount]);

  const togglePaid = () => {
    const nextState = !isPaid;
    setIsPaid(nextState);
    trackEvent('qr_paid_toggled', {
      payment_index: chunk.index,
      amount: chunk.amount,
      is_paid: nextState,
    });
  };

  return (
    <div
      className={`print-break-inside-avoid border transition-all duration-200 bg-white p-5 ${
        isPaid
          ? 'border-emerald-300 bg-emerald-50/30 opacity-80'
          : 'border-[var(--color-border)] hover:border-[#111111]'
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-wider text-[#111111] font-bold">
          [ CHUNK {String(chunk.index).padStart(2, '0')} / {String(chunk.total).padStart(2, '0')} ]
        </span>
        <button
          type="button"
          onClick={togglePaid}
          className={`no-print border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
            isPaid
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-[var(--color-border)] bg-[#F4F4F2] text-[#666666] hover:border-[#111111] hover:text-[#111111]'
          }`}
          title={isPaid ? 'Mark as unpaid' : 'Mark as paid'}
        >
          {isPaid ? '✓ PAID' : 'PENDING'}
        </button>
      </div>

      {/* QR Code Container with crisp architectural frame */}
      <div className="flex items-center justify-center border border-[var(--color-border)] bg-white p-4">
        {error ? (
          <div className="flex h-44 w-44 items-center justify-center bg-red-50 text-center p-4">
            <p className="font-mono text-xs text-[#E04B2E]">
              Generation error.
              <br />
              Please retry.
            </p>
          </div>
        ) : qrDataUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={qrDataUrl}
            alt={`club1999 QR code for chunk ${chunk.index} of ${formatINR(chunk.amount)}`}
            width={180}
            height={180}
            className={`h-auto w-full max-w-[180px] transition-opacity ${
              isPaid ? 'opacity-40 grayscale' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="flex h-44 w-44 items-center justify-center">
            <svg
              className="h-6 w-6 animate-spin text-[#FA5438]"
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Generating QR code"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-20"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-90"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Amount in PP Neue Machina */}
      <div className="mt-4 text-center">
        <p className="font-display text-2xl font-bold tracking-tight text-[#111111]">
          {formatINR(chunk.amount)}
        </p>
        <p className="font-mono text-xs text-[#777777] mt-0.5 truncate">
          {upiId}
        </p>
      </div>

      {/* Action button */}
      <div className="mt-4 no-print">
        <button
          type="button"
          onClick={handleDownload}
          disabled={!qrDataUrl || error}
          className="flex w-full items-center justify-center gap-2 border border-[#111111] bg-white py-2.5 font-mono text-xs uppercase tracking-wider text-[#111111] transition-all hover:bg-[#111111] hover:text-[#FA5438] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>DOWNLOAD PNG</span>
        </button>
      </div>
    </div>
  );
}
