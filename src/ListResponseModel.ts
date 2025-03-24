import { ErrorModel } from "./ErrorModel";
import { MetaModel } from "./MetaModel";

export interface ListResponseModel<T> {
    data: T[]
    meta: MetaModel;
    error: ErrorModel;
}