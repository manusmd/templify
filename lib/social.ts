// Which screenshots make up each template's Instagram carousel (in order).
// These map to public/templates/<slug>-<shot>.jpg.
export const TEMPLATE_SHOTS: Record<string, string[]> = {
  aperture: ["hero", "work", "story"],
  "atlas-co": ["hero", "work", "story"],
  ferro: ["hero", "work", "story"],
  halcyon: ["hero", "rooms", "suite"],
  ligature: ["hero", "work", "studio"],
  marfa: ["hero", "work", "story"],
  verso: ["hero", "work", "story"],
  mesa: ["hero", "menu", "story"],
};

/** URL of a branded slide that composes a screenshot onto an IG-format canvas. */
export function slideUrl(
  base: string,
  screenshotPath: string,
  title: string,
  tag: string,
  aspect = "4x5",
): string {
  const q = new URLSearchParams({
    img: `${base}${screenshotPath}`,
    title,
    tag,
    aspect,
  });
  return `${base}/social/slide?${q.toString()}`;
}
