"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageSlot from "./ImageSlot";
import CookieSettingsButton from "./CookieSettingsButton";
import type { Template } from "@/lib/templates";
import { collections, collectionTemplates, featured } from "@/lib/templates";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const marqueeWords = [
  "Photography",
  "Architecture",
  "Editorial",
  "Hospitality",
  "Studio",
  "Retail",
];

function TemplateCard({ t }: { t: Template }) {
  const inner = (
    <>
      <div className="tm-frame" style={{ aspectRatio: t.aspect }}>
        <div className="tm-img">
          {t.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.image}
              alt={`${t.name} — ${t.tag}`}
              className="tm-cover-img"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          ) : (
            <ImageSlot label={t.placeholder} />
          )}
        </div>
        {t.available && <span className="tm-badge">Available now →</span>}
      </div>
      <div className="tm-card-meta">
        <div className="left">
          <span className="tm-card-num">{t.num}</span>
          <span className="tm-card-name">{t.name}</span>
        </div>
        <span className="tm-card-tag">{t.tag}</span>
      </div>
    </>
  );
  const style = { gridColumn: `span ${t.span}`, ...t.style };
  return t.href ? (
    <a
      href={t.href}
      target="_blank"
      rel="noreferrer"
      className="tm-card"
      style={style}
    >
      {inner}
    </a>
  ) : (
    <Link href={`/templates/${t.slug}`} className="tm-card" style={style}>
      {inner}
    </Link>
  );
}

export default function Landing() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Honour reduced-motion: leave everything in its natural, visible state.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // ── Hero entrance ──
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".tm-hero-line", { opacity: 0 }, { opacity: 1, duration: 1 }, 0)
        .fromTo(
          ".tm-line",
          { yPercent: 108 },
          { yPercent: 0, duration: 1.35, stagger: 0.09 },
          0.1
        )
        .fromTo(
          ".tm-fade",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
          0.7
        );

      // ── Hero drifts up + fades as you scroll past it ──
      gsap.to(".tm-hero", {
        yPercent: -14,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".tm-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── Scroll-progress hairline ──
      gsap.to(".tm-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // ── Cover: cinematic image parallax + caption reveal ──
      gsap.utils.toArray<HTMLElement>(".tm-cover-section").forEach((sec) => {
        const img = sec.querySelector<HTMLElement>(".tm-cover-img");
        if (img) {
          gsap.set(img, { scale: 1.22 });
          gsap.fromTo(
            img,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
        gsap.fromTo(
          sec.querySelectorAll(".tm-cover-caption > *"),
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: sec, start: "top 72%", once: true },
          }
        );
      });

      // ── Section reveals (headings, about) — soft blur rise ──
      gsap.utils.toArray<HTMLElement>(".tm-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onComplete: () => {
              el.style.filter = "none";
            },
          }
        );
      });

      // ── About columns — stagger in ──
      gsap.fromTo(
        ".tm-about-cols > div",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tm-about-cols", start: "top 88%", once: true },
        }
      );

      // ── Index cards: curtain reveal + image parallax + hover ──
      gsap.utils.toArray<HTMLElement>(".tm-card").forEach((card) => {
        const frame = card.querySelector<HTMLElement>(".tm-frame");
        const imgWrap = card.querySelector<HTMLElement>(".tm-img");
        const img = card.querySelector<HTMLElement>("img");

        gsap.set(card, { opacity: 0, y: 34 });
        if (frame) gsap.set(frame, { clipPath: "inset(0 0 100% 0 round 4px)" });
        if (img) gsap.set(img, { scale: 1.16 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
        tl.to(card, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0);
        if (frame)
          tl.to(
            frame,
            {
              clipPath: "inset(0 0 0% 0 round 4px)",
              duration: 0.85,
              ease: "power3.out",
            },
            0
          );

        // Image drifts within the frame as the card travels through the viewport
        if (img)
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );

        if (imgWrap) {
          card.addEventListener("mouseenter", () =>
            gsap.to(imgWrap, { scale: 1.04, duration: 0.7, ease: "power3.out" })
          );
          card.addEventListener("mouseleave", () =>
            gsap.to(imgWrap, { scale: 1, duration: 0.7, ease: "power3.out" })
          );
        }
      });

      // Recompute trigger positions once fonts/images settle, so cards can't
      // stay stranded (e.g. on a reload while already scrolled into the index).
      if (document.readyState === "complete") {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener("load", () => ScrollTrigger.refresh(), {
          once: true,
        });
      }
    },
    { scope: root }
  );

  return (
    <div className="tm-wrap" ref={root} id="top">
      <div className="tm-progress" aria-hidden="true" />
      <nav className="tm-nav">
        <a href="#top" className="tm-nav-brand">
          Templify
        </a>
        <div className="tm-nav-links">
          <a href="#index">Index</a>
          <a href="#about">About</a>
          <Link href={`/templates/${featured.slug}`}>Latest</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="tm-hero tm-container">
        <div className="tm-hero-line">
          <span>Two collections — Studio &amp; Hospitality</span>
        </div>

        <h1 className="tm-hero-title">
          <span className="clip">
            <span className="tm-line">A small library of</span>
          </span>
          <span className="clip">
            <span className="tm-line">websites that look</span>
          </span>
          <span className="clip">
            <span className="tm-line">
              like they were <em>commissioned</em>.
            </span>
          </span>
        </h1>

        <div className="tm-hero-foot">
          <p className="tm-fade">
            Templify is a curated index — not a marketplace. Focused
            collections, each template built like client work: real
            typography, real motion, no dashboard filler.
          </p>
          <a href="#index" className="tm-fade pill">
            Explore the index ↓
          </a>
        </div>
      </section>

      {/* Cover */}
      <section className="tm-cover-section">
        <div className="tm-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/templates/aperture-hero.jpg"
            alt="Aperture — photography studio template"
            className="tm-cover-img"
          />
        </div>
        <div className="tm-cover-scrim" />
        <div className="tm-cover-caption">
          <div>
            <div
              className="eyebrow"
              style={{ color: "var(--acc)", marginBottom: 10 }}
            >
              Featured release
            </div>
            <div className="title serif">Aperture</div>
          </div>
          <Link
            href={`/templates/${featured.slug}`}
            className="pill-solid"
            style={{ pointerEvents: "auto" }}
          >
            View template
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div className="tm-marquee">
        <div className="tm-marquee-track">
          <span className="tm-marquee-group">
            {marqueeWords.map((w) => (
              <span key={w} style={{ display: "flex", gap: 44 }}>
                <span>{w}</span>
                <span>·</span>
              </span>
            ))}
          </span>
          <span className="tm-marquee-group" aria-hidden="true">
            {marqueeWords.map((w) => (
              <span key={w} style={{ display: "flex", gap: 44 }}>
                <span>{w}</span>
                <span>·</span>
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Index */}
      <section className="tm-index tm-container" id="index">
        <div className="tm-index-head tm-reveal">
          <h2>The index</h2>
          <span
            className="eyebrow"
            style={{ color: "var(--muted-dimmer)" }}
          >
            Two collections · eight templates
          </span>
        </div>

        {collections.map((col) => (
          <div className="tm-collection" key={col.num}>
            <div className="tm-collection-head tm-reveal">
              <div className="tm-collection-head-left">
                <span className="eyebrow tm-collection-num">
                  Collection {col.num}
                </span>
                <h3 className="tm-collection-name">{col.name}</h3>
              </div>
              <p className="tm-collection-focus">{col.focus}</p>
            </div>
            <div className="tm-grid">
              {collectionTemplates(col).map((t) => (
                <TemplateCard key={t.slug} t={t} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="tm-about tm-container" id="about">
        <div className="tm-about-grid tm-reveal">
          <div className="tm-about-label">What you get</div>
          <div>
            <p className="tm-about-lead">
              Every template ships as a complete website — not a hero section
              and a promise. Designed, written, responsive, and handed over as
              clean code that&rsquo;s yours to make your own.
            </p>
            <div className="tm-about-cols">
              <div>
                <h3>Built by hand</h3>
                Drawn and built one at a time. Nothing assembled from parts.
              </div>
              <div>
                <h3>Motion, considered</h3>
                Movement designed into every section — slow, deliberate, never
                in the way.
              </div>
              <div>
                <h3>Collections, with a focus</h3>
                Each drop is themed — studios one season, hospitality the next.
                Nothing added just to fill the shelf.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="tm-footer">
        <span className="tm-footer-brand">Templify</span>
        <div className="tm-footer-links">
          <a href="#">Instagram</a>
          <a href="https://github.com/manusmd" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <CookieSettingsButton />
        </div>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
