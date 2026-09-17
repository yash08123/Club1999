/**
 * Builds a UPI payment URL from the provided parameters.
 *
 * UPI URL format:
 * upi://pay?pa=<payee-vpa>&pn=<payee-name>&am=<amount>&cu=INR&tn=<note>
 *
 * @see https://www.npci.org.in/what-we-do/upi/upi-qr-code
 */
export function buildUpiUrl(params: {
  payeeVpa: string;
  payeeName: string;
  amount: number;
  transactionNote?: string;
}): string {
  const { payeeVpa, payeeName, amount, transactionNote } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('pa', payeeVpa.trim());
  searchParams.set('pn', payeeName.trim());
  searchParams.set('am', amount.toFixed(2));
  searchParams.set('cu', 'INR');

  if (transactionNote && transactionNote.trim().length > 0) {
    searchParams.set('tn', transactionNote.trim());
  }

  return `upi://pay?${searchParams.toString()}`;
}
