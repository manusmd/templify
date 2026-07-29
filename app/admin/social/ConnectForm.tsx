"use client";

import { useActionState } from "react";
import { connectBuffer, type ActionResult } from "./actions";
import styles from "../admin.module.css";
import s from "./social.module.css";

const initial: ActionResult = { ok: false };

export default function ConnectForm() {
  const [state, action, pending] = useActionState(connectBuffer, initial);
  return (
    <div className={s.panel}>
      <h2>Connect Buffer</h2>
      <p className={s.panelSub}>
        Paste your Buffer API key (Buffer → Settings → API). It&rsquo;s stored
        encrypted at rest and never shown again.
      </p>
      <form action={action}>
        <label className={styles.field}>
          <span className={styles.label}>Buffer API key</span>
          <input
            className={styles.input}
            name="apiKey"
            type="password"
            autoComplete="off"
            required
          />
        </label>
        <button className={styles.btn} disabled={pending}>
          {pending ? "Connecting…" : "Connect"}
        </button>
        {state.error && <p className={styles.error}>{state.error}</p>}
      </form>
    </div>
  );
}
