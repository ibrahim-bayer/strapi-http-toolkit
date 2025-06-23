import { BaseStrapiModel } from "../../BaseStrapiModel";
import { CategoryModel } from "./CategoryModel";
import { ProductVariantModel } from "./ProductVariantModel";

export interface ProductModel extends BaseStrapiModel {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  externalId?: string;
  variants?: ProductVariantModel[];
  categories?: CategoryModel[];
}
