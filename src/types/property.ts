export const PROPERTY_KINDS = ["apartment", "house", "cabin"] as const;
export type PropertyKind = (typeof PROPERTY_KINDS)[number];


export interface NewProperty {
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  kind: PropertyKind;
  max_guests: number;
}

export interface Property extends NewProperty {
 property_id: string;
 created_at: string;
}

export type PropertySortBy =
  | "title"
  | "location"
  | "price_per_night"
  | "created_at";

export type SortOrder = "asc" | "desc";

export type PropertyListQuery = {
  limit: number;
  offset: number;
  location?: string;
  max_guests?: number;
  min_price?: number;
  max_price?: number;
  q?: string;
  kind?: PropertyKind;
  sort_by: PropertySortBy;
  sort_order: SortOrder;
};
