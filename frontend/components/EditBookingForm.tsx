"use client";

import { useState, type SubmitEvent } from "react";
import { updateBooking } from "@/lib/api";
import { countNights } from "@/lib/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditBookingFormProps = {
  booking: Booking;
  onSaved: (updated: Booking) => void;
  onCancel: () => void;
};

export default function EditBookingForm({ booking, onSaved, onCancel }: EditBookingFormProps) {
  const [checkIn, setCheckIn] = useState(booking.check_in);
  const [checkOut, setCheckOut] = useState(booking.check_out);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const nights = countNights(checkIn, checkOut);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const input: BookingUpdate = {
      guest_name: String(formData.get("guest_name")),
      guest_email: String(formData.get("guest_email")),
      check_in: checkIn,
      check_out: checkOut,
      guests: Number(formData.get("guests")),
      status: booking.status,
    };

    setError(null);
    setIsPending(true);

    try {
      const updated = await updateBooking(booking.booking_id, input);
      onSaved(updated);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kunde inte ändra bokningen");
      setIsPending(false);
    }
  }

  const id = (field: string) => `${field}-${booking.booking_id}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor={id("check_in")}>Incheckning</Label>
          <Input
            id={id("check_in")}
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={id("check_out")}>Utcheckning</Label>
          <Input
            id={id("check_out")}
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor={id("guests")}>Gäster</Label>
          <Input id={id("guests")} name="guests" type="number" min={1} defaultValue={booking.guests} required />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor={id("guest_name")}>Namn</Label>
          <Input id={id("guest_name")} name="guest_name" defaultValue={booking.guest_name} required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={id("guest_email")}>E-post</Label>
        <Input id={id("guest_email")} name="guest_email" type="email" defaultValue={booking.guest_email} required />
      </div>

      {nights > 0 && (
        <p className="text-sm text-muted-foreground">
          {nights} {nights === 1 ? "natt" : "nätter"}
        </p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>
          Avbryt
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sparar…" : "Spara"}
        </Button>
      </div>
    </form>
  );
}