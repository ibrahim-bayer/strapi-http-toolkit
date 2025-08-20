// Demonstration of the simplified FieldSelection API

import { FieldSelection, PrimitiveFieldNames } from "../../FieldSelection";

interface Product {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  price: number;
  category?: Category;
  variants?: ProductVariant[];
}

interface Category {
  id: number;
  documentId: string;
  name: string;
}

interface ProductVariant {
  id: number;
  documentId: string;
  sku: string;
}

// Before: Using interface with fields property
// const oldWay: FieldSelection<Product> = {
//   fields: ["name", "price", "description"]
// };

// After: Direct type usage (much cleaner!)
const newWay: FieldSelection<Product> = ["name", "price", "description"];

// Single field selection is even cleaner
const singleField: FieldSelection<Product> = "name";

// Type-safe field names
const typeSafeFields: PrimitiveFieldNames<Product>[] = [
  "name",
  "price",
  "description",
  // "category" // Would cause TypeScript error - not a primitive field
];

// Usage in GenericService is now cleaner:
// OLD: service.findMany(undefined, undefined, { fields: selection.fields })
// NEW: service.findMany(undefined, undefined, { fields: selection })

export { newWay, singleField, typeSafeFields };
