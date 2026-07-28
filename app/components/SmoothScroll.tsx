"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Site-wide Lenis smooth scroll, synced to GSAP's ticker so the landing's
 * ScrollTriggers (reveals, cover parallax) stay in step. Progressive
 * enhancement: disabled under reduced-motion, and in-page anchor links glide.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let raf: ((t: number) => void) | null = null;
    try {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    } catch {
      lenis = null;
    }

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      const id = a?.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.1 });
      else target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      document.removeEventListener("click", onAnchor);
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
