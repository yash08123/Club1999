/**
 * Formats a number as Indian currency (INR).
 * Uses the Indian numbering system (lakhs, crores).
 *
 * @example
 * formatINR(10000)   // "₹10,000"
 * formatINR(199900)  // "₹1,99,900"
 * formatINR(5.5)     // "₹5.50"
 */
export function formatINR(amount: number): string {
  // Handle decimal amounts
  const hasDecimals = amount % 1 !== 0;

  if (hasDecimals) {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Formats a number with Indian numbering system without currency symbol.
 *
 * @example
 * formatNumber(10000) // "10,000"
 * formatNumber(199900) // "1,99,900"
 */
export function formatNumber(amount: number): string {
  return amount.toLocaleString('en-IN');
}
