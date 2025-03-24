type Primitive = string | number | boolean | symbol | bigint | null | undefined;

export interface CrudRequestModel<T> {
    data : {
        [K in keyof T]?: T[K] extends Primitive
    ? T[K] : string | string[]
    }
}