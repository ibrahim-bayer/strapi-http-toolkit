export type FilterCondition<T> = {
  $eq?: T;
  $ne?: T;
  $in?: string[] | T[];
  $nin?: string[] | T[];
  $null?: boolean;
  $lt?: T;
  $lte?: T;
  $gt?: T;
  $gte?: T;
  $contains?: T extends string ? string : never;
  $ncontains?: T extends string ? string : never;
  $startsWith?: T extends string ? string : never;
  $endsWith?: T extends string ? string : never;
};

export type FilterConditionWithId<T> = T extends { documentId: infer ID }
  ? FilterCondition<T> | FilterCondition<ID>
  : FilterCondition<T>;

type FilterConditionOptions<T> = {
  [K in keyof T]?: T[K] extends string
    ? FilterCondition<string>
    : T[K] extends number
    ? FilterCondition<number>
    : T[K] extends boolean
    ? FilterCondition<boolean>
    : T[K] extends bigint
    ? FilterCondition<bigint>
    : T[K] extends Date
    ? FilterCondition<Date>
    : T[K] extends (infer U)[]
    ? FilterConditionOptions<U> | FilterCondition<U>
    : NonNullable<T[K]> extends object
    ?
        | FilterConditionOptions<NonNullable<T[K]>>
        | FilterConditionWithId<NonNullable<T[K]>>
    : FilterCondition<T[K]>; // Alt alanlar desteklenir.
};

// Main type to apply filters to a model
export type FilterOptions<T> = FilterConditionOptions<T> & {
  $and?: FilterOptions<T>[];
  $or?: FilterOptions<T>[];
};
