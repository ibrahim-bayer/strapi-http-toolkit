type Primitive = string | number | boolean | symbol | bigint | null | undefined;

export interface CrudRequestModel<T> {
  data: {
    [K in keyof T]?: 
      // Special case for keys named "id"
      K extends 'id'
        ? Extract<T[K], number> | undefined
        // Special case for keys ending with "Id"
        : K extends `documentId`
          ? Extract<T[K], string> | undefined
          // Generic handling for primitives (allow null)
          : T[K] extends Primitive
            ? T[K] | null
            // Default for complex types
            : string | string[] | 
              { connect: string[] } |
              { disconnect: string[] } |
              { set: string[] };
  };
}
