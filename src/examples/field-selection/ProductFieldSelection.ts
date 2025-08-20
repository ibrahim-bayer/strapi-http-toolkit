import { FieldSelection, PrimitiveFieldNames } from "../../FieldSelection";
import { ProductModel } from "../model/ProductModel";

// Example 1: Select specific primitive fields from ProductModel
export const productFieldSelection: FieldSelection<ProductModel> = [
  "name",
  "description",
  "price",
]; // Only primitive fields are allowed

// Example 2: Select single field
export const productNameOnly: FieldSelection<ProductModel> = "name";

// Example 3: Select all primitive fields including dates and IDs
export const productAllPrimitiveFields: FieldSelection<ProductModel> = [
  "id",
  "documentId",
  "name",
  "description",
  "price",
  "externalId",
  "createdAt",
  "updatedAt",
  "publishedAt",
];

// Example 4: Using PrimitiveFieldNames type helper for type safety
export const productFieldsTyped: PrimitiveFieldNames<ProductModel>[] = [
  "name",
  "price",
  "description",
  // "variants", // This would cause a TypeScript error - variants is a relation
  // "categories" // This would cause a TypeScript error - categories is a relation
];

// Example 5: Field selection combined with populate (for API calls)
export const productFieldsWithRelations = {
  fields: ["name", "price"] as PrimitiveFieldNames<ProductModel>[],
  populate: {
    categories: {
      fields: ["name", "description"], // Field selection can also be used in populate
    },
    variants: true,
  },
};

// Example 6: Using field selection in API parameters
export const apiRequestExample = {
  method: "GET",
  fields: ["name", "description", "price"] as FieldSelection<ProductModel>,
  pagination: {
    page: 1,
    pageSize: 10,
  },
  filters: {
    price: { $gte: 100 },
  },
};
