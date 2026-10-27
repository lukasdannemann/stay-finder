import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { KIND_LABELS } from '@/lib/labels'

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.property_id}`}
      className="group block h-full rounded-xl"
    >
      <Card className="h-full pt-0 shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
        <div className="aspect-[4/3] shrink-0 overflow-hidden bg-muted">
          {" "}
          {property.image_url ? (
            <img
              src={property.image_url}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Ingen bild
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle>
            <h2 className="truncate">{property.title}</h2>  
          </CardTitle>
          <CardDescription className="truncate">
            {property.location}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-between gap-2 text-muted-foreground">
          <span className="truncate">
            {KIND_LABELS[property.kind]} · upp till {property.max_guests} gäster
          </span>
          <span className="whitespace-nowrap text-foreground">
            <span className="font-semibold">{property.price_per_night} kr</span>{" "}
            / natt
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
