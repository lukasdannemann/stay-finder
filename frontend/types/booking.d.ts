type BookingStatus = "pending" | "confirmed" | "cancelled";

type Booking = {
  booking_id: string;
  property_id: string;
  user_id: string | null;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests: number;
  status: BookingStatus;
  created_at: string;
};

type NewBooking = {
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests: number;
};
type BookingWithProperty = Booking & {
  properties: {
    title: string;
    location: string;
    image_url: string | null;
  } | null;
};

type BookingUpdate = NewBooking & {
  status: BookingStatus;
};