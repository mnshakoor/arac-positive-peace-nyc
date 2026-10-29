const TZ = "America/New_York";

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { dateStyle: "long" }): string {
  // Date-only values carry no time zone; format them as calendar dates.
  const timeZone = iso.includes("T") ? TZ : "UTC";
  return new Intl.DateTimeFormat("en-US", { timeZone, ...opts }).format(new Date(iso));
}

/** Date-only ISO strings (2026-11-02) carry no time; show them without one. */
export function formatEventWhen(start: string, end?: string): string {
  const hasTime = (s: string) => s.includes("T");
  const fmt = (s: string) =>
    formatDate(s, hasTime(s) ? { dateStyle: "full", timeStyle: "short" } : { dateStyle: "full" });
  return end ? `${fmt(start)} to ${fmt(end)}` : fmt(start);
}
