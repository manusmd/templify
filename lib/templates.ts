export type Template = {
  num: string;
  slug: string;
  name: string;
  tag: string;
  /** Placeholder copy shown in the image slot until a real screenshot is dropped in. */
  placeholder: string;
  /** Grid presentation, ported from the source design's asymmetric magazine layout. */
  span: number;
  aspect: string;
  /** Optional extra grid styles for the staggered layout. */
  style?: React.CSSProperties;
  /** External link (e.g. a shipped template's repo/live site). When set, the card opens this instead of the detail stub. */
  href?: string;
  /** Marks a real, shippable template (vs. a concept in the collection). */
  available?: boolean;
  /** Real screenshot for the card frame (in /public). Falls back to the placeholder when absent. */
  image?: string;
  /** Public repo for a shipped template (shown on its detail page). */
  repo?: string;
  /** Live demo URL (the deployed site) — enables the preview button. */
  demo?: string;
};

/** A themed collection (a season's drop). Templates are grouped by these. */
export type Collection = {
  num: string;
  name: string;
  /** One-line focus shown under the collection heading. */
  focus: string;
  /** Ordered template slugs that belong to this collection. */
  slugs: string[];
};

export const templates: Template[] = [
  // ── Live templates ──
  {
    num: "NEW",
    slug: "mesa",
    name: "Mesa",
    tag: "Restaurant · Live",
    placeholder: "Mesa — wood-fired restaurant site",
    span: 6,
    aspect: "16 / 10",
    available: true,
    image: "/templates/mesa-card.jpg",
    repo: "https://github.com/manusmd/templify-mesa",
    demo: "https://mesa.projects.manu-web.de",
  },
  {
    num: "NEW",
    slug: "ligature",
    name: "Ligature",
    tag: "Brand studio · Live",
    placeholder: "Ligature — brand studio site",
    span: 4,
    aspect: "16 / 10",
    available: true,
    image: "/templates/ligature-card.jpg",
    repo: "https://github.com/manusmd/templify-ligature",
    demo: "https://ligature.projects.manu-web.de",
  },
  {
    num: "NEW",
    slug: "aperture",
    name: "Aperture",
    tag: "Photography · Live",
    placeholder: "Aperture — photography studio site",
    span: 4,
    aspect: "16 / 10",
    available: true,
    image: "/templates/aperture-card.jpg",
    repo: "https://github.com/manusmd/templify-aperture",
    demo: "https://aperture.projects.manu-web.de",
  },
  {
    num: "NEW",
    slug: "marfa",
    name: "Marfa",
    tag: "Architecture · Live",
    placeholder: "Marfa — architecture practice site",
    span: 4,
    aspect: "16 / 10",
    available: true,
    image: "/templates/marfa-card.jpg",
    repo: "https://github.com/manusmd/templify-marfa",
    demo: "https://marfa.projects.manu-web.de",
  },
  {
    num: "NEW",
    slug: "verso",
    name: "Verso",
    tag: "Editorial · Live",
    placeholder: "Verso — editorial magazine site",
    span: 4,
    aspect: "16 / 10",
    available: true,
    image: "/templates/verso-card.jpg",
    repo: "https://github.com/manusmd/templify-verso",
    demo: "https://verso.projects.manu-web.de",
  },
  {
    num: "NEW",
    slug: "halcyon",
    name: "Halcyon",
    tag: "Boutique hotel · Live",
    placeholder: "Halcyon — boutique hotel site",
    span: 6,
    aspect: "16 / 10",
    available: true,
    image: "/templates/halcyon-card.jpg",
    repo: "https://github.com/manusmd/templify-halcyon",
    demo: "https://halcyon.projects.manu-web.de",
  },
  {
    num: "NEW",
    slug: "atlas-co",
    name: "Atlas & Co",
    tag: "Design studio · Live",
    placeholder: "Atlas & Co — design studio site",
    span: 4,
    aspect: "16 / 10",
    available: true,
    image: "/templates/atlas-co-card.jpg",
    repo: "https://github.com/manusmd/templify-atlas",
    demo: "https://atlas.projects.manu-web.de",
  },
  {
    num: "NEW",
    slug: "ferro",
    name: "Ferro",
    tag: "Furniture brand · Live",
    placeholder: "Ferro — furniture brand site",
    span: 4,
    aspect: "16 / 10",
    available: true,
    image: "/templates/ferro-card.jpg",
    repo: "https://github.com/manusmd/templify-ferro",
    demo: "https://ferro.projects.manu-web.de",
  },
];

/**
 * Themed collections. Each is a focused seasonal drop; the landing renders one
 * titled block per collection. Add the next collection here and list its slugs.
 */
export const collections: Collection[] = [
  {
    num: "01",
    name: "Studio & Editorial",
    focus: "For studios, makers and editorial — creative practices and design-led brands.",
    slugs: ["aperture", "ligature", "marfa", "verso", "atlas-co", "ferro"],
  },
  {
    num: "02",
    name: "Hospitality",
    focus: "Places to stay and eat — hospitality with a point of view.",
    slugs: ["halcyon", "mesa"],
  },
];

/** Templates of a collection, in the collection's declared order. */
export const collectionTemplates = (c: Collection): Template[] =>
  c.slugs
    .map((slug) => templates.find((t) => t.slug === slug))
    .filter((t): t is Template => Boolean(t));

/** The hero's featured release is Aperture — the flagship of Collection 01. */
export const featured =
  templates.find((t) => t.slug === "aperture") ?? templates[0];
