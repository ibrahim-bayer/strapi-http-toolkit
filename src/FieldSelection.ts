type Primitive =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined
  | Date;

// Extract only primitive field names from a type
type PrimitiveKeys<T> = {
  [K in keyof T]: T[K] extends Primitive
    ? K
    : NonNullable<T[K]> extends (infer U)[]
    ? never // Arrays are not primitive
    : NonNullable<T[K]> extends object
    ? never // Objects are not primitive
    : K;
}[keyof T];

// Field selection type that directly represents the field values
export type FieldSelection<T> = PrimitiveKeys<T>[] | PrimitiveKeys<T>;

// Type helper to get primitive field names as a union type
export type PrimitiveFieldNames<T> = PrimitiveKeys<T>;
