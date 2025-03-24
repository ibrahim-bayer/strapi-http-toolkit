import qs from "qs";
import { FetchRequestParameters } from "./FetchRequestParameters";

export async function fetchJsonWrapper<T, X>(
  url: string,
  init?: FetchRequestParameters<X>,
  jwt?: string,
): Promise<T> {
  const parameter = {
    ...init?.parameters,
    pagination: init?.pagination,
    populate: init?.relations?.populate,
    sort: init?.sort,
    filters: init?.filters,
  };
  let defaultHeaders: any = {
    ...init?.headers,
    "Content-Type": "application/json",
  };
  if (jwt && jwt !== "0" && jwt !== "undefined") {
    defaultHeaders['Authorization'] = `Bearer ${jwt}`
  }
  const urlComponent = parameter
    ? decodeURIComponent(qs.stringify(parameter))
    : undefined;

  const response = await fetch(
    url + "?" + urlComponent,
    {
      method: init?.method,
      headers: defaultHeaders,
      body: init?.body ? JSON.stringify(init.body) : undefined,
      cache: init?.cache,
    }
  );
  return await response.json();
}
