import { MetaModel } from "./MetaModel";

export interface BaseDataMetaModel<T> {
    data: T
    meta: MetaModel;
}


