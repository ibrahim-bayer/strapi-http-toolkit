import { BaseStrapiModel } from "./BaseStrapiModel";
import { CrudRequestModel } from "./CrudRequestModel";
import { fetchJsonWrapper } from "./FetchJsonWrapper";
import { FetchRequestParameters } from "./FetchRequestParameters";
import { FilterOptions } from "./FilterOptions";
import { FindOneResponseModel } from "./FindOneResponseModel";
import { ListResponseModel } from "./ListResponseModel";
import { PopulateOptions } from "./PopulateOptions";

export class GenericService<T extends BaseStrapiModel> {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async findMany(relations?: PopulateOptions<T>, filters?: FilterOptions<T>) {
        const parameters: FetchRequestParameters<T> = {
            method: "GET",
            cache: "no-store",
            relations,
            filters
        };
        return await fetchJsonWrapper<ListResponseModel<T>, T>(this.baseUrl, parameters);
    }

    async findOne(documentId: string, relations?: PopulateOptions<T>) {
        const resourceUrl = `${this.baseUrl}/${documentId}`;
        const parameters: FetchRequestParameters<T> = {
            method: "GET",
            cache: "no-store",
            relations
        };
        return await fetchJsonWrapper<FindOneResponseModel<T>, T>(resourceUrl, parameters);
    }

    async deleteOne(documentId: string) {
        const resourceUrl = `${this.baseUrl}/${documentId}`;
        const parameters: FetchRequestParameters<T> = {
            method: "DELETE",
        };
        return await fetchJsonWrapper<FindOneResponseModel<T>, T>(resourceUrl, parameters);
    }

    async update(documentId: string, data: CrudRequestModel<T>) {
        const resourceUrl = `${this.baseUrl}/${documentId}`;
        const parameters: FetchRequestParameters<T> = {
            method: "PUT",
            body: data,
        };
        return await fetchJsonWrapper<FindOneResponseModel<T>, T>(resourceUrl, parameters);
    }

    async create(data: CrudRequestModel<T>) {
        const parameters: FetchRequestParameters<T> = {
            method: "POST",
            body: data,
        };
        return await fetchJsonWrapper<ListResponseModel<T>, T>(this.baseUrl, parameters);
    }
}

