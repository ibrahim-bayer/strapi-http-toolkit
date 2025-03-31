import { BaseStrapiModel } from "./BaseStrapiModel";
import { CrudRequestModel } from "./CrudRequestModel";
import { fetchJsonWrapper } from "./FetchJsonWrapper";
import { FetchRequestParameters } from "./FetchRequestParameters";
import { FilterOptions } from "./FilterOptions";
import { FindOneResponseModel } from "./FindOneResponseModel";
import { ListResponseModel } from "./ListResponseModel";
import { PopulateOptions } from "./PopulateOptions";

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: {
    [key: string]: string[] | string;
  };
  body?: any;
  method?: string;
}

export type InterceptorFunction = (
  options: RequestOptions
) => Promise<RequestOptions>;

export class GenericService<T extends BaseStrapiModel> {
  private baseUrl: string;
  private jwt?: string;
  private interceptors: InterceptorFunction[] = [];

  constructor(baseUrl: string, jwt?: string) {
    this.baseUrl = baseUrl;
    this.jwt = jwt;
  }

  addInterceptor(interceptor: InterceptorFunction) {
    if (this.interceptors.some((i) => i === interceptor)) {
      console.warn("Interceptor already exists");
      return;
    }
    this.interceptors.push(interceptor);
  }

  async findMany(relations?: PopulateOptions<T>, filters?: FilterOptions<T>) {
    const parameters: FetchRequestParameters<T> = {
      method: "GET",
      cache: "no-store",
      relations,
      filters,
    };
    return await fetchJsonWrapper<ListResponseModel<T>, T>(
      this.baseUrl,
      parameters,
      this.jwt,
      this.interceptors
    );
  }

  async findOne(documentId: string, relations?: PopulateOptions<T>) {
    const resourceUrl = `${this.baseUrl}/${documentId}`;
    const parameters: FetchRequestParameters<T> = {
      method: "GET",
      cache: "no-store",
      relations,
    };
    return await fetchJsonWrapper<FindOneResponseModel<T>, T>(
      resourceUrl,
      parameters,
      this.jwt,
      this.interceptors
    );
  }

  async deleteOne(documentId: string) {
    const resourceUrl = `${this.baseUrl}/${documentId}`;
    const parameters: FetchRequestParameters<T> = {
      method: "DELETE",
    };
    return await fetchJsonWrapper<FindOneResponseModel<T>, T>(
      resourceUrl,
      parameters,
      this.jwt,
      this.interceptors
    );
  }

  async update(documentId: string, data: CrudRequestModel<T>) {
    const resourceUrl = `${this.baseUrl}/${documentId}`;
    const parameters: FetchRequestParameters<T> = {
      method: "PUT",
      body: data,
    };
    return await fetchJsonWrapper<FindOneResponseModel<T>, T>(
      resourceUrl,
      parameters,
      this.jwt,
      this.interceptors
    );
  }

  async create(data: CrudRequestModel<T>) {
    const parameters: FetchRequestParameters<T> = {
      method: "POST",
      body: data,
    };
    return await fetchJsonWrapper<FindOneResponseModel<T>, T>(
      this.baseUrl,
      parameters,
      this.jwt,
      this.interceptors
    );
  }
}
