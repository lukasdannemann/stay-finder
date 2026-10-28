import type { $ZodError } from "zod/v4/core";
import type { Context } from 'hono'

export function getValidatorError (error: $ZodError) {
  return {
    errors: error.issues.map((issue) => {
      return [issue.path.join(", "), issue.message];
    }),
  };
};

export function handleValidationError(
  result: { success: boolean; error?: $ZodError },
  c: Context
) {
  if (!result.success && result.error) {
    return c.json(getValidatorError(result.error), 400);
  }
}