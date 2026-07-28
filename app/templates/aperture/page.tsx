import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/lib/templates";
import styles from "../mesa/mesa.module.css";

const aperture = templates.find((t) => t.slug === "aperture")!;
const REPO = aperture.repo ?? "https://github.com/manusmd/templify-aperture";

export const metadata: Metadata = {
  title: "Aperture — Photography studio template · Templify",
  description:
    "Aperture is a photography-studio website template: five views with a page-wipe transition, a keyboard lightbox, and Lenis motion. Built with Next.js 16.",
  openGraph: {
    title: "Aperture — Photography studio template",
    description:
      "Cinematic photography-studio template — vertical nav, page-wipe transitions, lightbox gallery, Lenis motion. Next.js 16.",
    images: ["/templates/aperture-hero.jpg"],
    type: "website",
  },
};

const features = [
  {
    h: "Five views",
    p: "Home, Work, a project Story, Studio, and Contact — with a signature page-wipe transition between them.",
  },
  {
    h: "Lightbox gallery",
    p: "The project story opens a keyboard-driven lightbox (← → / Esc) over a masonry grid.",
  },
  {
    h: "Cinematic motion",
    p: "Parallax, reveal-on-scroll, a cursor-following work preview, and a vertical side-nav with an active mark.",
  },
  {
    h: "Content-driven",
    p: "The whole site renders from one typed file. Change studio, work, and gallery in one place.",
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

export default function ApertureDetail() {
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
              Template {aperture.num} · Live
            </span>
            <h1 className={styles.title}>Aperture</h1>
            <span className={styles.tag}>Photography studio</span>
          </div>
          <div>
            <p className={styles.lead}>
              A complete photography-studio site — a cinematic home, a work
              index, a project story with a lightbox, studio, and contact —
              built like client work and ready to make your own.
            </p>
            <div className={styles.actions}>
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="pill-solid"
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
            src="/templates/aperture-hero.jpg"
            alt="Aperture — the home hero"
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
              Work · Story
            </span>
          </div>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/aperture-work.jpg"
                alt="Aperture — the selected-work section"
                className={styles.shot}
              />
            </div>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/aperture-story.jpg"
                alt="Aperture — a project story gallery"
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
