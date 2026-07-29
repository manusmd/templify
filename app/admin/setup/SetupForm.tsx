"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import styles from "../admin.module.css";

export default function SetupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 12) {
      setError("Password must be at least 12 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim() || "Admin",
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message ?? "Setup failed.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      <label className={styles.field}>
        <span className={styles.label}>Name (optional)</span>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </label>
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
        <span className={styles.label}>Password (min 12 chars)</span>
        <input
          className={styles.input}
          type="password"
          required
          minLength={12}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Confirm password</span>
        <input
          className={styles.input}
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
      </label>
      <button className={styles.btn} type="submit" disabled={loading}>
        {loading ? "Creating…" : "Create admin & continue"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
