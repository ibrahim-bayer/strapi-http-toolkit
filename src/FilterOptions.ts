export type FilterCondition<T> = {
    $eq?: T;
    $ne?: T;
    $in?: T[];
    $nin?: T[];
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
      ? FilterConditionOptions<NonNullable<T[K]>> | FilterCondition<NonNullable<T[K]>>
      : FilterCondition<T[K]>; // Alt alanlar desteklenir.
  };

// Array condition to handle filters within arrays
type FilterArrayCondition<T> = {
    $elemMatch?: FilterConditionOptions<T> | FilterCondition<T>;
};

// Main type to apply filters to a model
export type FilterOptions<T> = FilterConditionOptions<T> & {
    $and?: FilterOptions<T>[]; 
    $or?: FilterOptions<T>[];  
  };