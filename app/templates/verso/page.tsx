import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/lib/templates";
import styles from "../mesa/mesa.module.css";

const verso = templates.find((t) => t.slug === "verso")!;
const REPO = verso.repo ?? "https://github.com/manusmd/templify-verso";

export const metadata: Metadata = {
  title: "Verso — Editorial magazine template · Templify",
  description:
    "Verso is an editorial-magazine website template: five views with a long-form reading experience, a filterable archive, and Lenis motion. Built with Next.js 16.",
  openGraph: {
    title: "Verso — Editorial magazine template",
    description:
      "Ink-on-paper magazine template — long-form article with drop cap and sidenotes, filterable archive, subscribe plans, Lenis motion. Next.js 16.",
    images: ["/templates/verso-hero.jpg"],
    type: "website",
  },
};

const features = [
  {
    h: "Five views",
    p: "Cover, a long-form Article, Archive, Masthead, and Subscribe — with a smooth cross-fade between them.",
  },
  {
    h: "Real reading view",
    p: "Drop cap, pull quotes, inline figures, sticky sidenotes, and a per-article reading-progress bar.",
  },
  {
    h: "Filterable archive",
    p: "An asymmetric 12-column story grid with section filters, plus a past-issues table.",
  },
  {
    h: "Content-driven",
    p: "The whole site renders from one typed file. Change the issue, articles, and archive in one place.",
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

export default function VersoDetail() {
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
              Template {verso.num} · Live
            </span>
            <h1 className={styles.title}>Verso</h1>
            <span className={styles.tag}>Editorial magazine</span>
          </div>
          <div>
            <p className={styles.lead}>
              A complete magazine site — an editorial cover, a long-form article
              with a real reading experience, a filterable archive, masthead and
              subscribe — built like client work and ready to make your own.
            </p>
            <div className={styles.actions}>
              <a
                href={verso.demo}
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
            src="/templates/verso-hero.jpg"
            alt="Verso — the issue cover"
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
              Archive · Article
            </span>
          </div>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/verso-work.jpg"
                alt="Verso — the archive grid"
                className={styles.shot}
              />
            </div>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/verso-story.jpg"
                alt="Verso — a feature article"
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
