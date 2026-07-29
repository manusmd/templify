"use client";

import { useEffect, useState } from "react";
import s from "./social.module.css";

function renderCaption(text: string) {
  return text.split(/(\s+)/).map((tok, i) =>
    /^[#@][\w.]+/.test(tok) ? (
      <span key={i} className={s.igTag}>
        {tok}
      </span>
    ) : (
      tok
    ),
  );
}

export default function InstagramPreview({
  username,
  caption,
  imageUrls,
  type,
}: {
  username: string;
  caption: string;
  imageUrls: string[];
  type: "post" | "reel";
}) {
  const handle = (username || "templify").toLowerCase().replace(/\s+/g, "");
  const initial = handle.charAt(0).toUpperCase() || "T";
  const isReel = type === "reel";
  const images = imageUrls.filter(Boolean);
  const many = images.length > 1;

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx > images.length - 1) setIdx(0);
  }, [images.length, idx]);
  const current = images[idx];

  return (
    <div className={s.igCard}>
      <div className={s.igHead}>
        <div className={s.igAvatar}>
          <div className={s.igAvatarInner}>{initial}</div>
        </div>
        <span className={s.igUser}>{handle}</span>
        <span className={s.igDots}>•••</span>
      </div>

      <div className={`${s.igMedia} ${isReel ? s.igMediaReel : ""}`}>
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current} alt="" />
        ) : (
          <div className={s.igMediaEmpty}>Image preview</div>
        )}

        {many && (
          <span className={s.igCount}>
            {idx + 1}/{images.length}
          </span>
        )}
        {isReel && (
          <span className={s.igReelBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
            Reel
          </span>
        )}
        {many && idx > 0 && (
          <button
            type="button"
            className={`${s.igArrow} ${s.igArrowL}`}
            onClick={() => setIdx((i) => i - 1)}
            aria-label="Previous"
          >
            ‹
          </button>
        )}
        {many && idx < images.length - 1 && (
          <button
            type="button"
            className={`${s.igArrow} ${s.igArrowR}`}
            onClick={() => setIdx((i) => i + 1)}
            aria-label="Next"
          >
            ›
          </button>
        )}
      </div>

      {many && (
        <div className={s.igDotsRow}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${s.igDot} ${i === idx ? s.igDotOn : ""}`}
            />
          ))}
        </div>
      )}

      <div className={s.igActions}>
        <div className={s.igActionsLeft}>
          <svg viewBox="0 0 24 24">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.4 8.4 0 1 1 21 11.5z" />
          </svg>
          <svg viewBox="0 0 24 24">
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22l-4-9-9-4 20-7z" />
          </svg>
        </div>
        <svg viewBox="0 0 24 24">
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
        </svg>
      </div>

      <div className={s.igLikes}>128 likes</div>
      <div className={s.igCaption}>
        <b>{handle}</b>{" "}
        {caption ? (
          renderCaption(caption)
        ) : (
          <span style={{ color: "#8e8e8e" }}>Your caption will appear here…</span>
        )}
      </div>
      <div className={s.igComments}>View all 24 comments</div>
      <div className={s.igTime}>Just now</div>
    </div>
  );
}
