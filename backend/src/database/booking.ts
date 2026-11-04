import type { AppSupabaseClient } from "../types/supabase.js";
import type { Booking, BookingUpdate, BookingWithProperty, NewBooking } from "../types/booking.js";

export async function getBookingsForProperty(
  supabase: AppSupabaseClient,
  propertyId: string,
): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("property_id", propertyId)
    .order("check_in", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createBooking(
  supabase: AppSupabaseClient,
  propertyId: string,
  booking: NewBooking,
): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert({ ...booking, property_id: propertyId })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateBooking(
  supabase: AppSupabaseClient,
  id: string,
  booking: BookingUpdate,
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .update(booking)
    .eq("booking_id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteBooking(
  supabase: AppSupabaseClient,
  id: string,
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("booking_id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getBookingsForUser(
  supabase: AppSupabaseClient,
  userId: string,
): Promise<BookingWithProperty[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, properties(title, location, image_url, price_per_night)")
    .eq("user_id", userId)
    .order("check_in", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}