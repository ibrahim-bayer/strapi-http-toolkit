import qs from "qs";
import { FetchRequestParameters } from "./FetchRequestParameters";
import { InterceptorFunction, RequestOptions } from "./GenericService";

export async function fetchJsonWrapper<T, X>(
  url: string,
  init?: FetchRequestParameters<X>,
  jwt?: string,
  interceptors?: InterceptorFunction[]
): Promise<T> {
  let defaultHeaders: any = {
    ...init?.headers,
    "Content-Type": "application/json",
  };
  if (jwt && jwt !== "0" && jwt !== "undefined") {
    defaultHeaders["Authorization"] = `Bearer ${jwt}`;
  }
  let options: RequestOptions = {
    headers: defaultHeaders,
    body: init?.body,
    params: init?.parameters,
    method: init?.method,
  };
  if (interceptors) {
    for (const interceptor of interceptors) {
      options = await interceptor(options);
    }
  }
  const parameter = {
    ...options.params,
    pagination: init?.pagination,
    populate: init?.relations?.populate,
    sort: init?.sort,
    filters: init?.filters,
  };
  const urlComponent = parameter
    ? decodeURIComponent(qs.stringify(parameter))
    : undefined;
  const response = await fetch(url + "?" + urlComponent, {
    method: init?.method,
    headers: options.headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: init?.cache,
  });
  return await response.json();
}
