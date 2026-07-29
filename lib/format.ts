// German date/time, always in the Europe/Berlin timezone (independent of where
// the server runs). e.g. "02.08.2026, 09:00".
const deDateTime = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDe(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return `${deDateTime.format(d)} Uhr`;
}
