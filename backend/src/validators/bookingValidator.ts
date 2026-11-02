import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { BOOKING_STATUSES } from "../types/booking.js";
import { handleValidationError } from "../utils/validation.js";

const bookingFields = {
  guest_name: z.string().trim().min(2, "Namnet måste vara minst 2 tecken"),
  guest_email: z.email("Ange en giltig e-postadress"),
  check_in: z.iso.date("Ange ett giltigt incheckningsdatum"),
  check_out: z.iso.date("Ange ett giltigt utcheckningsdatum"),
  guests: z.number().int("Antal gäster måste vara ett heltal").min(1, "Minst 1 gäst"),
};

const checkOutAfterCheckIn = (booking: { check_in: string; check_out: string }) =>
  booking.check_out > booking.check_in;

const datesError = {
  message: "Utcheckningen måste vara efter incheckningen",
  path: ["check_out"],
};

const createBookingSchema = z
  .strictObject(bookingFields)
  .refine(checkOutAfterCheckIn, datesError);

const updateBookingSchema = z
  .strictObject({ ...bookingFields, status: z.enum(BOOKING_STATUSES) })
  .refine(checkOutAfterCheckIn, datesError);

export const createBookingValidator = zValidator("json", createBookingSchema, handleValidationError);
export const updateBookingValidator = zValidator("json", updateBookingSchema, handleValidationError);

// URL-parametrar
export const bookingIdParamValidator = zValidator(
  "param",
  z.object({ id: z.uuid("Booking id must be a valid UUID") }),
  handleValidationError
);

export const propertyIdParamValidator = zValidator(
  "param",
  z.object({ propertyId: z.uuid("Property id must be a valid UUID") }),
  handleValidationError
);