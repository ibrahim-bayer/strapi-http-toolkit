import { PopulateOptions } from '../../PopulateOptions';
import { ProductModel } from '../model/ProductModel';

/**
 * Populate all relations (variants and categories)
 */
export const populateAllRelations = (): PopulateOptions<ProductModel> => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      variants: true,
      categories: true,
    },
  };
  console.log('Populating all relations:');
  console.log(JSON.stringify(populate, null, 2));
  return populate;
};

/**
 * Populate only the variants relation
 */
export const populateVariants = (): PopulateOptions<ProductModel> => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      variants: true,
    },
  };
  console.log('Populating only variants:');
  console.log(JSON.stringify(populate, null, 2));
  return populate;
};

/**
 * Populate both categories and variants relations
 */
export const populateCategoriesAndVariants = (): PopulateOptions<ProductModel> => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      categories: true,
      variants: true,
    },
  };
  console.log('Populating categories and variants:');
  console.log(JSON.stringify(populate, null, 2));
  return populate;
};

/**
 * Nested populate for variants' translations relation
 */
export const populateVariantTranslations = (): PopulateOptions<ProductModel> => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      variants: {
        populate: {
          translations: true,
        },
      },
    },
  };
  console.log("Populating translations inside variants:");
  console.log(JSON.stringify(populate, null, 2));
  return populate;
};

/**
 * Example: Nested populate with multiple levels
 * Populates categories, variants, and translations within variants.
 */
export const populateProductWithDeepRelations = (): PopulateOptions<ProductModel> => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      categories: true, // 1. Populate categories
      variants: {       // 2. Populate variants
        populate: {     //    and inside variants...
          translations: true, // 3. Populate translations
        }
      }
    }
  };

  console.log("Populating product with deep nested relations:");
  console.log(JSON.stringify(populate, null, 2));
  return populate;
};

/**
 * Example: The Full Relational Loop.
 * Starts with a product, populates its categories, then populates the products
 * within those categories, and finally their variants.
 * This is useful for finding related products in the same categories.
 */
export const populateRelatedProductsInSameCategory = (): PopulateOptions<ProductModel> => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      categories: {         // 1. Get the categories of the product
        populate: {
          products: {       // 2. Then, get all products in those categories
            populate: {
              variants: true // 3. For each related product, get its variants
            }
          }
        }
      }
    }
  };

  console.log("Populating related products through categories:");
  console.log(JSON.stringify(populate, null, 2));
  return populate;
};
