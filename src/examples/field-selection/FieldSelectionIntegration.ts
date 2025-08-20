import {
  FieldSelection,
  GenericService,
  PrimitiveFieldNames,
} from "../../index";
import { ProductModel } from "../model/ProductModel";

/**
 * Example demonstrating how to use FieldSelection with GenericService
 * for optimized API calls with Strapi
 */

// Create a service instance
const productService = new GenericService<ProductModel>("/api/products");

export async function exampleFieldSelection() {
  // Example 1: Basic field selection - only get name and price
  const basicFieldSelection: FieldSelection<ProductModel> = ["name", "price"];

  const productsWithBasicFields = await productService.findMany(
    undefined, // no relations
    undefined, // no filters
    { fields: basicFieldSelection }
  );

  // Example 2: Get single field only
  const productNames = await productService.findMany(undefined, undefined, {
    fields: "name",
  });

  // Example 3: Type-safe field selection using PrimitiveFieldNames
  const typeSafeFields: PrimitiveFieldNames<ProductModel>[] = [
    "name",
    "description",
    "price",
    "externalId",
    // "variants" // This would cause TypeScript error - not a primitive field
  ];

  const typeSafeProducts = await productService.findMany(undefined, undefined, {
    fields: typeSafeFields,
  });

  // Example 4: Combine field selection with filters and pagination
  const optimizedProductSearch = await productService.findMany(
    undefined,
    {
      name: { $contains: "laptop" },
      price: { $gte: 500 },
    },
    {
      fields: ["name", "price", "description"],
      pagination: { page: 1, pageSize: 20 },
      sort: ["name:asc"],
    }
  );

  // Example 5: Field selection with populate (note: field selection in populate requires different approach)
  const productsWithCategories = await productService.findMany(
    {
      populate: {
        categories: true,
      },
    },
    undefined,
    {
      fields: ["name", "price"], // Only these fields from Product
    }
  );

  // Example 6: Get single product with field selection
  const singleProductOptimized = await productService.findOne(
    "product-documentid-123",
    {
      populate: {
        categories: true,
      },
    },
    {
      fields: ["name", "description", "price"] as FieldSelection<ProductModel>,
    }
  );

  return {
    productsWithBasicFields,
    productNames,
    typeSafeProducts,
    optimizedProductSearch,
    productsWithCategories,
    singleProductOptimized,
  };
}

// Example of how the generated URLs would look:

/**
 * Example 1: /api/products?fields[0]=name&fields[1]=price
 *
 * Example 2: /api/products?fields=name
 *
 * Example 3: /api/products?fields[0]=name&fields[1]=description&fields[2]=price&fields[3]=externalId
 *
 * Example 4: /api/products?filters[name][$contains]=laptop&filters[price][$gte]=500&fields[0]=name&fields[1]=price&fields[2]=description&pagination[page]=1&pagination[pageSize]=20&sort[0]=name:asc
 *
 * Example 5: /api/products?populate[categories]=true&fields[0]=name&fields[1]=price
 *
 * Example 6: /api/products/product-documentid-123?populate[categories]=true&fields[0]=name&fields[1]=description&fields[2]=price
 */

// Performance Benefits:
/**
 * 1. Reduced Network Traffic: Only requested fields are returned
 * 2. Faster JSON Parsing: Smaller response payloads
 * 3. Lower Memory Usage: Less data stored in client
 * 4. Better Cache Efficiency: Smaller cache entries
 * 5. Type Safety: Compile-time verification of field names
 */
