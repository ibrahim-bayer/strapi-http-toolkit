import { CategoryModel } from "../model/CategoryModel";
import { ProductModel } from "../model/ProductModel";
import { ProductVariantModel } from "../model/ProductVariantModel";
import { ProductVariantTranslationModel } from "../model/ProductVariantTranslationModel";

// Category mockup data
export const mockCategories: CategoryModel[] = [
  {
    id: 1,
    documentId: "cat_electronics_001",
    name: "Electronics",
    description: "Electronic devices and gadgets"
  },
  {
    id: 2,
    documentId: "cat_clothing_002",
    name: "Clothing",
    description: "Fashion and apparel items"
  },
  {
    id: 3,
    documentId: "cat_books_003",
    name: "Books",
    description: "Books and educational materials"
  },
  {
    id: 4,
    documentId: "cat_home_004",
    name: "Home & Garden",
    description: "Home improvement and garden supplies"
  }
];

// Product Variant Translation mockup data
export const mockProductVariantTranslations: ProductVariantTranslationModel[] = [
  {
    id: 1,
    documentId: "trans_001",
    text: "Smartphone with advanced camera features"
  },
  {
    id: 2,
    documentId: "trans_002",
    text: "Smartphone with extended battery life"
  },
  {
    id: 3,
    documentId: "trans_003",
    text: "Premium laptop for professionals"
  },
  {
    id: 4,
    documentId: "trans_004",
    text: "Gaming laptop with high-end graphics"
  },
  {
    id: 5,
    documentId: "trans_005",
    text: "Casual cotton t-shirt for everyday wear"
  },
  {
    id: 6,
    documentId: "trans_006",
    text: "Formal business shirt for office wear"
  }
];

// Product Variant mockup data
export const mockProductVariants: ProductVariantModel[] = [
  {
    id: 1,
    documentId: "var_smartphone_pro_001",
    name: "Smartphone Pro",
    description: "High-end smartphone with professional features",
    translations: [mockProductVariantTranslations[0]]
  },
  {
    id: 2,
    documentId: "var_smartphone_basic_002",
    name: "Smartphone Basic",
    description: "Entry-level smartphone with essential features",
    translations: [mockProductVariantTranslations[1]]
  },
  {
    id: 3,
    documentId: "var_laptop_pro_003",
    name: "Laptop Pro",
    description: "Professional laptop for business use",
    translations: [mockProductVariantTranslations[2]]
  },
  {
    id: 4,
    documentId: "var_laptop_gaming_004",
    name: "Gaming Laptop",
    description: "High-performance laptop for gaming",
    translations: [mockProductVariantTranslations[3]]
  },
  {
    id: 5,
    documentId: "var_tshirt_casual_005",
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt",
    translations: [mockProductVariantTranslations[4]]
  },
  {
    id: 6,
    documentId: "var_shirt_formal_006",
    name: "Formal Shirt",
    description: "Professional business shirt",
    translations: [mockProductVariantTranslations[5]]
  }
];

// Product mockup data
export const mockProducts: ProductModel[] = [
  {
    id: 1,
    documentId: "prod_smartphone_001",
    name: "Smartphone",
    description: "Latest generation smartphone with cutting-edge technology",
    price: 899.99,
    variants: [mockProductVariants[0], mockProductVariants[1]],
    categories: [mockCategories[0]]
  },
  {
    id: 2,
    documentId: "prod_laptop_002",
    name: "Laptop",
    description: "Versatile laptop for work and entertainment",
    price: 1299.99,
    variants: [mockProductVariants[2], mockProductVariants[3]],
    categories: [mockCategories[0]]
  },
  {
    id: 3,
    documentId: "prod_tshirt_003",
    name: "T-Shirt",
    description: "Comfortable and stylish t-shirt",
    price: 29.99,
    variants: [mockProductVariants[4]],
    categories: [mockCategories[1]]
  },
  {
    id: 4,
    documentId: "prod_shirt_004",
    name: "Business Shirt",
    description: "Professional shirt for business occasions",
    price: 79.99,
    variants: [mockProductVariants[5]],
    categories: [mockCategories[1]]
  },
  {
    id: 5,
    documentId: "prod_novel_005",
    name: "Programming Guide",
    description: "Comprehensive guide to modern programming",
    price: 49.99,
    variants: [],
    categories: [mockCategories[2]]
  },
  {
    id: 6,
    documentId: "prod_garden_tools_006",
    name: "Garden Tool Set",
    description: "Complete set of essential garden tools",
    price: 149.99,
    variants: [],
    categories: [mockCategories[3]]
  }
];

// Update references for circular relationships
mockProductVariants[0].product = mockProducts[0];
mockProductVariants[1].product = mockProducts[0];
mockProductVariants[2].product = mockProducts[1];
mockProductVariants[3].product = mockProducts[1];
mockProductVariants[4].product = mockProducts[2];
mockProductVariants[5].product = mockProducts[3];

mockProductVariantTranslations[0].product_variant = mockProductVariants[0];
mockProductVariantTranslations[1].product_variant = mockProductVariants[1];
mockProductVariantTranslations[2].product_variant = mockProductVariants[2];
mockProductVariantTranslations[3].product_variant = mockProductVariants[3];
mockProductVariantTranslations[4].product_variant = mockProductVariants[4];
mockProductVariantTranslations[5].product_variant = mockProductVariants[5];

mockCategories[0].products = [mockProducts[0], mockProducts[1]];
mockCategories[1].products = [mockProducts[2], mockProducts[3]];
mockCategories[2].products = [mockProducts[4]];
mockCategories[3].products = [mockProducts[5]];
