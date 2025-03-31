import { describe, it, expect } from "vitest";
import { GenericService } from "../GenericService";
import { vi } from "vitest";
import { FindOneResponseModel } from "../FindOneResponseModel";
import { BaseStrapiModel } from "../BaseStrapiModel";
import { CrudRequestModel } from "../CrudRequestModel";
declare const global: any;

interface Book extends BaseStrapiModel {
  title: string;
  description?: string;
  publishDate: Date;
  price: number;
  author?: Author;
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

describe("GenericService", () => {
  it("should find one single row", async () => {
    const service = new GenericService("/test");
    const mockResponse: FindOneResponseModel<BaseStrapiModel> = {
      data: {},
      meta: {
        pagination: {
          page: 0,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );

    global.fetch = mockFetch as any; // Assign the mock to global.fetch
    const result = await service.findOne("1234");
    expect(result).toEqual(mockResponse);
  });
  it("should create", async () => {
    const service = new GenericService("/test");
    const request: CrudRequestModel<Book> = {
      data: {
        title: "A book",
        publishDate: "2020-01-01",
        price: 100,
        author: "1234",
      },
    };
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(request),
        ok: true,
        status: 200,
      })
    );

    global.fetch = mockFetch as any; // Assign the mock to global.fetch
    const result = await service.findOne("1234");
    expect(result).toEqual(request);
  });
  it("should add and use interceptors", async () => {
    const service = new GenericService("/test");
    const interceptor = vi.fn(async (options) => {
      options.headers = {
        ...options.headers,
        Authorization: "Bearer test-token",
      };
      return options;
    });

    service.addInterceptor(interceptor);

    const mockResponse: FindOneResponseModel<BaseStrapiModel> = {
      data: {},
      meta: {
        pagination: {
          page: 0,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );

    global.fetch = mockFetch as any; // Assign the mock to global.fetch
    await service.findOne("1234");

    expect(interceptor).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      })
    );
  });
  it("should update the request body using an interceptor", async () => {
    const service = new GenericService("/test");
    const interceptor = vi.fn(async (options) => {
      options.body = {
        ...options.body,
        additionalField: "extraValue",
      };
      return options;
    });

    service.addInterceptor(interceptor);

    const request: CrudRequestModel<Book> = {
      data: {
        title: "A book",
        publishDate: "2020-01-01",
        price: 100,
        author: "1234",
      },
    };

    const mockResponse: FindOneResponseModel<BaseStrapiModel> = {
      data: {},
      meta: {
        pagination: {
          page: 0,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );

    global.fetch = mockFetch as any; // Assign the mock to global.fetch
    await service.create(request);

    expect(interceptor).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({
          ...request,
          additionalField: "extraValue",
        }),
      })
    );
  });

  it("should send the JWT token in the Authorization header", async () => {
    const jwtToken = "test-jwt-token";
    const service = new GenericService("/test", jwtToken);

    const mockResponse: FindOneResponseModel<BaseStrapiModel> = {
      data: {},
      meta: {
        pagination: {
          page: 0,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );

    global.fetch = mockFetch as any; // Assign the mock to global.fetch
    await service.findOne("1234");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${jwtToken}`,
        }),
      })
    );
  });
  it("should update the request params using an interceptor", async () => {
    const service = new GenericService("/test");
    const interceptor = vi.fn(async (options) => {
      options.params = {
        ...options.params,
        additionalParam: "extraValue",
      };
      return options;
    });

    service.addInterceptor(interceptor);

    const mockResponse: FindOneResponseModel<BaseStrapiModel> = {
      data: {},
      meta: {
        pagination: {
          page: 0,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );

    global.fetch = mockFetch as any; // Assign the mock to global.fetch
    await service.findOne("1234");

    expect(interceptor).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          additionalParam: "extraValue",
        }),
      })
    );
  });
  it("should add multiple interceptors and validate all are working properly", async () => {
    const service = new GenericService("/test");

    const interceptor1 = vi.fn(async (options) => {
      options.headers = {
        ...options.headers,
        "X-Custom-Header-1": "Value1",
      };
      return options;
    });

    const interceptor2 = vi.fn(async (options) => {
      options.headers = {
        ...options.headers,
        "X-Custom-Header-2": "Value2",
      };
      return options;
    });

    service.addInterceptor(interceptor1);
    service.addInterceptor(interceptor2);

    const mockResponse: FindOneResponseModel<BaseStrapiModel> = {
      data: {},
      meta: {
        pagination: {
          page: 0,
          pageSize: 0,
          pageCount: 0,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );

    global.fetch = mockFetch as any; // Assign the mock to global.fetch
    await service.findOne("1234");

    expect(interceptor1).toHaveBeenCalled();
    expect(interceptor2).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          "X-Custom-Header-1": "Value1",
          "X-Custom-Header-2": "Value2",
        }),
      })
    );
  });
});
