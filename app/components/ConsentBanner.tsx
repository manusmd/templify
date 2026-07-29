"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, onConsentOpen } from "@/lib/consent";

// Opt-in analytics banner. Shows until the visitor chooses, and can be
// re-opened from the footer ("Cookie-Einstellungen"). Rendered client-side
// only, after mount, to avoid a hydration mismatch on the stored decision.

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setOpen(true);
    return onConsentOpen(() => setOpen(true));
  }, []);

  if (!open) return null;

  function choose(value: "granted" | "denied") {
    setConsent(value);
    setOpen(false);
  }

  return (
    <div className="tm-consent" role="dialog" aria-label="Analytics consent">
      <div className="tm-consent-inner">
        <p className="tm-consent-text">
          We use self-hosted analytics (Countly) to understand how Templify is
          used — only with your consent. No analytics cookies are set unless you
          agree. Learn more in our{" "}
          <Link href="/datenschutz" className="tm-consent-link">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="tm-consent-actions">
          <button
            type="button"
            className="tm-consent-btn tm-consent-decline"
            onClick={() => choose("denied")}
          >
            Decline
          </button>
          <button
            type="button"
            className="tm-consent-btn tm-consent-accept"
            onClick={() => choose("granted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
