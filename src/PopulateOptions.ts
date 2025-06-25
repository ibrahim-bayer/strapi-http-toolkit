type Primitive = string | number | boolean | symbol | bigint | null | undefined;

export interface PopulateOptions<T> {
    populate?: {
        [K in keyof T]?: T[K] extends Primitive
        ? never
        : NonNullable<T[K]> extends (infer U)[]
        ? PopulateOptions<U> | boolean
        : PopulateOptions<T[K]> | boolean
    }
}