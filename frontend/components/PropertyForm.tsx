"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/lib/api";
import { KIND_LABELS } from "@/lib/labels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const KIND_ITEMS = (Object.keys(KIND_LABELS) as PropertyKind[]).map((kind) => ({
  value: kind,
  label: KIND_LABELS[kind],
}));

function readForm(formData: FormData): NewProperty {
  const imageUrl = String(formData.get("image_url") ?? "").trim();

  return {
    title: String(formData.get("title")),
    description: String(formData.get("description")),
    location: String(formData.get("location")),
    price_per_night: Number(formData.get("price_per_night")),
    max_guests: Number(formData.get("max_guests")),
    kind: String(formData.get("kind")) as PropertyKind,
    image_url: imageUrl === "" ? null : imageUrl,
  };
}

export default function PropertyForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = readForm(new FormData(event.currentTarget));

    setError(null);
    setIsPending(true);

    try {
      const property = await createProperty(input);
      router.push(`/properties/${property.property_id}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kunde inte skapa boendet");
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Titel</Label>
        <Input id="title" name="title" required minLength={2} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Beskrivning</Label>
        <Textarea id="description" name="description" rows={4} required minLength={5} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Plats</Label>
          <Input id="location" name="location" placeholder="t.ex. Åre" required minLength={3} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="kind">Typ av boende</Label>
          <Select name="kind" items={KIND_ITEMS} required>
            <SelectTrigger id="kind" className="w-full">
              <SelectValue placeholder="Välj typ" />
            </SelectTrigger>
            <SelectContent>
              {KIND_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="price_per_night">Pris per natt (kr)</Label>
          <Input id="price_per_night" name="price_per_night" type="number" min={1} required />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="max_guests">Max antal gäster</Label>
          <Input id="max_guests" name="max_guests" type="number" min={1} required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="image_url">Bild-URL (valfritt)</Label>
        <Input id="image_url" name="image_url" type="url" placeholder="https://..." />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={isPending} className="w-fit">
        {isPending ? "Sparar…" : "Skapa boende"}
      </Button>
    </form>
  );
}