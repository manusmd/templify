"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageSlot from "./ImageSlot";
import { templates, featured } from "@/lib/templates";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const marqueeWords = [
  "Photography",
  "Architecture",
  "Editorial",
  "Hospitality",
  "Studio",
  "Retail",
];

export default function Landing() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Honour reduced-motion: leave everything in its natural, visible state.
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // Hero entrance
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

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".tm-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      // Cover parallax
      gsap.utils.toArray<HTMLElement>(".tm-cover").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.14 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Card hover — "Zoom" (default of the source component's hoverEffect prop)
      gsap.utils.toArray<HTMLElement>(".tm-card").forEach((card) => {
        const img = card.querySelector(".tm-img");
        if (!img) return;
        const enter = () =>
          gsap.to(img, { scale: 1.05, duration: 0.8, ease: "power3.out" });
        const leave = () =>
          gsap.to(img, { scale: 1, duration: 0.8, ease: "power3.out" });
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
      });
    },
    { scope: root }
  );

  return (
    <div className="tm-wrap" ref={root} id="top">
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
          <span>Collection 01 — Six websites</span>
          <span>Est. 2026 · Berlin</span>
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
            Templify is a curated index — not a marketplace. Six website
            templates a season, each one built like client work: real
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
            Eight templates · three live
          </span>
        </div>

        <div className="tm-grid">
          {templates.map((t) => {
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
                        loading="lazy"
                      />
                    ) : (
                      <ImageSlot label={t.placeholder} />
                    )}
                  </div>
                  {t.available && (
                    <span className="tm-badge">Available now →</span>
                  )}
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
                key={t.slug}
                href={t.href}
                target="_blank"
                rel="noreferrer"
                className="tm-card tm-reveal"
                style={style}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={t.slug}
                href={`/templates/${t.slug}`}
                className="tm-card tm-reveal"
                style={style}
              >
                {inner}
              </Link>
            );
          })}
        </div>
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
                <h3>Six a season</h3>
                A new collection four times a year. Nothing added just to fill
                the shelf.
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
          <a href="#">Are.na</a>
          <a href="#">Newsletter</a>
        </div>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
