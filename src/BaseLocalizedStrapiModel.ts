import { BaseStrapiModel } from "./BaseStrapiModel";

export interface BaseLocalizedStrapiModel extends BaseStrapiModel {
  locale: string;
}
