import Landing from "./components/Landing";
import { templates } from "@/lib/templates";

// Preload the live-template card images so they're fetched from the initial
// document head — not deferred until their cards scroll into view.
const preloadImages = templates
  .map((t) => t.image)
  .filter((src): src is string => Boolean(src));

export default function Page() {
  return (
    <>
      {preloadImages.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          fetchPriority="high"
        />
      ))}
      <Landing />
    </>
  );
}
