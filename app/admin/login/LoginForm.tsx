"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import styles from "../admin.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Two-factor challenge state
  const [needsTwoFactor, setNeedsTwoFactor] = useState(false);
  const [code, setCode] = useState("");
  const [useBackup, setUseBackup] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message ?? "Invalid email or password.");
      return;
    }
    if (data && "twoFactorRedirect" in data && data.twoFactorRedirect) {
      setNeedsTwoFactor(true);
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const value = code.trim();
    const { error } = useBackup
      ? await authClient.twoFactor.verifyBackupCode({ code: value })
      : await authClient.twoFactor.verifyTotp({ code: value });
    setLoading(false);
    if (error) {
      setError(error.message ?? "That code didn't match.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  if (needsTwoFactor) {
    return (
      <form onSubmit={onVerify}>
        <label className={styles.field}>
          <span className={styles.label}>
            {useBackup ? "Backup code" : "Authenticator code"}
          </span>
          <input
            className={styles.input}
            inputMode={useBackup ? "text" : "numeric"}
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            autoFocus
          />
        </label>
        <button className={styles.btn} type="submit" disabled={loading}>
          {loading ? "Verifying…" : "Verify"}
        </button>
        <p className={styles.foot}>
          <button
            type="button"
            onClick={() => {
              setUseBackup((v) => !v);
              setCode("");
              setError(null);
            }}
            style={{
              background: "none",
              border: 0,
              color: "var(--acc)",
              cursor: "pointer",
              padding: 0,
              font: "inherit",
            }}
          >
            {useBackup ? "Use an authenticator code" : "Use a backup code"}
          </button>
        </p>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          className={styles.input}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Password</span>
        <input
          className={styles.input}
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>
      <button className={styles.btn} type="submit" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
