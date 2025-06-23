import { GenericService } from "../../GenericService";
import { PopulateOptions } from "../../PopulateOptions";
import { ProductModel } from "../model/ProductModel";

export const populateAllRelations = () => {
  const populate: PopulateOptions<ProductModel> = {
    populate: {
      variants: true,
      categories: true,
    },
  };
  const productService = new GenericService<ProductModel>("/products");
  productService.findOne("123123123123", populate);
};
