import {Hono} from 'hono'
import { supabase } from '../lib/supabase.js'
import { propertyValidator, propertyPartialValidator } from '../validators/propertyValidator.js'
import propertyParamValidator from '../validators/propertyParamValidator.js'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'

const properties = new Hono()

// GET

properties.get('/', async (c) => {
  try {
    const {data, error} = await supabase
    .from('properties')
    .select('*')
    .overrideTypes<Property[], {merge: false}>()
    if (!error) {
      return c.json(data)
    }
    throw error

  } catch (error) {
    console.warn('Error in fetching from SB database')
    return c.json([])
  }
})

// GET BY ID

properties.get('/:id', propertyParamValidator, async (c) => {
  const { id } = c.req.valid('param')
  try {
      const {data, error}: PostgrestSingleResponse<Property> = await supabase
      .from('properties')
      .select('*')
      .eq('property_id', id)
      .single()
      if (!error) {
        return c.json(data)
      }
      throw error
  } catch (error) {
      console.error(error)
      return c.json({error: 'An error occurred while fetching data from sb database'}, 500)
  }
})

// POST

properties.post('/', propertyValidator, async (c) => {
  try {
    const body = c.req.valid('json')
    const {data, error}: PostgrestSingleResponse<Property> = await supabase
    .from('properties')
    .insert(body)
    .select()
    .single()

    if (!error) {
      return c.json(data)
    }

    throw error
  } catch (error) {
    console.error(error)
    return c.json({ error: 'An error occurred while creating the property' }, 500)
  }
})

// PATCH

properties.patch('/:id', propertyPartialValidator, propertyParamValidator, async (c) => {
  const { id } = c.req.valid('param')
  const body = c.req.valid('json')
  try {
    const {data, error}: PostgrestSingleResponse<Property> = await supabase
    .from('properties')
    .update(body)
    .eq('property_id', id)
    .select()
    .single()

    if (!error) {
      return c.json(data)
    }

    throw error
  } catch (error) {
    return c.json({ error: 'An error occurred while updating the property' }, 500)
  }
})

// DELETE

properties.delete('/:id', propertyParamValidator, async (c) => {
    const { id } = c.req.valid('param')
    try {
      const {data, error}: PostgrestSingleResponse<Property> = await supabase
      .from('properties')
      .delete()
      .eq('property_id', id)
      .select()
      .single()

      if (!error){
        return c.json({message: `Property ${id} deleted successfully`} ,200)
      }
      if (!data) {
        return c.json({message: 'Property not found'}, 404)
      }
      throw error
    } catch (error) {
      console.error(error)
        return c.json({ error: 'An error occurred while deleting the property' }, 500)
    }
})
export default properties