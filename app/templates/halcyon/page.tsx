import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/lib/templates";
import styles from "../mesa/mesa.module.css";

const halcyon = templates.find((t) => t.slug === "halcyon")!;
const REPO = halcyon.repo ?? "https://github.com/manusmd/templify-halcyon";

export const metadata: Metadata = {
  title: "Halcyon — Boutique hotel template · Templify",
  description:
    "Halcyon is a boutique-hotel website template: five views with a booking bar, eleven rooms, a reserve flow, and Lenis motion. Built with Next.js 16.",
  openGraph: {
    title: "Halcyon — Boutique hotel template",
    description:
      "Warm limestone boutique-hotel template — booking bar, eleven rooms with suite pages, experience, reserve flow, Lenis motion. Next.js 16.",
    images: ["/templates/halcyon-hero.jpg"],
    type: "website",
  },
};

const features = [
  {
    h: "Five views",
    p: "The Hotel, Rooms, a Suite detail, Experience, and Reserve — with a soft cross-fade between them.",
  },
  {
    h: "Booking & reserve flow",
    p: "An inline availability bar and a full enquiry form with a thank-you state. Mock only — no real payments.",
  },
  {
    h: "Eleven rooms",
    p: "Grouped into Cove Rooms, Terrace Suites and the Boathouse — each with a suite page, sticky facts and gallery.",
  },
  {
    h: "Content-driven",
    p: "The whole site renders from one typed file. Change the hotel, suites, rates and experiences in one place.",
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

export default function HalcyonDetail() {
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
              Template {halcyon.num} · Live
            </span>
            <h1 className={styles.title}>Halcyon</h1>
            <span className={styles.tag}>Boutique hotel</span>
          </div>
          <div>
            <p className={styles.lead}>
              A complete boutique-hotel site — a cinematic home with a booking
              bar, eleven rooms with their own suite pages, experience and a
              reserve flow — built like client work and ready to make your own.
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
            src="/templates/halcyon-hero.jpg"
            alt="Halcyon — the home hero"
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
              Rooms · Suite
            </span>
          </div>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/halcyon-rooms.jpg"
                alt="Halcyon — rooms & rates"
                className={styles.shot}
              />
            </div>
            <div className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/templates/halcyon-suite.jpg"
                alt="Halcyon — a suite detail page"
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
