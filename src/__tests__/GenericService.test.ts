import { describe, it, expect } from 'vitest';
import { GenericService } from '../GenericService';
import { vi } from 'vitest';
import { FindOneResponseModel } from '../FindOneResponseModel';
import { BaseStrapiModel } from '../BaseStrapiModel';
import { CrudRequestModel } from '../CrudRequestModel';
declare const global: any;

interface Book extends BaseStrapiModel {
	title: string;
	description?: string;
	publishDate: Date;
	price: number;
	author?: Author
	category?: Category;
}

interface Author extends BaseStrapiModel {
	name: string;
	bio?: string;
	books?: Book[];
}

interface Category {
    id: number;
    documentId: string;
    name: string;
    books?: Book[];
}

describe('GenericService', () => {
	it('should find one single row', async () => {
		const service = new GenericService('/test')
		const mockResponse: FindOneResponseModel<BaseStrapiModel> =
		{
			data: {},
			meta: {
				pagination: {
					page: 0,
					pageSize: 0,
					pageCount: 0,
					total: 0
				}
			}
		};
		const mockFetch = vi.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(mockResponse),
				ok: true,
				status: 200,
			})
		);

		global.fetch = mockFetch as any; // Assign the mock to global.fetch
		const result = await service.findOne('1234');
		expect(result).toEqual(mockResponse);
	});
	it('should create', async () => {
		const service = new GenericService('/test')
		const request : CrudRequestModel<Book> = {
			data: {
				title: 'A book',
				publishDate: "2020-01-01",
				price: 100,
				author: "1234"
			}
		};
		const mockFetch = vi.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(request),
				ok: true,
				status: 200,
			})
		);

		global.fetch = mockFetch as any; // Assign the mock to global.fetch
		const result = await service.findOne('1234');
		expect(result).toEqual(request);
	});
});