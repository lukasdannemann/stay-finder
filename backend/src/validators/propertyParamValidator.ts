import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { handleValidationError } from "../utils/validation.js";

const propertyParamSchema = z.object({
  id: z.uuid("Property id must be a valid UUID"),
});

const propertyParamValidator = zValidator("param", propertyParamSchema, handleValidationError);

export default propertyParamValidator;
