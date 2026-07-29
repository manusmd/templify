// Tiny consent store for the analytics cookie banner.
//
// Analytics (Countly) is opt-in: nothing is loaded until the visitor actively
// accepts. The decision is remembered in localStorage and broadcast on the
// window so the banner and the analytics loader stay in sync, and so a footer
// link can re-open the banner to let the visitor change their mind.

export type Consent = "granted" | "denied";

const KEY = "templify:consent";
const CHANGE = "templify:consent-change";
const OPEN = "templify:consent-open";

/** The stored decision, or null if the visitor hasn't chosen yet. */
export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "granted" || v === "denied" ? v : null;
}

/** Record a decision and broadcast it to any listeners. */
export function setConsent(value: Consent): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, value);
  window.dispatchEvent(new CustomEvent<Consent>(CHANGE, { detail: value }));
}

/** Subscribe to decision changes. Returns an unsubscribe function. */
export function onConsentChange(cb: (value: Consent) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<Consent>).detail);
  window.addEventListener(CHANGE, handler);
  return () => window.removeEventListener(CHANGE, handler);
}

/** Re-open the banner (e.g. from a "Cookie settings" footer link). */
export function openConsent(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN));
}

/** Subscribe to re-open requests. Returns an unsubscribe function. */
export function onConsentOpen(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener(OPEN, handler);
  return () => window.removeEventListener(OPEN, handler);
}
