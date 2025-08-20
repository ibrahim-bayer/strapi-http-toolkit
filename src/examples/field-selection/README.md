# Field Selection Examples

This directory contains examples of how to use the `FieldSelection` type to select only specific primitive fields from your Strapi models.

## What is Field Selection?

Field selection allows you to specify which fields should be returned in the API response. This is useful for:

- Reducing response payload size
- Improving API performance
- Getting only the data you need
- Network optimization

## Key Points

- **Only works with primitive fields**: string, number, boolean, Date, etc.
- **Does not work with relations**: Use `populate` for relations instead
- **Type-safe**: TypeScript will prevent you from selecting relation fields
- **Compatible with other parameters**: Can be combined with filters, pagination, populate, etc.

## Usage Examples

```typescript
import {
  FieldSelection,
  PrimitiveFieldNames,
} from "@ibrahimbayer/strapi-http-toolkit";

// Select multiple fields
const productFields: FieldSelection<Product> = ["name", "price", "description"];

// Select single field
const productNameOnly: FieldSelection<Product> = "name";

// Use with API calls
const products = await api.findMany(undefined, undefined, {
  fields: ["name", "price"],
});
```

## Generated Query Parameters

The field selection generates query parameters in the format expected by Strapi:

- Single field: `fields=name`
- Multiple fields: `fields[0]=name&fields[1]=price&fields[2]=description`

This matches the official Strapi REST API documentation for field selection.
