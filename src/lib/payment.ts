import { CHUNK_AMOUNT, type PaymentChunk } from '@/types/payment';

/**
 * Splits a total amount (in rupees) into chunks of maximum CHUNK_AMOUNT each.
 * Uses integer arithmetic to avoid floating-point issues.
 *
 * @param totalAmountRupees - Total amount in rupees (must be > 0)
 * @returns Array of PaymentChunk objects
 *
 * @example
 * splitAmount(10000)
 * // Returns: [
 * //   { index: 1, amount: 1999, total: 6 },
 * //   { index: 2, amount: 1999, total: 6 },
 * //   { index: 3, amount: 1999, total: 6 },
 * //   { index: 4, amount: 1999, total: 6 },
 * //   { index: 5, amount: 1999, total: 6 },
 * //   { index: 6, amount: 5, total: 6 },
 * // ]
 */
export function splitAmount(totalAmountRupees: number): PaymentChunk[] {
  if (totalAmountRupees <= 0) {
    return [];
  }

  // Convert to paise for integer arithmetic
  const totalPaise = Math.round(totalAmountRupees * 100);
  const chunkPaise = CHUNK_AMOUNT * 100;

  const fullChunks = Math.floor(totalPaise / chunkPaise);
  const remainderPaise = totalPaise % chunkPaise;

  const totalChunks = fullChunks + (remainderPaise > 0 ? 1 : 0);

  const chunks: PaymentChunk[] = [];

  for (let i = 0; i < fullChunks; i++) {
    chunks.push({
      index: i + 1,
      amount: CHUNK_AMOUNT,
      total: totalChunks,
    });
  }

  if (remainderPaise > 0) {
    chunks.push({
      index: fullChunks + 1,
      amount: remainderPaise / 100,
      total: totalChunks,
    });
  }

  return chunks;
}

/**
 * Verifies that the sum of all chunk amounts equals the total amount.
 * Uses paise-based comparison.
 */
export function verifyChunks(chunks: PaymentChunk[], totalAmount: number): boolean {
  const sumPaise = chunks.reduce((sum, chunk) => sum + Math.round(chunk.amount * 100), 0);
  const totalPaise = Math.round(totalAmount * 100);
  return sumPaise === totalPaise;
}
