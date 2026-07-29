import type { Metadata } from "next";
import LegalLayout from "@/app/components/LegalLayout";
import styles from "@/app/components/legal.module.css";

export const metadata: Metadata = {
  title: "Impressum · Templify",
  robots: { index: false, follow: false },
};

export default function Impressum() {
  return (
    <LegalLayout title="Impressum">
      <div className={styles.placeholder}>
        Platzhalter — der finale Impressumstext (Anbieterkennzeichnung nach § 5
        DDG) wird noch eingesetzt. Die Abschnitte unten sind das Gerüst; die
        Angaben in eckigen Klammern werden ersetzt.
      </div>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        [Name / Firma]
        <br />
        [Straße Hausnummer]
        <br />
        [PLZ Ort]
        <br />
        [Land]
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: [Telefonnummer]
        <br />
        E-Mail: [E-Mail-Adresse]
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr., falls
        vorhanden]
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>[Name]<br />[Anschrift]</p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        [Hinweis zur (Nicht-)Teilnahme an einem Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle.]
      </p>
    </LegalLayout>
  );
}
