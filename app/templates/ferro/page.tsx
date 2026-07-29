import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/lib/templates";
import styles from "../mesa/mesa.module.css";

const ferro = templates.find((t) => t.slug === "ferro")!;
const REPO = ferro.repo ?? "https://github.com/manusmd/templify-ferro";

export const metadata: Metadata = {
  title: "Ferro — Furniture brand template · Templify",
  description:
    "Ferro is a furniture-brand website template: five views with a filterable catalogue, piece pages with a lightbox and enquiry drawer, and Lenis motion. Built with Next.js 16.",
  openGraph: {
    title: "Ferro — Furniture brand template",
    description:
      "Graphite & brass furniture template — filterable catalogue, piece pages with lightbox, finish selector and a cart-like enquiry drawer. Next.js 16.",
    images: ["/templates/ferro-hero.jpg"],
    type: "website",
  },
};

const features = [
  {
    h: "Five views",
    p: "Home, Collection, a Piece detail, Materials, and Contact — with a smooth cross-fade between them.",
  },
  {
    h: "Filterable catalogue",
    p: "Twelve fully-specced pieces across Seating, Tables, Storage and Lighting.",
  },
  {
    h: "Piece pages & enquiry",
    p: "A gallery with a lightbox, a sticky spec sheet, a finish selector, and a cart-like enquiry drawer. Mock — no payment is taken.",
  },
  {
    h: "Content-driven",
    p: "The whole site renders from one typed file. Change pieces, specs, finishes and materials in one place.",
  },
  {
    h: "Resilient",
    p: "Fully no-JS and reduced-motion safe — content is never hidden behind an animation.",
  },
  {
    h: "Fast & static",
    p: "Lenis smooth scroll + a matching scrollbar. Deploys to Vercel with zero config.",
  },
];

export default function FerroDetail() {
  return (
    <div className={styles.page}>
      <nav className="tm-nav">
        <Link href="/" className="tm-nav-brand">
          Templify
        </Link>
        <div className="tm-nav-links">
          <Link href="/#index">Index</Link>
          <Link href="/#about">About</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <Link href="/#index" className={styles.back}>
          ← Back to the index
        </Link>

        <header className={styles.head}>
          <div>
            <span className="eyebrow" style={{ color: "var(--acc)" }}>
              Template {ferro.num} · Live
            </span>
            <h1 className={styles.title}>Ferro</h1>
            <span className={styles.tag}>Furniture brand</span>
          </div>
          <div>
            <p className={styles.lead}>
              A complete furniture-brand site — a moody home, a filterable
              catalogue, piece pages with a lightbox and enquiry drawer,
              materials and contact — built like client work and ready to make
              your own.
            </p>
            <div className={styles.actions}>
              <a
                href={ferro.demo}
                target="_blank"
                rel="noreferrer"
                className="pill-solid"
              >
                Live preview ↗
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="pill"
              >
                View on GitHub ↗
              </a>
              <a
                href={`${REPO}#getting-started`}
                target="_blank"
                rel="noreferrer"
                className="pill"
              >
                Get the template
              </a>
            </div>
          </div>
        </header>

        <div className={styles.hero}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/templates/ferro-hero.jpg"
            alt="Ferro — the home hero"
            className={styles.shot}
          />
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>What&rsquo;s inside</h2>
          </div>
          <div className={styles.features}>
            {features.map((f) => (
              <div className={styles.feature} key={f.h}>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>A closer look</h2>
            <span className="eyebrow" style={{ color: "var(--muted-dimmer)" }}>
              Collection · Piece
            </span>
          </div>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/ferro-work.jpg"
                alt="Ferro — the collection catalogue"
                className={styles.shot}
              />
            </div>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/ferro-story.jpg"
                alt="Ferro — a piece detail page"
                className={styles.shot}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Built with</h2>
          </div>
          <div className={styles.stack}>
            <span>Next.js 16</span>
            <span>React 19</span>
            <span>TypeScript</span>
            <span>Lenis</span>
            <span>next/image</span>
          </div>
        </section>
      </main>

      <footer className="tm-footer">
        <span className="tm-footer-brand">Templify</span>
        <div className="tm-footer-links">
          <a href={REPO} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
