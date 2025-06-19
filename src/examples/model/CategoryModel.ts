import { ProductModel } from "./ProductModel";

export interface CategoryModel {
    id: number;
    documentId: string;
    name: string;
    description: string;
    products?: ProductModel[];
}