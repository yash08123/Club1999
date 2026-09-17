'use client';

import { useCallback, useState, useRef } from 'react';
import Header from '@/components/Header';
import PaymentDetails from '@/components/PaymentDetails';
import PaymentSummary from '@/components/PaymentSummary';
import Footer from '@/components/Footer';
import { splitAmount, verifyChunks } from '@/lib/payment';
import { parseAmount } from '@/lib/validation';
import { trackEvent } from '@/lib/analytics';
import type { PaymentFormData, PaymentResult } from '@/types/payment';

export default function Home() {
  const [formData, setFormData] = useState<PaymentFormData>({
    upiId: '',
    accountHolder: '',
    amount: '',
    paymentNote: '',
  });
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const lastGeneratedAmountRef = useRef<string>('');

  // When form data changes, clear QRs if amount changed
  const handleFormChange = useCallback(
    (newData: PaymentFormData) => {
      setFormData(newData);

      // If amount changed from what was generated, clear QRs
      if (result && newData.amount !== lastGeneratedAmountRef.current) {
        setResult(null);
      }
    },
    [result]
  );

  const handleGenerate = useCallback(
    (data: PaymentFormData) => {
      setIsGenerating(true);

      requestAnimationFrame(() => {
        try {
          const amount = parseAmount(data.amount);

          if (isNaN(amount) || amount <= 0) {
            trackEvent('qr_generation_failed', { reason: 'invalid_amount' });
            setIsGenerating(false);
            return;
          }

          const chunks = splitAmount(amount);

          if (!verifyChunks(chunks, amount)) {
            console.error(
              'Chunk verification failed: sum of chunks does not equal total amount'
            );
            trackEvent('qr_generation_failed', {
              reason: 'verification_failed',
            });
            setIsGenerating(false);
            return;
          }

          const paymentResult: PaymentResult = {
            chunks,
            totalAmount: amount,
            upiId: data.upiId.trim(),
            accountHolder: data.accountHolder.trim(),
            paymentNote: data.paymentNote.trim(),
          };

          setResult(paymentResult);
          lastGeneratedAmountRef.current = data.amount;
          trackEvent('qr_generation_success', {
            total_amount: amount,
            qr_count: chunks.length,
          });
        } catch (error) {
          console.error('QR generation error:', error);
          trackEvent('qr_generation_failed', { reason: 'exception' });
        } finally {
          setIsGenerating(false);
        }
      });
    },
    []
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F4F2] bg-architectural-grid">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-8 sm:pt-12 pb-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-10 xl:gap-12 items-start">
          {/* Left column: Payment form */}
          <div className="no-print lg:sticky lg:top-24">
            <PaymentDetails
              formData={formData}
              onFormChange={handleFormChange}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right column: Live summary + QR codes */}
          <div>
            <PaymentSummary formData={formData} result={result} />
          </div>
        </div>
      </main>

      <Footer />

      {/* Print-only header */}
      <div className="print-only fixed left-0 top-0 w-full border-b border-black bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg font-bold text-black">CLUB1999</span>
            <span className="font-mono text-xs text-gray-600">— UPI Payment QR Chunks</span>
          </div>
          <span className="font-mono text-xs text-gray-500">MAX ₹1,999 PER QR</span>
        </div>
      </div>
    </div>
  );
}
