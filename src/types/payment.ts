/** Maximum amount per QR code in INR (rupees) */
export const CHUNK_AMOUNT = 1999;

/** Maximum total amount in INR (rupees) */
export const MAX_TOTAL_AMOUNT = 199900;

/** Maximum number of QR codes that can be generated */
export const MAX_QR_COUNT = 100;

/** Represents a single payment chunk with its amount and index */
export interface PaymentChunk {
  /** 1-based index of this payment */
  index: number;
  /** Amount in rupees for this chunk */
  amount: number;
  /** Total number of chunks */
  total: number;
}

/** Form data for payment details */
export interface PaymentFormData {
  upiId: string;
  accountHolder: string;
  amount: string;
  paymentNote: string;
}

/** Validated and parsed payment data ready for QR generation */
export interface ValidatedPaymentData {
  upiId: string;
  accountHolder: string;
  /** Amount in paise to avoid floating-point issues */
  amountInPaise: number;
  paymentNote: string;
}

/** Validation error state for the form */
export interface FormErrors {
  upiId?: string;
  accountHolder?: string;
  amount?: string;
}

/** Generated payment result containing all chunks */
export interface PaymentResult {
  chunks: PaymentChunk[];
  totalAmount: number;
  upiId: string;
  accountHolder: string;
  paymentNote: string;
}
