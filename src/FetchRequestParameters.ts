import { CrudRequestModel } from "./CrudRequestModel";
import { FieldSelection } from "./FieldSelection";
import { FilterOptions } from "./FilterOptions";
import { Pagination } from "./Pagination";
import { PopulateOptions } from "./PopulateOptions";
import { SearchParameters } from "./SearchParameters";

export interface FetchRequestParameters<X> {
  method: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  parameters?: SearchParameters;
  filters?: FilterOptions<X>;
  pagination?: Pagination;
  relations?: PopulateOptions<X>;
  sort?: string[];
  fields?: FieldSelection<X>;
  body?: CrudRequestModel<X>;
  customBody?: object;
  formData?: FormData;
}
