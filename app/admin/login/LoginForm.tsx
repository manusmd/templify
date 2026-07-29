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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message ?? "Invalid email or password.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
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
