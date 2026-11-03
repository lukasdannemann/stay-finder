import { Hono } from "hono";
import { requireAuth } from "../middleware/auth.js";
import * as db from "../database/booking.js";
import { getPropertyById } from "../database/property.js";
import {
  bookingIdParamValidator,
  createBookingValidator,
  propertyIdParamValidator,
  updateBookingValidator,
} from "../validators/bookingValidator.js";

const bookings = new Hono();

// GET /bookings (all bookings for current user)
bookings.get("/", requireAuth, async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const result = await db.getBookingsForUser(c.get("supabase"), user.id);
    return c.json(result);
  } catch (error) {
    return c.json({ error: "Failed to fetch bookings" }, 500);
  }
});

// GET bookings for a property

bookings.get("/properties/:propertyId", requireAuth, propertyIdParamValidator, async (c) => {

  try {

    const {propertyId} = c.req.valid("param");
    const supabase = c.get("supabase");

    const property = await getPropertyById(supabase, propertyId);
    if (!property) {
      return c.json({ error: "Property not found" }, 404);
    }

    const result = await db.getBookingsForProperty(supabase, propertyId);
    return c.json(result);
  } catch (error) {
    return c.json({ error: "Failed to fetch bookings" }, 500);
  }
});

// POST booking for a property

bookings.post("/properties/:propertyId", requireAuth, propertyIdParamValidator, createBookingValidator, async (c) => {
  try {
    const { propertyId } = c.req.valid("param");
    const body = c.req.valid("json");
    const supabase = c.get("supabase");

    const property = await getPropertyById(supabase, propertyId);
    if (!property) {
      return c.json({ error: "Property not found" }, 404);
    }

    const booking = await db.createBooking(supabase, propertyId, body);
    return c.json(booking, 201);
  } catch (error) {
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

// UPDATE booking

bookings.put("/:id", requireAuth, bookingIdParamValidator, updateBookingValidator, async (c) => {
  try {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");

    const booking = await db.updateBooking(c.get("supabase"), id, body);
    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }

    return c.json(booking);
  } catch (error) {
    return c.json({ error: "Failed to update booking" }, 500);
  }
});

// DELETE booking
bookings.delete("/:id", requireAuth, bookingIdParamValidator, async (c) => {
  try {
    const { id } = c.req.valid("param");

    const booking = await db.deleteBooking(c.get("supabase"), id);
    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }

    return c.json({ message: "Booking deleted", booking });
  } catch (error) {
    return c.json({ error: "Failed to delete booking" }, 500);
  }
});

export default bookings;