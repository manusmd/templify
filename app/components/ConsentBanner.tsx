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
    <div className="tm-consent" role="dialog" aria-label="Analyse-Einwilligung">
      <div className="tm-consent-inner">
        <p className="tm-consent-text">
          Wir nutzen selbst gehostete Analyse (Countly), um zu verstehen, wie
          Templify genutzt wird — nur mit deiner Einwilligung. Ohne Zustimmung
          werden keine Analyse-Cookies gesetzt. Mehr dazu in der{" "}
          <Link href="/datenschutz" className="tm-consent-link">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="tm-consent-actions">
          <button
            type="button"
            className="tm-consent-btn tm-consent-decline"
            onClick={() => choose("denied")}
          >
            Ablehnen
          </button>
          <button
            type="button"
            className="tm-consent-btn tm-consent-accept"
            onClick={() => choose("granted")}
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
