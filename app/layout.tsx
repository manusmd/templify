import type { Metadata } from "next";
import { Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import Analytics from "./components/Analytics";
import ConsentBanner from "./components/ConsentBanner";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://templify.projects.manu-web.de"),
  title: "Templify — Websites that look like they were commissioned",
  description:
    "A curated index of website templates — six a season, each built like client work: real typography, real motion. No dashboard filler.",
  openGraph: {
    title: "Templify — Websites that look like they were commissioned",
    description:
      "A curated index of website templates — six a season, each built like client work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${manrope.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      >
        <SmoothScroll />
        {children}
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
