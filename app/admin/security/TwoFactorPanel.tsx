"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { authClient } from "@/lib/auth-client";
import styles from "../admin.module.css";
import s from "../social/social.module.css";

export default function TwoFactorPanel({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<"idle" | "password" | "setup">("idle");
  const [password, setPassword] = useState("");
  const [totpURI, setTotpURI] = useState("");
  const [qr, setQr] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (totpURI) QRCode.toDataURL(totpURI, { margin: 1, width: 200 }).then(setQr);
  }, [totpURI]);

  async function beginEnable(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { data, error } = await authClient.twoFactor.enable({ password });
    setBusy(false);
    if (error || !data) {
      setError(error?.message ?? "Could not start setup. Check your password.");
      return;
    }
    setTotpURI(data.totpURI);
    setBackupCodes(data.backupCodes ?? []);
    setPassword("");
    setStep("setup");
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error } = await authClient.twoFactor.verifyTotp({ code: code.trim() });
    setBusy(false);
    if (error) {
      setError(error.message ?? "That code didn't match. Try again.");
      return;
    }
    router.refresh();
  }

  async function disable(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error } = await authClient.twoFactor.disable({ password });
    setBusy(false);
    if (error) {
      setError(error.message ?? "Could not disable. Check your password.");
      return;
    }
    setPassword("");
    setStep("idle");
    router.refresh();
  }

  if (enabled) {
    return (
      <div className={s.panel}>
        <h2>Two-factor authentication</h2>
        <p className={s.panelSub}>
          <span className={s.metric}>
            <strong style={{ color: "oklch(0.78 0.14 150)" }}>On</strong>
          </span>{" "}
          — an authenticator code is required at sign-in.
        </p>
        <form onSubmit={disable}>
          <label className={styles.field}>
            <span className={styles.label}>Confirm password to disable</span>
            <input
              className={styles.input}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className={styles.btn} disabled={busy}>
            {busy ? "Disabling…" : "Disable two-factor"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className={s.panel}>
      <h2>Two-factor authentication</h2>
      <p className={s.panelSub}>
        Add a second step at sign-in with an authenticator app (recommended
        before this posts to your socials).
      </p>

      {step === "idle" && (
        <button className={styles.btn} onClick={() => setStep("password")}>
          Enable two-factor
        </button>
      )}

      {step === "password" && (
        <form onSubmit={beginEnable}>
          <label className={styles.field}>
            <span className={styles.label}>Confirm your password</span>
            <input
              className={styles.input}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className={styles.btn} disabled={busy}>
            {busy ? "…" : "Continue"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}

      {step === "setup" && (
        <>
          <p className={s.panelSub}>
            Scan this with your authenticator app, then enter a code to confirm.
          </p>
          {qr && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={qr}
              alt="Two-factor QR code"
              width={180}
              height={180}
              style={{ borderRadius: 10, background: "#fff", padding: 8 }}
            />
          )}
          {backupCodes.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <span className={styles.label}>
                Backup codes — save these somewhere safe
              </span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "4px 16px",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 13,
                  marginTop: 8,
                }}
              >
                {backupCodes.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
          )}
          <form onSubmit={verify} style={{ marginTop: 18 }}>
            <label className={styles.field}>
              <span className={styles.label}>Enter a 6-digit code</span>
              <input
                className={styles.input}
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </label>
            <button className={styles.btn} disabled={busy}>
              {busy ? "Verifying…" : "Verify & finish"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </>
      )}
    </div>
  );
}
