'use client';

import { useCallback, useRef, useState } from 'react';
import FormField from './FormField';
import { trackEvent } from '@/lib/analytics';
import { MAX_TOTAL_AMOUNT, type FormErrors, type PaymentFormData } from '@/types/payment';
import { validateForm, isFormValid } from '@/lib/validation';

interface PaymentDetailsProps {
  formData: PaymentFormData;
  onFormChange: (data: PaymentFormData) => void;
  onGenerate: (data: PaymentFormData) => void;
  isGenerating: boolean;
}

export default function PaymentDetails({
  formData,
  onFormChange,
  onGenerate,
  isGenerating,
}: PaymentDetailsProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formStartedRef = useRef(false);

  const handleChange = useCallback(
    (field: keyof PaymentFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Numbers only check for amount field
        if (field === 'amount') {
          value = value.replace(/[^0-9]/g, '');
        }

        const newData = { ...formData, [field]: value };
        onFormChange(newData);

        // Track form started
        if (!formStartedRef.current) {
          formStartedRef.current = true;
          trackEvent('form_started');
        }

        if (field === 'upiId' && value.length > 0) {
          trackEvent('upi_id_entered');
        } else if (field === 'amount' && value.length > 0) {
          trackEvent('amount_entered');
        }

        // Clear error for this field if it was touched
        if (touched[field]) {
          const newErrors = validateForm(newData);
          setErrors((prev) => ({
            ...prev,
            [field]: newErrors[field as keyof FormErrors],
          }));
        }
      },
    [formData, onFormChange, touched]
  );

  const handleBlur = useCallback(
    (field: keyof PaymentFormData) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const newErrors = validateForm(formData);
      setErrors((prev) => ({
        ...prev,
        [field]: newErrors[field as keyof FormErrors],
      }));
    },
    [formData]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      trackEvent('generate_qr_clicked');

      setTouched({ upiId: true, accountHolder: true, amount: true });

      const newErrors = validateForm(formData);
      setErrors(newErrors);

      if (!isFormValid(newErrors)) {
        return;
      }

      onGenerate(formData);
    },
    [formData, onGenerate]
  );

  const inputBaseClasses =
    'w-full border bg-white px-3.5 py-3 text-sm text-[#111111] placeholder-[#999999] transition-all duration-150 focus:outline-none';

  const getInputClasses = (field: keyof FormErrors) =>
    `${inputBaseClasses} ${
      errors[field]
        ? 'border-[#E04B2E] focus:border-[#E04B2E] focus:ring-1 focus:ring-[#E04B2E]'
        : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus:border-[#FA5438] focus:ring-1 focus:ring-[#FA5438]'
    }`;

  return (
    <div className="border border-[var(--color-border)] bg-white p-6 sm:p-8">
      {/* Header section with Bitnomial technical tag */}
      <div className="border-b border-[var(--color-border)] pb-5 mb-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FA5438] font-semibold">
            [ 01 // PAYMENT PARAMETERS ]
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888]">
            ENGINE: ACTIVE
          </span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mt-2">
          Enter Payment Details
        </h2>
        <p className="mt-1 text-xs text-[#666666]">
          Split any bill into safe ₹1,999 chunks. Because why cross ₹2,000 when you can test everyone&apos;s patience instead?
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          {/* UPI ID */}
          <FormField
            id="upi-id"
            label="Receiving UPI ID"
            error={touched.upiId ? errors.upiId : undefined}
          >
            <input
              id="upi-id"
              type="text"
              value={formData.upiId}
              onChange={handleChange('upiId')}
              onBlur={handleBlur('upiId')}
              placeholder="e.g. yash@okhdfcbank"
              className={getInputClasses('upiId')}
              autoComplete="off"
              spellCheck={false}
              aria-invalid={!!errors.upiId}
              aria-describedby={errors.upiId ? 'upi-id-error' : undefined}
            />
          </FormField>

          {/* Account Holder */}
          <FormField
            id="account-holder"
            label="Beneficiary Full Name"
            error={touched.accountHolder ? errors.accountHolder : undefined}
          >
            <input
              id="account-holder"
              type="text"
              value={formData.accountHolder}
              onChange={handleChange('accountHolder')}
              onBlur={handleBlur('accountHolder')}
              placeholder="e.g. Yash Nagarkar"
              className={getInputClasses('accountHolder')}
              autoComplete="name"
              aria-invalid={!!errors.accountHolder}
              aria-describedby={
                errors.accountHolder ? 'account-holder-error' : undefined
              }
            />
          </FormField>

          {/* Hairline Divider */}
          <div className="border-t border-[var(--color-border)]" />

          {/* Amount */}
          <FormField
            id="amount"
            label="Total Amount to Collect"
            error={touched.amount ? errors.amount : undefined}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm font-semibold text-[#555555]">
                ₹
              </span>
              <input
                id="amount"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.amount}
                onChange={handleChange('amount')}
                onKeyDown={(e) => {
                  // Allow navigation and editing keys
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      'Backspace',
                      'Tab',
                      'Delete',
                      'ArrowLeft',
                      'ArrowRight',
                      'ArrowUp',
                      'ArrowDown',
                      'Enter',
                    ].includes(e.key) &&
                    !e.ctrlKey &&
                    !e.metaKey
                  ) {
                    e.preventDefault();
                  }
                }}
                onBlur={handleBlur('amount')}
                placeholder="10000"
                className={`${getInputClasses('amount')} pl-8 pr-16 font-mono text-sm font-medium`}
                autoComplete="off"
                aria-invalid={!!errors.amount}
                aria-describedby={
                  errors.amount ? 'amount-error' : 'amount-hint'
                }
              />
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 border border-[var(--color-border)] bg-[#F4F4F2] px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-[#555555]">
                INR
              </span>
            </div>
            <p
              id="amount-hint"
              className="font-mono text-[11px] text-[#888888]"
            >
              Maximum: ₹{MAX_TOTAL_AMOUNT.toLocaleString('en-IN')} · Cap: ₹1,999 per QR
            </p>
          </FormField>

          {/* Payment Note */}
          <FormField
            id="payment-note"
            label="Transaction Memo"
            labelSuffix="Optional"
          >
            <input
              id="payment-note"
              type="text"
              value={formData.paymentNote}
              onChange={handleChange('paymentNote')}
              placeholder="e.g. Project retainer invoice"
              className={
                inputBaseClasses +
                ' border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus:border-[#FA5438] focus:ring-1 focus:ring-[#FA5438]'
              }
              autoComplete="off"
            />
          </FormField>
        </div>

        {/* Generate Button - Signature Bitnomial Coral Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="mt-8 flex w-full items-center justify-center gap-3 bg-[#FA5438] border border-[#FA5438] px-6 py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#111111] transition-all duration-200 hover:bg-[#111111] hover:text-[#FA5438] hover:border-[#111111] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isGenerating ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-current"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="square"
                  className="opacity-90"
                />
              </svg>
              <span>CHUNKING PAYMENTS...</span>
            </>
          ) : (
            <>
              <span>GENERATE QR CODES</span>
              <span aria-hidden="true" className="font-sans text-base leading-none">→</span>
            </>
          )}
        </button>

        {/* Security & Privacy indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 border-t border-[var(--color-border)] pt-4 font-mono text-[10px] uppercase tracking-widest text-[#777777]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>[ 100% CLIENT-SIDE // WE DON&apos;T EVEN WANT YOUR DATA ]</span>
        </div>
      </form>
    </div>
  );
}
