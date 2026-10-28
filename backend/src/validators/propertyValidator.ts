import * as z from 'zod'
import {zValidator} from '@hono/zod-validator'
import { PROPERTY_KINDS } from '../types/property.js'
import { handleValidationError } from "../utils/validation.js";

const propertySchema = z.strictObject({
  title: z.string().min(2, 'Titel måste vara minst 2 tecken långt'),
  description: z.string().min(5, 'Beskrivning måste vara minst 5 tecken långt'),
  location: z.string().min(3, 'Plats måste vara minst 3 tecken långt'),
  price_per_night: z.number().min(0, 'Pris per natt måste vara en positiv siffra'),
  max_guests: z.number().min(1, 'Maxgäster måste vara minst 1'),
  kind: z.enum(PROPERTY_KINDS),
  image_url: z.url('Image must be a valid URL').nullable().optional(),
})

export const propertyValidator = zValidator('json', propertySchema, handleValidationError)
export const propertyPartialValidator = zValidator('json', propertySchema.partial(), handleValidationError)
