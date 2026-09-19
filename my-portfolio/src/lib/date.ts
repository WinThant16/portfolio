import type { DateRange } from "@/data/types";

const MONTHS = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

function parseYearMonth(value: string) {
  const [year, month] = value.split("-").map(Number);

  return {
    year,
    month,
    label: `${MONTHS[month - 1]} ${year}`,
  };
}

export function formatDateRange(
  dates: DateRange,
  presentLabel = "Present"
) {
  const start = parseYearMonth(dates.start);

  if (!dates.end) {
    return `${start.label} - ${presentLabel}`;
  }

  const end = parseYearMonth(dates.end);

  return `${start.label} - ${end.label}`;
}

export function formatProjectTimeline(dates: DateRange) {
  const start = parseYearMonth(dates.start);

  if (!dates.end) {
    return `${MONTHS[start.month - 1]}-Present`;
  }

  const end = parseYearMonth(dates.end);

  if (start.year === end.year) {
    return `${MONTHS[start.month - 1]}-${MONTHS[end.month - 1]}`;
  }

  return `${start.label} - ${end.label}`;
}

export function formatProjectYear(dates: DateRange) {
  const start = parseYearMonth(dates.start);

  if (!dates.end) {
    return `${start.year}-Present`;
  }

  const end = parseYearMonth(dates.end);

  return start.year === end.year
    ? `${start.year}`
    : `${start.year}–${end.year}`;
}