import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/app/components/LegalLayout";
import styles from "@/app/components/legal.module.css";

export const metadata: Metadata = {
  title: "Datenschutzerklärung · Templify",
  robots: { index: false, follow: false },
};

export default function Datenschutz() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <div className={styles.placeholder}>
        Platzhalter — der finale Datenschutztext wird noch eingesetzt. Das
        Gerüst unten spiegelt bereits wider, was Templify tatsächlich tut: keine
        Analyse ohne Einwilligung, selbst gehostete Schriften, keine Weitergabe
        an Dritte im Browser. Diese Erklärung gilt auch für die Demo-Seiten der
        Templates, die wir betreiben.
      </div>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website und den von
        uns betriebenen Template-Demos:
        <br />
        [Name / Firma, Anschrift, E-Mail — siehe{" "}
        <Link href="/impressum">Impressum</Link>].
      </p>

      <h2>2. Hosting &amp; Server-Logfiles</h2>
      <p>
        Diese Website wird auf eigener Infrastruktur (Hetzner) gehostet. Beim
        Aufruf werden technisch notwendige Zugriffsdaten (u. a. IP-Adresse,
        Zeitpunkt, angeforderte Ressource, User-Agent) verarbeitet.
        [Speicherdauer und Rechtsgrundlage — Art. 6 Abs. 1 lit. f DSGVO —
        ergänzen.]
      </p>

      <h2>3. Cookies &amp; Einwilligung</h2>
      <p>
        Ohne deine Einwilligung setzen wir keine Analyse-Cookies. Erst wenn du
        im Banner zustimmst, wird die Analyse geladen. Deine Entscheidung kannst
        du jederzeit über „Cookie-Einstellungen“ im Footer ändern.
      </p>

      <h2>4. Analyse: Countly (selbst gehostet)</h2>
      <p>
        Zur Reichweitenmessung nutzen wir Countly auf eigenem Server — es werden
        keine Daten an Dritte übertragen. Die Verarbeitung erfolgt ausschließlich
        auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs.
        1 TDDDG) und findet ohne Zustimmung nicht statt. [Verarbeitete Daten,
        Speicherdauer und Widerruf ergänzen.]
      </p>

      <h2>5. Schriften &amp; Bilder</h2>
      <p>
        Schriften werden lokal ausgeliefert (kein Abruf von Drittanbietern beim
        Seitenaufruf). Beispielbilder auf den Template-Demos werden serverseitig
        eingebunden, sodass dein Browser keine Verbindung zu Dritten aufbaut.
      </p>

      <h2>6. Deine Rechte</h2>
      <ul>
        <li>Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung</li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft</li>
        <li>Datenübertragbarkeit und Widerspruch</li>
        <li>Beschwerde bei einer Aufsichtsbehörde</li>
      </ul>
      <p>[Kontaktweg zur Ausübung der Rechte ergänzen.]</p>

      <h2>7. Stand</h2>
      <p>[Datum der letzten Aktualisierung.]</p>
    </LegalLayout>
  );
}
