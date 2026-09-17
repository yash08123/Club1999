import type { FormErrors, PaymentFormData } from '@/types/payment';
import { MAX_TOTAL_AMOUNT } from '@/types/payment';

/**
 * Basic UPI VPA (Virtual Payment Address) validation.
 * Format: username@provider
 *
 * This is client-side validation only and does NOT guarantee the VPA actually exists.
 */
export function isValidUpiId(upiId: string): boolean {
  if (!upiId || upiId.trim().length === 0) return false;

  const trimmed = upiId.trim();

  // Must contain exactly one @
  const atCount = (trimmed.match(/@/g) || []).length;
  if (atCount !== 1) return false;

  const [username, provider] = trimmed.split('@');

  // Username must be non-empty and alphanumeric (with dots allowed)
  if (!username || username.length === 0) return false;
  if (!/^[a-zA-Z0-9.]+$/.test(username)) return false;

  // Provider must be non-empty and alphanumeric
  if (!provider || provider.length === 0) return false;
  if (!/^[a-zA-Z0-9]+$/.test(provider)) return false;

  return true;
}

/**
 * Parses a string amount input to a numeric value.
 * Handles:
 * - Indian comma formatting (1,00,000)
 * - Standard comma formatting (100,000)
 * - Decimal amounts
 * - Whitespace
 *
 * Returns NaN for invalid inputs.
 */
export function parseAmount(input: string): number {
  if (!input || input.trim().length === 0) return NaN;

  // Remove whitespace
  let cleaned = input.trim();

  // Remove commas (handles both Indian and standard formats)
  cleaned = cleaned.replace(/,/g, '');

  // Remove ₹ symbol if present
  cleaned = cleaned.replace(/₹/g, '');

  // Remove whitespace again after symbol removal
  cleaned = cleaned.trim();

  // Check for invalid characters (only digits and one decimal point allowed)
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return NaN;

  const parsed = parseFloat(cleaned);

  if (!isFinite(parsed)) return NaN;

  return parsed;
}

/**
 * Validates the entire payment form and returns error messages.
 * Returns an empty object if all fields are valid.
 */
export function validateForm(data: PaymentFormData): FormErrors {
  const errors: FormErrors = {};

  // Validate UPI ID
  if (!data.upiId || data.upiId.trim().length === 0) {
    errors.upiId = 'UPI ID is required';
  } else if (!isValidUpiId(data.upiId)) {
    errors.upiId = 'Enter a valid UPI ID (e.g., name@upi)';
  }

  // Validate account holder
  if (!data.accountHolder || data.accountHolder.trim().length === 0) {
    errors.accountHolder = 'Account holder name is required';
  }

  // Validate amount
  if (!data.amount || data.amount.trim().length === 0) {
    errors.amount = 'Amount is required';
  } else {
    const parsedAmount = parseAmount(data.amount);

    if (isNaN(parsedAmount)) {
      errors.amount = 'Enter a valid numeric amount';
    } else if (parsedAmount <= 0) {
      errors.amount = 'Amount must be greater than ₹0';
    } else if (parsedAmount > MAX_TOTAL_AMOUNT) {
      errors.amount = `Amount cannot exceed ₹${MAX_TOTAL_AMOUNT.toLocaleString('en-IN')}`;
    }
  }

  return errors;
}

/**
 * Returns true if the form errors object has no errors.
 */
export function isFormValid(errors: FormErrors): boolean {
  return Object.keys(errors).length === 0;
}
