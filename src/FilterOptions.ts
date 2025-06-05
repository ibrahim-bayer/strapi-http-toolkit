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
  [K in keyof T]?: NonNullable<T[K]> extends (infer U)[]
    ? FilterCondition<U> | FilterOptions<NonNullable<U>>
    : NonNullable<T[K]> extends object
    ? FilterCondition<NonNullable<T[K]>> | FilterOptions<NonNullable<T[K]>>
    : FilterCondition<NonNullable<T[K]>>;
};

export type FilterOptions<T> = FilterConditionOptions<T> & {
  $and?: FilterOptions<T>[];
  $or?: FilterOptions<T>[];
};
