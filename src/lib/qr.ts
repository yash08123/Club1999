import QRCode from 'qrcode';

/**
 * Generates a QR code as a data URL (PNG base64).
 * Fully client-side — no network requests.
 *
 * @param data - The string data to encode in the QR code
 * @returns A data URL string for the QR code image
 */
export async function generateQRDataUrl(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 400,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });
}

/**
 * Generates a QR code as a canvas element for higher quality downloads.
 *
 * @param data - The string data to encode in the QR code
 * @param canvas - The canvas element to render into
 */
export async function generateQRCanvas(
  data: string,
  canvas: HTMLCanvasElement
): Promise<void> {
  await QRCode.toCanvas(canvas, data, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 600,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });
}

/**
 * Downloads a QR code as a PNG file.
 *
 * @param dataUrl - The data URL of the QR code
 * @param filename - The filename for the download
 */
export function downloadQRImage(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
