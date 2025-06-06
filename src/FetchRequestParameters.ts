import { CrudRequestModel } from "./CrudRequestModel";
import { FilterOptions } from "./FilterOptions";
import { PopulateOptions } from "./PopulateOptions";
import { SearchParameters } from "./SearchParameters";

export interface FetchRequestParameters<X> {
  method: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  parameters?: SearchParameters;
  filters?: FilterOptions<X>;
  pagination?: {
    start?: number;
    limit?: number;
    page?: number;
    pageSize?: number;
  };
  relations?: PopulateOptions<X>;
  sort?: string[];
  body?: CrudRequestModel<X>;
  customBody?: object;
  formData?: FormData;
}
