import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";
import styles from "./legal.module.css";

// Shared shell for the legal pages (Impressum, Datenschutz). Nav + a centred
// prose column + the site footer, which links between the legal pages and
// re-opens the consent banner.
export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
        <Link href="/" className={styles.back}>
          ← Zurück zur Startseite
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.prose}>{children}</div>
      </main>

      <footer className="tm-footer">
        <span className="tm-footer-brand">Templify</span>
        <div className="tm-footer-links">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <CookieSettingsButton />
        </div>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
