import { ErrorModel } from "./ErrorModel";
import { MetaModel } from "./MetaModel";

export interface FindOneResponseModel<T> {
    data: T
    meta: MetaModel;
    error?: ErrorModel;
}