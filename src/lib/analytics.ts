/**
 * Analytics abstraction layer.
 *
 * Wired to PostHog. If PostHog is not initialized (e.g., no API key),
 * all calls are safe no-ops.
 *
 * To swap analytics vendors later, only this file needs to change —
 * no UI component modifications required.
 */

import posthog from 'posthog-js';

/** All supported analytics event names */
export type AnalyticsEvent =
  | 'page_view'
  | 'form_started'
  | 'upi_id_entered'
  | 'amount_entered'
  | 'generate_qr_clicked'
  | 'qr_generation_success'
  | 'qr_generation_failed'
  | 'qr_downloaded'
  | 'qr_paid_toggled'
  | 'print_clicked';

/**
 * Track an analytics event via PostHog.
 *
 * Safe to call before PostHog is initialized — silently no-ops.
 *
 * @param eventName - The name of the event to track
 * @param properties - Optional properties associated with the event
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>
): void {
  try {
    if (typeof window !== 'undefined' && posthog.__loaded) {
      posthog.capture(eventName, properties);
    }
  } catch {
    // Silently swallow — analytics should never break the app
  }
}
