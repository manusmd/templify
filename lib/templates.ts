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
};

export const templates: Template[] = [
  // ── Live templates ──
  {
    num: "NEW",
    slug: "mesa",
    name: "Mesa",
    tag: "Restaurant · Live",
    placeholder: "Mesa — wood-fired restaurant site",
    span: 4,
    aspect: "16 / 10",
    available: true,
    image: "/templates/mesa-card.jpg",
    repo: "https://github.com/manusmd/templify-mesa",
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
  },
  {
    num: "NEW",
    slug: "halcyon",
    name: "Halcyon",
    tag: "Boutique hotel · Live",
    placeholder: "Halcyon — boutique hotel site",
    span: 4,
    aspect: "16 / 10",
    available: true,
    image: "/templates/halcyon-card.jpg",
    repo: "https://github.com/manusmd/templify-halcyon",
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
  },
  // ── Concepts (coming this season) ──
  {
    num: "01",
    slug: "ferro",
    name: "Ferro",
    tag: "Furniture brand",
    placeholder: "Ferro — furniture brand site",
    span: 6,
    aspect: "4 / 3",
  },
];

/** The hero's featured release is Aperture — now a live template. */
export const featured =
  templates.find((t) => t.slug === "aperture") ?? templates[0];
