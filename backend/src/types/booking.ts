import type { Database } from "./database.types.js";
import type { Property } from "./property.js";

type BookingTable = Database["public"]["Tables"]["bookings"];

export const BOOKING_STATUSES = ["pending", "confirmed", "cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export type Booking = BookingTable["Row"];

export type BookingUpdate = NewBooking & { status: BookingStatus };

export type NewBooking = Omit<
  BookingTable["Insert"],
  "booking_id" | "created_at" | "user_id" | "property_id" | "status"
>;
export type BookingWithProperty = Booking & {
  properties: Pick<Property, "title" | "location" | "image_url"> | null;
};