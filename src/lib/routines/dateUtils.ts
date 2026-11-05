const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDateString(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
}

export function getTodayJST(now: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(now);
}

function toUTCDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function fromUTCDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function shiftDateString(value: string, days: number): string {
  const date = toUTCDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return fromUTCDate(date);
}

export function enumerateDates(start: string, end: string): string[] {
  const result: string[] = [];
  let current = toUTCDate(start);
  const endDate = toUTCDate(end);
  while (current.getTime() <= endDate.getTime()) {
    result.push(fromUTCDate(current));
    current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
  }
  return result;
}
