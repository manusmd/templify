import styles from "./ImageSlot.module.css";

/**
 * Stand-in for the design-canvas `<image-slot>` web component. Renders a tasteful,
 * on-brand placeholder sized to its container until a real screenshot is supplied.
 * Swap `label` for an actual <Image> when template artwork is available.
 */
export default function ImageSlot({ label }: { label: string }) {
  return (
    <div className={styles.slot} role="img" aria-label={label}>
      <span className={styles.corner} data-c="tl" aria-hidden />
      <span className={styles.corner} data-c="tr" aria-hidden />
      <span className={styles.corner} data-c="bl" aria-hidden />
      <span className={styles.corner} data-c="br" aria-hidden />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
