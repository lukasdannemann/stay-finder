import * as z from 'zod'
import {zValidator} from '@hono/zod-validator'

const propertySchema = z.strictObject({
  title: z.string().min(2, 'Title must be at least 2 characters long'),
  description: z.string().min(5, 'Description must be at least 5 characters long'),
  location: z.string().min(3, 'Location must be at least 3 characters long'),
  price_per_night: z.number().min(0, 'Price per night must be a positive number'),
  max_guests: z.number().min(1, 'Max guests must be at least 1')

})

const handleError = (result: any, c: any) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues }, 400)
  }
}
export const propertyValidator = zValidator('json', propertySchema, handleError)
export const propertyPartialValidator = zValidator('json', propertySchema.partial(), handleError)
