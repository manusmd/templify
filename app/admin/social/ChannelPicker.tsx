"use client";

import { useActionState, useState } from "react";
import { selectChannel, type ActionResult } from "./actions";
import type { BufferChannel } from "@/lib/buffer";
import styles from "../admin.module.css";
import s from "./social.module.css";

const initial: ActionResult = { ok: false };

export default function ChannelPicker({
  channels,
  error,
}: {
  channels: BufferChannel[];
  error: string | null;
}) {
  const [state, action, pending] = useActionState(selectChannel, initial);
  const [selected, setSelected] = useState("");

  const ig = channels.filter((c) => c.service === "instagram");
  const list = ig.length ? ig : channels;
  const selectedName = list.find((c) => c.id === selected)?.name ?? "";

  return (
    <div className={s.panel}>
      <h2>Choose a channel</h2>
      <p className={s.panelSub}>Pick the Instagram account to post to.</p>
      {error && <p className={styles.error}>{error}</p>}
      {list.length === 0 ? (
        <p className={s.empty}>
          No channels found on this Buffer account. Connect an Instagram channel
          in Buffer first, then reload.
        </p>
      ) : (
        <form action={action}>
          {list.map((c) => (
            <label key={c.id} className={s.inline} style={{ marginBottom: 12 }}>
              <input
                type="radio"
                name="channelId"
                value={c.id}
                onChange={() => setSelected(c.id)}
                required
              />
              <span>
                {c.name}{" "}
                <span className={s.hint} style={{ textTransform: "uppercase" }}>
                  {c.service}
                </span>
              </span>
            </label>
          ))}
          <input type="hidden" name="channelName" value={selectedName} />
          <button className={styles.btn} disabled={pending}>
            {pending ? "Saving…" : "Use this channel"}
          </button>
          {state.error && <p className={styles.error}>{state.error}</p>}
        </form>
      )}
    </div>
  );
}
