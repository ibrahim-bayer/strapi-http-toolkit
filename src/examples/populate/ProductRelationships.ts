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
 * Example: Highly selective and deep-nested populate.
 * - Populates categories, but only their 'name' field.
 * - Populates variants.
 * - Within each variant, populates its translations.
 * - Within each variant, also populates the parent product, but only its 'documentId'.
 */
export const populateWithFieldSelection = (): PopulateOptions<ProductModel> => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      categories: {        // 1. Populate categories
        populate: {
          name: true       //    ...but only get the 'name' field
        }
      },
      variants: {          // 2. Populate variants
        populate: {
          translations: true, // 3. ...and their translations
          product: {       // 4. ...and the parent product (loop back)
            populate: {
              documentId: true // 5. ...and only get the 'documentId' field
            }
          }
        }
      }
    }
  };

  console.log("Populating with highly selective and deep fields:");
  console.log(JSON.stringify(populate, null, 2));
  return populate;
};

/**
 * Example: The Minimalist Deep Dive.
 * Fetches only the names of related categories and the text of the translations
 * from the nested variants, providing a very lightweight report.
 */
export const populateMinimalNestedFields = (): PopulateOptions<ProductModel> => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      categories: {         // 1. Get the categories...
        populate: {
          name: true        // 2. ...but only their names.
        }
      },
      variants: {           // 3. Get the variants...
        populate: {
          translations: {   // 4. ...then their translations...
            populate: {
              text: true    // 5. ...and only the text from them.
            }
          }
        }
      }
    }
  };

  console.log("Populating a minimalist but deep report:");
  console.log(JSON.stringify(populate, null, 2));
  return populate;
};

/**
 * Example: The Full Picture with Context. 
 * Populates all primary relations, but also re-populates the product's categories
 * within each variant, providing full context during data processing.
 */
export const populateEverythingWithProductContext = (): PopulateOptions<ProductModel> => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      categories: true,       // 1. Get all category fields.
      variants: {             // 2. Get all variant fields.
        populate: {
          translations: true,   // 3. And their translations.
          product: {          // 4. And loop back to the parent product...
            populate: {
              categories: true  // 5. ...to get its categories again for context.
            }
          }
        }
      }
    }
  };

  console.log("Populating everything with contextual data inside variants:");
  console.log(JSON.stringify(populate, null, 2));
  return populate;
};
