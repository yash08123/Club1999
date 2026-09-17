'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Initialize PostHog only once, client-side, when the API key is present.
 */
function initPostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!key || typeof window === 'undefined') return;

  if (!posthog.__loaded) {
    posthog.init(key, {
      api_host: host || 'https://eu.i.posthog.com',
      capture_pageview: false, // We handle this manually for SPA navigation
      capture_pageleave: true,
      persistence: 'localStorage+cookie',
      autocapture: false, // We use our own trackEvent abstraction
    });
  }
}

/**
 * Captures a PostHog pageview on every route change.
 * Wrapped in Suspense because useSearchParams requires it in Next.js App Router.
 */
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += '?' + search;
      }
      ph.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams, ph]);

  return null;
}

/**
 * PostHog analytics provider.
 *
 * Wrap your app with this component.
 * If NEXT_PUBLIC_POSTHOG_KEY is not set, PostHog is not initialized
 * and the children render normally without any analytics overhead.
 */
export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initPostHog();
  }, []);

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  // If no key configured, just render children without PostHog
  if (!key) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
