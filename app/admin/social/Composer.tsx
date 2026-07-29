"use client";

import { useActionState, useEffect, useState } from "react";
import { createSocialPost, type ActionResult } from "./actions";
import styles from "../admin.module.css";
import s from "./social.module.css";

type TemplateOption = {
  slug: string;
  name: string;
  tag: string;
  demo: string;
  image: string;
};

const initial: ActionResult = { ok: false };

function draftCaption(t: TemplateOption): string {
  return `New in the collection: ${t.name} — a ${t.tag.toLowerCase()} website template.

Real typography, real motion, built like client work. Live now → ${t.demo}

#webdesign #websitetemplate #nextjs #uidesign`;
}

export default function Composer({ templates }: { templates: TemplateOption[] }) {
  const [state, action, pending] = useActionState(createSocialPost, initial);
  const [templateSlug, setTemplateSlug] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mode, setMode] = useState<"addToQueue" | "customScheduled">("addToQueue");
  const [dueAtLocal, setDueAtLocal] = useState("");

  function pickTemplate(slug: string) {
    setTemplateSlug(slug);
    const t = templates.find((x) => x.slug === slug);
    if (t) {
      setImageUrl(t.image);
      if (!caption.trim()) setCaption(draftCaption(t));
    }
  }

  useEffect(() => {
    if (state.ok) {
      setTemplateSlug("");
      setCaption("");
      setImageUrl("");
      setDueAtLocal("");
    }
  }, [state.ok]);

  // Convert the local datetime to a UTC ISO instant in the browser (correct tz).
  const dueAtIso = dueAtLocal ? new Date(dueAtLocal).toISOString() : "";

  return (
    <div className={s.panel} style={{ maxWidth: 720 }}>
      <h2>Compose</h2>
      <p className={s.panelSub}>
        Schedule an Instagram post. Pick a template to prefill the image and a
        starter caption.
      </p>
      <form action={action}>
        <label className={styles.field}>
          <span className={styles.label}>From a template (optional)</span>
          <select
            className={s.select}
            value={templateSlug}
            onChange={(e) => pickTemplate(e.target.value)}
          >
            <option value="">— none —</option>
            {templates.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name} — {t.tag}
              </option>
            ))}
          </select>
        </label>
        <input type="hidden" name="templateSlug" value={templateSlug} />

        <label className={styles.field}>
          <span className={styles.label}>Caption</span>
          <textarea
            className={s.textarea}
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Image URL</span>
          <input
            className={styles.input}
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://…"
            required
          />
        </label>
        {imageUrl && (
          <div className={s.preview}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.thumb} src={imageUrl} alt="" />
            <span className={s.hint}>
              Instagram requires an image — it must be a public URL.
            </span>
          </div>
        )}

        <div className={s.row} style={{ marginTop: 16 }}>
          <label className={styles.field}>
            <span className={styles.label}>Type</span>
            <select className={s.select} name="type" defaultValue="post">
              <option value="post">Post</option>
              <option value="reel">Reel</option>
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>When</span>
            <select
              className={s.select}
              name="mode"
              value={mode}
              onChange={(e) =>
                setMode(e.target.value as "addToQueue" | "customScheduled")
              }
            >
              <option value="addToQueue">Add to queue</option>
              <option value="customScheduled">Specific time</option>
            </select>
          </label>
          {mode === "customScheduled" && (
            <label className={styles.field}>
              <span className={styles.label}>Date &amp; time</span>
              <input
                className={styles.input}
                type="datetime-local"
                value={dueAtLocal}
                onChange={(e) => setDueAtLocal(e.target.value)}
              />
            </label>
          )}
        </div>
        <input type="hidden" name="dueAt" value={dueAtIso} />

        <button className={styles.btn} disabled={pending}>
          {pending ? "Scheduling…" : "Schedule post"}
        </button>
        {state.error && <p className={styles.error}>{state.error}</p>}
        {state.ok && <p className={s.ok}>Scheduled — it&rsquo;s in your Buffer queue.</p>}
      </form>
    </div>
  );
}
