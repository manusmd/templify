import type { Metadata } from "next";
import LegalLayout from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Legal Notice · Templify",
  robots: { index: false, follow: false },
};

export default function Impressum() {
  return (
    <LegalLayout title="Legal Notice">
      <p>
        Manuel Schmid
        <br />
        Hardtstr. 27
        <br />
        78467 Konstanz
      </p>

      <h2>Contact</h2>
      <p>
        Phone: +491723758429
        <br />
        Email: info@manu-web.de
      </p>

      <p>
        Source:{" "}
        <a href="https://www.e-recht24.de" target="_blank" rel="noreferrer">
          eRecht24
        </a>
      </p>
    </LegalLayout>
  );
}
