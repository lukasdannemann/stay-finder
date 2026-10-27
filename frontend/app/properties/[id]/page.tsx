import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/api";
import { KIND_LABELS } from "@/lib/labels";

export default async function PropertyPage({ params }: PageProps<"/properties/[id]">) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">
        ← Alla boenden
      </Link>

      <div className="mt-4 mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-semibold">{property.title}</h1>
        <p className="text-muted-foreground">{property.location}</p>
      </div>

      <div className="aspect-[16/9] overflow-hidden rounded-xl bg-muted">
        {property.image_url ? (
          <img src={property.image_url} alt={property.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Ingen bild
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <p className="text-muted-foreground">
          {KIND_LABELS[property.kind]} · upp till {property.max_guests} gäster
        </p>
        <p className="text-lg">
          <span className="font-semibold">{property.price_per_night} kr</span> / natt
        </p>
      </div>

      <p className="mt-6 leading-relaxed">{property.description}</p>
    </main>
  );
}