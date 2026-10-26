import {Hono} from 'hono'
import { propertyValidator } from '../validators/propertyValidator.js'
import propertyParamValidator from '../validators/propertyParamValidator.js'
import propertyQueryValidator from '../validators/propertyQueryValidator.js'
import * as db from '../database/property.js'
import type { NewProperty } from '../types/property.js'
import { requireAuth } from '../middleware/auth.js';

const properties = new Hono()

// GET

properties.get("/", propertyQueryValidator, async (c) => {
const query = c.req.valid("query");

  try {
    const properties = await db.getProperties(c.get("supabase"), query);

    return c.json(properties);
  } catch (error) {
    return c.json(
      {
        data: [],
        count: 0,
        offset: query.offset,
        limit: query.limit
      },
      500
    );
  }
});

// GET BY ID

properties.get("/:id", propertyParamValidator, async (c) => {
  try {
    const { id } = c.req.valid("param");

    const property = await db.getPropertyById(c.get("supabase"), id);

    if (!property) {
      return c.json(
        {
          error: "Property not found"
        },
        404
      );
    }

    return c.json(property);
  } catch (error) {
    return c.json(
      {
        error: "Failed to fetch property"
      },
      500
    );
  }
});

// POST

properties.post("/", requireAuth,propertyValidator, async (c) => {
  try {
    const newProperty: NewProperty = c.req.valid("json");

    const property = await db.createProperty(c.get("supabase"), newProperty);

    return c.json(property, 201);
  } catch (error) {
    return c.json(
      {
        error: "Failed to create property"
      },
      400
    );
  }
});

// PATCH

properties.put(
  "/:id",
  requireAuth,
  propertyParamValidator,
  propertyValidator,
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const body: NewProperty = c.req.valid("json");

      const updatedProperty = await db.updateProperty(c.get("supabase"), id, body);

      if (!updatedProperty) {
        return c.json(
          {
            error: "Property not found"
          },
          404
        );
      }

      return c.json(updatedProperty);
    } catch (error) {
      return c.json(
        {
          error: "Failed to update property"
        },
        400
      );
    }
  }
);

// DELETE

properties.delete("/:id", requireAuth, propertyParamValidator, async (c) => {
  try {
    const { id } = c.req.valid("param");

    const deletedProperty = await db.deleteProperty(c.get("supabase"), id);

    if (!deletedProperty) {
      return c.json(
        {
          error: "Property not found"
        },
        404
      );
    }

    return c.json({
      message: "Property deleted",
      property: deletedProperty
    });
  } catch (error) {
    return c.json(
      {
        error: "Failed to delete property"
      },
      500
    );
  }
});
export default properties