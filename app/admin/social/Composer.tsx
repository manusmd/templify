"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createSocialPost,
  generateCaption,
  saveAiKey,
  type ActionResult,
} from "./actions";
import InstagramPreview from "./InstagramPreview";
import styles from "../admin.module.css";
import s from "./social.module.css";

type TemplateOption = {
  slug: string;
  name: string;
  tag: string;
  demo: string;
  slides: string[];
};

const initial: ActionResult = { ok: false };

function draftCaption(t: TemplateOption): string {
  return `New in the collection: ${t.name} — a ${t.tag.toLowerCase()} website template.

Real typography, real motion, built like client work. Live now → ${t.demo}

#webdesign #websitetemplate #nextjs #uidesign`;
}

export default function Composer({
  templates,
  username,
  hasAiKey,
}: {
  templates: TemplateOption[];
  username: string;
  hasAiKey: boolean;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(createSocialPost, initial);
  const [templateSlug, setTemplateSlug] = useState("");
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [customUrl, setCustomUrl] = useState("");
  const [type, setType] = useState<"post" | "reel">("post");
  const [mode, setMode] = useState<"addToQueue" | "customScheduled">("addToQueue");
  const [dueAtLocal, setDueAtLocal] = useState("");

  // AI captions
  const [aiHint, setAiHint] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiKeyInput, setAiKeyInput] = useState("");

  async function onGenerate() {
    const t = templates.find((x) => x.slug === templateSlug);
    if (!t) return;
    setAiBusy(true);
    setAiError(null);
    const res = await generateCaption({
      name: t.name,
      tag: t.tag,
      demo: t.demo,
      hint: aiHint.trim() || undefined,
    });
    setAiBusy(false);
    if (!res.ok) {
      setAiError(res.error ?? "Generation failed.");
      return;
    }
    setCaption(res.caption ?? "");
  }

  async function onSaveAiKey() {
    if (!aiKeyInput.trim()) return;
    setAiBusy(true);
    setAiError(null);
    const res = await saveAiKey(aiKeyInput);
    setAiBusy(false);
    if (!res.ok) {
      setAiError(res.error ?? "Could not save key.");
      return;
    }
    setAiKeyInput("");
    router.refresh();
  }

  function pickTemplate(slug: string) {
    setTemplateSlug(slug);
    const t = templates.find((x) => x.slug === slug);
    if (t) {
      setImages(t.slides);
      if (!caption.trim()) setCaption(draftCaption(t));
    }
  }

  function addCustom() {
    const u = customUrl.trim();
    if (u && images.length < 10) {
      setImages((prev) => [...prev, u]);
      setCustomUrl("");
    }
  }

  useEffect(() => {
    if (state.ok) {
      setTemplateSlug("");
      setCaption("");
      setImages([]);
      setDueAtLocal("");
    }
  }, [state.ok]);

  const dueAtIso = dueAtLocal ? new Date(dueAtLocal).toISOString() : "";

  return (
    <div className={s.composeGrid}>
      <div className={s.panel} style={{ maxWidth: "none", marginBottom: 0 }}>
        <h2>Compose</h2>
        <p className={s.panelSub}>
          Pick a template to fill the carousel with branded slides (nothing gets
          cropped), then schedule.
        </p>
        <form action={action}>
          <label className={styles.field}>
            <span className={styles.label}>From a template</span>
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
            <span className={styles.label}>
              Carousel images ({images.length}/10)
            </span>
            {images.length === 0 ? (
              <p className={s.hint}>
                Pick a template above, or add image URLs below.
              </p>
            ) : (
              <div className={s.thumbs}>
                {images.map((url, i) => (
                  <div className={s.thumb2} key={`${url}-${i}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" />
                    <button
                      type="button"
                      className={s.thumbX}
                      onClick={() =>
                        setImages((prev) => prev.filter((_, j) => j !== i))
                      }
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </label>
          <div className={s.addRow}>
            <input
              className={styles.input}
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Add an image URL (must be public)…"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustom();
                }
              }}
            />
            <button type="button" className={s.addBtn} onClick={addCustom}>
              Add
            </button>
          </div>
          {images.map((url, i) => (
            <input key={i} type="hidden" name="imageUrls" value={url} />
          ))}

          <label className={styles.field} style={{ marginTop: 16 }}>
            <span className={styles.label}>Caption</span>
            <textarea
              className={s.textarea}
              name="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            />
          </label>

          {hasAiKey ? (
            <div className={s.aiRow}>
              <input
                className={styles.input}
                value={aiHint}
                onChange={(e) => setAiHint(e.target.value)}
                placeholder="Steer the caption (optional): playful, focus on motion…"
              />
              <button
                type="button"
                className={s.aiBtn}
                onClick={onGenerate}
                disabled={aiBusy || !templateSlug}
                title={!templateSlug ? "Pick a template first" : undefined}
              >
                {aiBusy ? "Writing…" : "✨ Generate caption"}
              </button>
            </div>
          ) : (
            <div className={s.aiRow}>
              <input
                className={styles.input}
                type="password"
                value={aiKeyInput}
                onChange={(e) => setAiKeyInput(e.target.value)}
                placeholder="Anthropic API key — enables ✨ AI captions"
                autoComplete="off"
              />
              <button
                type="button"
                className={s.aiBtn}
                onClick={onSaveAiKey}
                disabled={aiBusy || !aiKeyInput.trim()}
              >
                {aiBusy ? "Saving…" : "Save key"}
              </button>
            </div>
          )}
          {aiError && <p className={styles.error}>{aiError}</p>}

          <div className={s.row}>
            <label className={styles.field}>
              <span className={styles.label}>Type</span>
              <select
                className={s.select}
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value as "post" | "reel")}
              >
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
          {state.ok && (
            <p className={s.ok}>Scheduled — it&rsquo;s in your Buffer queue.</p>
          )}
        </form>
      </div>

      <div className={s.previewCol}>
        <span className={s.previewLabel}>Instagram preview</span>
        <InstagramPreview
          username={username}
          caption={caption}
          imageUrls={images}
          type={type}
        />
      </div>
    </div>
  );
}
