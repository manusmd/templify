import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/lib/templates";
import styles from "../mesa/mesa.module.css";

const atlas = templates.find((t) => t.slug === "atlas-co")!;
const REPO = atlas.repo ?? "https://github.com/manusmd/templify-atlas";

export const metadata: Metadata = {
  title: "Atlas & Co — Design studio template · Templify",
  description:
    "Atlas & Co is a design-studio website template: five views with a filterable work grid, rich case studies, a team section, and Lenis motion. Built with Next.js 16.",
  openGraph: {
    title: "Atlas & Co — Design studio template",
    description:
      "Bright Swiss-modern studio template — filterable work grid, case studies with impact stats, team & press, mock enquiry form. Next.js 16.",
    images: ["/templates/atlas-co-hero.jpg"],
    type: "website",
  },
};

const features = [
  {
    h: "Five views",
    p: "Home, Work, a Case study, Studio, and Contact — with a smooth cross-fade between them.",
  },
  {
    h: "Filterable work grid",
    p: "A six-column asymmetric grid with discipline filters that reflow cleanly on any screen.",
  },
  {
    h: "Rich case studies",
    p: "Parallax lead, sticky facts, a pull-quote, an impact-stats row and prev/next navigation.",
  },
  {
    h: "Content-driven",
    p: "The whole site renders from one typed file. Change projects, team and press in one place.",
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

export default function AtlasDetail() {
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
              Template {atlas.num} · Live
            </span>
            <h1 className={styles.title}>Atlas &amp; Co</h1>
            <span className={styles.tag}>Design studio</span>
          </div>
          <div>
            <p className={styles.lead}>
              A complete design-studio site — a bold home, a filterable work
              grid, full case studies, a studio page and a contact flow — built
              like client work and ready to make your own.
            </p>
            <div className={styles.actions}>
              <a
                href={atlas.demo}
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
            src="/templates/atlas-co-hero.jpg"
            alt="Atlas & Co — the home hero"
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
              Work · Case
            </span>
          </div>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/atlas-co-work.jpg"
                alt="Atlas & Co — the work grid"
                className={styles.shot}
              />
            </div>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/atlas-co-story.jpg"
                alt="Atlas & Co — a case study"
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
