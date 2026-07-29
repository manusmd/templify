import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageSlot from "@/app/components/ImageSlot";
import { templates } from "@/lib/templates";
import styles from "./detail.module.css";

// Templates with their own dedicated detail page (app/templates/<slug>).
const DEDICATED = ["mesa", "ligature", "aperture", "marfa", "verso", "halcyon"];

export function generateStaticParams() {
  return templates
    .filter((t) => !DEDICATED.includes(t.slug))
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = templates.find((x) => x.slug === slug);
  if (!t) return { title: "Template — Templify" };
  return {
    title: `${t.name} — ${t.tag} · Templify`,
    description: `${t.name}, a ${t.tag.toLowerCase()} website template from Templify.`,
  };
}

export default async function TemplateDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = templates.find((x) => x.slug === slug);
  if (!t) notFound();

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
          <span className="eyebrow" style={{ color: "var(--acc)" }}>
            Template {t.num}
          </span>
          <h1 className={styles.title}>{t.name}</h1>
          <span className={styles.tag}>{t.tag}</span>
        </header>

        <div className={styles.frame}>
          <ImageSlot label={t.placeholder} />
        </div>

        <p className={styles.note}>
          Full template detail — live preview and motion breakdown — lands here
          next, ported from <code>Templify Template Detail.dc.html</code>.
        </p>
      </main>

      <footer className="tm-footer">
        <span className="tm-footer-brand">Templify</span>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
