import Link from "next/link";

const KIND_LABELS: Record<PropertyKind, string> = {
  apartment: "Lägenhet",
  house: "Hus",
  cabin: "Stuga",
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.property_id}`}
      className="block overflow-hidden rounded-xl border border-zinc-200 transition hover:shadow-md"
    >
      <div className="aspect-[4/3] bg-zinc-100">
        {property.image_url ? (
          <img
            src={property.image_url}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            Ingen bild
          </div>
        )}
      </div>

      <div className="space-y-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-semibold">{property.title}</h2>
          <p className="whitespace-nowrap">
            <span className="font-semibold">{property.price_per_night} kr</span> / natt
          </p>
        </div>
        <p className="text-sm text-zinc-500">{property.location}</p>
        <p className="text-sm text-zinc-500">
          {KIND_LABELS[property.kind]} · upp till {property.max_guests} gäster
        </p>
      </div>
    </Link>
  );
}