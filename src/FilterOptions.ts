export type FilterCondition<T> = {
  $eq?: T;
  $eqi?: T;
  $ne?: T;
  $nei?: T;
  $lt?: T;
  $lte?: T;
  $gt?: T;
  $gte?: T;
  $in?: T[];
  $notIn?: T[];
  $contains?: T extends string ? string : never;
  $ncontains?: T extends string ? string : never;
  $containsi?: T extends string ? string : never;
  $ncontainsi?: T extends string ? string : never;
  $null?: boolean;
  $notNull?: boolean;
  $between?: T extends number | Date | string ? [T, T] : never;
  $startsWith?: T extends string ? string : never;
  $startsWithi?: T extends string ? string : never;
  $endsWith?: T extends string ? string : never;
  $endsWithi?: T extends string ? string : never;
};

type FilterConditionWithId<T> = T extends { documentId: infer ID }
  ? FilterCondition<T> | FilterCondition<ID>
  : FilterCondition<T>;

type FilterConditionOptions<T> = {
  [K in keyof T]?: NonNullable<T[K]> extends (infer U)[]
    ? FilterCondition<U> | FilterOptions<NonNullable<U>>
    : NonNullable<T[K]> extends object
    ?
        | FilterConditionWithId<NonNullable<T[K]>>
        | FilterOptions<NonNullable<T[K]>>
    : FilterCondition<NonNullable<T[K]>>;
};

export type FilterOptions<T> = FilterConditionOptions<T> & {
  $and?: FilterOptions<T>[];
  $or?: FilterOptions<T>[];
  not?: FilterOptions<T>[];
};
