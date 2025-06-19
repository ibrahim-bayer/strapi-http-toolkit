import { ProductVariantModel } from "./ProductVariantModel";

export interface ProductVariantTranslationModel {
    id: number;
    documentId: string;
    text: string;
    product_variant?: ProductVariantModel;
}