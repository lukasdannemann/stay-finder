type PropertyKind = "apartment" | "house" | "cabin";

interface Property {
  property_id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  kind: PropertyKind;
  image_url: string | null;
  user_id: string | null;
  created_at: string;
}

type PaginatedListResponse<T> = {
  data: T[];
  count: number;
  offset: number;
  limit: number;
};

type PropertyFilters = {
  location?: string;
  max_price?: string;
  max_guests?: string;
  sort_by?: string;
  sort_order?: string;
};

type FilterFormValues = {
  location?: string;
  max_price?: string;
  max_guests?: string;
  sort?: string;
};