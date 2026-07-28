import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/lib/templates";
import styles from "./mesa.module.css";

const mesa = templates.find((t) => t.slug === "mesa")!;
const REPO = mesa.repo ?? "https://github.com/manusmd/templify-mesa";

export const metadata: Metadata = {
  title: "Mesa — Wood-fired restaurant template · Templify",
  description:
    "Mesa is a wood-fired restaurant website template: editorial design, an interactive tabbed menu, and GSAP + Lenis motion. Built with Next.js 16.",
  openGraph: {
    title: "Mesa — Wood-fired restaurant template",
    description:
      "Editorial restaurant template with an interactive menu and GSAP + Lenis motion. Next.js 16.",
    images: ["/templates/mesa-hero.jpg"],
    type: "website",
  },
};

const features = [
  {
    h: "Editorial design",
    p: "Bodoni Moda + Archivo, a warm candlelit palette, and oklch colour throughout.",
  },
  {
    h: "Interactive menu",
    p: "A tabbed menu — Antipasti, Pizze, Dolci, Bevande — with a photo that swaps per section.",
  },
  {
    h: "Motion, done right",
    p: "Lenis smooth scroll synced to GSAP: masked hero reveal, image parallax, scroll-in sections.",
  },
  {
    h: "Content-driven",
    p: "The whole site renders from one typed file. Change copy, menu, and hours in one place.",
  },
  {
    h: "Resilient",
    p: "Fully no-JS and reduced-motion safe — content is never hidden behind an animation.",
  },
  {
    h: "Ships static",
    p: "Legal pages included. Deploys to Vercel with zero configuration.",
  },
];

export default function MesaDetail() {
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
              Template {mesa.num} · Live
            </span>
            <h1 className={styles.title}>Mesa</h1>
            <span className={styles.tag}>Restaurant · wood-fired</span>
          </div>
          <div>
            <p className={styles.lead}>
              A complete restaurant website — an editorial hero, an interactive
              tabbed menu, a story, and a visit block — built like client work
              and ready to make your own.
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
            src="/templates/mesa-hero.jpg"
            alt="Mesa — the hero section, wood-fired pizza"
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
            <span
              className="eyebrow"
              style={{ color: "var(--muted-dimmer)" }}
            >
              Menu · Story
            </span>
          </div>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/mesa-menu.jpg"
                alt="Mesa — the interactive tabbed menu"
                className={styles.shot}
              />
            </div>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/mesa-story.jpg"
                alt="Mesa — the story and visit sections"
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
