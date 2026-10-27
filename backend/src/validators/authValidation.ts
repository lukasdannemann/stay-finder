import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { getValidatorError } from "../utils/validation.js";

const authSchema = z.object({
  email: z.email("Du måste skriva in en email"),
  password: z.string().min(6, "Lösenordet måste vara minst 6 karaktärer")
});

export const authValidator = zValidator(
  "json",
  authSchema,
  (result, c) => {
    if (!result.success) {
      return c.json(getValidatorError(result.error), 400);
    }
  },
);