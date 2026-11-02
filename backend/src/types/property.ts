export const PROPERTY_KINDS = ["apartment", "house", "cabin"] as const;
export type PropertyKind = (typeof PROPERTY_KINDS)[number];
import type { Database } from "./database.types.js";

type PropertyTable = Database["public"]["Tables"]["properties"];

export type Property = PropertyTable["Row"];

export type NewProperty = Omit<PropertyTable["Insert"], "property_id" | "created_at" | "user_id">;

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
