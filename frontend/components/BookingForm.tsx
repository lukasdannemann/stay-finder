"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createBooking } from "@/lib/api";
import { countNights } from "@/lib/booking";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type BookingFormProps = {
  property: Property;
};

export default function BookingForm({ property }: BookingFormProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const nights = countNights(checkIn, checkOut);
  const total = nights * property.price_per_night;
  const today = new Date().toLocaleDateString("sv-SE");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const input: NewBooking = {
      guest_name: String(formData.get("guest_name")),
      guest_email: String(formData.get("guest_email")),
      check_in: checkIn,
      check_out: checkOut,
      guests: Number(formData.get("guests")),
    };

    setError(null);
    setIsPending(true);

    try {
      await createBooking(property.property_id, input);
      router.push("/bookings");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kunde inte skapa bokningen");
      setIsPending(false);
    }
  }

  if (isLoading) {
    return null;
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>Boka boendet</h2>
          </CardTitle>
          <CardDescription>Du behöver vara inloggad för att boka.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login" className={buttonVariants({ className: "w-full" })}>
            Logga in för att boka
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>
            {property.price_per_night.toLocaleString("sv-SE")} kr{" "}
            <span className="font-normal text-muted-foreground">/ natt</span>
          </h2>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="check_in">Incheckning</Label>
              <Input
                id="check_in"
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="check_out">Utcheckning</Label>
              <Input
                id="check_out"
                type="date"
                value={checkOut}
                min={checkIn || undefined}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="guests">Antal gäster</Label>
            <Input id="guests" name="guests" type="number" min={1} max={property.max_guests} defaultValue={1} required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="guest_name">Namn</Label>
            <Input id="guest_name" name="guest_name" autoComplete="name" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="guest_email">E-post</Label>
            <Input id="guest_email" name="guest_email" type="email" defaultValue={user.email} required />
          </div>

          {nights > 0 && (
            <div className="space-y-1 border-t pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>
                  {property.price_per_night.toLocaleString("sv-SE")} kr × {nights}{" "}
                  {nights === 1 ? "natt" : "nätter"}
                </span>
                <span>{total.toLocaleString("sv-SE")} kr</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Totalt</span>
                <span>{total.toLocaleString("sv-SE")} kr</span>
              </div>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Bokar…" : "Boka"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}