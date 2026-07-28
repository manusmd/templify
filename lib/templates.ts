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
  {
    num: "NEW",
    slug: "mesa",
    name: "Mesa",
    tag: "Restaurant · Live",
    placeholder: "Mesa — wood-fired restaurant site",
    span: 6,
    aspect: "16 / 10",
    available: true,
    image: "/templates/mesa-hero.jpg",
    repo: "https://github.com/manusmd/templify-mesa",
  },
  {
    num: "NEW",
    slug: "ligature",
    name: "Ligature",
    tag: "Brand studio · Live",
    placeholder: "Ligature — brand studio site",
    span: 6,
    aspect: "16 / 10",
    available: true,
    image: "/templates/ligature-hero.jpg",
    repo: "https://github.com/manusmd/templify-ligature",
  },
  {
    num: "01",
    slug: "aperture",
    name: "Aperture",
    tag: "Photography studio",
    placeholder: "Aperture — photography studio site",
    span: 7,
    aspect: "4 / 3",
  },
  {
    num: "02",
    slug: "marfa",
    name: "Marfa",
    tag: "Architecture",
    placeholder: "Marfa — architecture practice site",
    span: 5,
    aspect: "1 / 1",
    style: { alignSelf: "end" },
  },
  {
    num: "03",
    slug: "verso",
    name: "Verso",
    tag: "Editorial",
    placeholder: "Verso — editorial magazine site",
    span: 4,
    aspect: "3 / 4",
    style: { marginTop: 52 },
  },
  {
    num: "04",
    slug: "halcyon",
    name: "Halcyon",
    tag: "Boutique hotel",
    placeholder: "Halcyon — boutique hotel site",
    span: 8,
    aspect: "16 / 10",
    style: { marginTop: 52 },
  },
  {
    num: "05",
    slug: "atlas-co",
    name: "Atlas & Co",
    tag: "Design studio",
    placeholder: "Atlas & Co — design studio site",
    span: 6,
    aspect: "4 / 3",
  },
  {
    num: "06",
    slug: "ferro",
    name: "Ferro",
    tag: "Furniture brand",
    placeholder: "Ferro — furniture brand site",
    span: 6,
    aspect: "4 / 3",
  },
];

/** The hero's featured release stays Aperture (a concept), independent of array order. */
export const featured =
  templates.find((t) => t.slug === "aperture") ?? templates[0];
