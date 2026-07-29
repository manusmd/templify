import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/lib/templates";
import styles from "../mesa/mesa.module.css";

const marfa = templates.find((t) => t.slug === "marfa")!;
const REPO = marfa.repo ?? "https://github.com/manusmd/templify-marfa";

export const metadata: Metadata = {
  title: "Marfa — Architecture & landscape studio template · Templify",
  description:
    "Marfa is an architecture & landscape studio website template: five views with a horizontal work gallery, a project case study, and Lenis motion. Built with Next.js 16.",
  openGraph: {
    title: "Marfa — Architecture & landscape studio template",
    description:
      "Quiet, editorial architecture-practice template — horizontal work gallery, project case study, clip-path reveals, Lenis motion. Next.js 16.",
    images: ["/templates/marfa-hero.jpg"],
    type: "website",
  },
};

const features = [
  {
    h: "Five views",
    p: "Home, Work, a Project case study, Practice, and Contact — with smooth transitions between them.",
  },
  {
    h: "Horizontal work gallery",
    p: "A wheel-driven sideways scroll with staggered card sizes and a live progress bar.",
  },
  {
    h: "Project case study",
    p: "Sticky facts & credits, full-bleed imagery, blueprint drawings, and prev/next navigation.",
  },
  {
    h: "Content-driven",
    p: "The whole site renders from one typed file. Change work, project, practice, and team in one place.",
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

export default function MarfaDetail() {
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
              Template {marfa.num} · Live
            </span>
            <h1 className={styles.title}>Marfa</h1>
            <span className={styles.tag}>Architecture &amp; landscape</span>
          </div>
          <div>
            <p className={styles.lead}>
              A complete architecture-practice site — a full-height home, a
              horizontal work gallery, a project case study with sticky facts,
              practice and contact — built like client work and ready to make
              your own.
            </p>
            <div className={styles.actions}>
              <a
                href={marfa.demo}
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
            src="/templates/marfa-hero.jpg"
            alt="Marfa — the home hero"
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
              Work · Project
            </span>
          </div>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/marfa-work.jpg"
                alt="Marfa — the horizontal work gallery"
                className={styles.shot}
              />
            </div>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/marfa-story.jpg"
                alt="Marfa — a project case study"
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
