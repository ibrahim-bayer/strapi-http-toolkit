import { ProductModel } from "./ProductModel";
import { ProductVariantTranslationModel } from "./ProductVariantTranslationModel";

export interface ProductVariantModel {
    id: number;
    documentId: string;
    product?: ProductModel;
    name: string;
    description: string;
    translations?: ProductVariantTranslationModel[];
}