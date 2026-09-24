import {Hono} from 'hono'
import fs from 'fs'
import { propertyValidator, propertyPartialValidator } from '../validators/propertyValidator.js'

const properties = new Hono()

const fileContent = fs.readFileSync('src/data/properties.json', 'utf-8')
const dummyProperties: Property[] = JSON.parse(fileContent)
const saveProperties = () => {
  fs.writeFileSync('src/data/properties.json', JSON.stringify(dummyProperties, null, 2))
}
// GET

properties.get('/', (c) => {
  return c.json(dummyProperties)
})

// GET BY ID

properties.get('/:id', (c) => {
  const { id } = c.req.param()
  try {

      const property = dummyProperties.find(p => p.id === id)
      if (!property) {
        return c.json({ error: 'Property not found' }, 404)
      }
      return c.json(property)
  } catch (error) {
    return c.json({ error: 'An error occurred while fetching the property' }, 500)
  }
})

// POST

properties.post('/', propertyValidator, async (c) => {
  try {
    const body = c.req.valid('json')
    const newProperty: Property = {
      ...body, 
      id: `property_${1000 + dummyProperties.length + 1}`

    }
    dummyProperties.push(newProperty)
    saveProperties()
    return c.json(newProperty, 201)
  } catch (error) {
    return c.json({ error: 'An error occurred while creating the property' }, 500)
  }
})

// PATCH

properties.patch('/:id', propertyPartialValidator, async (c) => {
  const { id } = c.req.param()
  try {
    const index = dummyProperties.findIndex(p => p.id === id)
    if (index === -1) {
      return c.json({ error: 'Property not found' }, 404)
    }
    const updatedProperty = c.req.valid('json')
    dummyProperties[index] = { ...dummyProperties[index], ...updatedProperty }
    saveProperties()
    return c.json(dummyProperties[index])
  } catch (error) {
    return c.json({ error: 'An error occurred while updating the property' }, 500)
  }
})

// DELETE

properties.delete('/:id', (c) => {
    const { id } = c.req.param()
    try {
        const index = dummyProperties.findIndex(p => p.id === id)
        if (index === -1) {
            return c.json({ error: 'Property not found' }, 404)
        }
        dummyProperties.splice(index, 1)
        saveProperties()
        return c.json({ message: `Property ${id} deleted successfully` })
    } catch (error) {
        return c.json({ error: 'An error occurred while deleting the property' }, 500)
    }
})
export default properties