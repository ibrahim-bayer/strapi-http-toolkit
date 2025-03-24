import { FilterOptions } from "./FilterOptions";
import { CrudRequestModel } from "./CrudRequestModel";
import { PopulateOptions } from "./PopulateOptions";

export interface FetchRequestParameters<X> {
  method: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  parameters?: {
    [key: string]: string[] | string;
  };
  filters?: FilterOptions<X>;
  pagination?: {
    start?: number;
    limit?: number;
    page?:number
    pageSize?:number
  };
  relations?: PopulateOptions<X>;
  sort?: string[];
  body?: CrudRequestModel<X>;
  customBody?: object
}