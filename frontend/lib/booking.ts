const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function countNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const difference = Date.parse(checkOut) - Date.parse(checkIn);
  return difference > 0 ? Math.round(difference / DAY_IN_MS) : 0;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}