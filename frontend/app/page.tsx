import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api";
import FilterBar from "@/components/FilterBar";


function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const params = await searchParams;

const values: FilterFormValues = {
  location: firstValue(params.location),
  max_price: firstValue(params.max_price),
  max_guests: firstValue(params.max_guests),
  sort: firstValue(params.sort),
};

const filters: PropertyFilters = {
  location: values.location,
  max_price: values.max_price,
  max_guests: values.max_guests,
  sort_by: values.sort ? "price_per_night" : undefined,
  sort_order:
    values.sort === "price_asc" ? "asc"
    : values.sort === "price_desc" ? "desc"
    : undefined,
};

  const { data: properties, count } = await getProperties(filters);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <FilterBar key={JSON.stringify(values)} values={values} />
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