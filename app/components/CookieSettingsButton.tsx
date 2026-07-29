"use client";

import { openConsent } from "@/lib/consent";

// Re-opens the consent banner so a visitor can change their analytics choice.
export default function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => openConsent()}>
      Cookie settings
    </button>
  );
}
