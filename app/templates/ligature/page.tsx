import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/lib/templates";
import styles from "../mesa/mesa.module.css";

const ligature = templates.find((t) => t.slug === "ligature")!;
const REPO = ligature.repo ?? "https://github.com/manusmd/templify-ligature";

export const metadata: Metadata = {
  title: "Ligature — Brand studio template · Templify",
  description:
    "Ligature is a brand-studio website template: a dark editorial design with an intro curtain, custom cursor, and GSAP + Lenis motion. Built with Next.js 16.",
  openGraph: {
    title: "Ligature — Brand studio template",
    description:
      "Dark, editorial studio template with an intro curtain, custom cursor, and GSAP + Lenis motion. Next.js 16.",
    images: ["/templates/ligature-hero.jpg"],
    type: "website",
  },
};

const features = [
  {
    h: "Motion, done right",
    p: "An intro curtain, a trailing custom cursor, Lenis smooth scroll, parallax, and reveal-on-scroll throughout.",
  },
  {
    h: "Animated stats",
    p: "Headline numbers count up as they enter view — with the real values in the HTML for no-JS visitors.",
  },
  {
    h: "Editorial design",
    p: "A dark indigo palette with a violet accent, set in Inter and IBM Plex Mono.",
  },
  {
    h: "Full studio layout",
    p: "Hero, client marquee, work grid, services, process, stats, team, awards, and contact.",
  },
  {
    h: "Content-driven",
    p: "The whole site renders from one typed file. Change copy, work, and team in one place.",
  },
  {
    h: "Resilient & static",
    p: "Fully no-JS and reduced-motion safe. Legal pages included. Deploys to Vercel with zero config.",
  },
];

export default function LigatureDetail() {
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
              Template {ligature.num} · Live
            </span>
            <h1 className={styles.title}>Ligature</h1>
            <span className={styles.tag}>Brand studio · independent</span>
          </div>
          <div>
            <p className={styles.lead}>
              A complete brand-studio site — an intro curtain, a custom cursor,
              a selected-work grid, services, process, team, and contact — built
              like client work and ready to make your own.
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
            src="/templates/ligature-hero.jpg"
            alt="Ligature — the hero section"
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
              Work · Studio
            </span>
          </div>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/ligature-work.jpg"
                alt="Ligature — the selected-work grid"
                className={styles.shot}
              />
            </div>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/ligature-studio.jpg"
                alt="Ligature — the studio team section"
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
            <span>GSAP</span>
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
