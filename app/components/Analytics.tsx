"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getConsent, onConsentChange } from "@/lib/consent";

// Self-hosted Countly, loaded ONLY after the visitor accepts (opt-in) and only
// when the server is configured via env. Without consent or config this is a
// no-op — no script, no cookies, no requests. Config lives in env so the same
// build runs against any Countly instance:
//   NEXT_PUBLIC_COUNTLY_URL      e.g. https://countly.example.com
//   NEXT_PUBLIC_COUNTLY_APP_KEY  the per-app key from the Countly dashboard

const URL = process.env.NEXT_PUBLIC_COUNTLY_URL;
const APP_KEY = process.env.NEXT_PUBLIC_COUNTLY_APP_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CountlyInstance = any;

export default function Analytics() {
  const pathname = usePathname();
  const countly = useRef<CountlyInstance | null>(null);
  const loading = useRef(false);

  // Load + start Countly once, the first time consent is (or becomes) granted.
  useEffect(() => {
    async function start() {
      if (countly.current || loading.current) return;
      if (!URL || !APP_KEY) return; // not configured — stay dark
      if (getConsent() !== "granted") return;
      loading.current = true;
      const mod = await import("countly-sdk-web");
      const Countly: CountlyInstance =
        (mod as { default?: CountlyInstance }).default ?? mod;
      Countly.init({ app_key: APP_KEY, url: URL, session_update: 60 });
      Countly.track_sessions();
      Countly.track_pageview(window.location.pathname);
      countly.current = Countly;
      loading.current = false;
    }

    if (getConsent() === "granted") void start();
    return onConsentChange((v) => {
      if (v === "granted") void start();
    });
  }, []);

  // Record a pageview on client-side navigation once analytics is live.
  useEffect(() => {
    if (countly.current) countly.current.track_pageview(pathname);
  }, [pathname]);

  return null;
}
