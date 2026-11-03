"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteBooking, getMyBookings } from "@/lib/api";
import { countNights, formatDate } from "@/lib/booking";
import { STATUS_LABELS } from "@/lib/labels";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MyBookings() {
  const [bookings, setBookings] = useState<BookingWithProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    getMyBookings()
      .then(setBookings)
      .catch(() => setError("Kunde inte hämta bokningarna"))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Vill du ta bort bokningen?")) {
      return;
    }

    setError(null);
    setDeletingId(id);

    try {
      await deleteBooking(id);
      setBookings((current) => current.filter((booking) => booking.booking_id !== id));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kunde inte ta bort bokningen");
    } finally {
      setDeletingId(null);
    }
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Laddar bokningar…</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {error && <p className="text-sm text-destructive">{error}</p>}

      {bookings.length === 0 && !error && (
        <p className="text-muted-foreground">
          Du har inga bokningar än.{" "}
          <Link href="/" className="text-foreground underline">
            Hitta ett boende
          </Link>
        </p>
      )}

      {bookings.map((booking) => {
        const nights = countNights(booking.check_in, booking.check_out);

        return (
          <Card key={booking.booking_id}>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 space-y-1">
                <Link
                  href={`/properties/${booking.property_id}`}
                  className="block truncate font-semibold hover:underline"
                >
                  {booking.properties?.title ?? "Okänt boende"}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {booking.properties?.location} · {formatDate(booking.check_in)} –{" "}
                  {formatDate(booking.check_out)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {nights} {nights === 1 ? "natt" : "nätter"} · {booking.guests}{" "}
                  {booking.guests === 1 ? "gäst" : "gäster"} · {booking.guest_name}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground">
                  {STATUS_LABELS[booking.status]}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deletingId === booking.booking_id}
                  onClick={() => handleDelete(booking.booking_id)}
                >
                  {deletingId === booking.booking_id ? "Tar bort…" : "Ta bort"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}