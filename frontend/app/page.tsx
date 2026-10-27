import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api";

export default async function HomePage() {
  const { data: properties, count } = await getProperties();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <p className="mb-6 text-sm text-zinc-500">{count} boenden</p>

      {properties.length === 0 ? (
        <p>Inga boenden hittades.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <li key={property.property_id}>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}