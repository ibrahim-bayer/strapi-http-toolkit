import qs from "qs";
import { FilterOptions } from "../../FilterOptions";
import {
  mockCategories,
  mockProducts,
  mockProductVariants,
  mockProductVariantTranslations,
} from "../mockup/mockData";
import { CategoryModel } from "../model/CategoryModel";
import { ProductModel } from "../model/ProductModel";
import { ProductVariantModel } from "../model/ProductVariantModel";
import { ProductVariantTranslationModel } from "../model/ProductVariantTranslationModel";

/**
 * Example 1: Filter products by exact name match
 */
export const filterProductsByExactName = (
  name: string
): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    name: { $eq: name },
  };

  console.log("Filter for exact name match:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Example 2: Filter products by name containing text (case-insensitive)
 */
export const filterProductsByNameContains = (
  searchTerm: string
): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    name: { $containsi: searchTerm },
  };

  console.log("Filter for name contains (case-insensitive):");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Example 3: Filter products by price range
 */
export const filterProductsByPriceRange = (
  minPrice: number,
  maxPrice: number
): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    price: { $between: [minPrice, maxPrice] },
  };

  console.log("Filter for price range:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Example 4: Filter products by category using nested filtering
 */
export const filterProductsByCategory = (
  categoryName: string
): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    categories: {
      name: { $eq: categoryName },
    },
  };

  console.log("Filter for category:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Example 5: Complex filter using AND conditions
 */
export const filterProductsByNameAndCategory = (
  name: string,
  categoryName: string
): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    $and: [
      { name: { $containsi: name } },
      { categories: { name: { $eq: categoryName } } },
    ],
  };

  console.log("Filter for name AND category:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));
  return filter;
};

/**
 * Example 6: Filter using OR conditions
 */
export const filterProductsByMultipleCategories = (
  categoryNames: string[]
): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    $or: categoryNames.map((categoryName) => ({
      categories: { name: { $eq: categoryName } },
    })),
  };
  console.log("Filter for multiple categories (OR):");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));
  return filter;
};

/**
 * Example 7: Filter products by variant properties
 */
export const filterProductsByVariantName = (
  variantName: string
): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    variants: {
      name: { $containsi: variantName },
    },
  };

  console.log("Filter for variant name:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Example 8: Filter products by variant translation text
 */
export const filterProductsByVariantTranslation = (
  translationText: string
): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    variants: {
      translations: {
        text: { $containsi: translationText },
      },
    },
  };

  console.log("Filter for variant translation:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Example 9: Filter products with multiple categories and variant names
 */
export const filterProductsComplex = (): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    $and: [
      { price: { $gte: 50 } },
      {
        $or: [
          { categories: { name: { $eq: "Electronics" } } },
          { categories: { name: { $eq: "Clothing" } } },
        ],
      },
      {
        variants: {
          name: { $containsi: "pro" },
        },
      },
    ],
  };

  console.log("Complex filter:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Example 10.1: Filter products by external ID
 */
export const filterProductsByExternalId = (
  externalId: string
): FilterOptions<ProductModel> => {
  const filter: FilterOptions<ProductModel> = {
    externalId: { $eq: externalId },
  };

  console.log("Filter for external ID:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Example 11: Filter categories by product existence (using NOT NULL)
 */
export const filterCategoriesWithProducts =
  (): FilterOptions<CategoryModel> => {
    const filter: FilterOptions<CategoryModel> = {
      products: { $notNull: true },
    };

    console.log("Filter categories with products:");
    console.log(JSON.stringify(filter, null, 2));
    console.log("Serialized query string:", qs.stringify({ filters: filter }));

    return filter;
  };

/**
 * Example 12: Filter product variants by translation text
 */
export const filterVariantsByTranslation = (
  translationText: string
): FilterOptions<ProductVariantModel> => {
  const filter: FilterOptions<ProductVariantModel> = {
    translations: {
      text: { $startsWith: translationText },
    },
  };

  console.log("Filter variants by translation:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Example 13: Filter translations by variant product price
 */
export const filterTranslationsByProductPrice = (
  minPrice: number
): FilterOptions<ProductVariantTranslationModel> => {
  const filter: FilterOptions<ProductVariantTranslationModel> = {
    product_variant: {
      product: {
        price: { $gte: minPrice },
      },
    },
  };
  console.log("Filter translations by product price:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("Serialized query string:", qs.stringify({ filters: filter }));

  return filter;
};

/**
 * Demo function that runs all filter examples
 */
export const runFilterExamples = () => {
  console.log("=== Product Filter Examples ===\n");

  console.log("1. Filter products by exact name:");
  filterProductsByExactName("Smartphone");
  console.log("\n");

  console.log("2. Filter products by name contains:");
  filterProductsByNameContains("shirt");
  console.log("\n");

  console.log("3. Filter products by price range:");
  filterProductsByPriceRange(50, 1000);
  console.log("\n");

  console.log("4. Filter products by category:");
  filterProductsByCategory("Electronics");
  console.log("\n");

  console.log("5. Filter products by name AND category:");
  filterProductsByNameAndCategory("smart", "Electronics");
  console.log("\n");

  console.log("6. Filter products by multiple categories (OR):");
  filterProductsByMultipleCategories(["Electronics", "Clothing"]);
  console.log("\n");

  console.log("7. Filter products by variant name:");
  filterProductsByVariantName("Pro");
  console.log("\n");

  console.log("8. Filter products by variant translation:");
  filterProductsByVariantTranslation("camera");
  console.log("\n");

  console.log("9. Complex filter example:");
  filterProductsComplex();
  console.log("\n");

  console.log("10.1. Filter products by external ID:");
  filterProductsByExternalId("trendyol_12345");
  console.log("\n");

  console.log("11. Filter categories with products:");
  filterCategoriesWithProducts();
  console.log("\n");

  console.log("12. Filter variants by translation:");
  filterVariantsByTranslation("Smartphone");
  console.log("\n");

  console.log("13. Filter translations by product price:");
  filterTranslationsByProductPrice(100);
  console.log("\n");

  console.log("=== Mock Data Summary ===");
  console.log(`Products: ${mockProducts.length}`);
  console.log(`Categories: ${mockCategories.length}`);
  console.log(`Variants: ${mockProductVariants.length}`);
  console.log(`Translations: ${mockProductVariantTranslations.length}`);
};
